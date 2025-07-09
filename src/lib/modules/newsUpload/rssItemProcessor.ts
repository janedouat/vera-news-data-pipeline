import { PhysicianSpecialty } from '@/types/taxonomy';
import { SubspecialtiesEnumMap } from '@/types/subspecialty_taxonomy';
import {
  getAnswer,
  getSpecialties,
  getSubspecialtyTags,
  getScore,
  uploadTopic,
} from './topicProcessor';
import { scrapeWithFirecrawlStructured } from '@/lib/utils/webScraper';
import { removeRssRouteParameters } from '@/lib/utils/urlHelpers';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { checkNewsItemExists } from './api/newsApi';

export type RssItem = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
};

export type RssItemProcessResult = {
  status: 'success' | 'skipped' | 'error';
  reason?: string;
  processedCount?: number;
};

export type RssItemProcessOptions = {
  rssItem: RssItem;
  index: number;
  startDate: Date;
  feedGroup: string;
  processedCount: number;
  uploadId: string;
};

const ScientificPaperFilter = z.object({
  isScientificPaper: z.boolean(),
  reasoning: z.string(),
});

async function isScientificPaper(
  title: string,
  description: string,
  url: string,
): Promise<{ isScientificPaper: boolean; reasoning: string }> {
  const result = await generateObject({
    model: openai('gpt-4.1'),
    schema: ScientificPaperFilter,
    schemaName: 'ScientificPaperFilter',
    schemaDescription: 'Determines if content is a scientific paper or article',
    prompt: `Analyze the following RSS item and determine if it represents a scientific paper, research article, or academic publication. Consider factors like:
- Is it from a peer-reviewed journal?
- Does it describe original research, clinical trials, or systematic reviews?
- Is it a news article ABOUT research rather than the research itself?
- Is it an opinion piece, editorial, or commentary?
- Is it a press release or marketing material?

Title: ${title}
Description: ${description}
URL: ${url}

Return true only if this is likely to be an actual scientific paper or research article, not just news coverage of research.`,
    temperature: 0.3,
  });

  return result.object;
}

export async function processRssItem({
  rssItem,
  index,
  startDate,
  feedGroup,
  processedCount,
  uploadId,
}: RssItemProcessOptions): Promise<RssItemProcessResult> {
  try {
    const { title, link: url, pubDate, description } = rssItem;

    // Skip if no URL or title
    if (!url || !title || !pubDate) {
      console.log(
        `Skipping RSS item ${index + 1} because missing URL or title or date`,
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

    // Filter out non-scientific papers/articles
    const scientificPaperCheck = await isScientificPaper(
      title,
      description,
      url,
    );

    if (!scientificPaperCheck.isScientificPaper) {
      return {
        status: 'skipped',
        reason: 'not_scientific_paper',
      };
    }

    // Use the RSS item title as the topic for processing
    const topic = title;

    // Remove RSS route parameters from URL
    const cleanedUrl = removeRssRouteParameters(url);

    // Check if any RSS parameters remain in the URL
    if (cleanedUrl.toLowerCase().includes('rss')) {
      console.log(`⚠️ RSS still found in cleaned URL: ${cleanedUrl}`);
    }

    // Check if this item is already in Supabase before expensive operations
    const date = articleDate.toISOString().slice(0, 10); // Get YYYY-MM-DD format
    const itemExists = await checkNewsItemExists(cleanedUrl, date);

    if (itemExists) {
      console.log(
        `Skipping RSS item ${index + 1} because it's already in Supabase: ${title}`,
      );
      return {
        status: 'skipped',
        reason: 'already_in_supabase',
      };
    }

    const scrapedContent = await scrapeWithFirecrawlStructured(cleanedUrl);

    // Process the item through the same pipeline as processOneOutput
    const { answer } = await getAnswer({
      topic,
      url: cleanedUrl,
      text: scrapedContent.content,
    });

    const stringifiedAnswer = JSON.stringify(answer);

    const { specialties } = await getSpecialties({
      answer: stringifiedAnswer,
    });

    // Get all subspecialties for found specialties
    const allSubspecialties = specialties
      .map(
        (specialty) =>
          SubspecialtiesEnumMap?.[specialty as PhysicianSpecialty] || [],
      )
      .flat();

    // Get subspecialty tags from the combined list
    const { tags: allTags } = await getSubspecialtyTags({
      answer: stringifiedAnswer,
      tags: allSubspecialties,
    });

    // Remove duplicates
    const tags = [...new Set(allTags)];

    // Compute scores for each specialty found
    const specialtyScores: Record<string, number> = {};
    for (const foundSpecialty of specialties) {
      const { score } = await getScore({
        answer: stringifiedAnswer,
        url: cleanedUrl,
        specialty: foundSpecialty as PhysicianSpecialty,
      });
      specialtyScores[foundSpecialty] = score;
    }
    // Use the highest score as the main score
    const score = Math.max(...Object.values(specialtyScores));

    console.log({ date, specialtyScores });
    await uploadTopic({
      index: processedCount,
      date,
      url: cleanedUrl,
      specialties,
      tags,
      answer,
      score,
      model: 'none',
      uploadId,
      is_visible_in_prod: false,
      source: feedGroup,
      scores: specialtyScores,
    });

    console.log(`Successfully uploaded RSS item: ${title}`);

    return { status: 'success', processedCount: processedCount + 1 };
  } catch (error) {
    console.error(`Error processing RSS item ${index}:`, error);
    return {
      status: 'error',
      reason: error instanceof Error ? error.message : String(error),
    };
  }
}
