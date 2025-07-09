import * as cheerio from 'cheerio';

export interface ScrapedContent {
  title: string;
  content: string;
  success: boolean;
  error?: string;
}

/**
 * Scrape content using Jina Reader - converts any URL to clean markdown
 */
export async function scrapeWithJinaReader(
  url: string,
): Promise<ScrapedContent> {
  try {
    const response = await fetch(`https://r.jina.ai/${url}`, {
      headers: {
        Authorization: `Bearer ${process.env.JINA_API_KEY}`,
        'User-Agent': 'Mozilla/5.0 (compatible; Vera News Pipeline)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const markdown = await response.text();

    // Extract title from markdown (usually first # header)
    const titleMatch = markdown.match(/^# (.+)$/m);
    const title = titleMatch ? titleMatch[1] : '';

    return {
      title,
      content: markdown,
      success: true,
    };
  } catch (error) {
    return {
      title: '',
      content: '',
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Scrape content using Firecrawl - optimized for LLM extraction
 */
export async function scrapeWithFirecrawl(
  url: string,
): Promise<ScrapedContent> {
  try {
    const response = await fetch('https://api.firecrawl.dev/v0/scrape', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        pageOptions: {
          onlyMainContent: true,
          includeHtml: false,
          waitFor: 1000,
        },
        extractorOptions: {
          mode: 'llm-extraction',
          extractionPrompt:
            'Extract the main article content, title, and key medical information. Return clean text without ads or navigation.',
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Firecrawl scraping failed');
    }

    return {
      title: data.data?.title || '',
      content: data.data?.content || '',
      success: true,
    };
  } catch (error) {
    return {
      title: '',
      content: '',
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Scrape content using native Cheerio - fast but basic
 */
export async function scrapeWithCheerio(url: string): Promise<ScrapedContent> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Vera News Pipeline)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove unnecessary elements
    $(
      'script, style, nav, footer, .ad, .advertisement, .sidebar, .comments',
    ).remove();

    // Extract title
    const title =
      $('h1').first().text().trim() ||
      $('title').first().text().trim() ||
      $('meta[property="og:title"]').attr('content') ||
      '';

    // Extract main content - try multiple selectors
    const contentSelectors = [
      'article',
      'main',
      '.content',
      '.post-content',
      '.entry-content',
      '.article-content',
      '.story-content',
    ];

    let content = '';
    for (const selector of contentSelectors) {
      const element = $(selector).first();
      if (element.length > 0) {
        content = element.text().trim();
        break;
      }
    }

    // Fallback to body if no main content found
    if (!content) {
      content = $('body').text().trim();
    }

    // Clean up whitespace
    content = content.replace(/\s+/g, ' ').trim();

    return {
      title,
      content,
      success: true,
    };
  } catch (error) {
    return {
      title: '',
      content: '',
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Main scraping function with fallback strategy
 */
export async function scrapeWebContent(url: string): Promise<ScrapedContent> {
  console.log(`🔍 Scraping content from: ${url}`);

  // Try Jina Reader first (best for clean content)
  if (process.env.JINA_API_KEY) {
    const jinaResult = await scrapeWithJinaReader(url);
    if (jinaResult.success && jinaResult.content.length > 100) {
      console.log('✅ Successfully scraped with Jina Reader');
      return jinaResult;
    }
    console.log('⚠️ Jina Reader failed, trying fallback');
  }

  // Try Firecrawl as second option
  if (process.env.FIRECRAWL_API_KEY) {
    const firecrawlResult = await scrapeWithFirecrawl(url);
    if (firecrawlResult.success && firecrawlResult.content.length > 100) {
      console.log('✅ Successfully scraped with Firecrawl');
      return firecrawlResult;
    }
    console.log('⚠️ Firecrawl failed, trying fallback');
  }

  // Fallback to native Cheerio scraping
  const cheerioResult = await scrapeWithCheerio(url);
  if (cheerioResult.success) {
    console.log('✅ Successfully scraped with Cheerio (fallback)');
    return cheerioResult;
  }

  console.log('❌ All scraping methods failed');
  return {
    title: '',
    content: '',
    success: false,
    error: 'All scraping methods failed',
  };
}
