const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUploads() {
  try {
    console.log('🔍 Checking for pulmo_tags_test_1_lancet uploads...\n');

    // Check for records with the specific upload_id
    const { data: records, error } = await supabase
      .from('news')
      .select('*')
      .eq('upload_id', 'pulmo_tags_test_1_lancet')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error querying Supabase:', error);
      return;
    }

    if (records && records.length > 0) {
      console.log(
        `✅ Found ${records.length} records with upload_id 'pulmo_tags_test_1_lancet':\n`,
      );

      records.forEach((record, index) => {
        console.log(`Record ${index + 1}:`);
        console.log(`  ID: ${record.id}`);
        console.log(`  URL: ${record.url}`);
        console.log(`  Date: ${record.news_date}`);
        console.log(`  Newsletter Title: ${record.newsletter_title || 'N/A'}`);
        console.log(`  Score: ${record.score}`);
        console.log(`  Tags: ${record.tags ? record.tags.join(', ') : 'None'}`);
        console.log(`  Created: ${record.created_at}`);
        console.log(`  Visible in Prod: ${record.is_visible_in_prod}`);
        console.log(`  Model: ${record.selecting_model}`);
        console.log('');
      });
    } else {
      console.log(
        '❌ No records found with upload_id "pulmo_tags_test_1_lancet"',
      );

      // Check if there are any records at all
      const { data: allRecords, error: allError } = await supabase
        .from('news')
        .select('upload_id')
        .order('created_at', { ascending: false })
        .limit(10);

      if (allError) {
        console.error('Error checking all records:', allError);
      } else {
        console.log('\n📋 Recent upload_ids in the database:');
        const uniqueUploadIds = [
          ...new Set(allRecords.map((r) => r.upload_id)),
        ];
        uniqueUploadIds.forEach((id) => {
          console.log(`  - ${id || 'NULL'}`);
        });
      }
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

checkUploads();
