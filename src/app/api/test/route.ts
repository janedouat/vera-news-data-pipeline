import { ALL_SPECIALTIES } from '@/types/taxonomy';

export async function POST() {
  const answer = {
    title:
      'EAST Guidelines: Efficacy and Safety of REBOA in Adult Hemorrhagic Shock Management',
    paragraphs: [
      'The EAST 2024 guideline reviews and synthesizes the available clinical evidence regarding the use of resuscitative endovascular balloon occlusion of the aorta (REBOA) for trauma patients with life-threatening subdiaphragmatic hemorrhage. While REBOA has shown a potential for improving early survival rates compared to open resuscitative thoracotomy, the supporting data remains low in quality, with significant uncertainty surrounding long-term outcomes and functional recovery. It is important to note that high complication rates—including vascular injury, ischemic events, and device-related failures—persist in observed clinical practice, especially in settings without dedicated trauma resources.',
      'For practicing clinicians, an understanding of both the technical and systemic factors influencing REBOA outcomes is paramount. The guidelines stress that successful implementation relies heavily on institutional readiness, including structured protocols and intensive multidisciplinary training. Any application of REBOA should account for the local context and available expertise, with ongoing evaluation of patient-centered outcomes and adverse events. Thus, while REBOA may offer an early survival benefit in select trauma populations, the procedural and operational risks remain notable and must be carefully balanced.',
    ],
    bullet_points: [
      'REBOA is conditionally recommended over resuscitative thoracotomy for adult trauma patients in profound hemorrhagic shock due to uncontrolled subdiaphragmatic hemorrhage, based on very low-quality evidence reporting improved early survival but uncertain long-term outcomes.',
      'Clinicians should recognize the increased risk of lower limb and solid organ ischemia, vascular complications, and technical failures associated with REBOA, which may be exacerbated outside of high-resource or trauma center settings.',
      'The guideline highlights the critical need for institutional protocols and specialized training to optimize patient selection and reduce adverse events associated with REBOA deployment.',
    ],
  };
  console.log(
    `Tag this answer with MD specialties that might be interested in reading it ${answer}, from the list of specialties, using the exact same words for them; only select the ones it's really clinical-practice changing for. List of specialties: ${ALL_SPECIALTIES.join()}`,
  );
  return Response.json({ message: 'ok' });
}
