import { NextResponse } from 'next/server';
import { supabase } from '@/lib/utils/supabaseHelpers';
import { parseRssFeed } from '@/lib/utils/rssParser';
import { RSS_FEEDS } from '@/lib/config/rssFeeds';

export async function POST() {
  try {
    console.log('=� Starting test route to update references...');

    // Get all news items with DOI that don't have references
    const { data: newsItems, error: fetchError } = await supabase
      .from('news')
      .select('*');

    if (fetchError) {
      console.error('Error fetching news items:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch news items' },
        { status: 500 },
      );
    }

    console.log(
      `=� Found ${newsItems?.length || 0} news items with DOI but no references`,
    );

    let updatedCount = 0;
    const results = [];

    // Process each news item
    for (const newsItem of newsItems || []) {
      console.log(`=
 Processing: ${newsItem.title} (DOI: ${newsItem.doi})`);

      let foundReference = null;

      // Search through all RSS feeds for this DOI
      for (const feedConfig of RSS_FEEDS) {
        try {
          console.log(`= Checking feed: ${feedConfig.name}`);

          // Parse the RSS feed
          const rssItems = await parseRssFeed(feedConfig.url);

          // Look for an item with matching DOI
          const matchingItem = rssItems.find(
            (item) =>
              item.doi &&
              newsItem.doi &&
              item.doi.toLowerCase() === newsItem.doi.toLowerCase(),
          );

          if (matchingItem && matchingItem.reference) {
            console.log(` Found reference in ${feedConfig.name}`);
            foundReference = matchingItem.reference;
            break; // Found a match, stop searching
          }
        } catch (error) {
          console.log(`� Error processing feed ${feedConfig.name}:`, error);
          // Continue with next feed
        }
      }

      // Update the news item if we found a reference
      if (foundReference) {
        const { error: updateError } = await supabase
          .from('news')
          .update({ references: [foundReference] })
          .eq('id', newsItem.id);

        if (updateError) {
          console.error(
            `L Error updating news item ${newsItem.id}:`,
            updateError,
          );
          results.push({
            id: newsItem.id,
            title: newsItem.title,
            doi: newsItem.doi,
            status: 'error',
            error: updateError.message,
          });
        } else {
          console.log(` Updated references for: ${newsItem.title}`);
          updatedCount++;
          results.push({
            id: newsItem.id,
            title: newsItem.title,
            doi: newsItem.doi,
            status: 'updated',
            reference: foundReference,
          });
        }
      } else {
        console.log(`L No reference found for: ${newsItem.title}`);
        results.push({
          id: newsItem.id,
          title: newsItem.title,
          doi: newsItem.doi,
          status: 'no_reference_found',
        });
      }
    }

    console.log(
      `<� Process completed. Updated ${updatedCount} out of ${newsItems?.length || 0} items`,
    );

    return NextResponse.json({
      success: true,
      message: `Successfully processed ${newsItems?.length || 0} news items`,
      updatedCount,
      totalProcessed: newsItems?.length || 0,
      results,
    });
  } catch (error) {
    console.error('L Error in test route:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
