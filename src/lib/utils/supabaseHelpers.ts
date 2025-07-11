import { createClient } from '@supabase/supabase-js';
import { BucketName } from '../constants/buckets';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Create admin client for file uploads if service role key is available
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdmin = serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey)
  : null;

export async function insertRow(table: string, row: Record<string, unknown>) {
  const { data, error } = await supabase.from(table).insert([row]);
  if (error) throw error;
  return data;
}

export async function getRows(
  table: string,
  filter: Record<string, unknown> = {},
) {
  let query = supabase.from(table).select('*');
  Object.entries(filter).forEach(([key, value]) => {
    query = query.eq(key, value);
  });
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function uploadFile(
  bucketName: BucketName,
  filePath: string,
  fileBuffer: Buffer,
  options: {
    contentType?: string;
    upsert?: boolean;
  } = {},
) {
  // Use admin client if available, fallback to regular client
  const client = supabaseAdmin || supabase;

  const { data, error } = await client.storage
    .from(bucketName)
    .upload(filePath, fileBuffer, {
      contentType: options.contentType || 'application/octet-stream',
      upsert: options.upsert || false,
    });

  if (error) throw error;
  return data;
}

export async function getFileUrl(bucketName: BucketName, filePath: string) {
  // Use admin client if available, fallback to regular client
  const client = supabaseAdmin || supabase;
  const { data } = client.storage.from(bucketName).getPublicUrl(filePath);
  return data.publicUrl;
}
