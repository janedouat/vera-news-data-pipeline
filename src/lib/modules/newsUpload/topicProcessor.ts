import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { zodTextFormat } from 'openai/helpers/zod.mjs';
import { ALL_SPECIALTIES, Specialty } from '../../../types/taxonomy';
import { ALL_SUBSPECIALTIES } from '../../../types/subspecialty_taxonomy';
import { uploadNewsRow } from '@/lib/modules/newsUpload/api/newsApi';
import { OpenAI } from 'openai';
import { callOpenAIWithZodFormat } from '@/lib/utils/openaiWebSearch';
import { findMedicalSourceUrl } from '@/lib/utils/perplexitySearch';
import { perplexity } from '@ai-sdk/perplexity';
import { Json } from '@/types/supabase';

const TopicList = z.object({
  topics: z.array(z.string()),
});

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/// *** Topic list extraction from plain text ***

export async function extractTopicsFromText(
  unstructuredTopicList: string,
): Promise<string[]> {
  const result = await generateObject({
    model: openai('gpt-4.1'),
    schema: TopicList,
    schemaName: 'TopicList',
    schemaDescription: 'A list of topics extracted from unstructured text.',
    prompt: `Extract a list of strings from the topic text below (one per title, the titles are separated by commas and numbers), do not change any of the words in the topic text below and return ONLY a JSON object with a "topics" array of strings. \n ### Topic list: ${unstructuredTopicList}`,
    temperature: 1,
  });

  return result.object.topics;
}

/// *** Topic Source functions ***

const NO_URL_PLACEHOLDER_STRING = 'no_url';
const SOURCE_TOO_OLD_PLACEHOLDER_STRING = 'too_old';

// Helper function to validate if URL is from approved domains
function isValidDomain(url: string): boolean {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    const approvedDomains = [
      'fda.gov',
      'cdc.gov',
      'nejm.org',
      'jama',
      'bmj.com',
      'thelancet.com',
      'chestnet',
      'atsjournals',
      'nature.com',
    ];

    return approvedDomains.some((domain) => hostname.includes(domain));
  } catch {
    return false;
  }
}

export async function getUrl({
  topic,
}: {
  topic: string;
}): Promise<{ url: string }> {
  const output = await findMedicalSourceUrl(topic);

  const urlR = /(https?:\/\/[^\s]+)/g;
  const url = output.url.match(urlR)?.toString();
  if (url) {
    // Validate that the URL is from an approved domain
    if (!isValidDomain(url)) {
      console.log(`❌ URL rejected - not from approved domain: ${url}`);
      return {
        url: NO_URL_PLACEHOLDER_STRING,
      };
    }

    return {
      url: url ?? NO_URL_PLACEHOLDER_STRING,
    };
  } else if (output.url === 'no_url') {
    return {
      url: NO_URL_PLACEHOLDER_STRING,
    };
  } else {
    throw new Error('Error generating url');
  }
}

export async function getDate({
  topic,
  url,
}: {
  topic: string;
  url: string;
}): Promise<{ date: Date }> {
  const content = `Find the date of the topic at this url and return the date in the format YYYY-MM-YY or "no date". If the date is simply a month, return the last day of that month (ex: June 2025 -> 2025-06-30), nothing else. Don't write anything else in the answer.\n ### URL:\n ${url}} \n ### Topic:\n  ${topic}`;
  const message = await callOpenAIWithZodFormat({
    content,
    zodSchema: z.object({ date: z.string() }),
    model: 'gpt-4.1',
  });

  const outputDate = new Date(message.date as string);

  if (outputDate) {
    return {
      date: new Date(outputDate),
    };
  } else {
    throw new Error('Error generating news_date');
  }
}

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

  const output = await generateObject({
    model: perplexity('sonar-pro'),
    schema: AnswerZObject,
    schemaName: 'AnswerZObject',
    schemaDescription:
      'A structured response with title, bullet points, and paragraphs for medical news.',
    prompt: content,
    temperature: 0.1,
  });

  const message = output.object;

  if (message) {
    return { answer: message };
  } else {
    throw new Error('Error generating title and/or bullet_points');
  }
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

  console.log({ content });
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

export async function uploadTopic({
  index,
  date,
  url,
  specialty,
  specialties,
  tags,
  answer,
  score,
  model,
  uploadId,
  is_visible_in_prod,
  source,
  scores,
}: {
  index: number;
  date: string;
  url: string;
  specialty?: Specialty;
  specialties: string[];
  tags: string[];
  answer: Json;
  score: number;
  model?: string;
  uploadId: string;
  is_visible_in_prod?: boolean;
  source?: string;
  scores?: Record<string, number>;
}) {
  if (
    url == NO_URL_PLACEHOLDER_STRING ||
    date == SOURCE_TOO_OLD_PLACEHOLDER_STRING
  ) {
    console.log(
      `News piece ${index + 1} from upload ${uploadId} was not added to supabase (cause: ${url === NO_URL_PLACEHOLDER_STRING ? (date == SOURCE_TOO_OLD_PLACEHOLDER_STRING ? 'no url and date too old' : 'no url') : 'date too old'})`,
    );
  } else {
    const newsletterTitle = generateNewsletterTitle({ url, date, answer });

    return uploadNewsRow({
      elements: answer,
      score,
      news_date: date,
      news_date_timestamp: new Date(date).toISOString(),
      news_type: 'test',
      specialty: specialty ?? null,
      specialties: specialties,
      selecting_model: model ?? null,
      url: url,
      tags: tags,
      upload_id: uploadId,
      is_visible_in_prod: !!is_visible_in_prod,
      newsletter_title: newsletterTitle,
      source,
      scores,
    });
  }
}
