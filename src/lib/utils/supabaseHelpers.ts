import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function insertRow(table: string, row: Record<string, any>) {
  const { data, error } = await supabase.from(table).insert([row]);
  if (error) throw error;
  return data;
}

export async function getRows(table: string, filter: Record<string, any> = {}) {
  let query = supabase.from(table).select('*');
  Object.entries(filter).forEach(([key, value]) => {
    query = query.eq(key, value);
  });
  const { data, error } = await query;
  if (error) throw error;
  return data;
}
