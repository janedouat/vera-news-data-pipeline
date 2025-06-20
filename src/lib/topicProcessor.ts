import OpenAI from 'openai';
import { z } from 'zod';
import {Specialty} from '../../types';
import {zodTextFormat} from 'openai/helpers/zod.mjs';

const TopicList = z.object({
  topics: z.array(z.string())
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/// *** Topic list extraction from plain text ***

export async function transformTopicsToStructuredList(unstructuredTopicList: string): Promise<string[]> {
  
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: `Extract a list of topics from the following text (one per title) and return ONLY a JSON object with a "topics" array of strings. Text: ${unstructuredTopicList}`
      }
    ],
    response_format: { type: "json_object" },
    tools: [
      {
        type: "function",
        function: {
          name: "topic_list",
          description: "Extracts a list of topics from unstructured text.",
          parameters: {
            type: "object",
            properties: {
              topics: {
                type: "array",
                items: { type: "string" }
              }
            },
            required: ["topics"]
          }
        }
      }
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

export async function getSourceTopicSourceUrl(topic: string): Promise<string> {
  const response = await openai.responses.create({
    model: "gpt-4.1",
    input: [
      {
        role: "user",
        content: `Find the source url of this topic and either return the url (nothing else) or "no url". Don't write anything else in the answer. Topic: ${topic}`
      }
    ],
    reasoning: {},
    tools: [
      {
        type: "web_search_preview",
        user_location: {
          type: "approximate",
          country: "US"
        },
        search_context_size: "medium"
      }
    ],
    temperature: 1,
    top_p: 1
  });

  const message = response.output_text
  const urlR = /(https?:\/\/[^\s]+)/g;
  const url= message.match(urlR);
  if (url ) {
    return message
  } else {
    throw new Error('No url found in response');
  }
}

export async function addUrlsToTopicList(topics: string[]) {
  return Promise.all(
    topics.map(async (topic) => {
      const url = await getSourceTopicSourceUrl(topic);
      return { topic, url };
    })
  );
}


/// *** Topic Answer functions ***

type TopicWithUrlAndSpecialty = {
  topic: string;
  url: string;
};

type TopicWithUrlAndSpecialtyAndAnswer= TopicWithUrlAndSpecialty & {
  answer: string;
};

const AnswerZObject = z.object({
  title: z.string(),
  bullet_points: z.array(z.string()),
})

export async function getSourceTopicAnswer({topic, url, specialty}: {topic: string, url: string, specialty: Specialty}): Promise<string> {
  const response = await openai.responses.create({
    model: "gpt-4.1",
    input: [
      {
        role: "user",
        content: `Summarize the key clinical changing conclusions of the source for specialty ${specialty}.
        It's the tld.\nAn MD will read this so speak their language. Topic: ${topic}, its source with more details can be found here ${url}.
        Please format your answer in a json with elements title, and then bullet_points with is a list of strings. Only return the answer doctors wil read, nothing else`
      }
    ],
    reasoning: {},
    text: {
      format: zodTextFormat(AnswerZObject, "answer"),
    },
    tools: [
      {
        type: "web_search_preview",
        user_location: {
          type: "approximate",
          country: "US"
        },
        search_context_size: "medium"
      }
    ],
    temperature: 1,
    top_p: 1
  });

  const message = response.output_text
  if (message ) {
    return JSON.parse(message)
  } else {
    throw new Error('No url found in response');
  }
}

export async function addAnswerToTopicList({topics, specialty}:{topics: TopicWithUrlAndSpecialty[], specialty: Specialty}): Promise<TopicWithUrlAndSpecialtyAndAnswer>{
  return Promise.all(
    topics.map(async (topic) => {
      const answer = await getSourceTopicAnswer({...topic, specialty});
      return { ...topic, answer } ;
    })
  );
}


// *** Topic symptom tagging functions ***

type TopicWithUrlAndSpecialtyAndAnswerAndSymptoms = TopicWithUrlAndSpecialtyAndAnswer & {
  specialty: Specialty[]
};

export async function addSyptomsToTopicLIst({topics, specialty}: {topics:TopicWithUrlAndSpecialtyAndAnswer, specialty: Specialty}): Promise<TopicWithUrlAndSpecialtyAndAnswerAndSymptoms>{
  return Promise.all(
    topics.map(async (topic) => {
      const answer = await getSourceTopic({...topic, specialty});
      return { ...topic, answer } ;
    })
  );
}