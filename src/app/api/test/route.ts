import { NextResponse } from 'next/server';
import { generateSuggestedQuestions } from '@/lib/modules/newsUpload/services/newsSuggestedQuestions';
import { v4 } from 'uuid';

export async function POST() {
  try {
    const parentTraceId = v4();
    const answer = `ILM flap and insertion techniques resulted in significantly higher macular hole closure rates and greater improvements in best-corrected visual acuity (BCVA) compared to ILM peeling in patients with macular hole-associated retinal detachment. The ILM flap technique provided superior functional recovery compared to the ILM insertion technique, particularly in terms of postoperative BCVA improvement. In eyes with non-high myopia (axial length <26 mm), the ILM flap technique showed better BCVA improvement than ILM peeling, though without additional anatomical benefit.

    For patients with macular hole-associated retinal detachment (MHRD) undergoing pars plana vitrectomy, the choice of internal limiting membrane (ILM) technique has a significant impact on both anatomical and functional outcomes. In a cohort of 288 patients, both ILM flap and insertion techniques were associated with higher initial macular hole closure rates and greater improvements in best-corrected visual acuity (BCVA) compared to traditional ILM peeling. Notably, the ILM flap technique demonstrated the most favorable functional recovery, outperforming the insertion method in terms of BCVA gains.
    
    These findings are particularly relevant for surgical planning in MHRD, especially in patients without high myopia (axial length <26 mm), where the ILM flap technique yielded better visual outcomes than peeling, though anatomical closure rates were similar. The evidence supports careful consideration of ILM technique selection to optimize both anatomical and visual prognosis in this patient population.`;

    const title =
      'Internal Limiting Membrane Flap and Insertion Techniques Improve Outcomes in Macular Hole-Associated Retinal Detachment';

    const a = await generateSuggestedQuestions({
      answer,
      parentTraceId,
      title,
    });

    console.log({ a });

    return NextResponse.json(
      {
        success: true,
        result: a,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('❌ Image generation failed:', error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}

// Also support GET requests for easy testing
export async function GET() {
  return POST();
}
