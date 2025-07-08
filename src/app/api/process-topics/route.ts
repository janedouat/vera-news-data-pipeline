import { NextRequest, NextResponse } from 'next/server';
import {
  processTopicList,
  DeepSearchOutput,
} from '@/lib/modules/newsUpload/api/processOneOutput';

// TODO
// 1) store DOIs and make sure there are no other papers for the same DOI that day? (how can you identify drugs updates? drug name?)
// 2) store one score per specialty? right now only computed for the specialty in the input data (not the additional tagged specialties)
// 3) tags are only added for the input data specialty (not the additional tagged specialties)

export async function POST(request: NextRequest) {
  try {
    const deepSearchOutputs = (await request.json()).outputs;

    // Process all outputs in parallel using the helper
    const results = await Promise.all(
      deepSearchOutputs.map((output: DeepSearchOutput) =>
        processTopicList(output),
      ),
    );

    // Check for errors
    const errors = results.filter((r) => r.error);
    if (errors.length > 0) {
      // Return the first error (or aggregate as needed)
      return NextResponse.json(errors[0], { status: errors[0].status });
    }

    return NextResponse.json('ok');
  } catch (error) {
    console.error('Error processing topics:', error);
    return NextResponse.json(
      { error: 'Failed to process topics' },
      { status: 500 },
    );
  }
}
