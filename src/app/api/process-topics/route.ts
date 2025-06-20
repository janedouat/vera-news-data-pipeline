import { NextRequest, NextResponse } from 'next/server';
import { transformTopicsToStructuredList } from '@/lib/topicProcessor';

export async function POST(request: NextRequest) {
  try {
    const { unstructuredTopicList } = await request.json();

    if (!unstructuredTopicList) {
      return NextResponse.json(
        { error: 'unstructuredTopicList is required' },
        { status: 400 }
      );
    }

    const topics = await transformTopicsToStructuredList(unstructuredTopicList);

    
    return NextResponse.json(topics);
  } catch (error) {
    console.error('Error processing topics:', error);
    return NextResponse.json(
      { error: 'Failed to process topics' },
      { status: 500 }
    );
  }
} 