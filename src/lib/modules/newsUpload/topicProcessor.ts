import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { zodTextFormat } from 'openai/helpers/zod.mjs';
import { ALL_SPECIALTIES, Specialty } from '../../../types/taxonomy';
import { ALL_SUBSPECIALTIES } from '../../../types/subspecialty_taxonomy';
import { OpenAI } from 'openai';
import { callOpenAIWithZodFormat } from '@/lib/utils/openaiWebSearch';
import {
  LLM_CALL_RETRY_CONFIG,
  RETRYABLE_ERROR_PATTERNS,
} from '@/lib/config/apiConfig';

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/// *** Topic Answer functions ***

const AnswerZObject = z.object({
  title: z.string(),
  bullet_points: z.array(z.string()),
  paragraphs: z.array(z.string()),
});

export async function getAnswer({
  topic,
  url,
  text,
}: {
  topic: string;
  url: string;
  text?: string;
}): Promise<{
  answer: {
    title: string;
    bullet_points: string[];
    paragraphs: string[];
  };
}> {
  const content = `Topic: ${topic}, with more details at this url : ${url}.

  Using only text found in the url above or in the text below if provided (no hallucinations), and without referencing sources (i.e. no [1] etc):
  1. Write a clinically relevant title that clearly addresses the "so what?"—include the main intervention/exposure, the outcome, and the patient population when applicable.
  2. Using only text found at the url (no hallucinations), summarize the practice-impacting takeaways in 2-3 bullet points using evidence-focused, non-prescriptive, MD-level language. Do not use vague terms like "ethically obligated." Focus on legally binding, clinical, or operational implications.
  3. Write a short, clinically relevant explanation (1-2 paragraphs). Prioritize what a practicing MD needs to know to understand and apply this in a clinical context. Avoid prescriptions. Frame implications without telling MDs what to do.

  ### text: ${text}
`;

  const { maxRetries, baseDelay, maxDelay, backoffMultiplier } =
    LLM_CALL_RETRY_CONFIG.retry;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(
        `🔄 Attempting API call (attempt ${attempt}/${maxRetries}) for topic: ${topic.substring(0, 50)}...`,
      );

      // Add exponential backoff delay for retries
      if (attempt > 1) {
        const retryDelay = Math.min(
          baseDelay * Math.pow(backoffMultiplier, attempt - 1),
          maxDelay,
        );
        console.log(`⏳ Retrying after ${retryDelay}ms delay`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }

      const startTime = Date.now();
      const output = await generateObject({
        model: openai('gpt-4.1'),
        schema: AnswerZObject,
        schemaName: 'AnswerZObject',
        schemaDescription:
          'A structured response with title, bullet points, and paragraphs for medical news.',
        prompt: content,
        temperature: 0.1,
      });
      const endTime = Date.now();
      console.log(`⏱️ API call completed in ${endTime - startTime}ms`);

      const message = output.object;

      if (message) {
        console.log(
          `✅ Successfully generated answer for topic: ${topic.substring(0, 50)}...`,
        );
        return { answer: message };
      } else {
        throw new Error('No valid response object generated');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        `❌ Perplexity API error (attempt ${attempt}/${maxRetries}): ${errorMessage}`,
      );

      // Check if it's a retryable error using imported patterns
      const isRetryableError = RETRYABLE_ERROR_PATTERNS.some((pattern) =>
        errorMessage.toLowerCase().includes(pattern.toLowerCase()),
      );

      if (attempt === maxRetries || !isRetryableError) {
        console.error(
          `❌ Final Perplexity API error after ${maxRetries} attempts: ${errorMessage}`,
        );
        throw new Error(
          `Failed to generate answer after ${maxRetries} attempts. Last error: ${errorMessage}`,
        );
      }

      console.warn(`⚠️ Retryable error detected, will retry...`);
    }
  }

  throw new Error('Error generating title and/or bullet_points');
}

// *** Topic symptom tagging functions ***

export const SpecialtyZod = z.enum([...ALL_SPECIALTIES] as [
  string,
  ...string[],
]);

export const SubspecialtyZod = z.enum([...ALL_SUBSPECIALTIES] as [
  string,
  ...string[],
]);

export async function getSpecialties({
  answer,
  specialty,
}: {
  answer: string;
  specialty?: Specialty;
}): Promise<{ specialties: Specialty[] }> {
  const content = `Tag this answer with MD specialties that might be interested in reading it ${JSON.stringify(answer)}, from the list of specialties, using the exact same words for them. Go through these specialties one by one and only return the ones it's really clinical-practice changing for: ${ALL_SPECIALTIES.join()}`;
  const response = await openaiClient.responses.create({
    model: 'gpt-4.1',
    input: [
      {
        role: 'user',
        content,
      },
    ],
    reasoning: {},
    text: {
      format: zodTextFormat(
        z.object({ specialties: z.array(SpecialtyZod) }),
        'specialty',
      ),
    },
    tools: [
      {
        type: 'web_search_preview',
        user_location: {
          type: 'approximate',
          country: 'US',
        },
        search_context_size: 'medium',
      },
    ],
    temperature: 1,
    top_p: 1,
  });

  const message = response.output_text;
  const messageSpecialties = JSON.parse(message).specialties;
  const specialties = specialty
    ? messageSpecialties.includes(specialty)
      ? messageSpecialties
      : [...messageSpecialties, specialty]
    : messageSpecialties;

  if (message) {
    return { specialties };
  } else {
    throw new Error('Error generating source specialties');
  }
}

// tag with clinical interests

export async function getSubspecialtyTags({
  answer,
  tags,
}: {
  answer: string;
  tags: string[];
}): Promise<{ tags: string[] }> {
  const content = `Given the medical update below, return only the relevant clinical interests as a JSON array of strings. Only use the exact strings provided in the clinical interests list. Do not include any tag unless the medical update is clearly and directly relevant to it. If none are relevant, return an empty array. Do not include any explanation or extra text. \n ### medical update ${JSON.stringify(answer)}) \n ### clinical interests ${JSON.stringify(tags)})`;

  const response = await openaiClient.responses.create({
    model: 'gpt-4.1',
    input: [
      {
        role: 'user',
        content,
      },
    ],
    reasoning: {},
    text: {
      format: zodTextFormat(
        z.object({ tags: z.array(SubspecialtyZod) }),
        'tags',
      ),
    },
    tools: [
      {
        type: 'web_search_preview',
        user_location: {
          type: 'approximate',
          country: 'US',
        },
        search_context_size: 'medium',
      },
    ],
    temperature: 1,
    top_p: 1,
  });

  const outputTags = JSON.parse(response.output_text).tags;

  if (outputTags) {
    return { tags: outputTags };
  } else {
    throw new Error('Error generating source tags');
  }
}

export async function getScore({
  answer,
  url,
  specialty,
}: {
  answer: string;
  url: string;
  specialty?: Specialty;
}) {
  const content = specialty
    ? `Score the topic below for MDs of specialty ${specialty} on trustfulness, clinical-impactfulness and how hard to treat the underlying diagnosis is to treat for MDs of that specialty, each from 1 to 3 (3 is max). Return a json in the format {trust: 1, clinical_impact: 3, tricky_diagnosis: 3}./n ### Topic: ${JSON.stringify(answer)} \n ### url: ${url}}`
    : `Score the topic below for MDs on trustfulness, clinical-impactfulness and how hard to treat the underlying diagnosis is to treat for MDs, each from 1 to 3 (3 is max). Return a json in the format {trust: 1, clinical_impact: 3, tricky_diagnosis: 3}./n ### Topic: ${JSON.stringify(answer)} \n ### url: ${url}}`;
  const message = await callOpenAIWithZodFormat({
    content: content,
    model: 'gpt-4.1',
    zodSchema: z.object({
      trust: z.number(),
      clinical_impact: z.number(),
      tricky_diagnosis: z.number(),
    }),
  });

  const score =
    Number(message.clinical_impact) +
    Number(message.tricky_diagnosis) +
    Number(message.trust);

  if (isNaN(score)) {
    throw new Error(
      'Score calculation failed: one or more values are not numbers',
    );
  }

  return { score };
}

export function generateNewsletterTitle({
  url,
  date,
  answer,
}: {
  url: string;
  date: string;
  answer: string;
}): string {
  // Extract source from URL for newsletter title
  const getSourceFromUrl = (url: string): string | null => {
    try {
      const hostname = new URL(url).hostname.toLowerCase();
      if (hostname.includes('fda.gov')) return 'FDA';
      if (hostname.includes('cdc.gov')) return 'CDC';
      if (hostname.includes('nejm.org')) return 'NEJM';
      if (hostname.includes('jama')) return 'JAMA';
      if (hostname.includes('bmj.com')) return 'BMJ';
      if (hostname.includes('thelancet.com')) return 'Lancet';
      if (hostname.includes('chestnet')) return 'CHEST';
      if (hostname.includes('atsjournals')) return 'AJRCCM';
      // Add more mappings as needed
      return null; // Return null instead of generic hostname
    } catch {
      return null;
    }
  };

  // Determine article type from content
  const getArticleType = (answerContent: {
    title: string;
    bullet_points: string[];
    paragraphs: string[];
  }): string | null => {
    const content = JSON.stringify(answerContent).toLowerCase();
    if (content.includes('randomized') || content.includes('rct')) return 'RCT';
    if (content.includes('cohort') || content.includes('observational'))
      return 'Cohort';
    if (content.includes('case-control')) return 'Case-Control';
    if (content.includes('meta-analysis')) return 'Meta-Analysis';
    if (content.includes('systematic review')) return 'Systematic Review';
    if (content.includes('guideline')) return 'Guideline';
    return null; // Return null instead of generic "Study"
  };

  const parsedAnswer = typeof answer === 'string' ? JSON.parse(answer) : answer;
  const source = getSourceFromUrl(url);
  const articleType = getArticleType(parsedAnswer);

  // Build title conditionally based on available information
  const titleParts: string[] = [];

  if (source) titleParts.push(source);
  titleParts.push(date);
  if (articleType) titleParts.push(articleType);

  return `${titleParts.join(' - ')}: ${parsedAnswer.title}`;
}
