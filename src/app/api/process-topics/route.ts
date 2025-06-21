import { NextRequest, NextResponse } from 'next/server';
import {
  addAnswersToTopicList,
  addSyptomsToTopicLIst,
  addUrlsAndDateToTopicList,
  transformTopicsToStructuredList,
  uploadTopics,
} from '@/lib/modules/newsUpload/topicProcessor';
import { PhysicianSpecialty } from '../../../types/taxonomy';

// TODO
// 1) compute scores
// 2) store DOIs and make sure there are no other papers for the same DOI that day? (how can you identify drugs updates? drug name?)
// 2) refacto to map once and apply all functions to unique topics

export async function POST(request: NextRequest) {
  try {
    const specialty = PhysicianSpecialty.EMERGENCY_MEDICINE;

    const { unstructuredTopicList } = await request.json();

    if (!unstructuredTopicList) {
      return NextResponse.json(
        { error: 'unstructuredTopicList is required' },
        { status: 400 },
      );
    }

    const topics = await transformTopicsToStructuredList(unstructuredTopicList);
    const topicsWithUrls = await addUrlsAndDateToTopicList(topics);
    const topicsWithAnswers = await addAnswersToTopicList({
      topics: topicsWithUrls,
      specialty,
    });

    const topicsWithSpecialties = await addSyptomsToTopicLIst({
      topics: topicsWithAnswers,
    });

    const answer = await uploadTopics({
      topics: topicsWithSpecialties,
      specialty,
    });

    return NextResponse.json(answer);
  } catch (error) {
    console.error('Error processing topics:', error);
    return NextResponse.json(
      { error: 'Failed to process topics' },
      { status: 500 },
    );
  }
}
