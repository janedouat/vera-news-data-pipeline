import {
  scrapeWithFirecrawlStructured,
  ScrapedContent,
} from '@/lib/utils/webScraper';
import { getFdaUrls } from './getFdaUrls';
import {
  processScrapedContent,
  ContentProcessorResult,
} from './contentProcessor';
import { removeRssRouteParameters } from '@/lib/utils/urlHelpers';
import { RssItem } from '../rssItemProcessor';

export interface DrugsComProcessorInput {
  rssItem: RssItem;
  index: number;
  startDate: Date;
  endDate?: Date;
  feedGroup: string;
  processedCount: number;
  uploadId: string;
  traceId: string;
}

/**
 * Specialized processor for drugs.com RSS items
 * 1. Extracts FDA/press release URLs from title using getFdaUrls
 * 2. Scrapes both URLs with Firecrawl
 * 3. Combines content and uses common processing pipeline
 */
export async function processDrugsComRssItem(
  input: DrugsComProcessorInput,
): Promise<ContentProcessorResult> {
  const { rssItem, index, startDate, endDate, feedGroup, uploadId, traceId } =
    input;
  const { title, link: originalUrl, pubDate, description, doi } = rssItem;

  try {
    // Basic validation
    if (!originalUrl || !title || !pubDate) {
      console.log(
        `Skipping drugs.com RSS item ${index + 1} because missing URL or title or date`,
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

    // Check if date is too new (if endDate is provided)
    if (endDate && articleDate > endDate) {
      return { status: 'skipped', reason: 'date_too_new' };
    }

    const date = articleDate.toISOString().slice(0, 10); // Get YYYY-MM-DD format

    console.log(`🏥 Processing drugs.com RSS item: ${title}`);

    // Step 1: Extract FDA and press release URLs from title
    console.log(`🔍 Extracting FDA URLs from title: ${title}`);
    const fdaUrlResult = await getFdaUrls(title);

    if (!fdaUrlResult.success) {
      console.log(`⚠️ Failed to extract FDA URLs: ${fdaUrlResult.error}`);
      // Fall back to processing the original RSS URL
      return await processSingleUrl({
        url: originalUrl,
        title,
        date,
        uploadId,
        feedGroup,
        traceId,
        doi,
        references: rssItem.reference ? [rssItem.reference] : undefined,
        source: 'original_rss',
      });
    }

    console.log(`✅ Successfully extracted URLs:`, fdaUrlResult);

    // Step 2: Scrape both URLs (press release and FDA)
    const scrapingPromises: Promise<{
      content: ScrapedContent;
      source: string;
      url: string;
    }>[] = [];

    // Add press release URL
    if (fdaUrlResult.press_release_url) {
      scrapingPromises.push(
        scrapeWithFirecrawlStructured(fdaUrlResult.press_release_url).then(
          (content) => ({
            content,
            source: 'press_release',
            url: fdaUrlResult.press_release_url!,
          }),
        ),
      );
    }

    // Add FDA URL
    if (fdaUrlResult.fda_url) {
      scrapingPromises.push(
        scrapeWithFirecrawlStructured(fdaUrlResult.fda_url).then((content) => ({
          content,
          source: 'fda_official',
          url: fdaUrlResult.fda_url!,
        })),
      );
    }

    // Also scrape the original RSS URL as fallback
    const cleanedOriginalUrl = removeRssRouteParameters(originalUrl);
    scrapingPromises.push(
      scrapeWithFirecrawlStructured(cleanedOriginalUrl).then((content) => ({
        content,
        source: 'original_rss',
        url: cleanedOriginalUrl,
      })),
    );

    // Execute all scraping in parallel
    console.log(
      `🌐 Starting parallel scraping of ${scrapingPromises.length} URLs`,
    );
    const scrapingResults = await Promise.allSettled(scrapingPromises);

    // Step 3: Process and combine scraped content
    const successfulScrapes = scrapingResults
      .map((result, index) => {
        if (result.status === 'fulfilled' && result.value.content.success) {
          return result.value;
        } else {
          console.log(
            `❌ Scraping failed for source ${index}:`,
            result.status === 'rejected'
              ? result.reason
              : result.value.content.error,
          );
          return null;
        }
      })
      .filter(Boolean) as Array<{
      content: ScrapedContent;
      source: string;
      url: string;
    }>;

    if (successfulScrapes.length === 0) {
      console.log(`❌ All scraping attempts failed for: ${title}`);
      return {
        status: 'error',
        reason: 'all_scraping_failed',
        errorCategory: 'api_connection',
      };
    }

    // Step 4: Prioritize and combine content
    // Priority: FDA official > Press release > Original RSS
    const priorityOrder = ['fda_official', 'press_release', 'original_rss'];
    const sortedScrapes = successfulScrapes.sort((a, b) => {
      const aIndex = priorityOrder.indexOf(a.source);
      const bIndex = priorityOrder.indexOf(b.source);
      return aIndex - bIndex;
    });

    const primaryScrape = sortedScrapes[0];
    console.log(
      `📋 Using primary content from: ${primaryScrape.source} (${primaryScrape.url})`,
    );

    // Combine content from all sources for richer context
    const combinedContent = sortedScrapes
      .map(
        (scrape) =>
          `[${scrape.source.toUpperCase()}]\n${scrape.content.content}`,
      )
      .join('\n\n---\n\n');

    const combinedScrapedContent: ScrapedContent = {
      ...primaryScrape.content,
      content: combinedContent,
    };

    // Step 5: Use the common content processing pipeline
    console.log(`🔄 Processing combined content through common pipeline`);
    return await processScrapedContent({
      scrapedContent: combinedScrapedContent,
      title,
      url: primaryScrape.url,
      date,
      uploadId,
      feedGroup,
      traceId,
      doi,
      references: rssItem.reference ? [rssItem.reference] : undefined,
      detectedNewsType: 'fda_announcement', // Set specific news type for drugs.com content
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`❌ Error processing drugs.com RSS item ${index}:`, error);

    return {
      status: 'error',
      reason: errorMessage,
      errorCategory: 'unknown',
    };
  }
}

/**
 * Helper function to process a single URL using the common pipeline
 */
async function processSingleUrl({
  url,
  title,
  date,
  uploadId,
  feedGroup,
  traceId,
  doi,
  references,
  source,
}: {
  url: string;
  title: string;
  date: string;
  uploadId: string;
  feedGroup: string;
  traceId: string;
  doi?: string;
  references?: any[];
  source: string;
}): Promise<ContentProcessorResult> {
  console.log(`🌐 Scraping single URL (${source}): ${url}`);

  const cleanedUrl = removeRssRouteParameters(url);
  const scrapedContent = await scrapeWithFirecrawlStructured(cleanedUrl);

  if (!scrapedContent.success) {
    return {
      status: 'error',
      reason: `Scraping failed: ${scrapedContent.error}`,
      errorCategory: 'api_connection',
    };
  }

  // Add source annotation to content
  const annotatedContent: ScrapedContent = {
    ...scrapedContent,
    content: `[${source.toUpperCase()}]\n${scrapedContent.content}`,
  };

  return await processScrapedContent({
    scrapedContent: annotatedContent,
    title,
    url: cleanedUrl,
    date,
    uploadId,
    feedGroup,
    traceId,
    doi,
    references,
    detectedNewsType:
      source === 'fda_official' ? 'fda_announcement' : undefined,
  });
}
