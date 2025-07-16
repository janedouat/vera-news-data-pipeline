import { NextResponse } from 'next/server';
import { validateContentSufficiency } from '@/lib/services/contentSufficiencyValidationService';

export async function POST() {
  try {
    const a = await validateContentSufficiency('test');
    console.log({ a });

    return NextResponse.json(
      {
        success: true,
        result: a,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
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
