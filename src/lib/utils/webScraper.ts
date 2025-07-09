import FireCrawlApp from '@mendable/firecrawl-js';
import { z } from 'zod';

// Constants
const MIN_CONTENT_LENGTH = 100;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // ms

export interface ScrapedContent {
  title: string;
  content: string;
  success: boolean;
  error?: string;
}

// Medical article schema for structured extraction
const MedicalArticleSchema = z.object({
  article: z.object({
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
          prompt:
            "Extract text from this medical article page which will be relevant for a medical news feed. Don't transform the text; only extract please.",
          schema: MedicalArticleSchema,
        });
        break; // Success, exit retry loop
      } catch (error) {
        lastError = error;
        console.log(`⚠️ Attempt ${attempt} failed:`, error);

        if (attempt < MAX_RETRIES) {
          console.log(`⏳ Retrying in ${RETRY_DELAY}ms...`);
          await sleep(RETRY_DELAY);
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
    };
  } catch (error) {
    return {
      title: '',
      content: '',
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
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
  };
}
