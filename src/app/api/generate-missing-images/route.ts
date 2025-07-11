import { NextResponse } from 'next/server';
import { supabase } from '@/lib/utils/supabaseHelpers';
import { generateAndUploadImage } from '@/lib/utils/imageGeneration';
import { Database } from '@/types/supabase';

type NewsRow = Database['public']['Tables']['news']['Row'];

// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
};

// Sleep utility function
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Calculate exponential backoff delay
function getRetryDelay(attempt: number): number {
  const delay = RETRY_CONFIG.baseDelay * Math.pow(2, attempt);
  return Math.min(delay, RETRY_CONFIG.maxDelay);
}

// Check if error is retryable (network/timeout errors)
function isRetryableError(error: Error | unknown): boolean {
  if (!error) return false;

  const errorMessage = error instanceof Error ? error.message : String(error);
  const retryablePatterns = [
    'fetch failed',
    'SocketError',
    'ConnectTimeoutError',
    'ECONNRESET',
    'ENOTFOUND',
    'ETIMEDOUT',
    'UND_ERR_SOCKET',
    'UND_ERR_CONNECT_TIMEOUT',
  ];

  return retryablePatterns.some((pattern) => errorMessage.includes(pattern));
}

// Get all news items without images
async function getNewsItemsWithoutImages(): Promise<NewsRow[]> {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .is('imageUrl', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching news items without images:', error);
    throw new Error(
      `Failed to fetch news items: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

// Update news item with generated image URL
async function updateNewsItemWithImage(
  id: string,
  imageUrl: string,
): Promise<void> {
  try {
    const { error } = await supabase
      .from('news')
      .update({ imageUrl })
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error(`Error updating news item ${id} with image:`, error);
    throw new Error(
      `Failed to update news item: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

// Generate image with retry logic
async function generateImageWithRetry(
  prompt: string,
  newsItemId: string,
  attempt: number = 0,
): Promise<{ success: boolean; imageUrl?: string; error?: string }> {
  try {
    console.log(
      `🎨 Generating image (attempt ${attempt + 1}/${RETRY_CONFIG.maxRetries + 1}) for news item: ${newsItemId}`,
    );

    const result = await generateAndUploadImage({
      prompt: prompt,
      size: '1536x1024',
      quality: 'medium',
      model: 'gpt-image-1',
      bucketName: 'news-images',
    });

    return result;
  } catch (error) {
    console.error(
      `❌ Image generation attempt ${attempt + 1} failed for ${newsItemId}:`,
      error,
    );

    // Check if we should retry
    if (attempt < RETRY_CONFIG.maxRetries && isRetryableError(error)) {
      const delay = getRetryDelay(attempt);
      console.log(`⏳ Retrying in ${delay}ms...`);
      await sleep(delay);
      return generateImageWithRetry(prompt, newsItemId, attempt + 1);
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Generate image for a single news item
async function generateImageForNewsItem(
  newsItem: NewsRow,
): Promise<{ success: boolean; error?: string }> {
  try {
    // Extract title from elements or use newsletter_title as fallback
    // @ts-expect-error aaaa
    const title = newsItem.elements?.title ?? newsItem.newsletter_title;

    if (!title) {
      console.log('No title found for news item', newsItem);
      return { success: false, error: 'No title found' };
    }

    console.log({ title });
    // Create the prompt for image generation
    const prompt = `Can you create an illustration for the article '${title}'. The illustration contains exactly three simple icons representing key concepts of the article. The background is monochrome. The colors should mostly be grey blue white and black and the turquoise #1b779b. No text`;

    console.log(`🚀 Starting image generation for: ${title}`);

    // Generate and upload the image with retry logic
    const { success, imageUrl, error } = await generateImageWithRetry(
      prompt,
      newsItem.id,
    );

    if (!success || !imageUrl) {
      console.error(
        `❌ Failed to generate image for ${newsItem.id} after all retries:`,
        error,
      );
      return { success: false, error: error || 'Unknown error' };
    }

    // Update the news item with the generated image URL
    await updateNewsItemWithImage(newsItem.id, imageUrl);

    console.log(`✅ Successfully generated and updated image for: ${title}`);
    return { success: true };
  } catch (error) {
    console.error(`❌ Error processing news item ${newsItem.id}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// GET endpoint to check how many news items are missing images
export async function GET() {
  try {
    const newsItems = await getNewsItemsWithoutImages();

    return NextResponse.json({
      success: true,
      message: `Found ${newsItems.length} news items without images`,
      count: newsItems.length,
    });
  } catch (error) {
    console.error('❌ Error checking news items without images:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 },
    );
  }
}

// POST endpoint to generate images for all news items without images
export async function POST() {
  try {
    console.log(
      '🚀 Starting image generation for news items without images...',
    );

    // Get all news items without images
    const newsItems = await getNewsItemsWithoutImages();

    if (newsItems.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No news items found without images',
        processed: 0,
        errors: 0,
      });
    }

    console.log(`📊 Found ${newsItems.length} news items without images`);
    console.log(
      `🔄 Retry configuration: ${RETRY_CONFIG.maxRetries} retries, ${RETRY_CONFIG.baseDelay}ms base delay`,
    );

    // Process items with limited concurrency to avoid overwhelming the API
    const BATCH_SIZE = 3; // Process 3 items at a time
    const results = [];

    for (let i = 0; i < newsItems.length; i += BATCH_SIZE) {
      const batch = newsItems.slice(i, i + BATCH_SIZE);
      console.log(
        `🔄 Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(newsItems.length / BATCH_SIZE)} (${batch.length} items)`,
      );

      const batchResults = await Promise.all(
        batch.map(async (newsItem) => {
          const result = await generateImageForNewsItem(newsItem);
          return {
            id: newsItem.id,
            ...result,
          };
        }),
      );

      results.push(...batchResults);

      // Small delay between batches to be respectful to the API
      if (i + BATCH_SIZE < newsItems.length) {
        await sleep(500);
      }
    }

    // Count successes and failures
    const successful = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;
    const errors = results
      .filter((r) => !r.success)
      .map((r) => ({
        id: r.id,
        error: r.error,
      }));

    console.log(
      `✅ Image generation complete. Success: ${successful}, Failed: ${failed}`,
    );

    return NextResponse.json({
      success: true,
      message: `Processed ${newsItems.length} news items`,
      processed: successful,
      errors: failed,
      errorDetails: errors,
      total: newsItems.length,
      retryConfig: RETRY_CONFIG,
    });
  } catch (error) {
    console.error('❌ Error in generate-missing-images route:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 },
    );
  }
}
