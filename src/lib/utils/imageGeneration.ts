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

    // Generate unique filename
    const imageId = uuidv4();
    const fileName = `${imageId}.png`;

    console.log('🔍 Generated UUID:', imageId);
    console.log('📁 Generated filename:', fileName);

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(imageBase64, 'base64');

    // Upload to Supabase
    const uploadResult = await uploadFile(bucketName, fileName, imageBuffer, {
      contentType: 'image/png',
      upsert: true,
    });

    console.log('📤 Image uploaded to Supabase:', uploadResult);

    // Get the public URL
    const imageUrl = await getFileUrl(bucketName, fileName);
    console.log('🌐 Supabase public URL:', imageUrl);

    return {
      success: true,
      imageUrl,
      fileName,
    };
  } catch (error) {
    console.error('❌ Image generation failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
