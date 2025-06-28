import { ALL_SPECIALTIES, PhysicianSpecialty } from '@/types/taxonomy';
import { SubspecialtiesEnumMap } from '@/types/subspecialty_taxonomy';
import {
  getAnswer,
  getSpecialties,
  getTags,
  getDate,
  getUrl,
  uploadTopic,
  extractTopicsFromText,
  getScore,
} from '../topicProcessor';

// Define the type for the input
export type DeepSearchOutput = {
  unstructuredTopicList: string;
  specialty: PhysicianSpecialty;
  startDate: string;
  isInSupabase: string;
  model: string;
  tags: string[];
  uploadId: string;
};

// The helper function to process a single output
export async function processOneOutput(output: DeepSearchOutput) {
  try {
    if (output.isInSupabase == 'true') return { status: 'skipped' };

    const {
      unstructuredTopicList,
      specialty,
      startDate: startDateString,
      model,
      uploadId,
    } = output;

    if (!ALL_SPECIALTIES.includes(specialty)) {
      return { error: 'Request Specialty not correct', status: 400 };
    }

    const startDate = new Date(startDateString);
    if (!startDate.valueOf()) {
      return { error: 'Request StartDate not correct', status: 400 };
    }

    if (!unstructuredTopicList) {
      return { error: 'unstructuredTopicList is required', status: 400 };
    }

    const topics = await extractTopicsFromText(unstructuredTopicList);
    const subspecialtyTags = SubspecialtiesEnumMap?.[specialty];

    await Promise.all(
      topics.map(async (topic: string, index: number) => {
        const { url } = await getUrl({ topic });
        const { date } = await getDate({ topic, url, startDate });

        // Skip processing if date is too old
        if (date === 'too_old') {
          console.log(`Skipping topic "${topic}" as date is too old`);
          return { status: 'skipped', reason: 'date_too_old' };
        }

        const { answer } = await getAnswer({ topic, url });
        const { specialties } = await getSpecialties({ answer, specialty });
        const { tags } = subspecialtyTags?.length
          ? await getTags({ answer, tags: subspecialtyTags })
          : { tags: [] };
        const { score } = await getScore({ answer, url, specialty });

        return uploadTopic({
          index,
          date,
          url,
          specialty,
          specialties,
          tags,
          answer,
          score,
          model,
          uploadId,
          is_visible_in_prod: false,
        });
      }),
    );

    return { status: 'ok' };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : String(error),
      status: 500,
    };
  }
}
