import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod.mjs';
import { z } from 'zod';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getFdaUrls = async (
  title: string,
): Promise<{
  success?: boolean;
  press_release_url?: string;
  fda_url?: string;
  error?: string;
}> => {
  try {
    const response = await openai.responses.create({
      prompt: {
        id: 'pmpt_687877b05d888195a0ae639a47960a4f0b05afa87520c328',
        version: '1',
      },
      input: [
        {
          role: 'user',
          content: title,
        },
      ],
      reasoning: {},
      tools: [
        {
          type: 'web_search_preview',
          user_location: {
            type: 'approximate',
          },
          search_context_size: 'medium',
        },
      ],
      tool_choice: {
        type: 'web_search_preview',
      },
      text: {
        format: zodTextFormat(
          z.object({ press_release_url: z.string(), fda_url: z.string() }),
          'output',
        ),
      },
    });

    // Parse the response
    const result = response.output_text;
    if (!result) {
      return { error: 'No response text received' };
    }

    // Try to parse the JSON response
    let parsedResult;
    try {
      parsedResult = JSON.parse(result);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return { error: 'Failed to parse response as JSON' };
    }

    // Validate that FDA URL contains "fda"
    if (
      !parsedResult.fda_url ||
      !parsedResult.fda_url.toLowerCase().includes('fda')
    ) {
      return {
        error: 'FDA URL does not contain "fda"',
        press_release_url: parsedResult.press_release_url || null,
        fda_url: parsedResult.fda_url || null,
      };
    }

    return {
      success: true,
      press_release_url: parsedResult.press_release_url,
      fda_url: parsedResult.fda_url,
    };
  } catch (error) {
    return {
      error: `API call failed with error ${error instanceof Error ? error.message : String(error)}`,
    };
  }
};
