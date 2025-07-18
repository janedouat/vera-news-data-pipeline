import { supabase } from '@/lib/utils/supabaseHelpers';
import { Database } from '@/types/supabase';
import crypto from 'crypto';

type SupabaseNewsRow = Database['public']['Tables']['news']['Insert'];

export type Article = {
  paperId: string;
  sjr?: number;
  quartile?: string;
  relevanceScore?: number;
  metadata?: {
    is_guideline?: string;
    url?: string;
    pmid?: string;
    doi?: string;
    year?: string;
    title?: string;
    journal?: string;
    first_author?: string;
    num_citations?: string;
    is_open_access?: string;
    fields_of_study?: string[];
    publication_types?: string;
    num_influential_citations?: string;
    impact_factor_score?: string;
  };
  externalIds?: {
    PubMedCentral?: string;
    DOI?: string;
    CorpusId?: number;
    PubMed?: string;
    [key: string]: string | number | undefined;
  };
  publicationVenue?: {
    id?: string;
    name: string;
    type?: string;
    issn?: string;
    url?: string;
    alternate_urls?: string[];
  };
  url?: string;
  title: string;
  abstract?: string;
  tldr?: {
    text: string;
  };
  year?: number;
  referenceCount?: number;
  citationCount?: number;
  influentialCitationCount?: number;
  isOpenAccess?: boolean;
  openAccessPdf?: {
    url: string;
    status: string;
  };
  publicationTypes?: string[];
  publicationDate?: string;
  authors?: {
    authorId?: string;
    name: string;
  }[];
};

type NewsRow = SupabaseNewsRow & { references?: Article[] | null };

export async function insertNewsRow(row: NewsRow) {
  const { data, error } = await supabase
    .from('news')
    .insert([row])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function uploadNewsRow(row: NewsRow) {
  return insertNewsRow(row);
}

export async function getUserNewsRows(
  userTags: string[],
  limit: number,
  testMode: boolean = false,
  dateLimit?: string,
) {
  try {
    // Start building the query
    let query = supabase.from('news').select('*').overlaps('tags', userTags); // Filter where news tags overlap with user tags

    // If not in test mode, only get articles visible in production
    if (!testMode) {
      query = query.eq('is_visible_in_prod', true);
    }

    // Add date limit filter if provided
    if (dateLimit) {
      const dateLimitTimestamp = new Date(dateLimit).getTime().toString();
      query = query.lte('news_date_timestamp', dateLimitTimestamp);
    }

    // Sort by score descending, then by date timestamp descending (more precise than news_date)
    query = query
      .order('score', { ascending: false })
      .order('news_date_timestamp', { ascending: false })
      .limit(limit);

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching user news rows:', error);
    throw new Error(
      `Failed to fetch news for user tags: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

export async function getNewsRowsByIds(
  ids: string[],
  testMode: boolean = false,
) {
  try {
    // Start building the query
    let query = supabase.from('news').select('*').in('id', ids);

    // If not in test mode, only get articles visible in production
    if (!testMode) {
      query = query.eq('is_visible_in_prod', true);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching news rows by IDs:', error);
    throw new Error(
      `Failed to fetch news by IDs: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

export async function checkNewsItemExist(uniqueId: string): Promise<boolean> {
  try {
    const query = supabase.from('news').select('id').eq('unique_id', uniqueId);

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error('Error checking for duplicate news item:', error);
      return false; // Return false on error to continue processing
    }

    return !!data;
  } catch (error) {
    console.error('Error in checkNewsItemExists:', error);
    return false; // Return false on error to continue processing
  }
}

export async function updateNewsWithSuggestedQuestions(
  newsId: string,
  suggestedQuestions: string[],
): Promise<void> {
  try {
    const { error } = await supabase
      .from('news')
      .update({ suggested_questions: suggestedQuestions })
      .eq('id', newsId);

    if (error) {
      console.error('Error updating news with suggested questions:', error);
      throw error;
    }

    console.log(
      `✅ Successfully updated news ${newsId} with suggested questions`,
    );
  } catch (error) {
    console.error('Failed to update news with suggested questions:', error);
    throw error;
  }
}

/**
 * Generates a deterministic unique ID for news items based on content characteristics
 * Accepts either DOI or URL+newsDate combination
 */
export function generateUniqueNewsId(
  input: { doi: string } | { url: string; newsDate: string },
): string {
  // Priority 1: Use DOI if provided
  if ('doi' in input && input.doi?.trim()) {
    const cleanDoi = input.doi.trim().toLowerCase().replace(/^doi:/, '');
    return `doi-${crypto.createHash('sha256').update(cleanDoi).digest('hex').substring(0, 16)}`;
  }

  // Priority 2: Use URL + Date if provided
  if ('url' in input && input.url?.trim()) {
    const cleanUrl = input.url.trim().toLowerCase();
    const urlDateString = `${cleanUrl}|${input.newsDate}`;
    return `url-${crypto.createHash('sha256').update(urlDateString).digest('hex').substring(0, 16)}`;
  }

  throw new Error(
    'No unique ID generated - must provide either DOI or URL+newsDate',
  );
}

/**
 * Enhanced duplicate checking using the deterministic unique ID
 */
export async function checkNewsItemExistsByUniqueId(
  uniqueId: string,
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('id')
      .eq('unique_id', uniqueId)
      .maybeSingle();

    if (error) {
      console.error(
        'Error checking for duplicate news item by unique_id:',
        error,
      );
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error in checkNewsItemExistsByUniqueId:', error);
    return false;
  }
}
