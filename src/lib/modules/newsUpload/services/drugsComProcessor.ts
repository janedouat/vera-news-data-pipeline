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
import { getAnswer } from '../topicProcessor';

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

  const { title, pubDate, doi } = rssItem;

  try {
    // Basic validation
    if (!title || !pubDate) {
      console.log(
        `Skipping drugs.com RSS item ${index + 1} because missing title or date`,
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
    console.log(
      `🔍 Extracting FDA and Press Release URLs from title: ${title}`,
    );
    const { press_release_url, fda_url } = await getFdaUrls(title);

    console.log(`✅ Successfully extracted URLs:`, press_release_url, fda_url);

    // Step 2: Try to scrape press release URL first, then FDA URL
    let scrapedContent: ScrapedContent | undefined;
    let finalUrl: string = '';
    let source: string = '';

    if (press_release_url) {
      console.log(
        `🔗 Trying to scrape press release URL: ${press_release_url}`,
      );
      const cleanedUrl = removeRssRouteParameters(press_release_url);
      scrapedContent = await scrapeWithFirecrawlStructured(cleanedUrl);

      if (scrapedContent.success) {
        console.log(`✅ Successfully scraped press release URL`);
        finalUrl = cleanedUrl;
        source = 'press_release';
      } else {
        console.log(
          `❌ Press release scraping failed: ${scrapedContent.error}`,
        );
      }
    }

    // If press release failed or doesn't exist, try FDA URL
    if (!scrapedContent?.success && fda_url) {
      console.log(`🔗 Trying to scrape FDA URL: ${fda_url}`);
      const cleanedUrl = removeRssRouteParameters(fda_url);
      scrapedContent = await scrapeWithFirecrawlStructured(cleanedUrl);

      if (scrapedContent.success) {
        console.log(`✅ Successfully scraped FDA URL`);
        finalUrl = cleanedUrl;
        source = 'fda_official';
      } else {
        console.log(`❌ FDA scraping failed: ${scrapedContent.error}`);
      }
    }

    // Check if we got any successful content
    if (!scrapedContent?.success) {
      console.log(
        `❌ Both press release and FDA scraping failed for: ${title}`,
      );
      return {
        status: 'error',
        reason: 'scraping_failed',
        errorCategory: 'api_connection',
      };
    }

    console.log(`📝 Using content from: ${source}`);

    // Step: Topic Processing
    const { answer } = await getAnswer({
      topic: title,
      text: scrapedContent.content,
    });

    // Step 3: Use the common content processing pipeline
    console.log(`🔄 Processing content through common pipeline`);
    return await processScrapedContent({
      scrapedContent: scrapedContent!,
      answer,
      url: finalUrl,
      date,
      uploadId,
      feedGroup,
      traceId,
      doi,
      references: rssItem.reference ? [rssItem.reference] : undefined,
      detectedNewsType: 'fda_announcement',
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
