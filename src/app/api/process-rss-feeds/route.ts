import { NextRequest, NextResponse } from 'next/server';
import { PhysicianSpecialty } from '@/types/taxonomy';
import { SubspecialtiesEnumMap } from '@/types/subspecialty_taxonomy';
import {
  getAnswer,
  getSpecialties,
  getTags,
  getScore,
  uploadTopic,
} from '@/lib/modules/newsUpload/topicProcessor';
import { parseRssFeed } from '@/lib/utils/rssParser';

// Define the type for the input
export type RssFeedProcessInput = {
  rssFeedUrls: string[];
  specialty: PhysicianSpecialty;
  startDate: string;
  model: string;
  uploadId: string;
};

const RSS_FEEDS = [
  {
    url: 'https://www.thelancet.com/rssfeed/lanres_current.xml',
    source: 'Lancet',
  },
];

//todo: score by specialty?
//todo: add rss feed sync history to supabase

export async function processRssFeedItems(input: RssFeedProcessInput) {
  try {
    const { startDate: startDateString } = input;

    const startDate = new Date(startDateString);
    console.log({ startDate });
    if (!startDate.valueOf()) {
      return { error: 'Request StartDate not correct', status: 400 };
    }

    let processedCount = 0;
    let skippedCount = 0;

    // Process each RSS feed URL
    for (const feed of RSS_FEEDS) {
      try {
        console.log(`🔍 Processing RSS feed: ${feed}`);

        // Parse the RSS feed to get items
        const rssItems = await parseRssFeed(feed.url);

        // Process each RSS item
        await Promise.all(
          rssItems.map(async (rssItem, index) => {
            try {
              const { title, link: url, pubDate } = rssItem;

              // Skip if no URL or title
              if (!url || !title || !pubDate) {
                console.log(
                  `Skipping RSS item ${index + 1} because missing URL or title or date`,
                );
                skippedCount++;
                return {
                  status: 'skipped',
                  reason: 'missing_url_or_title_or_date',
                };
              }

              const articleDate = new Date(pubDate);

              // Check if date is too old
              if (articleDate < startDate) {
                skippedCount++;
                return { status: 'skipped', reason: 'date_too_old' };
              }

              // Use the RSS item title as the topic for processing
              const topic = title;

              // Process the item through the same pipeline as processOneOutput
              const { answer } = await getAnswer({ topic, url });

              const { specialties } = await getSpecialties({
                answer,
              });

              // Get subspecialty tags for each found specialty
              let allTags: string[] = [];
              for (const foundSpecialty of specialties) {
                const foundSpecialtyTags =
                  SubspecialtiesEnumMap?.[foundSpecialty as PhysicianSpecialty];
                if (foundSpecialtyTags?.length) {
                  const { tags } = await getTags({
                    answer,
                    tags: foundSpecialtyTags,
                  });
                  allTags = [...allTags, ...tags];
                }
              }

              // Remove duplicates
              const tags = [...new Set(allTags)];

              // Compute scores for each specialty found
              const specialtyScores: Record<string, number> = {};
              for (const foundSpecialty of specialties) {
                const { score } = await getScore({
                  answer,
                  url,
                  specialty: foundSpecialty as PhysicianSpecialty,
                });
                specialtyScores[foundSpecialty] = score;
              }

              // Use the highest score as the main score
              const score = Math.max(...Object.values(specialtyScores));

              const date = articleDate.toISOString().slice(0, 10); // Get YYYY-MM-DD format
              console.log({ date, specialtyScores });
              const result = await uploadTopic({
                index: processedCount,
                date,
                url,
                specialties,
                tags,
                answer,
                score,
                model: 'none',
                uploadId: 'test_rss',
                is_visible_in_prod: true,
                source: feed.source,
                scores: specialtyScores,
              });

              processedCount++;
              console.log(`Successfully uploaded RSS item: ${title}`);

              return result;
            } catch (error) {
              console.error(`Error processing RSS item ${index}:`, error);
              skippedCount++;
              return {
                status: 'error',
                reason: error instanceof Error ? error.message : String(error),
              };
            }
          }),
        );
      } catch (error) {
        console.error(`Error processing RSS feed ${feed}:`, error);
        // Continue with next RSS feed even if one fails
      }
    }

    console.log(
      `✅ RSS processing complete. Processed: ${processedCount}, Skipped: ${skippedCount}`,
    );
    return {
      status: 'ok',
      processedCount,
      skippedCount,
      message: `Successfully processed ${processedCount} RSS items, skipped ${skippedCount}`,
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

    const result = await processRssFeedItems(input);

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
