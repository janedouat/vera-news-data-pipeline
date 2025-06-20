import { NextRequest, NextResponse } from 'next/server';
import { addUrlsToTopicList, transformTopicsToStructuredList } from '@/lib/topicProcessor';

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
    const topicsWithUrls = await addUrlsToTopicList(topics)
    
    return NextResponse.json(topicsWithUrls);
  } catch (error) {
    console.error('Error processing topics:', error);
    return NextResponse.json(
      { error: 'Failed to process topics' },
      { status: 500 }
    );
  }
} 