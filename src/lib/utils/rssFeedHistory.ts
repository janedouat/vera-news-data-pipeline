import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import {
  RssFeedHistory,
  RssFeedItemHistory,
  RssFeedItemCheck,
} from '@/types/rss-feed-history';

// Initialize Supabase client
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

/**
 * Check if an RSS feed has been processed on a specific date
 */
export async function checkFeedProcessedToday(
  feedUrl: string,
  processingDate: string,
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('rss_feed_history')
      .select('id')
      .eq('feed_url', feedUrl)
      .eq('processed_date', processingDate)
      .eq('processing_status', 'success')
      .limit(1);

    if (error) {
      console.error('Error checking feed history:', error);
      return false;
    }

    return data && data.length > 0;
  } catch (error) {
    console.error('Error checking feed history:', error);
    return false;
  }
}

/**
 * Check if specific RSS items have been processed recently
 */
export async function checkItemsProcessedRecently(
  items: { url: string; pubDate: string }[],
  feedUrl: string,
  daysPast: number = 7,
): Promise<Set<string>> {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysPast);
    const cutoffDateString = cutoffDate.toISOString().split('T')[0];

    const itemUrls = items.map((item) => item.url);

    const { data, error } = await supabase
      .from('rss_feed_item_history')
      .select('item_url')
      .in('item_url', itemUrls)
      .gte('created_at', cutoffDateString)
      .eq('processing_status', 'processed');

    if (error) {
      console.error('Error checking item history:', error);
      return new Set();
    }

    return new Set(data?.map((item) => item.item_url) || []);
  } catch (error) {
    console.error('Error checking item history:', error);
    return new Set();
  }
}

/**
 * Start a new RSS feed processing session
 */
export async function startFeedProcessing(
  feedUrl: string,
  feedGroup: string,
  feedName: string,
  processingDate: string,
  startDate: string,
  uploadId: string,
): Promise<string | null> {
  try {
    const feedHistoryId = crypto.randomUUID();

    const { error } = await supabase.from('rss_feed_history').insert({
      id: feedHistoryId,
      feed_url: feedUrl,
      feed_group: feedGroup,
      feed_name: feedName,
      processed_date: processingDate,
      processed_at: new Date().toISOString(),
      items_found: 0,
      items_processed: 0,
      items_skipped: 0,
      start_date: startDate,
      upload_id: uploadId,
      processing_status: 'partial',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Error starting feed processing:', error);
      return null;
    }

    return feedHistoryId;
  } catch (error) {
    console.error('Error starting feed processing:', error);
    return null;
  }
}

/**
 * Record an RSS item processing result
 */
export async function recordItemProcessing(
  feedHistoryId: string,
  itemUrl: string,
  itemTitle: string,
  itemPubDate: string,
  processingStatus: 'processed' | 'skipped' | 'failed',
  skipReason?: string,
  newsId?: string,
): Promise<void> {
  try {
    const { error } = await supabase.from('rss_feed_item_history').insert({
      id: crypto.randomUUID(),
      feed_history_id: feedHistoryId,
      item_url: itemUrl,
      item_title: itemTitle,
      item_pub_date: itemPubDate,
      processing_status: processingStatus,
      skip_reason: skipReason,
      news_id: newsId,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Error recording item processing:', error);
    }
  } catch (error) {
    console.error('Error recording item processing:', error);
  }
}

/**
 * Complete RSS feed processing session
 */
export async function completeFeedProcessing(
  feedHistoryId: string,
  itemsFound: number,
  itemsProcessed: number,
  itemsSkipped: number,
  processingStatus: 'success' | 'partial' | 'failed',
  errorMessage?: string,
  lastItemDate?: string,
): Promise<void> {
  try {
    const { error } = await supabase
      .from('rss_feed_history')
      .update({
        items_found: itemsFound,
        items_processed: itemsProcessed,
        items_skipped: itemsSkipped,
        processing_status: processingStatus,
        error_message: errorMessage,
        last_item_date: lastItemDate,
        updated_at: new Date().toISOString(),
      })
      .eq('id', feedHistoryId);

    if (error) {
      console.error('Error completing feed processing:', error);
    }
  } catch (error) {
    console.error('Error completing feed processing:', error);
  }
}

/**
 * Get RSS feed processing history
 */
export async function getFeedProcessingHistory(
  feedUrl?: string,
  days?: number,
): Promise<RssFeedHistory[]> {
  try {
    let query = supabase
      .from('rss_feed_history')
      .select('*')
      .order('processed_at', { ascending: false });

    if (feedUrl) {
      query = query.eq('feed_url', feedUrl);
    }

    if (days) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      query = query.gte('processed_at', cutoffDate.toISOString());
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error getting feed history:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error getting feed history:', error);
    return [];
  }
}

/**
 * Clean up old RSS feed history (older than specified days)
 */
export async function cleanupOldHistory(
  daysToKeep: number = 30,
): Promise<void> {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    const cutoffDateString = cutoffDate.toISOString();

    // First delete item history
    const { error: itemError } = await supabase
      .from('rss_feed_item_history')
      .delete()
      .lt('created_at', cutoffDateString);

    if (itemError) {
      console.error('Error cleaning up item history:', itemError);
    }

    // Then delete feed history
    const { error: feedError } = await supabase
      .from('rss_feed_history')
      .delete()
      .lt('created_at', cutoffDateString);

    if (feedError) {
      console.error('Error cleaning up feed history:', feedError);
    }
  } catch (error) {
    console.error('Error cleaning up old history:', error);
  }
}
