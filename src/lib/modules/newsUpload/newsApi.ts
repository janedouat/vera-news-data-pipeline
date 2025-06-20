import { insertNewsRow } from './topicProcessor';
import { supabase } from './supabaseClient'; // Adjust path as needed

// Define the type for the news row (adjust as needed for your schema)
interface NewsRow {
  elements: any;
  news_date: string;
  news_type: string;
  score: number;
  specialties: string[];
  ranking_model_ranking: number;
  url: string;
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
