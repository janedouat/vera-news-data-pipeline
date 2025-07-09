import {
  scrapeWebContent,
  scrapeWithCheerio,
  scrapeWithJinaReader,
  scrapeWithFirecrawl,
} from './webScraper';

// Example test URLs (replace with actual medical journal URLs)
const testUrls = [
  'https://www.nejm.org/doi/full/10.1056/NEJMoa2404101',
  'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(24)02202-1/fulltext',
  'https://jamanetwork.com/journals/jama/fullarticle/2825945',
];

export async function testWebScraping() {
  console.log('🧪 Testing Web Scraping Methods\n');

  const testUrl = testUrls[0]; // Use first URL for testing

  console.log(`Testing with URL: ${testUrl}\n`);

  // Test 1: Main scraping function with fallback
  console.log('1. Testing main scrapeWebContent function (with fallback):');
  const mainResult = await scrapeWebContent(testUrl);
  console.log(`Success: ${mainResult.success}`);
  console.log(`Title: ${mainResult.title.substring(0, 100)}...`);
  console.log(`Content length: ${mainResult.content.length} chars`);
  console.log(`Error: ${mainResult.error || 'None'}\n`);

  // Test 2: Native Cheerio scraping
  console.log('2. Testing Cheerio scraping:');
  const cheerioResult = await scrapeWithCheerio(testUrl);
  console.log(`Success: ${cheerioResult.success}`);
  console.log(`Title: ${cheerioResult.title.substring(0, 100)}...`);
  console.log(`Content length: ${cheerioResult.content.length} chars`);
  console.log(`Error: ${cheerioResult.error || 'None'}\n`);

  // Test 3: Jina Reader (if API key available)
  if (process.env.JINA_API_KEY) {
    console.log('3. Testing Jina Reader:');
    const jinaResult = await scrapeWithJinaReader(testUrl);
    console.log(`Success: ${jinaResult.success}`);
    console.log(`Title: ${jinaResult.title.substring(0, 100)}...`);
    console.log(`Content length: ${jinaResult.content.length} chars`);
    console.log(`Error: ${jinaResult.error || 'None'}\n`);
  } else {
    console.log('3. Skipping Jina Reader test (no API key)\n');
  }

  // Test 4: Firecrawl (if API key available)
  if (process.env.FIRECRAWL_API_KEY) {
    console.log('4. Testing Firecrawl:');
    const firecrawlResult = await scrapeWithFirecrawl(testUrl);
    console.log(`Success: ${firecrawlResult.success}`);
    console.log(`Title: ${firecrawlResult.title.substring(0, 100)}...`);
    console.log(`Content length: ${firecrawlResult.content.length} chars`);
    console.log(`Error: ${firecrawlResult.error || 'None'}\n`);
  } else {
    console.log('4. Skipping Firecrawl test (no API key)\n');
  }

  return {
    main: mainResult,
    cheerio: cheerioResult,
    // Add other results as needed
  };
}

// Performance comparison
export async function compareScrapingMethods() {
  console.log('⚡ Performance Comparison\n');

  const testUrl = testUrls[0];
  const methods = [
    { name: 'Cheerio', fn: scrapeWithCheerio },
    ...(process.env.JINA_API_KEY
      ? [{ name: 'Jina Reader', fn: scrapeWithJinaReader }]
      : []),
    ...(process.env.FIRECRAWL_API_KEY
      ? [{ name: 'Firecrawl', fn: scrapeWithFirecrawl }]
      : []),
  ];

  for (const method of methods) {
    const startTime = Date.now();
    const result = await method.fn(testUrl);
    const endTime = Date.now();

    console.log(`${method.name}:`);
    console.log(`  Time: ${endTime - startTime}ms`);
    console.log(`  Success: ${result.success}`);
    console.log(`  Content length: ${result.content.length} chars`);
    console.log(`  Error: ${result.error || 'None'}\n`);
  }
}

// Example usage function
export async function demonstrateWebScraping() {
  await testWebScraping();
  await compareScrapingMethods();
}
