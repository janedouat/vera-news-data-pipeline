import { NextRequest, NextResponse } from 'next/server';
import { getUserNewsRows } from '@/lib/modules/newsUpload/api/newsApi';
import { callOpenAIWithZodFormat } from '@/lib/utils/openaiWebSearch';
import { z } from 'zod';
import { PhysicianSpecialty } from '@/types/taxonomy';
import { SubspecialtiesEnumMap } from '@/types/subspecialty_taxonomy';
import { Special_Elite } from 'next/font/google';

// Configuration: Set the date for newsletter generation
// Format: YYYY-MM-DD or leave empty to use today's date
const NEWSLETTER_DATE = '2025-06-30'; // Default to June 30, 2025
const NEWSLETTER_SPECIALTY = PhysicianSpecialty.PULMONOLOGY;

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
        const subtopics = await getContactSubtopics(
          contact,
          testMode,
          NEWSLETTER_SPECIALTY,
        );

        // Step 2: Find matching news in Supabase
        const personalizedNews = await getPersonalizedNews(
          subtopics,
          3,
          testMode,
        );

        // Step 3: Get universal pulmonology news (chronic cough + shortness of breath)
        const universalNews = await getUniversalPulmonologyNews(2, testMode);

        // Step 4: Combine and format news
        const allNews = [...personalizedNews, ...universalNews];

        // Step 5: Ensure we have exactly 5 news items for the template
        if (allNews.length < 5) {
          // Create dummy news to fill remaining slots
          const dummyNewsNeeded = 5 - allNews.length;
          for (let i = 0; i < dummyNewsNeeded; i++) {
            const dummyIndex = allNews.length + i + 1;
            allNews.push({
              id: `dummy${dummyIndex}`,
              elements: { title: `Recent Pulmonology Update ${dummyIndex}` },
              news_date: '2025-01-15',
              url: 'https://veracity-health.ai/news',
              tags: ['general'],
              score: 1,
            });
          }

          if (testMode) {
            console.log(
              `Added ${dummyNewsNeeded} dummy news items to reach 5 total`,
            );
          }
        }

        // Step 6: Update contact properties in Loops
        if (allNews.length > 0) {
          await updateLoopsContactProperties(
            loopsApiKey,
            contact.email,
            allNews.slice(0, 5), // Ensure exactly 5 items
            today,
          );
        }

        if (testMode) {
          console.log('Test mode - analysis for:', {
            email: contact.email,
            subtopics,
            personalizedNewsFound: personalizedNews.length,
            universalNewsFound: universalNews.length,
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
  testMode,
}: {
  contact: LoopsContact;
  testMode: boolean;
  specialty: PhysicianSpecialty;
}): Promise<string[]> {
  if (testMode && contact.email === 'jane@veracity-health.ai') {
    // Test mode: return predefined tags for Jane
    return ['lung_cancer', 'asthma'];
  }

  const message = await callOpenAIWithZodFormat({
    content: `Find the topics the MD, ${contact.firstName} ${contact.lastName} might in interested in the list below. Only return a list of strings such a ["asthma", "copd ]. \n #### clinical interest list: \n ${JSON.stringify(SubspecialtiesEnumMap?.[specialty])}`,
    model: 'gpt-4.1',
    zodSchema: z.object({ tags: z.array(z.string()) }),
  });

  return message.tags;
}

async function getPersonalizedNews(
  subtopics: string[],
  limit: number,
  testMode: boolean = false,
): Promise<NewsItem[]> {
  try {
    console.log('Getting personalized news for subtopics:', subtopics);

    // Use the new getUserNewsRows function
    const matchingNews = (await getUserNewsRows(
      subtopics,
      limit,
      testMode,
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

async function getUniversalPulmonologyNews(
  limit: number,
  testMode: boolean = false,
): Promise<NewsItem[]> {
  const universalTopics = ['chronic_cough', 'shortness_of_breath'];

  try {
    console.log('Getting universal news for topics:', universalTopics);

    // Use the new getUserNewsRows function
    const matchingNews = (await getUserNewsRows(
      universalTopics,
      limit,
      testMode,
    )) as NewsItem[];

    console.log(`Found ${matchingNews.length} universal news items`);

    // Log matching news for debugging
    matchingNews.forEach((item) => {
      console.log(
        `Found matching universal news: ${getNewsTitle(item)} with tags:`,
        item.tags,
      );
    });

    return matchingNews;
  } catch (error) {
    console.error('Error getting universal news:', error);
    throw new Error(
      `Failed to fetch universal news: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

async function updateLoopsContactProperties(
  apiKey: string,
  email: string,
  newsItems: NewsItem[],
  datePrefix: string,
): Promise<void> {
  // Create properties for each news item (title and link)
  const properties: Record<string, string> = {};

  newsItems.forEach((item, index) => {
    const newsIndex = index + 1;
    const title = getNewsTitle(item);

    properties[`${datePrefix}_${newsIndex}_title`] = title;
    properties[`${datePrefix}_${newsIndex}_link`] = item.url;
  });

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
  const parsedElements =
    typeof item.elements === 'string'
      ? JSON.parse(item.elements)
      : item.elements;

  return parsedElements.title || 'Untitled';
}
