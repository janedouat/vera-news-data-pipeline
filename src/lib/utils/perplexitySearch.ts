import { z } from 'zod';

/**
 * Utility to call Perplexity's Sonar API for web search tasks with structured JSON responses
 * @param {string} content - The prompt/content string for the model.
 * @param {z.ZodTypeAny} zodSchema - The Zod schema to validate the response.
 * @param {string} model - The Perplexity model to use (defaults to sonar-pro)
 * @returns {Promise<any>} - The parsed and validated output from the model.
 */
export async function callPerplexityWithZodFormat<T extends z.ZodTypeAny>({
  content,
  zodSchema,
  model = 'sonar-pro',
  temperature = 0.2,
}: {
  content: string;
  zodSchema: T;
  model?: string;
  temperature?: number;
}): Promise<z.infer<T>> {
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that provides accurate, up-to-date information from the web. Always respond with valid JSON in the exact format requested.',
        },
        {
          role: 'user',
          content,
        },
      ],
      temperature,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Perplexity API error: ${response.status} ${response.statusText} - ${errorText}`,
    );
  }

  const data = await response.json();
  const content_text = data.choices?.[0]?.message?.content;

  if (content_text) {
    try {
      // Strip markdown code block syntax if present
      const cleanedText = content_text
        .replace(/^```json\s*/, '') // Remove opening ```json
        .replace(/\s*```$/, '') // Remove closing ```
        .trim();

      const parsed = JSON.parse(cleanedText);
      return zodSchema.parse(parsed);
    } catch (error) {
      throw new Error(
        `Failed to parse or validate Perplexity response: ${error}`,
      );
    }
  } else {
    throw new Error('No content returned from Perplexity');
  }
}

/**
 * Specialized function to find authoritative medical source URLs using Perplexity
 * @param {string} topic - The medical topic to find a source for
 * @returns {Promise<{ url: string }>} - The found URL or 'no_url' if none found
 */
export async function findMedicalSourceUrl(
  topic: string,
): Promise<{ url: string }> {
  const content = `Find the most recent and authoritative source URL for this medical topic. 

Prioritize sources in this order:
1. High-impact factor medical journals (Nature Medicine, NEJM, Lancet, JAMA, etc.)
2. Official medical society websites and guidelines
3. Reputable medical news sources (Medscape, WebMD professional sections)
4. Government health agency websites (CDC, FDA, NIH)

Return a JSON object with either:
- {"url": "https://actual-url-here"} if you find a reliable source
- {"url": "no_url"} if no authoritative source can be found

Topic: ${topic}`;

  return callPerplexityWithZodFormat({
    content,
    zodSchema: z.object({ url: z.string() }),
    model: 'sonar-pro',
    temperature: 0.1, // Very low temperature for factual URL finding
  });
}
