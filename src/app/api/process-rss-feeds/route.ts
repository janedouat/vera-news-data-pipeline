import { NextRequest, NextResponse } from 'next/server';
import { PhysicianSpecialty } from '@/types/taxonomy';
import { parseRssFeed } from '@/lib/utils/rssParser';
import { RSS_FEEDS } from '@/lib/config/rssFeeds';
import { processRssItem } from '@/lib/modules/newsUpload/rssItemProcessor';

// Define the type for the input
export type RssFeedProcessInput = {
  rssFeedUrls: string[];
  specialty: PhysicianSpecialty;
  startDate: string;
  model: string;
  uploadId: string;
};

//todo: score by specialty?
//todo: add rss feed sync history to supabase

export async function processRssFeedItems(input: RssFeedProcessInput) {
  try {
    const { startDate: startDateString, uploadId } = input;

    const startDate = new Date(startDateString);

    if (!startDate.valueOf()) {
      return { error: 'Request StartDate not correct', status: 400 };
    }

    let processedCount = 0;
    let skippedCount = 0;

    // Track counts per RSS feed
    const feedStats: Record<
      string,
      {
        group: string;
        name: string;
        url: string;
        totalItems: number;
        goodDateItems: number;
        badDateItems: number;
        processedItems: number;
        skippedItems: number;
        skipReasons: {
          missing_url_or_title_or_date: number;
          date_too_old: number;
          not_scientific_paper: number;
          not_enough_content: number;
          error: number;
          already_processed: number;
        };
      }
    > = {};

    // Process each RSS feed URL
    for (const feed of RSS_FEEDS) {
      // Initialize feed stats
      const feedKey = `${feed.group}_${feed.name}_${feed.url}`;
      feedStats[feedKey] = {
        group: feed.group,
        name: feed.name,
        url: feed.url,
        totalItems: 0,
        goodDateItems: 0,
        badDateItems: 0,
        processedItems: 0,
        skippedItems: 0,
        skipReasons: {
          missing_url_or_title_or_date: 0,
          date_too_old: 0,
          not_scientific_paper: 0,
          not_enough_content: 0,
          error: 0,
          already_processed: 0,
        },
      };

      try {
        console.log(`🔍 Processing RSS feed: ${feed.url} (${feed.group})`);

        // Parse the RSS feed to get items
        const rssItems = await parseRssFeed(feed.url);

        feedStats[feedKey].totalItems = rssItems.length;

        // Process each RSS item
        await Promise.all(
          rssItems.map(async (rssItem, index) => {
            const result = await processRssItem({
              rssItem: rssItem as Required<typeof rssItem>, // Type assertion since we filtered above
              index,
              startDate,
              feedGroup: feed.group,
              processedCount,
              uploadId,
            });

            // Update counters based on result
            if (result.status === 'success') {
              processedCount++;
              feedStats[feedKey].processedItems++;
              feedStats[feedKey].goodDateItems++;
            } else if (result.status === 'skipped') {
              skippedCount++;
              feedStats[feedKey].skippedItems++;
              if (result.reason === 'date_too_old') {
                feedStats[feedKey].badDateItems++;
                feedStats[feedKey].skipReasons.date_too_old++;
              } else if (result.reason === 'missing_url_or_title_or_date') {
                feedStats[feedKey].skipReasons.missing_url_or_title_or_date++;
              } else if (result.reason === 'not_scientific_paper') {
                feedStats[feedKey].skipReasons.not_scientific_paper++;
              } else if (result.reason === 'not_enough_content') {
                feedStats[feedKey].skipReasons.not_enough_content++;
              } else if (result.reason === 'already_in_supabase') {
                feedStats[feedKey].skipReasons.already_processed++;
              }
            } else if (result.status === 'error') {
              skippedCount++;
              feedStats[feedKey].skippedItems++;
              feedStats[feedKey].skipReasons.error++;
            }

            return result;
          }),
        );
      } catch (error) {
        console.error(
          `Error processing RSS feed ${feed.url} (${feed.group}):`,
          error,
        );
        // Continue with next RSS feed even if one fails
      }
    }

    console.log(
      `✅ RSS processing complete. Processed: ${processedCount}, Skipped: ${skippedCount}`,
    );

    // Log feed statistics
    console.log('\n📊 Feed Statistics:');
    Object.values(feedStats).forEach((stat) => {
      console.log(`${stat.group} - ${stat.name}:`);
      console.log(`  Total items: ${stat.totalItems}`);
      console.log(`  Good date items: ${stat.goodDateItems}`);
      console.log(`  Bad date items: ${stat.badDateItems}`);
      console.log(`  Processed: ${stat.processedItems}`);
      console.log(`  Skipped: ${stat.skippedItems}`);
      console.log(`  Skip reasons:`);
      console.log(`    📅 Too old: ${stat.skipReasons.date_too_old}`);
      console.log(
        `    📄 Missing info: ${stat.skipReasons.missing_url_or_title_or_date}`,
      );
      console.log(
        `    🔬 Not scientific: ${stat.skipReasons.not_scientific_paper}`,
      );
      console.log(
        `    📝 Not enough content: ${stat.skipReasons.not_enough_content}`,
      );
      console.log(`    ❌ Errors: ${stat.skipReasons.error}`);
      console.log(
        `    🔄 Already processed: ${stat.skipReasons.already_processed}`,
      );
    });

    // Log overall skip reasons summary
    const totalSkipReasons = Object.values(feedStats).reduce(
      (acc, stat) => ({
        date_too_old: acc.date_too_old + stat.skipReasons.date_too_old,
        missing_url_or_title_or_date:
          acc.missing_url_or_title_or_date +
          stat.skipReasons.missing_url_or_title_or_date,
        not_scientific_paper:
          acc.not_scientific_paper + stat.skipReasons.not_scientific_paper,
        not_enough_content:
          acc.not_enough_content + stat.skipReasons.not_enough_content,
        error: acc.error + stat.skipReasons.error,
        already_processed:
          acc.already_processed + stat.skipReasons.already_processed,
      }),
      {
        date_too_old: 0,
        missing_url_or_title_or_date: 0,
        not_scientific_paper: 0,
        not_enough_content: 0,
        error: 0,
        already_processed: 0,
      },
    );

    console.log('\n📋 Overall Skip Reasons Summary:');
    console.log(`📅 Articles too old: ${totalSkipReasons.date_too_old}`);
    console.log(
      `📄 Missing required info: ${totalSkipReasons.missing_url_or_title_or_date}`,
    );
    console.log(
      `🔬 Not scientific papers: ${totalSkipReasons.not_scientific_paper}`,
    );
    console.log(
      `📝 Not enough content: ${totalSkipReasons.not_enough_content}`,
    );
    console.log(`❌ Processing errors: ${totalSkipReasons.error}`);
    console.log(`🔄 Already processed: ${totalSkipReasons.already_processed}`);
    console.log(`📊 Total skipped: ${skippedCount}`);
    console.log(`✅ Total processed: ${processedCount}`);

    return {
      status: 'ok',
      processedCount,
      skippedCount,
      message: `Successfully processed ${processedCount} RSS items, skipped ${skippedCount}`,
      feedStats: Object.values(feedStats),
      skipReasonsSummary: totalSkipReasons,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : String(error),
      status: 500,
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const input: RssFeedProcessInput = await request.json();

    // Generate timestamp-based uploadId
    const now = new Date();
    const timestamp = now
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}Z$/, '')
      .replace('T', '_');
    const uploadId = `rss_${timestamp}`;
    console.log(`🆔 Generated uploadId: ${uploadId}`);

    const result = await processRssFeedItems({
      ...input,
      uploadId,
    });

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing RSS feeds:', error);
    return NextResponse.json(
      { error: 'Failed to process RSS feeds' },
      { status: 500 },
    );
  }
}
