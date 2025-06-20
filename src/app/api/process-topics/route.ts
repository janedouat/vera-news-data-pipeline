import { NextRequest, NextResponse } from 'next/server';
import { addAnswersToTopicList, addSyptomsToTopicLIst, addUrlsToTopicList, transformTopicsToStructuredList } from '@/lib/modules/newsUpload/topicProcessor';
import {PhysicianSpecialty} from '../../../types/taxonomy';

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
    const topicsWithUrls = await addUrlsToTopicList(topics)  //todo get correct date here too 
    const topicsWithAnswers = await addAnswersToTopicList({topics: topicsWithUrls, specialty: PhysicianSpecialty.EMERGENCY_MEDICINE})
    const topicsWithSyptoms = await addSyptomsToTopicLIst({topics: topicsWithAnswers})

    return NextResponse.json(topicsWithSyptoms);
  } catch (error) {
    console.error('Error processing topics:', error);
    return NextResponse.json(
      { error: 'Failed to process topics' },
      { status: 500 }
    );
  }
} 