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
        try {
          console.log(
            `Processing topic ${index}: ${topic.substring(0, 50)}...`,
          );

          const { url } = await getUrl({ topic });
          console.log(`Got URL for topic ${index}: ${url}`);

          const { date } = await getDate({ topic, url, startDate });
          console.log(`Got date for topic ${index}: ${date}`);

          // Skip processing if date is too old
          if (date === 'too_old') {
            console.log(
              `Skipping topic ${index} in ${uploadId} as date is too old`,
            );
            return { status: 'skipped', reason: 'date_too_old' };
          }

          console.log(`Getting answer for topic ${index}...`);
          const { answer } = await getAnswer({ topic, url });
          console.log(`Got answer for topic ${index}`);

          console.log(`Getting specialties for topic ${index}...`);
          const { specialties } = await getSpecialties({ answer, specialty });
          console.log(`Got specialties for topic ${index}:`, specialties);

          const { tags } = subspecialtyTags?.length
            ? await getTags({ answer, tags: subspecialtyTags })
            : { tags: [] };
          console.log(`Got tags for topic ${index}:`, tags);

          console.log(`Getting score for topic ${index}...`);
          const { score } = await getScore({ answer, url, specialty });
          console.log(`Got score for topic ${index}: ${score}`);

          console.log(`Uploading topic ${index}...`);
          const result = await uploadTopic({
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
            is_visible_in_prod: true,
          });
          console.log(`Successfully uploaded topic ${index}`);

          return result;
        } catch (error) {
          console.error(`Error processing topic ${index}:`, error);
          throw error; // Re-throw to be caught by outer catch
        }
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
