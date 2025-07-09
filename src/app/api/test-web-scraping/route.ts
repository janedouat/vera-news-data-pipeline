import { NextRequest, NextResponse } from 'next/server';
import {
  scrapeWebContent,
  scrapeWithCheerio,
  scrapeWithJinaReader,
  scrapeWithFirecrawl,
} from '@/lib/utils/webScraper';

export async function POST(request: NextRequest) {
  try {
    const { url, method = 'auto' } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    console.log(`🧪 Testing web scraping for: ${url} using method: ${method}`);

    let result;
    const startTime = Date.now();

    switch (method) {
      case 'cheerio':
        result = await scrapeWithCheerio(url);
        break;
      case 'jina':
        if (!process.env.JINA_API_KEY) {
          return NextResponse.json(
            { error: 'JINA_API_KEY environment variable not set' },
            { status: 400 },
          );
        }
        result = await scrapeWithJinaReader(url);
        break;
      case 'firecrawl':
        if (!process.env.FIRECRAWL_API_KEY) {
          return NextResponse.json(
            { error: 'FIRECRAWL_API_KEY environment variable not set' },
            { status: 400 },
          );
        }
        result = await scrapeWithFirecrawl(url);
        break;
      case 'auto':
      default:
        result = await scrapeWebContent(url);
        break;
    }

    const endTime = Date.now();
    const processingTime = endTime - startTime;

    // Return results with metadata
    return NextResponse.json({
      success: result.success,
      title: result.title,
      contentLength: result.content.length,
      contentPreview:
        result.content.substring(0, 500) +
        (result.content.length > 500 ? '...' : ''),
      fullContent: result.content, // Include full content for testing
      error: result.error,
      processingTime: `${processingTime}ms`,
      method: method,
      url: url,
    });
  } catch (error) {
    console.error('Error testing web scraping:', error);
    return NextResponse.json(
      {
        error: 'Failed to test web scraping',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Web scraping test endpoint',
    usage: {
      method: 'POST',
      body: {
        url: 'https://example.com/article',
        method:
          'auto | cheerio | jina | firecrawl (optional, defaults to auto)',
      },
    },
    examples: [
      {
        description: 'Test with automatic method selection',
        request: {
          url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2404101',
        },
      },
      {
        description: 'Test with specific method',
        request: {
          url: 'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(24)02202-1/fulltext',
          method: 'cheerio',
        },
      },
    ],
    availableMethods: {
      auto: 'Tries Jina Reader first, then Firecrawl, then falls back to Cheerio',
      cheerio: 'Native HTML parsing with Cheerio (fast, basic)',
      jina: 'Jina Reader API (requires JINA_API_KEY)',
      firecrawl: 'Firecrawl API (requires FIRECRAWL_API_KEY)',
    },
  });
}
