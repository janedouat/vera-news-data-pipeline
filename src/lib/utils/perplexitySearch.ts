import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Simple delay function for throttling
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
  model = 'llama-3.1-sonar-large-128k-online',
  temperature = 0.1,
}: {
  content: string;
  zodSchema: T;
  model?: string;
  temperature?: number;
}): Promise<z.infer<T>> {
  const maxRetries = 3;
  const baseDelay = 1000; // 1 second base delay

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log({ attempt });
    try {
      // Add exponential backoff delay for retries
      if (attempt > 1) {
        const retryDelay = baseDelay * Math.pow(2, attempt - 1);
        console.log(
          `⏳ Retrying Perplexity API call (attempt ${attempt}/${maxRetries}) after ${retryDelay}ms delay`,
        );
        await delay(retryDelay);
      }

      const response = await fetch(
        'https://api.perplexity.ai/chat/completions',
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          },
          body: JSON.stringify({
            search_mode: 'web',
            reasoning_effort: 'medium',
            temperature,
            top_p: 0.9,
            return_images: false,
            return_related_questions: false,
            top_k: 0,
            stream: false,
            presence_penalty: 0,
            frequency_penalty: 0,
            web_search_options: {
              search_context_size: 'high',
            },
            model,
            messages: [
              {
                role: 'user',
                content,
              },
            ],
            response_format: {
              type: 'json_schema',
              json_schema: { schema: zodToJsonSchema(zodSchema) },
            },
          }),
          signal: AbortSignal.timeout(30000), // 30 second timeout
        },
      );

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
          console.error('❌ Perplexity parse error:', error);
          throw new Error(
            `Failed to parse or validate Perplexity response: ${error}`,
          );
        }
      } else {
        throw new Error('No content returned from Perplexity');
      }
    } catch (fetchError) {
      const errorMessage = (fetchError as Error).message;

      // Check if it's a retryable error (timeout, connection issues)
      const isRetryableError =
        errorMessage.includes('Connect Timeout') ||
        errorMessage.includes('fetch failed') ||
        errorMessage.includes('ECONNRESET') ||
        errorMessage.includes('ETIMEDOUT') ||
        errorMessage.includes('TimeoutError');

      if (attempt === maxRetries || !isRetryableError) {
        console.error(`❌ Perplexity API error (final): ${errorMessage}`);
        throw fetchError;
      }

      console.warn(
        `⚠️ Perplexity API error (attempt ${attempt}/${maxRetries}): ${errorMessage}`,
      );
    }
  }

  throw new Error('Perplexity API call failed after all retries');
}

/**
 * Specialized function to find authoritative medical source URLs using Perplexity
 * @param {string} topic - The medical topic to find a source for
 * @returns {Promise<{ url: string }>} - The found URL or 'no_url' if none found
 */
export async function findMedicalSourceUrl(
  topic: string,
): Promise<{ url: string }> {
  const content = `Find the most recent and authoritative source URL for this medical topic: ${topic}. 

ONLY search for sources from these specific journals and websites:
- New England Journal of Medicine (nejm.org)
- The Lancet (thelancet.com)
- JAMA Network (jamanetwork.com)
- BMJ (bmj.com)
- CHEST Journal (chestnet.org)
- American Journal of Respiratory and Critical Care Medicine (atsjournals.org)
- Nature Medicine (nature.com)
- CDC (cdc.gov)
- FDA (fda.gov)

Do NOT include:
- PubMed links (pubmed.ncbi.nlm.nih.gov)
- General medical news sites
- Non-peer reviewed sources
- Preprint servers

Return a JSON object with either:
- {"url": "https://actual-url-here"} if you find a source from the above journals/websites
- {"url": "no_url"} if no source from these specific journals can be found`;

  return callPerplexityWithZodFormat({
    content,
    zodSchema: z.object({ url: z.string() }),
    model: 'sonar-pro',
    temperature: 0.1, // Very low temperature for factual URL finding
  });
}
