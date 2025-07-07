import { NextRequest, NextResponse } from 'next/server';
import {
  getUserNewsRows,
  getNewsRowsByIds,
} from '@/lib/modules/newsUpload/api/newsApi';
import { callOpenAIWithZodFormat } from '@/lib/utils/openaiWebSearch';
import { z } from 'zod';
import { PhysicianSpecialty } from '@/types/taxonomy';
import { SubspecialtiesEnumMap } from '@/types/subspecialty_taxonomy';

// Configuration: Set the date for newsletter generation
// Format: YYYY-MM-DD or leave empty to use today's date
const NEWSLETTER_DATE = '2025-06-30'; // Default to June 30, 2025
const NEWS_DATE_LIMIT = '2025-07-01'; // Only include news up to July 1, 2025
const NEWSLETTER_SPECIALTY = PhysicianSpecialty.PULMONOLOGY;

// Specific articles that all recipients should receive as the last two items
const REQUIRED_ARTICLE_IDS = [
  '775a2bfe-6979-4ff1-b7c8-dd8f27876f07', // Article 4
  '22db7048-7ce1-41a6-b777-ea941c28f00b', // Article 5
];

interface LoopsContact {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userGroup?: string;
}

interface NewsItem {
  id: string;
  elements: { title?: string } | string;
  news_date: string;
  url: string;
  tags: string[];
  score: number;
  newsletter_title: string;
}

export async function POST(request: NextRequest) {
  try {
    const { testMode = false } = await request.json();

    const loopsApiKey = process.env.LOOPS_API_KEY;
    if (!loopsApiKey) {
      return NextResponse.json(
        { error: 'Loops API key not configured' },
        { status: 500 },
      );
    }

    let contacts: LoopsContact[] = [];

    if (testMode) {
      // Test mode: just use Jane's data
      contacts = [
        {
          id: 'test_jane',
          email: 'jane@veracity-health.ai',
          firstName: 'Jane',
          lastName: 'Doe',
          userGroup: 'ATS25',
        },
      ];
    } else {
      // Fetch contacts from Loops API filtered by User Group = "ATS25"
      contacts = await fetchLoopsContacts(loopsApiKey);
    }

    const results = [];
    // Use configured date or today's date, then format for property names (YYYYMMDD)
    const newsletterDate =
      NEWSLETTER_DATE || new Date().toISOString().slice(0, 10);
    const today = newsletterDate.replace(/-/g, '');

    for (const contact of contacts) {
      try {
        // Step 1: Get pulmonology subtopics for this MD
        const subtopics = await getContactSubtopics({
          contact,
          specialty: NEWSLETTER_SPECIALTY,
        });

        // Step 2: Find matching personalized news (up to 4 items)
        const personalizedNews = await getPersonalizedNews(
          subtopics,
          4,
          testMode,
          NEWS_DATE_LIMIT,
        );

        // Step 3: Fill remaining slots up to 4 with chronic_cough, shortness_of_breath, or ipf
        const fillerNewsNeeded = 4 - personalizedNews.length;
        let fillerNews: NewsItem[] = [];

        if (fillerNewsNeeded > 0) {
          fillerNews = await getFillerPulmonologyNews(
            fillerNewsNeeded,
            testMode,
            personalizedNews.map((n) => n.id), // Exclude already selected articles
            NEWS_DATE_LIMIT,
          );
        }

        // Step 4: Get the two required articles that all recipients should receive
        const requiredNews = await getNewsRowsByIds(
          REQUIRED_ARTICLE_IDS,
          testMode,
        );

        // Step 5: Combine news - personalized first, then filler, then required articles
        const allNews = [...personalizedNews, ...fillerNews];

        // Add the two required articles as positions 5 and 6
        if (requiredNews.length >= 2) {
          allNews.push(...requiredNews.slice(0, 2));
        } else {
          // If we can't find the required articles, add what we can find
          console.warn(
            `Could not find all required articles. Found ${requiredNews.length} of 2 required articles.`,
          );
          allNews.push(...requiredNews);
        }

        if (testMode) {
          console.log('Newsletter composition:', {
            personalizedCount: personalizedNews.length,
            fillerCount: fillerNews.length,
            requiredCount: requiredNews.length,
            totalCount: allNews.length,
            requiredArticleIds: requiredNews.map((n) => n.id),
          });
        }

        // Step 6: Update contact properties in Loops
        if (allNews.length > 0) {
          await updateLoopsContactProperties(
            loopsApiKey,
            contact.email,
            allNews, // Use all available articles
            today,
            subtopics, // Pass subspecialties for URL tracking
          );
        }

        if (testMode) {
          console.log('Test mode - analysis for:', {
            email: contact.email,
            subtopics,
            personalizedNewsFound: personalizedNews.length,
            fillerNewsFound: fillerNews.length,
            requiredNewsFound: requiredNews.length,
            totalNews: allNews.length,
          });
        }

        results.push({
          email: contact.email,
          status: 'success',
          subtopics,
          newsCount: allNews.length,
        });
      } catch (error) {
        console.error(`Failed to process ${contact.email}:`, error);
        results.push({
          email: contact.email,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      success: true,
      testMode,
      processed: results.length,
      results,
    });
  } catch (error) {
    console.error('Newsletter generation failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

async function fetchLoopsContacts(apiKey: string): Promise<LoopsContact[]> {
  // TODO: Implement pagination if needed
  const response = await fetch('https://app.loops.so/api/v1/contacts', {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch contacts: ${response.status}`);
  }

  const data = await response.json();

  // Filter by User Group = "ATS25"
  return data.filter(
    (contact: unknown) =>
      typeof contact === 'object' &&
      contact !== null &&
      'userGroup' in contact &&
      (contact as LoopsContact).userGroup === 'ATS25',
  );
}

async function getContactSubtopics({
  contact,
  specialty,
}: {
  contact: LoopsContact;
  specialty: PhysicianSpecialty;
}): Promise<string[]> {
  const message = await callOpenAIWithZodFormat({
    content: `Find the topics the MD, ${contact.firstName} ${contact.lastName} might in interested in the list below. Only return a list of strings such a ["asthma", "copd"]. \n #### clinical interest list: \n ${JSON.stringify(SubspecialtiesEnumMap?.[specialty])}`,
    model: 'gpt-4.1',
    zodSchema: z.object({ tags: z.array(z.string()) }),
  });

  return message.tags;
}

async function getPersonalizedNews(
  subtopics: string[],
  limit: number,
  testMode: boolean = false,
  dateLimit?: string,
): Promise<NewsItem[]> {
  try {
    console.log('Getting personalized news for subtopics:', subtopics);

    // Use the new getUserNewsRows function
    const matchingNews = (await getUserNewsRows(
      subtopics,
      limit,
      testMode,
      dateLimit,
    )) as NewsItem[];

    console.log(`Found ${matchingNews.length} personalized news items`);

    // Log matching news for debugging
    matchingNews.forEach((item) => {
      console.log(
        `Found matching news: ${getNewsTitle(item)} with tags:`,
        item.tags,
      );
    });

    return matchingNews;
  } catch (error) {
    console.error('Error getting personalized news:', error);
    throw new Error(
      `Failed to fetch personalized news: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

async function getFillerPulmonologyNews(
  limit: number,
  testMode: boolean = false,
  excludeIds: string[] = [],
  dateLimit?: string,
): Promise<NewsItem[]> {
  const fillerTopics = ['chronic_cough', 'shortness_of_breath', 'ipf'];

  try {
    console.log('Getting filler news for topics:', fillerTopics);

    // Use the new getUserNewsRows function to get more articles than needed
    const matchingNews = (await getUserNewsRows(
      fillerTopics,
      limit * 3, // Get more than needed to allow for filtering
      testMode,
      dateLimit,
    )) as NewsItem[];

    // Filter out articles that are already selected
    const filteredNews = matchingNews.filter(
      (item) => !excludeIds.includes(item.id),
    );

    // Take only the limit needed
    const selectedNews = filteredNews.slice(0, limit);

    console.log(`Found ${selectedNews.length} filler news items`);

    // Log matching news for debugging
    selectedNews.forEach((item) => {
      console.log(
        `Found matching filler news: ${getNewsTitle(item)} with tags:`,
        item.tags,
      );
    });

    return selectedNews;
  } catch (error) {
    console.error('Error getting filler news:', error);
    throw new Error(
      `Failed to fetch filler news: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

async function updateLoopsContactProperties(
  apiKey: string,
  email: string,
  newsItems: NewsItem[],
  datePrefix: string,
  subspecialties: string[] = [],
): Promise<void> {
  // Create properties for each news item (title and link with subspecialties tracking)
  const properties: Record<string, string | boolean> = {};

  // Create URL-safe subspecialties string for tracking
  const subspecialtiesParam = subspecialties
    .map((s) => s.replace(/\s+/g, '_').toLowerCase()) // Replace spaces with underscores and lowercase
    .join(','); // Join with commas

  newsItems.forEach((item, index) => {
    const newsIndex = index + 1;
    const title = getNewsTitle(item);

    // Create Vera website URL with news ID
    const url = new URL(`https://app.vera-health.ai/news/${item.id}`);
    if (subspecialtiesParam) {
      url.searchParams.set('subspecialties', subspecialtiesParam);
      url.searchParams.set('md_email', email.split('@')[0]); // Add MD identifier (username part)
    }

    properties[`${datePrefix}_${newsIndex}_title`] = title;
    properties[`${datePrefix}_${newsIndex}_link`] = url.toString();
  });

  // Add hasSubspecialties tracking column
  properties['hasSubspecialties'] = subspecialties.length > 0;

  // Update contact properties in Loops
  const response = await fetch(`https://app.loops.so/api/v1/contacts/update`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      ...properties,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to update contact properties: ${response.status} - ${errorText}`,
    );
  }
}

function getNewsTitle(item: NewsItem): string {
  return item.newsletter_title || 'Untitled';
}
