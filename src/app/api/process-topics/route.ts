import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import {
  getAnswer,
  getSpecialties as getSpecialties,
  getTags,
  getDate,
  getUrl,
  uploadTopic,
  extractTopicsFromText,
} from '@/lib/modules/newsUpload/topicProcessor';
import { ALL_SPECIALTIES, PhysicianSpecialty } from '@/types/taxonomy';
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

      const topics = await extractTopicsFromText(unstructuredTopicList);

      const subspecialtyTags = SubspecialtiesEnumMap?.[output.specialty];

      await Promise.all(
        topics.map(async (topic: string, index: number) => {
          const { url } = await getUrl({ topic });
          const { date } = await getDate({ topic, url, startDate });
          const { answer } = await getAnswer({
            topic,
            url,
          });
          const { specialties } = await getSpecialties({
            answer,
            specialty,
          });
          const { tags } = subspecialtyTags?.length
            ? await getTags({
                answer,
                tags: subspecialtyTags,
              })
            : { tags: [] };

          return uploadTopic({
            answer,
            date,
            index,
            specialties,
            tags,
            url,
            specialty,
            model,
            uploadId: output.uploadId,
            is_visible_in_prod: false,
          });
        }),
      );

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
