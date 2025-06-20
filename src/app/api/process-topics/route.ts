import { NextRequest, NextResponse } from 'next/server';
import {
  addAnswersToTopicList,
  addSyptomsToTopicLIst,
  addUrlsAndDateToTopicList,
  transformTopicsToStructuredList,
  uploadTopics,
} from '@/lib/modules/newsUpload/topicProcessor';
import { PhysicianSpecialty } from '../../../types/taxonomy';

export async function POST(request: NextRequest) {
  try {
    const { unstructuredTopicList } = await request.json();

    if (!unstructuredTopicList) {
      return NextResponse.json(
        { error: 'unstructuredTopicList is required' },
        { status: 400 },
      );
    }

    const topics = await transformTopicsToStructuredList(unstructuredTopicList);
    const topicsWithUrls = await addUrlsAndDateToTopicList(topics); //todo get correct date here too
    const topicsWithAnswers = await addAnswersToTopicList({
      topics: topicsWithUrls,
      specialty: PhysicianSpecialty.EMERGENCY_MEDICINE,
    });

    const topicsWithSpecialties = await addSyptomsToTopicLIst({
      topics: topicsWithAnswers,
    });
    const answer = await uploadTopics({ topics: topicsWithSpecialties });

    return NextResponse.json(answer);
  } catch (error) {
    console.error('Error processing topics:', error);
    return NextResponse.json(
      { error: 'Failed to process topics' },
      { status: 500 },
    );
  }
}
