import { scrapeWithFirecrawlStructured } from '@/lib/utils/webScraper';
import {
  processScrapedContent,
  ContentProcessorResult,
} from './contentProcessor';
import { removeRssRouteParameters } from '@/lib/utils/urlHelpers';
import { RssItem } from '../rssItemProcessor';
import { getAnswer } from '../topicProcessor';
import { generateUniqueNewsId, checkNewsItemExist } from '../api/newsApi';

export interface NewContentTypeProcessorInput {
  rssItem: RssItem;
  index: number;
  startDate: Date;
  endDate?: Date;
  source?: string;
  processedCount: number;
  uploadId: string;
  traceId: string;
}

/**
 * Specialized processor for [NEW_CONTENT_TYPE] RSS items
 * 1. Extracts relevant URLs from title/description using getNewContentTypeUrls
 * 2. Scrapes multiple URLs with Firecrawl in priority order
 * 3. Combines content and uses common processing pipeline
 */
export async function processNewContentTypeRssItem(
  input: NewContentTypeProcessorInput,
): Promise<ContentProcessorResult> {
  const { rssItem, index, startDate, endDate, source, uploadId, traceId } =
    input;

  const { description, pubDate, title, link } = rssItem;

  try {
    // Basic validation
    if (!description || !title || !pubDate) {
      console.log(
        `Skipping ${source} RSS item ${index + 1} because missing title or date`,
      );
      return {
        status: 'skipped',
        reason: 'missing_description_or_date',
      };
    }

    const topic = `${title} ${description}`;

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

    const uniqueId = generateUniqueNewsId({ url: link, newsDate: date });

    console.log(`🔑 Generated unique ID: ${uniqueId}`);

    // Check if item already exists
    const itemExists = await checkNewsItemExist(uniqueId);

    if (itemExists) {
      console.log(
        `Skipping ${source} RSS item ${index + 1} because it's already in Supabase (unique_id: ${uniqueId}): ${title}`,
      );
      return {
        status: 'skipped',
        reason: 'already_in_supabase',
      };
    }
    console.log(`🔗 Trying to scrape primary URL: ${link}`);
    const cleanedUrl = removeRssRouteParameters(link);
    const scrapedContent = await scrapeWithFirecrawlStructured(cleanedUrl);

    // Step: Topic Processing
    const { answer } = await getAnswer({
      topic,
      text: scrapedContent.content,
    });

    // Step 3: Use the common content processing pipeline
    console.log(`🔄 Processing content through common pipeline`);
    return await processScrapedContent({
      scrapedContent: scrapedContent!,
      answer,
      url: link,
      date,
      uploadId,
      traceId,
      references: rssItem.reference ? [rssItem.reference] : undefined,
      detectedNewsType: 'new_content_type_announcement', // TODO: Update this
      source,
      uniqueId,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`❌ Error processing ${source} RSS item ${index}:`, error);

    return {
      status: 'error',
      reason: errorMessage,
      errorCategory: 'unknown',
    };
  }
}
