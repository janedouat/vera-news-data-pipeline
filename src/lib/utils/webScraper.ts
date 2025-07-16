import FireCrawlApp from '@mendable/firecrawl-js';
import { z } from 'zod';

// Constants
const MIN_CONTENT_LENGTH = 100;
const MAX_RETRIES = 3;
const BASE_RETRY_DELAY = 1000; // ms for normal errors
const RATE_LIMIT_BASE_DELAY = 5000; // ms for 429 errors - start with 5 seconds
const MAX_RETRY_DELAY = 30000; // ms - cap at 30 seconds

export interface ScrapedContent {
  title: string;
  content: string;
  success: boolean;
  error?: string;
  content_type: string;
  image_url?: string;
  image_description?: string;
  is_newsworthy?: boolean;
  has_enough_content?: boolean;
}

export const NEWS_TYPES = [
  'original_article',
  'article',
  'scientific_article',
  'original_investigation',
  'review',
  'clinical_trials',
  'research_letter',
  'case_report_case_series',
  'clinical_guidelines',
  'clinical_reviews_education',
  'viewpoint',
  'editorial',
  'opinion',
  'health_policy_report',
  'medical_news_special_reports',
  'visual_abstract',
  'podcast_video',
  'patient_page',
  'letter_to_the_editor',
  'correction_retraction',
  'other',
];

// Content types that should be processed (stricter filtering)
export const ACCEPTED_NEWS_TYPES = [
  'article',
  'scientific_article',
  'review',
  'clinical_trials',
  'clinical_guidelines',
  'original_article',
];

// Medical article schema for structured extraction
const MedicalArticleSchema = z.object({
  article: z.object({
    content_type: z.string(),
    title: z.string(),
    description: z.string().optional(),
    method: z.string().optional(),
    authors: z.string().optional(),
    journal: z.string().optional(),
    date: z.string().optional(),
    background: z.string().optional(),
    methods: z.string().optional(),
    findings: z.string().optional(),
    interpretation: z.string().optional(),
    introduction: z.string().optional(),
    outcomes: z.string().optional(),
    importance: z.string().optional(),
    results: z.string().optional(),
    'conclusions and relevance': z.string().optional(),
    'what this study adds': z.string().optional(),
    'HOW THIS STUDY MIGHT AFFECT RESEARCH, PRACTICE OR POLICY': z
      .string()
      .optional(),
    image_url: z.string().optional(),
    image_description: z.string().optional(),
    is_newsworthy: z.boolean().optional(),
    has_enough_content: z.boolean().optional(),
  }),
});

// URL validation function
function isValidUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
}

// Sleep function for retry delays
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Check if error is rate limiting
function isRateLimitError(error: any): boolean {
  return (
    error?.message?.includes('429') ||
    error?.statusCode === 429 ||
    error?.status === 429
  );
}

// Check if error is a server error that should be retried
function isRetryableServerError(error: any): boolean {
  const serverErrorCodes = [502, 503, 504]; // Bad Gateway, Service Unavailable, Gateway Timeout
  return serverErrorCodes.some(
    (code) =>
      error?.message?.includes(code.toString()) ||
      error?.statusCode === code ||
      error?.status === code,
  );
}

// Calculate retry delay with exponential backoff and jitter
function calculateRetryDelay(
  attempt: number,
  isRateLimit: boolean,
  isServerError: boolean,
): number {
  let baseDelay = BASE_RETRY_DELAY;

  if (isRateLimit) {
    baseDelay = RATE_LIMIT_BASE_DELAY; // 5 seconds for rate limits
  } else if (isServerError) {
    baseDelay = 3000; // 3 seconds for server errors
  }

  // Exponential backoff: delay doubles each attempt
  const exponentialDelay = baseDelay * Math.pow(2, attempt - 1);

  // Add jitter (random variation) to avoid thundering herd
  const jitter = Math.random() * 0.3 * exponentialDelay; // 0-30% jitter

  const totalDelay = exponentialDelay + jitter;

  // Cap at maximum delay
  return Math.min(totalDelay, MAX_RETRY_DELAY);
}

// Initialize Firecrawl app
const firecrawlApp = process.env.FIRECRAWL_API_KEY
  ? new FireCrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY })
  : null;

/**
 * Scrape medical articles using Firecrawl SDK with structured extraction
 */
export async function scrapeWithFirecrawlStructured(
  url: string,
): Promise<ScrapedContent> {
  try {
    if (!firecrawlApp) {
      throw new Error('Firecrawl API key not configured');
    }

    if (!isValidUrl(url)) {
      throw new Error('Invalid URL provided');
    }

    console.log(`🔥 Starting Firecrawl structured extraction for: ${url}`);

    let extractResult;
    let lastError;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        extractResult = await firecrawlApp.extract([url], {
          prompt: `Extract text from this medical article page which will be relevant for a medical news feed. Don't transform the text; only extract please. In content_type, return one of the following values: ${NEWS_TYPES.join()}. In is_newsworthy, return a boolean indicating whether the page has news that may be interesting for MDs. In has_enough_content, return a boolean indicating whether the page has enough content for me to write a summary article about it for a news feed.`,
          schema: MedicalArticleSchema,
        });
        break; // Success, exit retry loopJe
      } catch (error) {
        lastError = error;
        const isRateLimit = isRateLimitError(error);
        const isServerError = isRetryableServerError(error);

        console.log(`⚠️ Attempt ${attempt} failed:`, error);

        if (isRateLimit) {
          console.log(`🚫 Rate limit detected (429 error)`);
        }

        if (isServerError) {
          console.log(`🚫 Server error detected (502, 503, 504)`);
        }

        if (attempt < MAX_RETRIES) {
          const delay = calculateRetryDelay(
            attempt,
            isRateLimit,
            isServerError,
          );
          console.log(
            `⏳ Retrying in ${Math.round(delay)}ms... (attempt ${attempt + 1}/${MAX_RETRIES})`,
          );
          await sleep(delay);
        }
      }
    }

    if (!extractResult) {
      throw lastError || new Error('All retry attempts failed');
    }

    if (!extractResult || !extractResult.success || !extractResult.data) {
      throw new Error('No data returned from Firecrawl extraction');
    }

    const articleData = extractResult.data;

    if (!articleData || !articleData.article) {
      throw new Error('No article data found in extraction result');
    }

    const article = articleData.article;

    // Combine all extracted sections into structured content
    const sections = [
      article.title && `# ${article.title}`,
      article.authors && `**Authors:** ${article.authors}`,
      article.journal && `**Journal:** ${article.journal}`,
      article.date && `**Date:** ${article.date}`,
      article.description && `**Description:** ${article.description}`,
      article.background && `## Background\n${article.background}`,
      article.methods && `## Methods\n${article.methods}`,
      article.findings && `## Findings\n${article.findings}`,
      article.results && `## Results\n${article.results}`,
      article.interpretation && `## Interpretation\n${article.interpretation}`,
      article.outcomes && `## Outcomes\n${article.outcomes}`,
      article.importance && `## Importance\n${article.importance}`,
      article['conclusions and relevance'] &&
        `## Conclusions and Relevance\n${article['conclusions and relevance']}`,
      article['what this study adds'] &&
        `## What This Study Adds\n${article['what this study adds']}`,
      article['HOW THIS STUDY MIGHT AFFECT RESEARCH, PRACTICE OR POLICY'] &&
        `## How This Study Might Affect Research, Practice or Policy\n${article['HOW THIS STUDY MIGHT AFFECT RESEARCH, PRACTICE OR POLICY']}`,
    ].filter(Boolean);

    const content = sections.join('\n\n');

    return {
      title: article.title || '',
      content: content,
      success: true,
      content_type: article.content_type,
      image_url: article.image_url,
      image_description: article.image_description,
      has_enough_content: article.has_enough_content,
      is_newsworthy: article.is_newsworthy,
    };
  } catch (error) {
    return {
      title: '',
      content: '',
      success: false,
      error: error instanceof Error ? error.message : String(error),
      content_type: '',
    };
  }
}

/**
 * Check if content type should be processed
 */
function should_process_content_type(contentType: string): boolean {
  const normalized_type = contentType.toLowerCase().trim();
  return ACCEPTED_NEWS_TYPES.some(
    (accepted_type: string) => normalized_type === accepted_type.toLowerCase(),
  );
}

/**
 * Main scraping function using only Firecrawl structured extraction
 */
export async function scrapeWebContent(url: string): Promise<ScrapedContent> {
  console.log(`🔍 Scraping content from: ${url}`);

  // Use Firecrawl structured extraction
  if (process.env.FIRECRAWL_API_KEY) {
    console.log('🔥 Using Firecrawl structured extraction...');
    const firecrawlResult = await scrapeWithFirecrawlStructured(url);
    if (
      firecrawlResult.success &&
      firecrawlResult.content.length > MIN_CONTENT_LENGTH
    ) {
      // Check if content type should be processed
      if (!should_process_content_type(firecrawlResult.content_type)) {
        console.log(
          `⏭️ Skipping article with content type: ${firecrawlResult.content_type}`,
        );
        return {
          title: firecrawlResult.title,
          content: firecrawlResult.content,
          success: false,
          error: `Content type '${firecrawlResult.content_type}' is not in accepted types`,
          content_type: firecrawlResult.content_type,
        };
      }

      console.log(
        '✅ Successfully scraped with Firecrawl structured extraction',
      );
      return firecrawlResult;
    }
    console.log('⚠️ Firecrawl structured extraction failed');
    return firecrawlResult; // Return with error details
  }

  console.log('❌ No Firecrawl API key configured');
  return {
    title: '',
    content: '',
    success: false,
    error: 'No Firecrawl API key configured',
    content_type: '',
  };
}
