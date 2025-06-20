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
