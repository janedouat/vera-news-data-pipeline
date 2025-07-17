import { PhysicianSpecialty } from '@/types/taxonomy';
import { SubspecialtiesEnumMap } from '@/types/subspecialty_taxonomy';
import {
  getAnswer,
  getSpecialties,
  getSubspecialtyTags,
  getScore,
} from './topicProcessor';
import {
  ACCEPTED_NEWS_TYPES,
  scrapeWithFirecrawlStructured,
} from '@/lib/utils/webScraper';
import { removeRssRouteParameters } from '@/lib/utils/urlHelpers';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import {
  checkNewsItemExists,
  checkNewsItemExistsByDoi,
  insertNewsRow,
} from './api/newsApi';
import {
  RETRYABLE_ERROR_PATTERNS,
  RATE_LIMIT_ERROR_PATTERNS,
  VALIDATION_ERROR_PATTERNS,
} from '@/lib/config/apiConfig';
import { validateContentSufficiency } from '@/lib/modules/newsUpload/services/contentSufficiencyValidationService';
import { generateAndUploadImageWithRetry } from '@/lib/utils/imageGeneration';
import { generateSuggestedQuestions } from '@/lib/modules/newsUpload/services/newsSuggestedQuestions';

export type RssItem = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  doi?: string;
};

export type RssItemProcessResult = {
  status: 'success' | 'skipped' | 'error';
  reason?: string;
  processedCount?: number;
  errorCategory?: 'api_connection' | 'rate_limit' | 'validation' | 'unknown';
};

export type RssItemProcessOptions = {
  rssItem: RssItem;
  index: number;
  startDate: Date;
  feedGroup: string;
  processedCount: number;
  uploadId: string;
  traceId: string;
};

const ScientificPaperFilter = z.object({
  isScientificPaper: z.boolean(),
  reasoning: z.string(),
});

const keywords = {
  'meta-analysis': [
    'meta analysis',
    'méta-analyse',
    'meta-analysis',
    'méta analyse',
  ],
  'systematic review': ['systematic review', 'revue systématique'],
  'randomized controlled trial': [
    'randomized controlled trial',
    'essai randomisé',
    'rct',
  ],
};

const checkKeywords = (
  text: string | undefined,
  keywordSet: string[],
): boolean => {
  if (!text) return false;
  const lowerText = text.toLowerCase();

  return keywordSet.some((keyword) => lowerText.includes(keyword));
};

// Function to classify news type based on content
function classifyNewsType(content: string): string | undefined {
  const text = content.toLowerCase();

  // Check each news type in order of specificity (most specific first)
  for (const [newsType, keywordSet] of Object.entries(keywords)) {
    if (checkKeywords(text, keywordSet)) {
      return newsType;
    }
  }

  // Default fallback
  return undefined;
}

async function isScientificPaper(
  title: string,
  description: string,
  url: string,
): Promise<{ isScientificPaper: boolean; reasoning: string }> {
  const result = await generateObject({
    model: openai('gpt-4.1'),
    schema: ScientificPaperFilter,
    schemaName: 'ScientificPaperFilter',
    schemaDescription: 'Determines if content is a scientific paper or article',
    prompt: `Analyze the following RSS item and determine if it represents a scientific paper, research article, or academic publication. Consider factors like:
- Is it from a peer-reviewed journal?
- Does it describe original research, clinical trials, or systematic reviews?
- Is it a news article ABOUT research rather than the research itself?
- Is it an opinion piece, editorial, or commentary?
- Is it a press release or marketing material?

Keep these specific content types:
- Scientific articles
- Research articles
- Scientific reviews
- Clinical trials
- Clinical guidelines

Title: ${title}
Description: ${description}
URL: ${url}

Return true only if this is likely to be an actual scientific paper, research article, scientific review, clinical trial, or clinical guideline, not just news coverage of research.`,
    temperature: 0.3,
  });

  return result.object;
}

export async function processRssItem({
  rssItem,
  index,
  startDate,
  feedGroup,
  processedCount,
  uploadId,
  traceId,
}: RssItemProcessOptions): Promise<RssItemProcessResult> {
  try {
    const { title, link: url, pubDate, description, doi } = rssItem;

    // Skip if no URL or title
    if (!url || !title || !pubDate) {
      console.log(
        `Skipping RSS item ${index + 1} because missing URL or title or date`,
      );
      return {
        status: 'skipped',
        reason: 'missing_url_or_title_or_date',
      };
    }

    const articleDate = new Date(pubDate);

    // Check if date is too old
    if (articleDate < startDate) {
      return { status: 'skipped', reason: 'date_too_old' };
    }

    // Filter out non-scientific papers/articles
    const scientificPaperCheck = await isScientificPaper(
      title,
      description,
      url,
    );

    if (!scientificPaperCheck.isScientificPaper) {
      return {
        status: 'skipped',
        reason: 'not_scientific_paper',
      };
    }

    // Use the RSS item title as the topic for processing
    const topic = title;

    // Remove RSS route parameters from URL
    console.log(`🔗 Original URL: ${url}`);
    const cleanedUrl = removeRssRouteParameters(url);
    console.log(`🧹 Cleaned URL: ${cleanedUrl}`);

    // Check if any RSS parameters remain in the URL
    if (cleanedUrl.toLowerCase().includes('rss')) {
      console.log(`⚠️ RSS still found in cleaned URL: ${cleanedUrl}`);
    }

    // Additional URL validation before scraping
    if (!cleanedUrl || cleanedUrl.trim() === '') {
      console.error(`❌ Empty or invalid cleaned URL for item: ${title}`);
      return {
        status: 'error',
        reason: 'invalid_cleaned_url',
        errorCategory: 'validation',
      };
    }

    // Check if this item is already in Supabase before expensive operations
    const date = articleDate.toISOString().slice(0, 10); // Get YYYY-MM-DD format
    const itemExists = await checkNewsItemExists(cleanedUrl, date);

    if (itemExists) {
      console.log(
        `Skipping RSS item ${index + 1} because it's already in Supabase: ${title}`,
      );
      return {
        status: 'skipped',
        reason: 'already_in_supabase',
      };
    }

    // Check if this item is already in Supabase by DOI (if DOI is available)
    if (doi) {
      const itemExistsByDoi = await checkNewsItemExistsByDoi(doi);
      if (itemExistsByDoi) {
        console.log(
          `Skipping RSS item ${index + 1} because it's already in Supabase by DOI: ${doi}`,
        );
        return {
          status: 'skipped',
          reason: 'already_in_supabase',
        };
      }
    }

    console.log(`🌐 Starting web scraping for: ${cleanedUrl}`);
    const scrapedContent = await scrapeWithFirecrawlStructured(cleanedUrl);

    if (
      !!scrapedContent.content_type &&
      !ACCEPTED_NEWS_TYPES.includes(scrapedContent.content_type)
    ) {
      return {
        status: 'skipped',
        reason: 'not_accepted_news_type',
      };
    }

    const contentValidation = await validateContentSufficiency(
      scrapedContent.content,
    );

    if (!contentValidation.has_sufficient_content) {
      return {
        status: 'skipped',
        reason: 'not_enough_content',
      };
    }

    // Classify news type based on content
    const detectedNewsType = classifyNewsType(scrapedContent.content);
    console.log(
      `📊 Detected news type: ${detectedNewsType} for article: ${title}`,
    );

    // Process the item through the same pipeline as processOneOutput
    const { answer } = await getAnswer({
      topic,
      url: cleanedUrl,
      text: scrapedContent.content,
    });

    const stringifiedAnswer = JSON.stringify(answer);

    const { specialties } = await getSpecialties({
      answer: stringifiedAnswer,
    });

    // Get all subspecialties for found specialties
    const allSubspecialties = specialties
      .map(
        (specialty) =>
          SubspecialtiesEnumMap?.[specialty as PhysicianSpecialty] || [],
      )
      .flat();

    // Get subspecialty tags from the combined list
    const { tags: allTags } = await getSubspecialtyTags({
      answer: stringifiedAnswer,
      tags: allSubspecialties,
    });

    // Remove duplicates
    const tags = [...new Set(allTags)];

    // Compute scores for each specialty found
    const specialtyScores: Record<string, number> = {};
    for (const foundSpecialty of specialties) {
      const { score } = await getScore({
        answer: stringifiedAnswer,
        url: cleanedUrl,
        specialty: foundSpecialty as PhysicianSpecialty,
      });
      specialtyScores[foundSpecialty] = score;
    }
    // Use the highest score as the main score
    const score = Math.max(...Object.values(specialtyScores));

    const extractedImageUrl = scrapedContent.image_url ?? undefined;
    const extractedImageDescription =
      scrapedContent.image_description ?? undefined;

    const { imageUrl } = await generateAndUploadImageWithRetry({
      prompt: `Can you create an illustration for the article '${answer.title}. The illustration contains exactly three simple icons representing key concepts of the article. The background is monochrome. The colors should mostly be grey blue white and black and the turquoise #1b779b. No text`,
      size: '1536x1024',
      quality: 'medium',
      model: 'gpt-image-1',
      bucketName: 'news-images',
    });

    const { suggestedQuestions } = await generateSuggestedQuestions({
      answer: stringifiedAnswer,
      title: answer.title,
      parentTraceId: traceId,
    });

    await insertNewsRow({
      news_date: date,
      url: cleanedUrl,
      specialties,
      tags,
      elements: answer,
      score,
      upload_id: uploadId,
      is_visible_in_prod: false,
      source: feedGroup,
      scores: specialtyScores,
      extracted_image_url: extractedImageUrl,
      extracted_image_description: extractedImageDescription,
      imageUrl,
      news_type: detectedNewsType,
      doi,
      news_date_timestamp: new Date(date).toISOString(),
      suggested_questions: suggestedQuestions,
    });

    console.log(`Successfully uploaded RSS item: ${title}`);

    return { status: 'success', processedCount: processedCount + 1 };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error processing RSS item ${index}:`, error);

    // Categorize errors for better handling using imported patterns
    const isApiError = RETRYABLE_ERROR_PATTERNS.some((pattern) =>
      errorMessage.toLowerCase().includes(pattern.toLowerCase()),
    );

    const isRateLimitError = RATE_LIMIT_ERROR_PATTERNS.some((pattern) =>
      errorMessage.toLowerCase().includes(pattern.toLowerCase()),
    );

    const isValidationError = VALIDATION_ERROR_PATTERNS.some((pattern) =>
      errorMessage.toLowerCase().includes(pattern.toLowerCase()),
    );

    let errorCategory:
      | 'api_connection'
      | 'rate_limit'
      | 'validation'
      | 'unknown' = 'unknown';
    if (isApiError) errorCategory = 'api_connection';
    else if (isRateLimitError) errorCategory = 'rate_limit';
    else if (isValidationError) errorCategory = 'validation';

    return {
      status: 'error',
      reason: errorMessage,
      errorCategory,
    };
  }
}
