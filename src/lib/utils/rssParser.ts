/**
 * Generic RSS feed parser utility
 * Supports RSS 2.0, RSS 1.0, and Atom feeds
 */

interface RssItem {
  title: string;
  link: string;
  description?: string;
  pubDate?: string;
}

/**
 * Extract and clean text content from various formats
 */
function cleanTextContent(content: string): string {
  // Remove CDATA wrapping
  const cdataMatch = content.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  if (cdataMatch) {
    return cdataMatch[1].trim();
  }

  // Decode HTML entities
  return content
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

/**
 * Extract link from various RSS formats
 */
function extractLink(itemXml: string): string | null {
  // Try simple <link> tag first
  const simpleLinkMatch = itemXml.match(/<link[^>]*>([\s\S]*?)<\/link>/);
  if (simpleLinkMatch) {
    return simpleLinkMatch[1].trim();
  }

  // Try Atom-style <link href="...">
  const atomLinkMatch = itemXml.match(/<link[^>]*href=["']([^"']+)["'][^>]*>/);
  if (atomLinkMatch) {
    return atomLinkMatch[1].trim();
  }

  // Try self-closing <link> tag
  const selfClosingLinkMatch = itemXml.match(
    /<link[^>]*href=["']([^"']+)["'][^>]*\/>/,
  );
  if (selfClosingLinkMatch) {
    return selfClosingLinkMatch[1].trim();
  }

  return null;
}

/**
 * Extract title from various RSS formats
 */
function extractTitle(itemXml: string): string | null {
  const titleMatch = itemXml.match(/<title[^>]*>([\s\S]*?)<\/title>/);
  if (titleMatch) {
    return cleanTextContent(titleMatch[1]);
  }
  return null;
}

/**
 * Extract description from various RSS formats
 */
function extractDescription(itemXml: string): string | null {
  // Try <description> first
  const descMatch = itemXml.match(
    /<description[^>]*>([\s\S]*?)<\/description>/,
  );
  if (descMatch) {
    return cleanTextContent(descMatch[1]);
  }

  // Try <summary> (Atom format)
  const summaryMatch = itemXml.match(/<summary[^>]*>([\s\S]*?)<\/summary>/);
  if (summaryMatch) {
    return cleanTextContent(summaryMatch[1]);
  }

  return null;
}

/**
 * Extract publication date from various RSS formats
 */
function extractPubDate(itemXml: string): string | null {
  // Try <pubDate> (RSS 2.0)
  const pubDateMatch = itemXml.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/);
  if (pubDateMatch) {
    return pubDateMatch[1].trim();
  }

  // Try <updated> (Atom)
  const updatedMatch = itemXml.match(/<updated[^>]*>([\s\S]*?)<\/updated>/);
  if (updatedMatch) {
    return updatedMatch[1].trim();
  }

  // Try <dc:date> (RSS 1.0)
  const dcDateMatch = itemXml.match(/<dc:date[^>]*>([\s\S]*?)<\/dc:date>/);
  if (dcDateMatch) {
    return dcDateMatch[1].trim();
  }

  return null;
}

/**
 * Parse RSS feed and extract items
 */
export async function parseRssFeed(feedUrl: string): Promise<RssItem[]> {
  try {
    console.log(`🔍 Fetching RSS feed: ${feedUrl}`);
    const response = await fetch(feedUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rssText = await response.text();

    // Try to find items using both RSS (<item>) and Atom (<entry>) formats
    const itemMatches = rssText.match(/<item[^>]*>[\s\S]*?<\/item>/g) || [];
    const entryMatches = rssText.match(/<entry[^>]*>[\s\S]*?<\/entry>/g) || [];

    const allMatches = [...itemMatches, ...entryMatches];

    if (allMatches.length === 0) {
      return [];
    }

    const items: RssItem[] = [];

    for (const itemXml of allMatches) {
      const title = extractTitle(itemXml);
      const link = extractLink(itemXml);

      if (title && link) {
        items.push({
          title,
          link,
          description: extractDescription(itemXml) || undefined,
          pubDate: extractPubDate(itemXml) || undefined,
        });
      }
    }

    return items;
  } catch {
    return [];
  }
}

/**
 * Search for articles in RSS feed that match a given topic/title
 */
export async function findArticleInRssFeed(
  feedUrl: string,
  searchTopic: string,
  options: {
    minWordMatches?: number;
    minWordLength?: number;
    caseSensitive?: boolean;
  } = {},
): Promise<{
  url: string;
  title: string;
  match_score: number;
  pubDate?: string;
} | null> {
  const {
    minWordMatches = 2,
    minWordLength = 3,
    caseSensitive = false,
  } = options;

  try {
    const items = await parseRssFeed(feedUrl);

    if (items.length === 0) {
      return null;
    }

    // Prepare search words
    const searchWords = searchTopic
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length >= minWordLength);

    let bestMatch: { item: RssItem; score: number } | null = null;

    for (const item of items) {
      const titleWords = caseSensitive ? item.title : item.title.toLowerCase();

      // Count matching words
      const matchingWords = searchWords.filter((word) =>
        titleWords.includes(word),
      );

      const matchScore = matchingWords.length;

      if (matchScore >= minWordMatches) {
        // Keep the best match (highest score)
        if (!bestMatch || matchScore > bestMatch.score) {
          bestMatch = { item, score: matchScore };
        }
      }
    }

    if (bestMatch) {
      return {
        url: bestMatch.item.link,
        title: bestMatch.item.title,
        match_score: bestMatch.score,
        pubDate: bestMatch.item.pubDate,
      };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Search for exact title matches in RSS feed
 */
export async function findExactTitleInRssFeed(
  feedUrl: string,
  exactTitle: string,
  caseSensitive: boolean = false,
): Promise<{ url: string; title: string } | null> {
  try {
    const items = await parseRssFeed(feedUrl);

    const compareTitle = caseSensitive ? exactTitle : exactTitle.toLowerCase();

    for (const item of items) {
      const itemTitle = caseSensitive ? item.title : item.title.toLowerCase();

      if (itemTitle === compareTitle) {
        return {
          url: item.link,
          title: item.title,
        };
      }
    }

    return null;
  } catch {
    return null;
  }
}
