import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { uploadFile, getFileUrl } from '@/lib/utils/supabaseHelpers';
import { v4 as uuidv4 } from 'uuid';
import { generateAndUploadImage } from '@/lib/utils/imageGeneration';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
  try {
    await generateAndUploadImage({
      prompt: 'A beautiful sunset over a calm ocean',
      bucketName: 'news-images',
    });
    console.log('🎨 Starting OpenAI image generation test...');

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 },
      );
    }

    const article =
      'GI Highlights from the Literature: Recent Advances and Clinical Implications in Gastroenterology (July 2025)';
    const prompt = `Can you create an illustration for the article '${article}. The illustration contains exactly three simple icons representing key concepts of the article. The background is monochrome. The colors should mostly be grey blue white and black and the turquoise #1b779b. No text`;

    // Generate image using gpt-image-1
    const response = await openai.images.generate({
      model: 'gpt-image-1',
      prompt: prompt,
      n: 1,
      size: '1536x1024',
      quality: 'medium',
    });

    // Check if response data exists
    if (!response.data || response.data.length === 0) {
      throw new Error('No image data returned from OpenAI');
    }

    const imageData = response.data[0];

    const imageBase64 = imageData?.b64_json;

    if (!imageBase64) {
      throw new Error('No image data returned from OpenAI');
    }

    let supabaseUrl = null;

    // Upload to Supabase bucket
    if (imageBase64) {
      const imageId = uuidv4();
      const fileName = `${imageId}.png`;

      // Debug: Log the generated UUID
      console.log('🔍 Generated UUID:', imageId);
      console.log('📁 Generated filename:', fileName);

      // Convert base64 to buffer
      const imageBuffer = Buffer.from(imageBase64, 'base64');

      try {
        const uploadResult = await uploadFile(
          'news-images',
          fileName,
          imageBuffer,
          {
            contentType: 'image/png',
            upsert: true,
          },
        );

        console.log('📤 Image uploaded to Supabase:', uploadResult);

        // Get the public URL
        supabaseUrl = await getFileUrl('news-images', fileName);
        console.log('🌐 Supabase public URL:', supabaseUrl);
      } catch (supabaseError) {
        console.error('❌ Failed to upload to Supabase:', supabaseError);
        // Continue without failing - we still have the local file
      }
    }

    return NextResponse.json({
      success: true,
      imageBase64: imageBase64,
      supabaseUrl: supabaseUrl,
      prompt: prompt,
      model: 'gpt-image-1',
      size: '1536x1024',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Image generation failed:', error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}

// Also support GET requests for easy testing
export async function GET() {
  return POST();
}
