# Personalized Newsletter Configuration

## Required Environment Variables

Add these to your `.env.local` file:

```env
# Loops.so Configuration
LOOPS_API_KEY=35e7e030a65357c82e78505f686b06a9

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Base URL for unsubscribe links
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Setup Steps

1. **Upload MJML Template to Loops.so**
   - Use the `userNewsSelection/artifacts/index.mjml` file
   - The template uses Loops data variables: `{20250630_1_title}`, `{20250630_1_link}`, etc.
   - Also includes `{unsubscribe_link}` for the unsubscribe functionality
   - Upload as a **Transactional Email** (not Campaign) to support data variables
   - Publish the template and copy the transactional ID

2. **Create Required Contact Properties in Loops**
   The system will automatically create these properties when updating contacts:
   - `20250630_1_title` and `20250630_1_link` (personalized news 1)
   - `20250630_2_title` and `20250630_2_link` (personalized news 2)
   - `20250630_3_title` and `20250630_3_link` (personalized news 3)
   - `20250630_4_title` and `20250630_4_link` (universal news 1)
   - `20250630_5_title` and `20250630_5_link` (universal news 2)

3. **Database Setup**
   - Ensure you have a `news` table in Supabase with: `elements`, `news_date`, `url`, `tags`, `score`, `is_visible_in_prod`
   - Contacts will be fetched from Loops API (filtered by User Group = "ATS25")

4. **Test the New Personalized System**

   ```bash
   # Test mode - updates columns for jane@veracity-health.ai only (with lung_cancer + asthma tags)
   curl -X POST http://localhost:3000/api/generate-personalized-newsletters \
     -H "Content-Type: application/json" \
     -d '{"testMode": true}'

   # Production mode - processes all contacts with User Group = "ATS25"
   curl -X POST http://localhost:3000/api/generate-personalized-newsletters \
     -H "Content-Type: application/json" \
     -d '{}'
   ```

## How It Works

1. **Fetch Contacts**: Gets MDs from Loops API filtered by `userGroup = "ATS25"`
2. **Get Subtopics**: Calls ChatGPT (placeholder) to determine pulmonology interests for each MD
3. **Find News**: Queries Supabase for:
   - 3 personalized news items matching MD's interests (highest score + most recent)
   - 2 universal news items for "chronic_cough" and "shortness_of_breath"
4. **Update Loops**: Creates/updates contact properties with news titles and links
5. **Send Email**: Use Loops campaigns/transactional emails with the populated data variables

## Test User (Jane)

In test mode:

- **Email**: jane@veracity-health.ai
- **Tags**: lung_cancer, asthma
- **Gets**: 3 personalized + 2 universal news items
- **Result**: Loops contact properties updated with news data
