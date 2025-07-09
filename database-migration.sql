-- Create RSS feed history table
CREATE TABLE IF NOT EXISTS rss_feed_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    feed_url TEXT NOT NULL,
    feed_group TEXT NOT NULL,
    feed_name TEXT NOT NULL,
    processed_date DATE NOT NULL,
    processed_at TIMESTAMP WITH TIME ZONE NOT NULL,
    items_found INTEGER NOT NULL DEFAULT 0,
    items_processed INTEGER NOT NULL DEFAULT 0,
    items_skipped INTEGER NOT NULL DEFAULT 0,
    start_date DATE NOT NULL,
    upload_id TEXT NOT NULL,
    processing_status TEXT NOT NULL CHECK (processing_status IN ('success', 'partial', 'failed')),
    error_message TEXT,
    last_item_date DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create RSS feed item history table
CREATE TABLE IF NOT EXISTS rss_feed_item_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    feed_history_id UUID NOT NULL REFERENCES rss_feed_history(id) ON DELETE CASCADE,
    item_url TEXT NOT NULL,
    item_title TEXT NOT NULL,
    item_pub_date DATE NOT NULL,
    processing_status TEXT NOT NULL CHECK (processing_status IN ('processed', 'skipped', 'failed')),
    skip_reason TEXT,
    news_id UUID REFERENCES news(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rss_feed_history_feed_url_date ON rss_feed_history(feed_url, processed_date);
CREATE INDEX IF NOT EXISTS idx_rss_feed_history_processed_at ON rss_feed_history(processed_at);
CREATE INDEX IF NOT EXISTS idx_rss_feed_history_upload_id ON rss_feed_history(upload_id);

CREATE INDEX IF NOT EXISTS idx_rss_feed_item_history_feed_history_id ON rss_feed_item_history(feed_history_id);
CREATE INDEX IF NOT EXISTS idx_rss_feed_item_history_item_url ON rss_feed_item_history(item_url);
CREATE INDEX IF NOT EXISTS idx_rss_feed_item_history_created_at ON rss_feed_item_history(created_at);
CREATE INDEX IF NOT EXISTS idx_rss_feed_item_history_processing_status ON rss_feed_item_history(processing_status);

-- Create composite index for checking recent items
CREATE INDEX IF NOT EXISTS idx_rss_feed_item_history_url_date_status ON rss_feed_item_history(item_url, created_at, processing_status);

-- Add Row Level Security (RLS) policies if needed
-- ALTER TABLE rss_feed_history ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE rss_feed_item_history ENABLE ROW LEVEL SECURITY;

-- Add comments for documentation
COMMENT ON TABLE rss_feed_history IS 'Tracks RSS feed processing sessions to avoid duplicate processing';
COMMENT ON TABLE rss_feed_item_history IS 'Tracks individual RSS item processing results';

COMMENT ON COLUMN rss_feed_history.feed_url IS 'URL of the RSS feed';
COMMENT ON COLUMN rss_feed_history.feed_group IS 'Group/source of the RSS feed (e.g., "Lancet", "JAMA")';
COMMENT ON COLUMN rss_feed_history.feed_name IS 'Human-readable name of the RSS feed';
COMMENT ON COLUMN rss_feed_history.processed_date IS 'Date when the feed was processed (YYYY-MM-DD)';
COMMENT ON COLUMN rss_feed_history.processed_at IS 'Timestamp when processing started';
COMMENT ON COLUMN rss_feed_history.start_date IS 'Start date filter used during processing';
COMMENT ON COLUMN rss_feed_history.upload_id IS 'Upload ID associated with this processing session';
COMMENT ON COLUMN rss_feed_history.processing_status IS 'Status of the processing session';
COMMENT ON COLUMN rss_feed_history.last_item_date IS 'Date of the most recent item processed';

COMMENT ON COLUMN rss_feed_item_history.item_url IS 'URL of the RSS item';
COMMENT ON COLUMN rss_feed_item_history.item_title IS 'Title of the RSS item';
COMMENT ON COLUMN rss_feed_item_history.item_pub_date IS 'Publication date of the RSS item';
COMMENT ON COLUMN rss_feed_item_history.processing_status IS 'Processing result for this item';
COMMENT ON COLUMN rss_feed_item_history.skip_reason IS 'Reason why the item was skipped (if applicable)';
COMMENT ON COLUMN rss_feed_item_history.news_id IS 'Reference to news table if item was successfully processed'; 