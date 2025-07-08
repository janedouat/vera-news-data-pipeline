import { PhysicianSpecialty } from '@/types/taxonomy';

export interface RssFeedConfig {
  url: string;
  group: string; // the short-form journal name
  name: string; // the full journal name
  specialty?: PhysicianSpecialty;
}

export const RSS_FEEDS: RssFeedConfig[] = [
  // Lancet: "current" rss feeds
  {
    url: 'https://www.thelancet.com/rssfeed/lancet_current.xml',
    group: 'Lancet',
    name: 'Lancet',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanonc_current.xml',
    group: 'Lancet',
    name: 'Lancet Oncology',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laninf_current.xml',
    group: 'Lancet',
    name: 'Lancet Infectious Diseases',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laneur_current.xml',
    group: 'Lancet',
    name: 'Lancet Neurology',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanpsy_current.xml',
    group: 'Lancet',
    name: 'Lancet Psychiatry',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanrhe_current.xml',
    group: 'Lancet',
    name: 'Lancet Rheumatology',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/langas_current.xml',
    group: 'Lancet',
    name: 'Lancet Gastroenterology & Hepatology',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanhae_current.xml',
    group: 'Lancet',
    name: 'Lancet Haematology',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanres_current.xml',
    group: 'Lancet',
    name: 'Lancet Respiratory Medicine',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanpub_current.xml',
    group: 'Lancet',
    name: 'Lancet Public Health',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanplh_current.xml',
    group: 'Lancet',
    name: 'Lancet Planetary Health',
  },
  //   {
  //     url: 'https://www.thelancet.com/rssfeed/lanam_current.xml',
  //     group: 'Lancet',
  //     name: 'Lancet Americas',
  //   },
  {
    url: 'https://www.thelancet.com/rssfeed/lanchi_current.xml',
    group: 'Lancet',
    name: 'Lancet Child & Adolescent Health',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanwh_current.xml',
    group: 'Lancet',
    name: 'Lancet Global Health',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanmic_current.xml',
    group: 'Lancet',
    name: 'EClinicalMedicine (Lancet)',
  },
  //   {
  //     url: 'https://www.thelancet.com/rssfeed/lanjpx_current.xml',
  //     group: 'Lancet',
  //     name: 'Lancet Regional Health – Western Pacific',
  //   },
  {
    url: 'https://www.thelancet.com/rssfeed/lanme_current.xml',
    group: 'Lancet',
    name: 'Lancet Microbe',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanexo_current.xml',
    group: 'Lancet',
    name: 'Lancet Healthy Longevity',
  },

  // Lancet: "first online" rss feeds
  {
    url: 'https://www.thelancet.com/rssfeed/lancet_online.xml',
    group: 'Lancet',
    name: 'Lancet',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanonc_online.xml',
    group: 'Lancet',
    name: 'Lancet Oncology',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laninf_online.xml',
    group: 'Lancet',
    name: 'Lancet Infectious Diseases',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laneur_online.xml',
    group: 'Lancet',
    name: 'Lancet Neurology',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanpsy_online.xml',
    group: 'Lancet',
    name: 'Lancet Psychiatry',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanrhe_online.xml',
    group: 'Lancet',
    name: 'Lancet Rheumatology',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/langas_online.xml',
    group: 'Lancet',
    name: 'Lancet Gastroenterology & Hepatology',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanhae_online.xml',
    group: 'Lancet',
    name: 'Lancet Haematology',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanres_online.xml',
    group: 'Lancet',
    name: 'Lancet Respiratory Medicine',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanpub_online.xml',
    group: 'Lancet',
    name: 'Lancet Public Health',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanplh_online.xml',
    group: 'Lancet',
    name: 'Lancet Planetary Health',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanam_online.xml',
    group: 'Lancet',
    name: 'Lancet Americas',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanchi_online.xml',
    group: 'Lancet',
    name: 'Lancet Child & Adolescent Health',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanwh_online.xml',
    group: 'Lancet',
    name: 'Lancet Global Health',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanmic_online.xml',
    group: 'Lancet',
    name: 'EClinicalMedicine (Lancet)',
  },
  //   {
  //     url: 'https://www.thelancet.com/rssfeed/lanjpx_online.xml',
  //     group: 'Lancet',
  //     name: 'Lancet Regional Health – Western Pacific',
  //   },
  {
    url: 'https://www.thelancet.com/rssfeed/lanme_online.xml',
    group: 'Lancet',
    name: 'Lancet Microbe',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanexo_online.xml',
    group: 'Lancet',
    name: 'Lancet Healthy Longevity',
  },
  // NEJM
  {
    url: 'https://www.thelancet.com/rssfeed/lancet_current.xml',
    group: 'NEJM',
    name: '',
    specialty: PhysicianSpecialty.OTHER,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanonc_current.xml',
    group: 'NEJM',
    name: '',
    specialty: PhysicianSpecialty.ONCOLOGY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laninf_current.xml',
    group: 'NEJM',
    name: '',
    specialty: PhysicianSpecialty.INFECTIOUS_DISEASE,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laneur_current.xml',
    group: 'NEJM',
    name: '',
    specialty: PhysicianSpecialty.NEUROLOGY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanpsy_current.xml',
    group: 'NEJM',
    name: '',
    specialty: PhysicianSpecialty.PSYCHIATRY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanrhe_current.xml',
    group: 'NEJM',
    name: '',
    specialty: PhysicianSpecialty.RHEUMATOLOGY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/langas_current.xml',
    group: 'NEJM',
    name: '',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanhae_current.xml',
    group: 'NEJM',
    name: '',
    specialty: PhysicianSpecialty.HEMATOLOGY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanres_current.xml',
    group: 'NEJM',
    name: '',
    specialty: PhysicianSpecialty.PULMONOLOGY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanpub_current.xml',
    group: 'NEJM',
    name: '',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanplh_current.xml',
    group: 'NEJM',
    name: '',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanam_current.xml',
    group: 'NEJM',
    name: '',
    specialty: PhysicianSpecialty.OTHER,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanchi_current.xml',
    group: 'NEJM',
    name: '',
    specialty: PhysicianSpecialty.PEDIATRICS,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanwh_current.xml',
    group: 'NEJM',
    name: '',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanmic_current.xml',
    group: 'NEJM',
    name: '',
    specialty: PhysicianSpecialty.OTHER,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanjpx_current.xml',
    group: 'NEJM',
    name: '',
    specialty: PhysicianSpecialty.OTHER,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanme_current.xml',
    group: 'NEJM',
    name: '',
    specialty: PhysicianSpecialty.OTHER,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanexo_current.xml',
    group: 'NEJM',
    name: '',
    specialty: PhysicianSpecialty.GERIATRICS,
  },
  // Current Issue feeds
  {
    url: 'https://jamanetwork.com/rss/site_3/67.xml',
    group: 'JAMA',
    name: 'JAMA',
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
  },
  {
    url: 'https://jamanetwork.com/rss/site_192/184.xml',
    group: 'JAMA',
    name: 'JAMA Cardiology',
    specialty: PhysicianSpecialty.CARDIOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_12/68.xml',
    group: 'JAMA',
    name: 'JAMA Dermatology',
    specialty: PhysicianSpecialty.DERMATOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_193/185.xml',
    group: 'JAMA',
    name: 'JAMA Health Forum',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
  },
  {
    url: 'https://jamanetwork.com/rss/site_15/71.xml',
    group: 'JAMA',
    name: 'JAMA Internal Medicine',
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
  },
  {
    url: 'https://jamanetwork.com/rss/site_16/72.xml',
    group: 'JAMA',
    name: 'JAMA Neurology',
    specialty: PhysicianSpecialty.NEUROLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_159/174.xml',
    group: 'JAMA',
    name: 'JAMA Oncology',
    specialty: PhysicianSpecialty.ONCOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_17/73.xml',
    group: 'JAMA',
    name: 'JAMA Ophthalmology',
    specialty: PhysicianSpecialty.OPHTHALMOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_18/74.xml',
    group: 'JAMA',
    name: 'JAMA Otolaryngology–Head & Neck Surgery',
    specialty: PhysicianSpecialty.OTOLARYNGOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_19/75.xml',
    group: 'JAMA',
    name: 'JAMA Pediatrics',
    specialty: PhysicianSpecialty.PEDIATRICS,
  },
  {
    url: 'https://jamanetwork.com/rss/site_14/70.xml',
    group: 'JAMA',
    name: 'JAMA Psychiatry',
    specialty: PhysicianSpecialty.PSYCHIATRY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_20/76.xml',
    group: 'JAMA',
    name: 'JAMA Surgery',
    specialty: PhysicianSpecialty.GENERAL_SURGERY,
  },

  // Online First feeds
  {
    url: 'https://jamanetwork.com/rss/site_3/onlineFirst_67.xml',
    group: 'JAMA',
    name: 'JAMA',
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
  },
  {
    url: 'https://jamanetwork.com/rss/site_192/onlineFirst_184.xml',
    group: 'JAMA',
    name: 'JAMA Cardiology',
    specialty: PhysicianSpecialty.CARDIOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_12/onlineFirst_68.xml',
    group: 'JAMA',
    name: 'JAMA Dermatology',
    specialty: PhysicianSpecialty.DERMATOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_15/onlineFirst_71.xml',
    group: 'JAMA',
    name: 'JAMA Internal Medicine',
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
  },
  {
    url: 'https://jamanetwork.com/rss/site_16/onlineFirst_72.xml',
    group: 'JAMA',
    name: 'JAMA Neurology',
    specialty: PhysicianSpecialty.NEUROLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_159/onlineFirst_174.xml',
    group: 'JAMA',
    name: 'JAMA Oncology',
    specialty: PhysicianSpecialty.ONCOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_17/onlineFirst_73.xml',
    group: 'JAMA',
    name: 'JAMA Ophthalmology',
    specialty: PhysicianSpecialty.OPHTHALMOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_18/onlineFirst_74.xml',
    group: 'JAMA',
    name: 'JAMA Otolaryngology–Head & Neck Surgery',
    specialty: PhysicianSpecialty.OTOLARYNGOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_19/onlineFirst_75.xml',
    group: 'JAMA',
    name: 'JAMA Pediatrics',
    specialty: PhysicianSpecialty.PEDIATRICS,
  },
  {
    url: 'https://jamanetwork.com/rss/site_14/onlineFirst_70.xml',
    group: 'JAMA',
    name: 'JAMA Psychiatry',
    specialty: PhysicianSpecialty.PSYCHIATRY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_20/onlineFirst_76.xml',
    group: 'JAMA',
    name: 'JAMA Surgery',
    specialty: PhysicianSpecialty.GENERAL_SURGERY,
  },
];
