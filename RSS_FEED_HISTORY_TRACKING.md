# RSS Feed History Tracking Solution

## Overview

This solution prevents duplicate RSS feed processing by tracking processing history in dedicated database tables. It addresses the problem of processing the same RSS feed items multiple times for the same dates.

## Architecture

### Database Tables

#### 1. `rss_feed_history` Table

Tracks RSS feed processing sessions at the feed level.

**Key Fields:**

- `feed_url`: URL of the RSS feed
- `source`: Source group (e.g., "Lancet", "JAMA")
- `processed_date`: Date when processing occurred (YYYY-MM-DD)
- `items_found/processed/skipped`: Processing statistics
- `processing_status`: success, partial, or failed
- `upload_id`: Links to the upload batch

#### 2. `rss_feed_item_history` Table

Tracks individual RSS item processing results.

**Key Fields:**

- `feed_history_id`: Links to the parent feed processing session
- `item_url`: URL of the specific RSS item
- `item_pub_date`: Publication date of the item
- `processing_status`: processed, skipped, or failed
- `skip_reason`: Why the item was skipped
- `news_id`: Reference to the news table if successfully processed

### Duplicate Prevention Strategy

The system uses a multi-level approach to prevent duplicates:

1. **Feed-Level Check**: Before processing a feed, check if it was already processed today
2. **Item-Level Check**: For each item, check if it was processed in the last 7 days
3. **URL-Based Deduplication**: Use the item URL as the primary deduplication key

## Implementation Details

### Core Functions

#### `checkFeedProcessedToday(feedUrl, date)`

Checks if a specific feed was already successfully processed on a given date.

#### `checkItemsProcessedRecently(items, feedUrl, daysPast)`

Batch checks if RSS items were processed in the last N days.

#### `startFeedProcessing(feedUrl, feedGroup, feedName, processingDate, startDate, uploadId)`

Initiates a new feed processing session and returns a tracking ID.

#### `recordItemProcessing(feedHistoryId, itemUrl, itemTitle, itemPubDate, processingStatus, skipReason, newsId)`

Records the processing result for an individual RSS item.

#### `completeFeedProcessing(feedHistoryId, itemsFound, itemsProcessed, itemsSkipped, processingStatus, errorMessage, lastItemDate)`

Finalizes the feed processing session with statistics.

### Skip Reasons

The system tracks various reasons why items are skipped:

- `already_processed`: Item was processed in the last 7 days
- `date_too_old`: Item publication date is before the start date
- `missing_url_or_title_or_date`: Required fields are missing
- `not_scientific_paper`: Item doesn't meet scientific paper criteria
- `error`: Processing failed due to an error

## Performance Considerations

### Indexes

- `idx_rss_feed_history_feed_url_date`: Fast feed-level duplicate checking
- `idx_rss_feed_item_history_url_date_status`: Fast item-level duplicate checking
- `idx_rss_feed_item_history_created_at`: Efficient recent item queries

### Batch Processing

- Item history checks are performed in batches to reduce database queries
- Processing uses parallel execution where possible

## Data Retention

### Automatic Cleanup

- `cleanupOldHistory(daysToKeep)`: Removes history older than specified days (default: 30 days)
- Cascading deletes ensure item history is cleaned up with feed history

### Storage Efficiency

- Only essential data is stored in history tables
- Full RSS item content is not duplicated

## Usage Example

```typescript
// Check if feed was processed today
const alreadyProcessed = await checkFeedProcessedToday(feedUrl, processingDate);
if (alreadyProcessed) {
  console.log('Feed already processed today, skipping');
  return;
}

// Start tracking
const feedHistoryId = await startFeedProcessing(
  feedUrl,
  source,
  feedName,
  processingDate,
  startDate,
  uploadId,
);

// Check for recently processed items
const recentlyProcessedUrls = await checkItemsProcessedRecently(
  items.map((item) => ({ url: item.link, pubDate: item.pubDate })),
  feedUrl,
  7,
);

// Process items with deduplication
for (const item of items) {
  if (recentlyProcessedUrls.has(item.link)) {
    await recordItemProcessing(
      feedHistoryId,
      item.link,
      item.title,
      item.pubDate,
      'skipped',
      'already_processed',
    );
    continue;
  }

  // Process item...
  await recordItemProcessing(
    feedHistoryId,
    item.link,
    item.title,
    item.pubDate,
    'processed',
    undefined,
    newsId,
  );
}

// Complete tracking
await completeFeedProcessing(
  feedHistoryId,
  itemsFound,
  itemsProcessed,
  itemsSkipped,
  'success',
  undefined,
  lastItemDate,
);
```

## Alternative Approaches Considered

### 1. Simple URL-based Deduplication in News Table

**Pros**: Simple, uses existing table
**Cons**: No temporal control, can't distinguish between processing dates

### 2. File-based History Tracking

**Pros**: No database dependencies
**Cons**: Harder to query, no transactional guarantees, scaling issues

### 3. Redis-based Caching

**Pros**: Fast lookups, automatic expiration
**Cons**: Requires additional infrastructure, data loss on restart

### 4. Combined Approach (Recommended)

**Pros**: Comprehensive tracking, flexible queries, good performance
**Cons**: Additional database tables, slight complexity increase

## Monitoring and Observability

### Logging

- Feed processing sessions are logged with statistics
- Skip reasons are tracked and reported
- Processing errors are captured with context

### Metrics

- Items processed vs skipped ratios
- Processing time per feed
- Duplicate detection effectiveness

### Troubleshooting

- History tables provide audit trail
- Can identify problematic feeds or items
- Processing statistics help optimize performance

## Migration and Rollback

### Database Migration

Run the provided `database-migration.sql` to create the necessary tables and indexes.

### Rollback Strategy

If needed, the system can be rolled back by:

1. Removing history tracking calls from the processing code
2. Dropping the history tables
3. Reverting to the original processing logic

The existing `news` table remains unchanged, ensuring data integrity.

## Security Considerations

### Data Protection

- History tables contain only metadata, no sensitive content
- URLs and titles are public RSS feed data
- Optional RLS policies can be enabled if needed

### Access Control

- History tracking uses service role key for database access
- Functions are only accessible from the processing pipeline
- No user-facing endpoints expose history data directly
