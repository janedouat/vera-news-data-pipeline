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

export async function getSourceTopicSourceUrlAndDate(
  topic: string,
): Promise<{ news_date: string; url: string }> {
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

  const outputDate = message.news_date;

  if (url && outputDate) {
    return { url, news_date: outputDate };
  } else {
    throw new Error('No url found in response');
  }
}

export async function addUrlsAndDateToTopicList(topics: string[]) {
  return Promise.all(
    topics.map(async (topic) => {
      const { url, news_date } = await getSourceTopicSourceUrlAndDate(topic);
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
        content: `Find a good title for the topic.
        Then summarize the key clinical changing conclusions of the source for specialty ${specialty}. It's the tldr.\nAn MD will read this so speak their language.
        Topic: ${topic}, its source with more details can be found here ${url}.
        Please format your answer in a json with elements title, and then bullet_points with is a list of strings.
        Only return what the doctors will read, nothing else.
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
    return JSON.parse(message);
  } else {
    throw new Error('No url found in response');
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
}: {
  answer: string;
}): Promise<Specialty[]> {
  const response = await openai.responses.create({
    model: 'gpt-4.1',
    input: [
      {
        role: 'user',
        content: `Tag this answer with MD specialties that might be interested in reading it ${answer}, from the list of specialties, using the exact same words for them; only select the ones it's really clinical-practice changing for. List of specialties: ${ALL_SPECIALTIES.join()}`,
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
  if (message) {
    return JSON.parse(message).specialties;
  } else {
    throw new Error('No url found in response');
  }
}

export async function addSyptomsToTopicLIst({
  topics,
}: {
  topics: TopicWithUrlAndAnswer[];
}): Promise<TopicWithUrlAndAnswerAndSpecialties[]> {
  return Promise.all(
    topics.map(async (topic: TopicWithUrlAndAnswer) => {
      const specialties = await getSourceTopicSpecialty({
        answer: topic.answer,
      });
      return { ...topic, specialties };
    }),
  );
}

export async function uploadTopics({
  topics,
  specialty,
}: {
  topics: TopicWithUrlAndAnswerAndSpecialties[];
  specialty: Specialty;
}) {
  return Promise.all(
    topics.map(async (topic: TopicWithUrlAndAnswerAndSpecialties) => {
      return uploadNewsRow({
        elements: topic.answer,
        news_date: topic.news_date,
        news_type: 'test',
        score: 6,
        specialty,
        specialties: topic.specialties,
        ranking_model_ranking: 1,
        url: topic.url,
      });
    }),
  );
}
