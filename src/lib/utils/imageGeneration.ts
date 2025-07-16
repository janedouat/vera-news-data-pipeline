import OpenAI from 'openai';
import { uploadFile, getFileUrl } from './supabaseHelpers';
import { v4 as uuidv4 } from 'uuid';
import { ImageGenerateParams } from 'openai/resources';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type ImageGenerationResult = {
  success: boolean;
  imageUrl?: string;
  fileName?: string;
  error?: string;
};

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

// Check if error is a safety system rejection
function isSafetySystemError(error: Error | unknown): boolean {
  if (!error) return false;

  // Check for OpenAI error object with specific code
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const errorCode = (error as { code: string }).code;
    if (
      errorCode === 'moderation_blocked' ||
      errorCode === 'content_policy_violation'
    ) {
      return true;
    }
  }

  const errorMessage = error instanceof Error ? error.message : String(error);
  const safetyPatterns = [
    'safety system',
    'content policy',
    'content filter',
    'Request was rejected as a result of the safety system',
    'moderation_blocked',
    'content_policy_violation',
  ];

  return safetyPatterns.some((pattern) =>
    errorMessage.toLowerCase().includes(pattern.toLowerCase()),
  );
}

// Sanitize prompt by removing potentially problematic terms
function sanitizePrompt(prompt: string): string {
  return prompt
    .replace(
      /\b(scrotal|haematoma|hematoma|blood|bleeding|trauma|injury|wound|surgical|surgery|cut|incision)\b/gi,
      'medical condition',
    )
    .replace(/\b(child|pediatric|infant|baby|minor)\b/gi, 'patient')
    .replace(
      /\b(reveals|diagnos[ie]s|undiagnosed|detect[s]?|discover[s]?)\b/gi,
      'shows',
    )
    .replace(/\b(school-aged|young|adolescent)\b/gi, '')
    .trim();
}

// Upload image to Supabase from base64 or URL
export async function uploadImageToSupabase({
  imageBase64,
  imageUrl,
  bucketName = 'news-images',
  fileName,
}: {
  imageBase64?: string;
  imageUrl?: string;
  bucketName?: string;
  fileName?: string;
}): Promise<{
  success: boolean;
  imageUrl?: string;
  fileName?: string;
  error?: string;
}> {
  try {
    if (!imageBase64 && !imageUrl) {
      return {
        success: false,
        error: 'Either imageBase64 or imageUrl must be provided',
      };
    }

    // Generate unique filename if not provided
    const finalFileName = fileName || `${uuidv4()}.png`;

    console.log('🔍 Generated UUID:', finalFileName.replace('.png', ''));
    console.log('📁 Generated filename:', finalFileName);

    let imageBuffer: Buffer;

    if (imageBase64) {
      // Convert base64 to buffer
      imageBuffer = Buffer.from(imageBase64, 'base64');
    } else if (imageUrl) {
      // Download image from URL
      console.log('📥 Downloading image from URL:', imageUrl);
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
          console.log(
            `⚠️ Failed to download image: ${response.status} ${response.statusText} - skipping image upload`,
          );
          return {
            success: false,
            error: `Image download failed: ${response.status} ${response.statusText}`,
          };
        }
        const arrayBuffer = await response.arrayBuffer();
        imageBuffer = Buffer.from(arrayBuffer);
      } catch (downloadError) {
        console.log(
          `⚠️ Error downloading image: ${downloadError} - skipping image upload`,
        );
        return {
          success: false,
          error: `Image download error: ${downloadError}`,
        };
      }
    } else {
      throw new Error('No image source provided');
    }

    // Upload to Supabase
    const uploadResult = await uploadFile(
      bucketName,
      finalFileName,
      imageBuffer,
      {
        contentType: 'image/png',
        upsert: true,
      },
    );

    console.log('📤 Image uploaded to Supabase:', uploadResult);

    // Get the public URL
    const publicUrl = await getFileUrl(bucketName, finalFileName);
    console.log('🌐 Supabase public URL:', publicUrl);

    return {
      success: true,
      imageUrl: publicUrl,
      fileName: finalFileName,
    };
  } catch (error) {
    console.error('❌ Image upload failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// Wrapper function that handles retries and safety system errors
export async function generateAndUploadImageWithRetry({
  prompt,
  size = '1536x1024',
  quality = 'medium',
  model = 'gpt-image-1',
  bucketName = 'news-images',
  attempt = 0,
}: Partial<ImageGenerateParams> & {
  prompt: string;
  bucketName?: string;
  attempt?: number;
}): Promise<ImageGenerationResult> {
  console.log(
    `🎨 Generating image (attempt ${attempt + 1}/${RETRY_CONFIG.maxRetries + 1})`,
  );

  const result = await generateAndUploadImage({
    prompt,
    size,
    quality,
    model,
    bucketName,
  });

  // If generation was successful, return the result
  if (result.success) {
    return result;
  }

  // Handle the error from the result object
  console.error(
    `❌ Image generation attempt ${attempt + 1} failed:`,
    result.error,
  );

  // Check if it's a safety system error and sanitize
  if (result.error && isSafetySystemError(new Error(result.error))) {
    console.log(
      '🚨 Safety system rejection detected, sanitizing prompt and retrying...',
    );

    const sanitizedPrompt = sanitizePrompt(prompt);

    console.log('📝 Original prompt:', prompt);
    console.log('📝 Sanitized prompt:', sanitizedPrompt);

    // Retry with sanitized prompt (reset attempt counter)
    return generateAndUploadImageWithRetry({
      prompt: sanitizedPrompt,
      size,
      quality,
      model,
      bucketName,
      attempt: 0,
    });
  }

  // Check if we should retry for network errors
  if (
    attempt < RETRY_CONFIG.maxRetries &&
    result.error &&
    isRetryableError(new Error(result.error))
  ) {
    const delay = getRetryDelay(attempt);
    console.log(`⏳ Retrying in ${delay}ms...`);
    await sleep(delay);

    return generateAndUploadImageWithRetry({
      prompt,
      size,
      quality,
      model,
      bucketName,
      attempt: attempt + 1,
    });
  }

  // Return the failed result if no retries are applicable
  return result;
}

export async function generateAndUploadImage({
  prompt,
  size = '1536x1024',
  quality = 'medium',
  model = 'gpt-image-1',
  bucketName = 'news-images',
}: Partial<ImageGenerateParams> & {
  prompt: string;
  bucketName?: string;
}): Promise<ImageGenerationResult> {
  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return {
        success: false,
        error: 'OpenAI API key not configured',
      };
    }

    console.log('🎨 Generating image with OpenAI...');

    // Generate image using OpenAI
    const response = await openai.images.generate({
      model,
      prompt,
      n: 1,
      size,
      quality,
    });

    // Check if response data exists
    if (!response.data || response.data.length === 0) {
      return {
        success: false,
        error: 'No image data returned from OpenAI',
      };
    }

    const imageData = response.data[0];
    const imageBase64 = imageData?.b64_json;

    if (!imageBase64) {
      return {
        success: false,
        error: 'No image base64 data returned from OpenAI',
      };
    }

    // Upload image to Supabase
    const uploadResult = await uploadImageToSupabase({
      imageBase64,
      bucketName,
    });

    if (!uploadResult.success) {
      return {
        success: false,
        error: uploadResult.error || 'Failed to upload image',
      };
    }

    return {
      success: true,
      imageUrl: uploadResult.imageUrl,
      fileName: uploadResult.fileName,
    };
  } catch (error) {
    console.error('❌ Image generation failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
