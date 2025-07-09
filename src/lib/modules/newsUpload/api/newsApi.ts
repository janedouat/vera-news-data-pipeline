import { supabase } from '@/lib/utils/supabaseHelpers';
import { Database } from '@/types/supabase';

type NewsRow = Database['public']['Tables']['news']['Insert'];

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
  // Check if a row with the same url and news_date already exists
  const { data: existing, error } = await supabase
    .from('news')
    .select('*')
    .eq('url', row.url)
    .eq('news_date', row.news_date)
    .maybeSingle();

  if (error) throw error;
  if (existing) {
    return { message: 'Row already exists for this url and date', existing };
  }

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

export async function checkNewsItemExists(
  url: string,
  newsDate: string,
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('id')
      .eq('url', url)
      .eq('news_date', newsDate)
      .maybeSingle();

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
