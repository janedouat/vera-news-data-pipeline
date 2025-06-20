import OpenAI from 'openai';
import { z } from 'zod';

const TopicList = z.object({
  topics: z.array(z.string())
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


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
    max_tokens: 1000
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


export async function getSourceTopicSourceUrl(topic: string): Promise<string> {
  const response = await openai.responses.create({
    model: "gpt-4.1",
    input: [
      {
        role: "user",
        content: `Find the source url of this topic and return it as a JSON object: { "url": "..." }. Topic: ${topic}`
      }
    ],
    text: {
      format: { type: "text" }
    },
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
    max_output_tokens: 2048,
    top_p: 1
  });

  const message = response.output_text
  console.log({message})
  if (message) {
    const parsed = JSON.parse(message);
    return parsed.url;
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