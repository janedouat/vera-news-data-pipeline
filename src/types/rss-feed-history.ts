export interface RssFeedHistory {
  id: string;
  feed_url: string;
  feed_group: string;
  feed_name: string;
  processed_date: string; // YYYY-MM-DD format
  processed_at: string; // ISO timestamp
  items_found: number;
  items_processed: number;
  items_skipped: number;
  start_date: string; // The startDate parameter used
  upload_id: string;
  processing_status: 'success' | 'partial' | 'failed';
  error_message?: string;
  last_item_date?: string; // Date of the most recent item processed
  created_at: string;
  updated_at: string;
}

export interface RssFeedItemHistory {
  id: string;
  feed_history_id: string;
  item_url: string;
  item_title: string;
  item_pub_date: string;
  processing_status: 'processed' | 'skipped' | 'failed';
  skip_reason?: string;
  news_id?: string; // Reference to the news table if processed
  created_at: string;
}

// For checking if an item was already processed
export interface RssFeedItemCheck {
  feed_url: string;
  item_url: string;
  item_pub_date: string;
  processed_date: string;
}
