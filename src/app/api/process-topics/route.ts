import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import {
  addAnswersToTopicList,
  addSyptomsToTopicLIst as addSpecialtiesToTopicLIst,
  addUrlsAndDateToTopicList,
  getTags,
  transformTopicsToStructuredList,
  uploadTopics,
} from '@/lib/modules/newsUpload/topicProcessor';
import {
  ALL_SPECIALTIES,
  PhysicianSpecialty,
  Specialty,
} from '@/types/taxonomy';
import { SubspecialtiesEnumMap } from '@/types/subspecialty_taxonomy';

// TODO
// 1) compute scores
// 2) store DOIs and make sure there are no other papers for the same DOI that day? (how can you identify drugs updates? drug name?)
// 2) refacto to map once and apply all functions to unique topics

type DeepSearchOutput = {
  unstructuredTopicList: string;
  specialty: PhysicianSpecialty;
  startDate: string;
  isInSupabase: string;
  model: string;
  tags: string[];
  uploadId: string;
};

export async function POST(request: NextRequest) {
  try {
    const deepSearchOutputs = (await request.json()).outputs;

    await deepSearchOutputs.map(async (output: DeepSearchOutput) => {
      if (output.isInSupabase == 'true') {
        return 'ok';
      }

      const {
        unstructuredTopicList,
        specialty,
        startDate: startDateString,
        model,
      } = output;

      if (!ALL_SPECIALTIES.includes(specialty)) {
        return NextResponse.json(
          { error: 'Request Specialty not correct' },
          { status: 400 },
        );
      }

      const startDate = new Date(startDateString);
      if (!startDate.valueOf()) {
        return NextResponse.json(
          { error: 'Request StartDate not correct' },
          { status: 400 },
        );
      }

      if (!unstructuredTopicList) {
        return NextResponse.json(
          { error: 'unstructuredTopicList is required' },
          { status: 400 },
        );
      }

      const topics = await transformTopicsToStructuredList(
        unstructuredTopicList,
      );
      const topicsWithUrls = await addUrlsAndDateToTopicList({
        topics,
        startDate,
      });

      const topicsWithAnswers = await addAnswersToTopicList({
        topics: topicsWithUrls,
        specialty,
      });

      const topicsWithSpecialties = await addSpecialtiesToTopicLIst({
        topics: topicsWithAnswers,
        specialty,
      });

      const subspecialtyTags = SubspecialtiesEnumMap?.[output.specialty];
      const withTags = subspecialtyTags?.length
        ? await Promise.all(
            topicsWithSpecialties.map(async (topic) => {
              const clinical_interests = await getTags({
                answer: topic.answer,
                tags: subspecialtyTags,
              });
              return { ...topic, tags: clinical_interests };
            }),
          )
        : topicsWithSpecialties;

      await uploadTopics({
        topics: withTags,
        specialty,
        model,
        uploadId: output.uploadId,
        is_visible_in_prod: false,
      });

      return 'ok';
    });

    return NextResponse.json('ok');
  } catch (error) {
    console.error('Error processing topics:', error);
    return NextResponse.json(
      { error: 'Failed to process topics' },
      { status: 500 },
    );
  }
}
