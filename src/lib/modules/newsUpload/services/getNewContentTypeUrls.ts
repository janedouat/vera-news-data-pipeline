import { callOpenAIWithZodFormat } from '@/lib/utils/openaiWebSearch';
import { z } from 'zod';

// Define the schema for URL extraction response
const NewContentTypeUrlsSchema = z.object({
  primary_url: z.string().nullable(),
  secondary_url: z.string().nullable(),
  reasoning: z.string(),
});

export type NewContentTypeUrlsResult = z.infer<typeof NewContentTypeUrlsSchema>;

/**
 * Extracts relevant URLs from content for new content type processing
 *
 * TODO: Replace this with your specific URL extraction logic
 * Examples:
 * - Extract company press release + SEC filing URLs
 * - Extract original research paper + journal announcement URLs
 * - Extract government announcement + supporting document URLs
 */
export async function getNewContentTypeUrls(
  content: string,
): Promise<NewContentTypeUrlsResult> {
  try {
    const result = await callOpenAIWithZodFormat({
      content: `
Analyze this content and extract two types of URLs if they exist:

PRIMARY URL: [Describe what you're looking for, e.g., "company press release", "original research paper", "government announcement"]
SECONDARY URL: [Describe what you're looking for, e.g., "SEC filing", "journal page", "supporting documentation"]

Content to analyze:
"${content}"

Instructions:
1. Look for mentions of specific URLs, websites, or document references
2. The primary URL should be the main source of detailed information
3. The secondary URL should be a supporting or official document
4. Only return valid, complete URLs
5. If no relevant URLs are found, return null for that field
6. Provide reasoning for your choices

Examples of what to look for:
- Direct URL mentions: "https://example.com/announcement"
- Company/organization references: "announced on CompanyName.com"
- Document references: "SEC filing available at..."
- Press release indicators: "press release issued by..."

Return null if no relevant URLs are found.`,
      zodSchema: NewContentTypeUrlsSchema,
      model: 'gpt-4',
      temperature: 0.1,
    });

    console.log(`🔍 URL extraction result:`, result);
    return result;
  } catch (error) {
    console.error('Error extracting URLs:', error);
    return {
      primary_url: null,
      secondary_url: null,
      reasoning: `Error during URL extraction: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}
