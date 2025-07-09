import {
  getAnswer,
  getSubspecialtyTags,
} from '@/lib/modules/newsUpload/topicProcessor';
import { SubspecialtiesEnumMap } from '@/types/subspecialty_taxonomy';
import { PhysicianSpecialty } from '@/types/taxonomy';

export async function POST() {
  const { answer } = await getAnswer({
    topic:
      'Practice-changing evidence for low-risk differentiated thyroid cancer',
    url: 'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(25)00781-0/abstract',
    text: 'Worldwide, the incidence of thyroid cancer is increasing, with 586 202 new cases diagnosed in 2020. In high-income countries, the majority of these cases are early-stage cancers detected mainly by the use of ultrasound. For low-risk cancers, defined as tumours that are stage T1 or T2 and nodal status N0 (no evidence of regional nodal involvement) or Nx (involvement of regional lymph nodes that cannot be assessed in the absence of neck dissection) without suspicious lymph nodes on ultrasound, the estimated recurrence rate is less than 5% and the disease-specific mortality rate is less than 1%.',
  });

  const allSubspecialties = ['Cardiology', 'Pulmonology']
    .map(
      (specialty) =>
        SubspecialtiesEnumMap?.[specialty as PhysicianSpecialty] || [],
    )
    .flat();

  const { tags } = await getSubspecialtyTags({
    answer,
    tags: allSubspecialties,
  });

  console.log({ tags });

  return Response.json({ message: 'ok' });
}
