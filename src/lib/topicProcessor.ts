import OpenAI from 'openai';
import { z } from 'zod';

const TopicList = z.object({
  topics: z.array(z.string())
});

export async function transformTopicsToStructuredList(unstructuredTopicList: string): Promise<string[]> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

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
