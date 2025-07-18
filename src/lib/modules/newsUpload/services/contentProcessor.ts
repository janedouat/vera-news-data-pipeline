import { PhysicianSpecialty } from '@/types/taxonomy';
import { SubspecialtiesEnumMap } from '@/types/subspecialty_taxonomy';
import {
  getSpecialties,
  getSubspecialtyTags,
  getScore,
} from '../topicProcessor';
import { generateAndUploadImageWithRetry } from '@/lib/utils/imageGeneration';
import { generateSuggestedQuestions } from './newsSuggestedQuestions';
import { Article, insertNewsRow } from '../api/newsApi';
import { ScrapedContent } from '@/lib/utils/webScraper';

export interface ContentProcessorInput {
  scrapedContent: ScrapedContent;
  answer: {
    title: string;
    bullet_points: string[];
    paragraphs: string[];
  };
  url: string;
  date: string;
  uploadId: string;
  traceId: string;
  doi?: string;
  references?: Article[];
  detectedNewsType?: string;
  source?: string;
  uniqueId: string;
}

export interface ContentProcessorResult {
  status: 'success' | 'skipped' | 'error';
  reason?: string;
  processedCount?: number;
  errorCategory?: 'api_connection' | 'rate_limit' | 'validation' | 'unknown';
}

/**
 * Common pipeline for processing scraped content through:
 * Content Validation → Topic Processing → DB Insert
 */
export async function processScrapedContent(
  input: ContentProcessorInput,
): Promise<ContentProcessorResult> {
  try {
    const {
      scrapedContent,
      answer,
      url,
      date,
      uploadId,
      source,
      traceId,
      doi,
      references,
      detectedNewsType,
      uniqueId,
    } = input;

    // Step 1: Content Validation (already done, using provided answer)
    const stringifiedAnswer = JSON.stringify(answer);

    // Step 3: Specialty Detection
    const { specialties } = await getSpecialties({
      answer: stringifiedAnswer,
    });

    // Step 4: Subspecialty Tagging
    const allSubspecialties = specialties
      .map(
        (specialty) =>
          SubspecialtiesEnumMap?.[specialty as PhysicianSpecialty] || [],
      )
      .flat();

    const { tags: allTags } = await getSubspecialtyTags({
      answer: stringifiedAnswer,
      tags: allSubspecialties,
    });

    const tags = [...new Set(allTags)];

    // Step 5: Scoring
    const specialtyScores: Record<string, number> = {};
    for (const foundSpecialty of specialties) {
      const { score } = await getScore({
        answer: stringifiedAnswer,
        url,
        specialty: foundSpecialty as PhysicianSpecialty,
      });
      specialtyScores[foundSpecialty] = score;
    }
    const score = Math.max(...Object.values(specialtyScores));

    // Step 6: Image Generation
    const extractedImageUrl = scrapedContent.image_url ?? undefined;
    const extractedImageDescription =
      scrapedContent.image_description ?? undefined;

    const { imageUrl } = await generateAndUploadImageWithRetry({
      prompt: `Can you create an illustration for the article '${answer.title}'. The illustration contains exactly three simple icons representing key concepts of the article. The background is monochrome. The colors should mostly be grey blue white and black and the turquoise #1b779b. No text`,
      size: '1536x1024',
      quality: 'medium',
      model: 'gpt-image-1',
      bucketName: 'news-images',
    });

    // Step 7: Suggested Questions Generation
    const { suggestedQuestions } = await generateSuggestedQuestions({
      answer: stringifiedAnswer,
      title: answer.title,
      parentTraceId: traceId,
    });

    // Step 8: Database Insert
    await insertNewsRow({
      news_date: date,
      url,
      specialties,
      tags,
      elements: answer,
      score,
      upload_id: uploadId,
      is_visible_in_prod: false,
      source,
      scores: specialtyScores,
      extracted_image_url: extractedImageUrl,
      extracted_image_description: extractedImageDescription,
      imageUrl,
      news_type: detectedNewsType,
      doi,
      news_date_timestamp: new Date(date).toISOString(),
      suggested_questions: suggestedQuestions,
      references,
      unique_id: uniqueId,
    });

    console.log(`✅ Successfully processed content: ${answer.title}`);

    return { status: 'success', processedCount: 1 };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`❌ Error processing content:`, error);

    // Error categorization logic (can be extracted to a separate utility if needed)
    let errorCategory:
      | 'api_connection'
      | 'rate_limit'
      | 'validation'
      | 'unknown' = 'unknown';

    const errorLower = errorMessage.toLowerCase();
    if (
      errorLower.includes('network') ||
      errorLower.includes('connection') ||
      errorLower.includes('timeout')
    ) {
      errorCategory = 'api_connection';
    } else if (
      errorLower.includes('rate limit') ||
      errorLower.includes('429')
    ) {
      errorCategory = 'rate_limit';
    } else if (
      errorLower.includes('validation') ||
      errorLower.includes('parse')
    ) {
      errorCategory = 'validation';
    }

    return {
      status: 'error',
      reason: errorMessage,
      errorCategory,
    };
  }
}
