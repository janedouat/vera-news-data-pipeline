import { OpenAI } from 'openai';
import { z } from 'zod';
import { zodTextFormat } from 'openai/helpers/zod.mjs';

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Utility to call OpenAI with a zodTextFormat, model name, and content string, returning the parsed output_text.
 * @param {z.ZodTypeAny} zodSchema - The Zod schema to validate the response.
 * @param {string} model - The OpenAI model name (e.g., 'gpt-4.1').
 * @param {string} content - The prompt/content string for the model.
 * @param {object} [options] - Optional: { tools, temperature, top_p }
 * @returns {Promise<any>} - The parsed output from the model.
 */
export async function callOpenAIWithZodFormat<T extends z.ZodTypeAny>({
  zodSchema,
  model,
  content,
  options = {},
}: {
  zodSchema: T;
  model: string;
  content: string;
  options?: {
    tools?: any[];
    temperature?: number;
    top_p?: number;
  };
}): Promise<z.infer<T>> {
  const response = await openaiClient.responses.create({
    model,
    input: [
      {
        role: 'user',
        content,
      },
    ],
    text: {
      format: zodTextFormat(zodSchema, 'output'),
    },
    reasoning: {},
    tools: options.tools || [
      {
        type: 'web_search_preview',
        user_location: {
          type: 'approximate',
          country: 'US',
        },
        search_context_size: 'medium',
      },
    ],
    temperature: options.temperature ?? 1,
    top_p: options.top_p ?? 1,
  });

  if (response.output_text) {
    return JSON.parse(response.output_text);
  } else {
    throw new Error('No output_text returned from OpenAI');
  }
}
