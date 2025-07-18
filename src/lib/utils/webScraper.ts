import FireCrawlApp from '@mendable/firecrawl-js';
import { z } from 'zod';

// Constants
const MIN_CONTENT_LENGTH = 100;
const MAX_RETRIES = 3;
const BASE_RETRY_DELAY = 1000; // ms for normal errors
const RATE_LIMIT_BASE_DELAY = 5000; // ms for 429 errors - start with 5 seconds
const MAX_RETRY_DELAY = 30000; // ms - cap at 30 seconds

export interface ScrapedContent {
  content: string;
  success: boolean;
  error?: string;
  content_type: string;
  image_url?: string;
  image_description?: string;
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
  'health_policy_report',
];

// Medical article schema for structured extraction
const MedicalArticleSchema = z.object({
  article: z.object({
    all_content: z.string(),
    image_url: z.string().optional(),
    image_description: z.string().optional(),
    content_type: z.string(),
  }),
});

// URL validation function
function isValidUrl(url: string): boolean {
  try {
    if (!url || typeof url !== 'string') {
      console.error(`❌ URL validation: Invalid type - ${typeof url}`);
      return false;
    }

    // Check for common URL issues
    if (url.trim() === '') {
      console.error(`❌ URL validation: Empty URL`);
      return false;
    }

    if (url.includes('javascript:') || url.includes('data:')) {
      console.error(`❌ URL validation: Invalid protocol - ${url}`);
      return false;
    }

    const parsedUrl = new URL(url);

    // Check for required components
    if (!parsedUrl.protocol || !parsedUrl.hostname) {
      console.error(`❌ URL validation: Missing protocol or hostname - ${url}`);
      return false;
    }

    // Only allow http and https protocols
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      console.error(
        `❌ URL validation: Invalid protocol - ${parsedUrl.protocol}`,
      );
      return false;
    }

    // Check for valid hostname
    if (parsedUrl.hostname === '' || parsedUrl.hostname.includes('..')) {
      console.error(
        `❌ URL validation: Invalid hostname - ${parsedUrl.hostname}`,
      );
      return false;
    }

    console.log(`✅ URL validation passed: ${url}`);
    return true;
  } catch (error) {
    console.error(`❌ URL validation failed: ${url}`, error);
    return false;
  }
}

// Sleep function for retry delays
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Check if error is rate limiting
function isRateLimitError(error: unknown): boolean {
  const err = error as {
    message?: string;
    statusCode?: number;
    status?: number;
  };
  return (
    err?.message?.includes('429') ||
    err?.statusCode === 429 ||
    err?.status === 429
  );
}

// Check if error is a server error that should be retried
function isRetryableServerError(error: unknown): boolean {
  const err = error as {
    message?: string;
    statusCode?: number;
    status?: number;
  };
  const serverErrorCodes = [502, 503, 504]; // Bad Gateway, Service Unavailable, Gateway Timeout
  return serverErrorCodes.some(
    (code) =>
      err?.message?.includes(code.toString()) ||
      err?.statusCode === code ||
      err?.status === code,
  );
}

// Check if error is a Firecrawl-specific error that should be retried
function isFirecrawlRetryableError(error: unknown): boolean {
  const err = error as {
    message?: string;
    statusCode?: number;
    status?: number;
  };
  const errorMessage = err?.message?.toLowerCase() || '';

  // Firecrawl-specific retryable errors
  const firecrawlRetryablePatterns = [
    'timeout',
    'connection',
    'network',
    'temporary',
    'unavailable',
    'service unavailable',
    'bad gateway',
    'gateway timeout',
    'internal server error',
    'too many requests',
    'rate limit',
  ];

  return firecrawlRetryablePatterns.some((pattern) =>
    errorMessage.includes(pattern),
  );
}

// Check if error is a Firecrawl validation error (should not retry)
function isFirecrawlValidationError(error: unknown): boolean {
  const err = error as {
    message?: string;
    statusCode?: number;
    status?: number;
  };
  const errorMessage = err?.message?.toLowerCase() || '';

  // Firecrawl validation errors that should not be retried
  const firecrawlValidationPatterns = [
    'all provided urls are invalid',
    'invalid url',
    'url not found',
    'access denied',
    'forbidden',
    'not found',
    '404',
    '403',
    '401',
  ];

  return firecrawlValidationPatterns.some((pattern) =>
    errorMessage.includes(pattern),
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

// Log Firecrawl configuration status
if (firecrawlApp) {
  console.log('✅ Firecrawl API key configured');
} else {
  console.error(
    '❌ Firecrawl API key not configured - FIRECRAWL_API_KEY environment variable is missing',
  );
}

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

    // Enhanced URL validation and logging
    console.log(`🔍 Validating URL: ${url}`);

    if (!url || typeof url !== 'string') {
      throw new Error(`Invalid URL type: ${typeof url}, value: ${url}`);
    }

    if (!isValidUrl(url)) {
      console.error(`❌ URL validation failed for: ${url}`);
      throw new Error(`Invalid URL format: ${url}`);
    }

    // Additional URL checks
    try {
      const parsedUrl = new URL(url);
      console.log(`✅ URL parsed successfully: ${parsedUrl.toString()}`);
      console.log(`   Protocol: ${parsedUrl.protocol}`);
      console.log(`   Hostname: ${parsedUrl.hostname}`);
      console.log(`   Pathname: ${parsedUrl.pathname}`);
    } catch (parseError) {
      console.error(`❌ URL parsing failed: ${url}`, parseError);
      throw new Error(`URL parsing failed: ${url}`);
    }

    console.log(`🔥 Starting Firecrawl structured extraction for: ${url}`);

    let extractResult;
    let lastError;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(
          `🔄 Firecrawl extraction attempt ${attempt}/${MAX_RETRIES} for: ${url}`,
        );
        extractResult = await firecrawlApp.extract([url], {
          prompt: `Extract text from this medical article page which will be relevant for a medical news feed. In particular, extract in full important sections like: introduction, conclusion, importance, discussion, results, etc. Don't transform the text; only extract please. In image_url, put the url of an image that is relevant to the news, not a generic logo etc. In image_description, also only extract text. In content_type, return one of the following values: ${NEWS_TYPES.join()}.`,
          schema: MedicalArticleSchema,
        });
        console.log(`✅ Firecrawl extraction successful on attempt ${attempt}`);
        break; // Success, exit retry loop
      } catch (error) {
        lastError = error;
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        console.error(
          `❌ Firecrawl extraction attempt ${attempt} failed:`,
          errorMessage,
        );

        const isRateLimit = isRateLimitError(error);
        const isServerError = isRetryableServerError(error);
        const isFirecrawlRetryable = isFirecrawlRetryableError(error);
        const isFirecrawlValidation = isFirecrawlValidationError(error);

        if (isFirecrawlValidation) {
          console.log(
            `🚫 Firecrawl validation error detected - will not retry`,
          );
          break; // Don't retry validation errors
        } else if (isRateLimit) {
          console.log(`🚫 Rate limit detected (429 error)`);
        } else if (isServerError) {
          console.log(`🚫 Server error detected (502, 503, 504)`);
        } else if (isFirecrawlRetryable) {
          console.log(`🔄 Firecrawl retryable error detected`);
        } else {
          console.log(`⚠️ Non-retryable error detected`);
        }

        if (attempt < MAX_RETRIES && !isFirecrawlValidation) {
          const delay = calculateRetryDelay(
            attempt,
            isRateLimit,
            isServerError,
          );
          console.log(
            `⏳ Retrying in ${Math.round(delay)}ms... (attempt ${attempt + 1}/${MAX_RETRIES})`,
          );
          await sleep(delay);
        } else if (isFirecrawlValidation) {
          console.log(`❌ Stopping retries due to validation error`);
          break;
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

    return {
      content: article.all_content,
      success: true,
      content_type: article.content_type,
      image_url: article.image_url,
      image_description: article.image_description,
    };
  } catch (error) {
    return {
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
    content: '',
    success: false,
    error: 'No Firecrawl API key configured',
    content_type: '',
  };
}
