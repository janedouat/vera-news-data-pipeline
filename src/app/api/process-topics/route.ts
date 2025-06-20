import { NextRequest, NextResponse } from 'next/server';
import { addAnswerToTopicList, addUrlsToTopicList, transformTopicsToStructuredList } from '@/lib/topicProcessor';

const SPECIALTY = "EM" //todo make parameter

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
    const topicsWithAnswers = await addAnswerToTopicList({topics: topicsWithUrls, specialty: SPECIALTY})

    return NextResponse.json(topicsWithAnswers);
  } catch (error) {
    console.error('Error processing topics:', error);
    return NextResponse.json(
      { error: 'Failed to process topics' },
      { status: 500 }
    );
  }
} 