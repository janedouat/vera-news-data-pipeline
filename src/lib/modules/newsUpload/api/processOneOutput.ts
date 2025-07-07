import { ALL_SPECIALTIES, PhysicianSpecialty } from '@/types/taxonomy';
import { SubspecialtiesEnumMap } from '@/types/subspecialty_taxonomy';
import {
  getAnswer,
  getSpecialties,
  getTags,
  getDate,
  getUrl as getUrlFromPerplexity,
  uploadTopic,
  extractTopicsFromText,
  getScore,
} from '../topicProcessor';
import { searchLancetRssForTopic } from '@/lib/utils/lancetRssSearch';

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
          // First try to find the topic in RSS feeds
          let url = 'no_url';

          const rssResult = await searchLancetRssForTopic(topic);

          url = rssResult?.url ?? (await getUrlFromPerplexity({ topic })).url;

          // Skip processing if no URL found
          if (url === 'no_url') {
            console.log(
              `Skipping topic ${index + 1} because no URL found: "${topic}"`,
            );
            return { status: 'skipped', reason: 'no_url' };
          }

          const date = rssResult?.date
            ? new Date(rssResult?.date).toISOString().slice(0, 10)
            : (await getDate({ topic, url, startDate })).date;

          // Skip processing if date is too old
          if (date === 'too_old') {
            console.log(
              `Skipping topic ${index} because date is too old; url:${url}`,
            );
            return { status: 'skipped', reason: 'date_too_old' };
          }

          const { answer } = await getAnswer({ topic, url });

          const { specialties } = await getSpecialties({ answer, specialty });

          const { tags } = subspecialtyTags?.length
            ? await getTags({ answer, tags: subspecialtyTags })
            : { tags: [] };

          const { score } = await getScore({ answer, url, specialty });

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
