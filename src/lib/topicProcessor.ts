import {zodTextFormat} from "openai/helpers/zod.mjs";
import { z } from "zod";

const TopicList = z.object({
  topics: z.array(z.string())
});

export async function transformTopicsToStructuredList(unstructuredTopicList: string): Promise<string[]> {
  const body = {
    "model": "gpt-4.1",
    "input": [
      {
        "role": "user",
        "content": [
          {
            "type": "input_text",
            "text": unstructuredTopicList
          }
        ]
      }
    ],
    "temperature": 1,
    "top_p": 1,
    "text": {
      "format": zodTextFormat(TopicList, "topics")
    }
  };

  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };

  const response = await fetch('https://api.openai.com/v1/responses', options);
  
  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const topics = JSON.parse(data.output[0].content[0].text).topics;
  
  return topics;
} 