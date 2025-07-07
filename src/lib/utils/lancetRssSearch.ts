import { findArticleInRssFeed } from './rssParser';

/**
 * Utility to search for articles in the Lancet Respiratory Medicine RSS feed
 */
export async function searchLancetRssForTopic(
  topic: string,
): Promise<{ url: string; date?: string } | null> {
  const result = await findArticleInRssFeed(
    'https://www.thelancet.com/rssfeed/lanres_current.xml',
    topic,
    {
      minWordMatches: 2,
      minWordLength: 3,
      caseSensitive: false,
    },
  );

  if (result) {
    return {
      url: result.url,
      date: result.pubDate,
    };
  }

  return null;
}
