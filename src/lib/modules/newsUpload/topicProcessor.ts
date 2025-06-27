import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { zodTextFormat } from 'openai/helpers/zod.mjs';
import { ALL_SPECIALTIES, Specialty } from '../../../types/taxonomy';
import { uploadNewsRow } from '@/lib/modules/newsUpload/api/newsApi';
import { OpenAI } from 'openai';
import { callOpenAIWithZodFormat } from '@/lib/utils/openaiWebSearch';

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
    model: openai('gpt-4o'),
    schema: TopicList,
    schemaName: 'TopicList',
    schemaDescription: 'A list of topics extracted from unstructured text.',
    prompt: `Extract a list of topics from the following text (one per title) and return ONLY a JSON object with a "topics" array of strings. Text: ${unstructuredTopicList}`,
    temperature: 1,
  });

  return result.object.topics;
}

/// *** Topic Source functions ***

const NO_URL_PLACEHOLDER_STRING = 'no_url';
const SOURCE_TOO_OLD_PLACEHOLDER_STRING = 'too_old';

export async function getUrl({
  topic,
}: {
  topic: string;
}): Promise<{ url: string }> {
  const content = `Find the source url of this topic and either return the url (nothing else) or "no url". Don't write anything else in the answer. Topic: ${topic}`;
  const output = await callOpenAIWithZodFormat({
    content,
    zodSchema: z.object({ url: z.string() }),
    model: 'gpt-4.1',
  });

  const urlR = /(https?:\/\/[^\s]+)/g;
  const url = output.url.match(urlR)?.toString();
  if (url) {
    return {
      url: url ?? NO_URL_PLACEHOLDER_STRING,
    };
  } else {
    throw new Error('Error generating url');
  }
}

export async function getDate({
  startDate,
  topic,
  url,
}: {
  topic: string;
  url: string;
  startDate: Date;
}): Promise<{ date: string }> {
  const content = `Find the date of the topic at this url and return the date in the format YYYY-MM-YY or "no date". If the date is simply a month, return the 1rst of that month (ex: July 25 -> 2025--07-01), nothing else. Don't write anything else in the answer.\n ### URL:\n ${url}} \n ### Topic:\n  ${topic}`;
  const message = await callOpenAIWithZodFormat({
    content,
    zodSchema: z.object({ date: z.string() }),
    model: 'gpt-4.1',
  });

  const outputDate = new Date(message.date as string);

  if (outputDate) {
    return {
      date:
        outputDate > startDate
          ? outputDate.toISOString().slice(0, 10)
          : SOURCE_TOO_OLD_PLACEHOLDER_STRING,
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
}: {
  topic: string;
  url: string;
}): Promise<{ answer: string }> {
  const response = await openaiClient.responses.create({
    model: 'gpt-4.1',
    input: [
      {
        role: 'user',
        content: `Topic: ${topic}, with more details here: ${url}.

        1. Write a clinically relevant title that clearly addresses the "so what?"—include the main intervention/exposure, the outcome, and the patient population when applicable.
        2. Summarize the practice-impacting takeaways in 2-3 bullet points using evidence-focused, non-prescriptive, MD-level language. Do not use vague terms like "ethically obligated." Focus on legally binding, clinical, or operational implications.
        3. Write a short, clinically relevant explanation (1-2 paragraphs). Prioritize what a practicing MD needs to know to understand and apply this in a clinical context. Avoid prescriptions. Frame implications without telling MDs what to do.

        Return as JSON: title, bullet_points (list of strings), paragraphs (list of strings).
        `,
      },
    ],
    reasoning: {},
    text: {
      format: zodTextFormat(AnswerZObject, 'answer'),
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

  if (message) {
    return { answer: JSON.parse(message) };
  } else {
    throw new Error('Error generating title and/or bullet_points');
  }
}

// *** Topic symptom tagging functions ***

export const SpecialtyZod = z.enum([...ALL_SPECIALTIES] as [
  string,
  ...string[],
]);

export async function getSpecialties({
  answer,
  specialty,
}: {
  answer: string;
  specialty: Specialty;
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
  const specialties = messageSpecialties.includes(specialty)
    ? messageSpecialties
    : [...messageSpecialties, specialty];

  if (message) {
    return { specialties };
  } else {
    throw new Error('Error generating source specialties');
  }
}

// tag with clinical interests

export async function getTags({
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
      format: zodTextFormat(z.object({ tags: z.array(z.string()) }), 'tags'),
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
  specialty: Specialty;
}) {
  const message = await callOpenAIWithZodFormat({
    content: `Score the topic below for MDs of specialty ${specialty} on trustfulness, clinical-impactfulness and how hard to treat the underlying diagnosis is to treat for MDs of that specialt, each from 1 to 3 (3 is max). Return a json in the format {trust: 1, clinical_impact: 3, tricky_diagnosis: 3}./n ### Topic: ${JSON.stringify(answer)} \n ### url: ${url}}`,
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
}: {
  index: number;
  date: string;
  url: string;
  specialty: Specialty;
  specialties: string[];
  tags: string[];
  answer: string;
  score: number;
  model: string;
  uploadId: string;
  is_visible_in_prod?: boolean;
}) {
  if (
    url == NO_URL_PLACEHOLDER_STRING ||
    date == SOURCE_TOO_OLD_PLACEHOLDER_STRING
  ) {
    console.log(
      `News piece ${index + 1} was not added to supabase (cause: ${url === NO_URL_PLACEHOLDER_STRING ? (date == SOURCE_TOO_OLD_PLACEHOLDER_STRING ? 'no url and date too old' : 'no url') : 'date too old'})`,
    );
  } else {
    return uploadNewsRow({
      elements: answer,
      score,
      news_date: date,
      news_type: 'test',
      specialty,
      specialties: specialties,
      ranking_model_ranking: 1,
      selecting_model: model,
      url: url,
      tags: tags,
      upload_id: uploadId,
      is_visible_in_prod: !!is_visible_in_prod,
    });
  }
}
