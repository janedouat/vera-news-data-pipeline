import OpenAI from 'openai';
import { z } from 'zod';
import { zodTextFormat } from 'openai/helpers/zod.mjs';
import { ALL_SPECIALTIES, Specialty } from '../../../types/taxonomy';
import { uploadNewsRow } from '@/lib/modules/newsUpload/api/newsApi';

const TopicList = z.object({
  topics: z.array(z.string()),
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/// *** Topic list extraction from plain text ***

export async function transformTopicsToStructuredList(
  unstructuredTopicList: string,
): Promise<string[]> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: `Extract a list of topics from the following text (one per title) and return ONLY a JSON object with a "topics" array of strings. Text: ${unstructuredTopicList}`,
      },
    ],
    response_format: { type: 'json_object' },
    tools: [
      {
        type: 'function',
        function: {
          name: 'topic_list',
          description: 'Extracts a list of topics from unstructured text.',
          parameters: {
            type: 'object',
            properties: {
              topics: {
                type: 'array',
                items: { type: 'string' },
              },
            },
            required: ['topics'],
          },
        },
      },
    ],
    temperature: 1,
  });

  const message = response.choices[0].message;
  let topics;

  if (message.tool_calls && message.tool_calls[0]?.function?.arguments) {
    const args = JSON.parse(message.tool_calls[0].function.arguments);
    topics = args.topics;
  } else if (message.content) {
    const parsed = TopicList.safeParse(JSON.parse(message.content));
    if (!parsed.success) throw new Error('Schema mismatch');
    topics = parsed.data.topics;
  } else {
    throw new Error('No topics found in response');
  }
  return topics;
}

/// *** Topic Source functions ***

const UrlAndDateZObject = z.object({
  news_date: z.string(),
  url: z.string(),
});

const NO_URL_PLACEHOLDER_STRING = 'no_url';
const SOURCE_TOO_OLD_PLACEHOLDER_STRING = 'too_old';

export async function getSourceTopicSourceUrlAndDate({
  startDate,
  topic,
}: {
  topic: string;
  startDate: Date;
}): Promise<{ news_date: string; url: string }> {
  const response = await openai.responses.create({
    model: 'gpt-4.1',
    input: [
      {
        role: 'user',
        content: `Find the source url of this topic and either return the url (nothing else) or "no url". Don't write anything else in the answer. Topic: ${topic}`,
      },
    ],
    text: {
      format: zodTextFormat(UrlAndDateZObject, 'urlAndDate'),
    },
    reasoning: {},
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

  const message = JSON.parse(response.output_text);

  const outputUrl = message.url;
  const urlR = /(https?:\/\/[^\s]+)/g;
  const url = outputUrl.match(urlR)?.toString();
  const outputDate = message.news_date as string;

  // after refacto handle no url case
  if (outputDate) {
    return {
      url: url ?? NO_URL_PLACEHOLDER_STRING,
      news_date: outputDate,
      // new Date(outputDate) > startDate
      //   ? outputDate
      //   : SOURCE_TOO_OLD_PLACEHOLDER_STRING,
    };
  } else {
    throw new Error('Error generating url or news_date');
  }
}

export async function addUrlsAndDateToTopicList({
  startDate,
  topics,
}: {
  topics: string[];
  startDate: Date;
}) {
  return Promise.all(
    topics.map(async (topic) => {
      const { url, news_date } = await getSourceTopicSourceUrlAndDate({
        topic,
        startDate,
      });
      return { topic, url, news_date };
    }),
  );
}

/// *** Topic Answer functions ***

type TopicWithUrlAndDate = {
  topic: string;
  url: string;
  news_date: string;
};

type TopicWithUrlAndAnswer = TopicWithUrlAndDate & {
  answer: string;
};

const AnswerZObject = z.object({
  title: z.string(),
  bullet_points: z.array(z.string()),
  paragraphs: z.array(z.string()),
});

export async function getSourceTopicAnswer({
  topic,
  url,
  specialty,
}: {
  topic: string;
  url: string;
  specialty: Specialty;
}): Promise<string> {
  const response = await openai.responses.create({
    model: 'gpt-4.1',
    input: [
      {
        role: 'user',
        content: `Topic: ${topic}, with more details here: ${url}.

        1. Write a clinically relevant title that clearly addresses the “so what?”—include the main intervention/exposure, the outcome, and the patient population when applicable.
        2. Summarize the practice-impacting takeaways in 2-3 bullet points using evidence-focused, non-prescriptive, MD-level language. Do not use vague terms like “ethically obligated.” Focus on legally binding, clinical, or operational implications.
        3. Write a short, clinically relevant explanation (1-2 paragraphs). Prioritize what a practicing MD needs to know to understand and apply this in a clinical context. Avoid prescriptions. Frame implications without telling MDs what to do.

        Return as JSON: title, bullet_points (list of strings), paragraphs (list of strings).
        `,

        // In your answers, don't repeat yourself please.
        // 1) Find a good title for the topic. It should answer the "so what?"
        // 2) Then summarize the key clinical changing conclusions of the source for specialty ${specialty}. Don't mention the specialty name, as it might be shown to other specialties. It's the tldr.\nAn MD will read this so speak their language. This should be 2-3 bullet points.
        // 3) Put a longer explanation of the topic, still has to be really clinically relevant to an MD. An MD will read this in an article format, so pretend your writing for an MD; speak their language. Should be approx two paragraphs.

        // Please format your answer in a json with elements title, then bullet_points with is a list of strings and then paragraphs which is a list of strings.

        // Only return what the doctors will read, nothing else.
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
    return JSON.parse(message);
  } else {
    throw new Error('Error generating title and/or bullet_points');
  }
}

export async function addAnswersToTopicList({
  topics,
  specialty,
}: {
  topics: TopicWithUrlAndDate[];
  specialty: Specialty;
}): Promise<TopicWithUrlAndAnswer[]> {
  return Promise.all(
    topics.map(async (topic) => {
      const answer = await getSourceTopicAnswer({ ...topic, specialty });
      return { ...topic, answer };
    }),
  );
}

// *** Topic symptom tagging functions ***
type TopicWithUrlAndAnswerAndSpecialties = TopicWithUrlAndAnswer & {
  specialties: Specialty[];
  tags: string[];
};

export const SpecialtyZod = z.enum([...ALL_SPECIALTIES] as [
  string,
  ...string[],
]);

const SpecialtiesZObject = z.object({
  specialties: z.array(SpecialtyZod),
});

export async function getSourceTopicSpecialty({
  answer,
  specialty,
}: {
  answer: string;
  specialty: Specialty;
}): Promise<Specialty[]> {
  const content = `Tag this answer with MD specialties that might be interested in reading it ${JSON.stringify(answer)}, from the list of specialties, using the exact same words for them. Go through these specialties one by one and only return the ones it's really clinical-practice changing for: ${ALL_SPECIALTIES.join()}`;
  const response = await openai.responses.create({
    model: 'gpt-4.1',
    input: [
      {
        role: 'user',
        content,
      },
    ],
    reasoning: {},
    text: {
      format: zodTextFormat(SpecialtiesZObject, 'specialty'),
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
    return specialties;
  } else {
    throw new Error('Error generating source specialties');
  }
}

export async function addSyptomsToTopicLIst({
  topics,
  specialty,
}: {
  topics: TopicWithUrlAndAnswer[];
  specialty: Specialty;
}): Promise<TopicWithUrlAndAnswerAndSpecialties[]> {
  return Promise.all(
    topics.map(async (topic: TopicWithUrlAndAnswer) => {
      const specialties = await getSourceTopicSpecialty({
        answer: topic.answer,
        specialty,
      });
      return { ...topic, specialties };
    }),
  );
}

export async function uploadTopics({
  topics,
  specialty,
  model,
  uploadId,
}: {
  topics: TopicWithUrlAndAnswerAndSpecialties[];
  specialty: Specialty;
  model: string;
  uploadId: string;
}) {
  return Promise.all(
    topics.map(async (topic: TopicWithUrlAndAnswerAndSpecialties, index) => {
      if (
        topic.url == NO_URL_PLACEHOLDER_STRING ||
        topic.news_date == SOURCE_TOO_OLD_PLACEHOLDER_STRING
      ) {
        console.log(
          `News piece ${index + 1} was not added to supabase (cause: ${topic.url === NO_URL_PLACEHOLDER_STRING ? (topic.news_date == SOURCE_TOO_OLD_PLACEHOLDER_STRING ? 'no url and date too old' : 'no url') : 'date too old'})`,
        );
      } else {
        return uploadNewsRow({
          elements: topic.answer,
          news_date: topic.news_date,
          news_type: 'test',
          score: 6,
          specialty,
          specialties: topic.specialties,
          ranking_model_ranking: 1,
          selecting_model: model,
          url: topic.url,
          tags: topic.tags,
          upload_id: uploadId,
          is_visible_in_prod: false,
        });
      }
    }),
  );
}

// tag with clinical interests

const TagsZObject = z.object({
  tags: z.string(),
});

export async function getTags({
  answer,
  tags: possible_tags,
}: {
  answer: string;
  tags: string[];
}): Promise<Specialty[]> {
  const content = `Tag this medical update (below) with clinical interests that are relevant to it (below). Only use the precise clinical_interest strings provided below in your outputs. \n ### medical update ${answer}) \n ### clinical interests ${JSON.stringify(possible_tags)})`;
  const response = await openai.responses.create({
    model: 'gpt-4.1',
    input: [
      {
        role: 'user',
        content,
      },
    ],
    reasoning: {},
    text: {
      format: zodTextFormat(TagsZObject, 'tags'),
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

  const tags = JSON.parse(response.output_text).tags;

  if (tags) {
    return tags;
  } else {
    throw new Error('Error generating source tags');
  }
}
