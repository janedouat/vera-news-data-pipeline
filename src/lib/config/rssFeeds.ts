import { PhysicianSpecialty } from '@/types/taxonomy';
import { BestJournals } from '@/lib/constants/bestJournals';

export interface RssFeedConfig {
  url: string;
  group: string; // the umbrella publisher name
  name: string; // the full journal name
  specialty?: PhysicianSpecialty;
  enabled?: boolean;
  journal?: string; // from bestJournals.ts
}

export const RSS_FEEDS: RssFeedConfig[] = [
  // cell in the press
  {
    url: 'https://ascopubs.org/action/showFeed?type=etoc&feed=rss&jc=jco',
    group: 'ASCO',
    name: BestJournals.JOURNAL_OF_CLINICAL_ONCOLOGY,
  },
  // cell in the press
  {
    url: 'https://www.cell.com/cell/inpress.rss',
    group: 'Cell',
    name: BestJournals.CELL,
  },
  // Cell current
  {
    url: 'https://www.cell.com/cell/current.rss',
    group: 'Cell',
    name: BestJournals.CELL,
  },
  // Cancer Cell in press
  {
    url: 'https://www.cell.com/cancer-cell/inpress.rss',
    group: 'Cell',
    name: BestJournals.CANCER_CELL,
  },
  // Cancer Cell current
  {
    url: 'https://www.cell.com/cancer-cell/current.rss',
    group: 'Cell',
    name: BestJournals.CANCER_CELL,
  },
  // Immunity in press
  {
    url: 'https://www.cell.com/immunity/inpress.rss',
    group: 'Cell',
    name: BestJournals.IMMUNITY,
  },
  // Immunity current
  {
    url: 'https://www.cell.com/immunity/current.rss',
    group: 'Cell',
    name: BestJournals.IMMUNITY,
  },
  {
    url: 'https://www.annualreviews.org/rss/content/journals/immunol/latestarticles?fmt=rss',
    group: 'Annual Reviews',
    name: BestJournals.ANNUAL_REVIEW_OF_IMMUNOLOGY,
  },
  // ophthalmology
  {
    url: 'https://rss.app/feeds/62gUZPqohHlNOs3V.xml',
    group: 'Ophthalmology',
    name: '',
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/101695048/?limit=100&name=Ophthalmol%20Retina&utm_campaign=journals',
    group: 'Ophthalmology',
    name: BestJournals.RETINA,
  },
  {
    url: 'https://www.nature.com/natcancer.rss',
    group: 'Nature',
    name: BestJournals.NATURE_CANCER,
  },
  {
    url: 'https://www.nature.com/nrc.rss',
    group: 'Nature',
    name: BestJournals.NATURE_REVIEWS_CANCER,
  },
  {
    url: 'https://www.nature.com/nrcardio.rss',
    group: 'Nature',
    name: BestJournals.NATURE_REVIEWS_CARDIOLOGY,
  },
  {
    url: 'https://www.nature.com/nrneurol.rss',
    group: 'Nature',
    name: BestJournals.NATURE_REVIEWS_NEUROLOGY,
  },
  {
    url: 'https://www.nature.com/nri.rss',
    group: 'Nature',
    name: BestJournals.NATURE_REVIEWS_IMMUNOLOGY,
  },
  {
    url: 'https://www.nature.com/leu.rss',
    group: 'Nature',
    name: BestJournals.LEUKEMIA,
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/7603509/?limit=15&name=Blood&utm_campaign=journals',
    group: 'PubMed',
    name: BestJournals.BLOOD,
  },
  {
    url: 'https://www.nature.com/nm.rss',
    group: 'Nature',
    name: BestJournals.NATURE_MEDICINE,
  },
  {
    url: 'https://onlinelibrary.wiley.com/feed/15318249/most-recent',
    group: 'Wiley',
    name: BestJournals.ANNALS_OF_NEUROLOGY,
  },
  {
    url: 'https://onlinelibrary.wiley.com/feed/20515545/most-recent',
    group: 'Wiley',
    name: BestJournals.WORLD_PSYCHIATRY,
  },
  {
    url: 'https://onlinelibrary.wiley.com/feed/13652133/most-recent',
    group: 'Wiley',
    name: BestJournals.BRITISH_JOURNAL_OF_DERMATOLOGY,
  },
  {
    url: 'https://academic.oup.com/rss/site_6497/advanceAccess_4139.xml',
    group: 'Oxford Academic',
    name: 'British Journal of Dermatology',
  },
  {
    url: 'https://academic.oup.com/rss/site_6497/4139.xml',
    group: 'Oxford Academic',
    name: 'British Journal of Dermatology',
  },
  //Lancet: "current" rss feeds
  {
    url: 'https://www.thelancet.com/rssfeed/lancet_current.xml',
    group: 'Lancet',
    name: BestJournals.THE_LANCET,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanonc_current.xml',
    group: 'Lancet',
    name: BestJournals.LANCET_ONCOLOGY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laninf_current.xml',
    group: 'Lancet',
    name: BestJournals.LANCET_INFECTIOUS_DISEASES,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laneur_current.xml',
    group: 'Lancet',
    name: BestJournals.JAMA_NEUROLOGY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanpsy_current.xml',
    group: 'Lancet',
    name: BestJournals.JAMA_PSYCHIATRY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanrhe_current.xml',
    group: 'Lancet',
    name: 'Rheumatology',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/langas_current.xml',
    group: 'Lancet',
    name: 'Gastroenterology & Hepatology',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanhae_current.xml',
    group: 'Lancet',
    name: 'Haematology',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanres_current.xml',
    group: 'Lancet',
    name: 'Respiratory Medicine',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanpub_current.xml',
    group: 'Lancet',
    name: 'Public Health',
  },
  // {
  //   url: 'https://www.thelancet.com/rssfeed/lanplh_current.xml',
  //   group: 'Lancet',
  //   name: 'Planetary Health',
  // },
  //   {
  //     url: 'https://www.thelancet.com/rssfeed/lanam_current.xml',
  //     group: 'Lancet',
  //     name: 'Americas',
  //   },
  {
    url: 'https://www.thelancet.com/rssfeed/lanchi_current.xml',
    group: 'Lancet',
    name: BestJournals.LANCET_CHILD_ADOLESCENT_HEALTH,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/landia_current.xml',
    group: 'Lancet',
    name: BestJournals.LANCET_DIABETES_ENDOCRINOLOGY,
  },
  {
    url: 'https://diabetesjournals.org/rss/site_1000003/1000004.xml',
    group: 'Diabetes Journals',
    name: BestJournals.DIABETES_CARE,
  },
  {
    url: 'https://diabetesjournals.org/rss/site_1000003/advanceAccess_1000004.xml',
    group: 'Diabetes Journals',
    name: BestJournals.DIABETES_CARE,
  },
  {
    url: 'https://academic.oup.com/rss/site_5593/3466.xml',
    group: 'Oxford Academic',
    name: BestJournals.ENDOCRINE_REVIEWS,
  },
  {
    url: 'https://academic.oup.com/rss/site_5593/advanceAccess_3466.xml',
    group: 'Oxford Academic',
    name: BestJournals.ENDOCRINE_REVIEWS,
  },
  {
    url: 'https://academic.oup.com/rss/site_5269/3135.xml',
    group: 'Oxford Academic',
    name: BestJournals.CLINICAL_INFECTIOUS_DISEASES,
  },
  {
    url: 'https://academic.oup.com/rss/site_5269/advanceAccess_3135.xml',
    group: 'Oxford Academic',
    name: BestJournals.CLINICAL_INFECTIOUS_DISEASES,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanwh_current.xml',
    group: 'Lancet',
    name: 'Global Health',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanmic_current.xml',
    group: 'Lancet',
    name: 'EClinicalMedicine (Lancet)',
  },
  //   {
  //     url: 'https://www.thelancet.com/rssfeed/lanjpx_current.xml',
  //     group: 'Lancet',
  //     name: 'Regional Health – Western Pacific',
  //   },
  {
    url: 'https://www.thelancet.com/rssfeed/lanme_current.xml',
    group: 'Lancet',
    name: 'Microbe',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanexo_current.xml',
    group: 'Lancet',
    name: 'Healthy Longevity',
  },

  // Lancet: "first online" rss feeds
  {
    url: 'https://www.thelancet.com/rssfeed/lancet_online.xml',
    group: 'Lancet',
    name: BestJournals.THE_LANCET,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanonc_online.xml',
    group: 'Lancet',
    name: BestJournals.LANCET_ONCOLOGY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laninf_online.xml',
    group: 'Lancet',
    name: BestJournals.LANCET_INFECTIOUS_DISEASES,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laneur_online.xml',
    group: 'Lancet',
    name: BestJournals.JAMA_NEUROLOGY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanpsy_online.xml',
    group: 'Lancet',
    name: BestJournals.JAMA_PSYCHIATRY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanrhe_online.xml',
    group: 'Lancet',
    name: 'Rheumatology',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/langas_online.xml',
    group: 'Lancet',
    name: 'Gastroenterology & Hepatology',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanhae_online.xml',
    group: 'Lancet',
    name: 'Haematology',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanres_online.xml',
    group: 'Lancet',
    name: 'Respiratory Medicine',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanpub_online.xml',
    group: 'Lancet',
    name: 'Public Health',
  },
  // {
  //   url: 'https://www.thelancet.com/rssfeed/lanplh_online.xml',
  //   group: 'Lancet',
  //   name: 'Planetary Health',
  // },
  // {
  //   url: 'https://www.thelancet.com/rssfeed/lanam_online.xml',
  //   group: 'Lancet',
  //   name: 'Americas',
  // },
  {
    url: 'https://www.thelancet.com/rssfeed/lanchi_online.xml',
    group: 'Lancet',
    name: BestJournals.LANCET_CHILD_ADOLESCENT_HEALTH,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanwh_online.xml',
    group: 'Lancet',
    name: 'Global Health',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanmic_online.xml',
    group: 'Lancet',
    name: 'EClinicalMedicine (Lancet)',
  },
  //   {
  //     url: 'https://www.thelancet.com/rssfeed/lanjpx_online.xml',
  //     group: 'Lancet',
  //     name: 'Regional Health – Western Pacific',
  //   },
  {
    url: 'https://www.thelancet.com/rssfeed/lanme_online.xml',
    group: 'Lancet',
    name: 'Microbe',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanexo_online.xml',
    group: 'Lancet',
    name: 'Healthy Longevity',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lancet_current.xml',
    group: 'Lancet',
    name: BestJournals.THE_LANCET,
    specialty: PhysicianSpecialty.OTHER,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanonc_current.xml',
    group: 'Lancet',
    name: BestJournals.LANCET_ONCOLOGY,
    specialty: PhysicianSpecialty.ONCOLOGY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laninf_current.xml',
    group: 'Lancet',
    name: BestJournals.LANCET_INFECTIOUS_DISEASES,
    specialty: PhysicianSpecialty.INFECTIOUS_DISEASE,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laneur_current.xml',
    group: 'Lancet',
    name: BestJournals.JAMA_NEUROLOGY,
    specialty: PhysicianSpecialty.NEUROLOGY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanpsy_current.xml',
    group: 'Lancet',
    name: BestJournals.JAMA_PSYCHIATRY,
    specialty: PhysicianSpecialty.PSYCHIATRY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanrhe_current.xml',
    group: 'Lancet',
    name: 'Rheumatology',
    specialty: PhysicianSpecialty.RHEUMATOLOGY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/langas_current.xml',
    group: 'Lancet',
    name: 'Gastroenterology & Hepatology',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanhae_current.xml',
    group: 'Lancet',
    name: 'Haematology',
    specialty: PhysicianSpecialty.HEMATOLOGY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanres_current.xml',
    group: 'Lancet',
    name: 'Respiratory Medicine',
    specialty: PhysicianSpecialty.PULMONOLOGY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanpub_current.xml',
    group: 'Lancet',
    name: 'Public Health',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
  },
  // {
  //   url: 'https://www.thelancet.com/rssfeed/lanplh_current.xml',
  //   group: 'Lancet',
  //   name: 'Planetary Health',
  //   specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
  // },
  // {
  //   url: 'https://www.thelancet.com/rssfeed/lanam_current.xml',
  //   group: 'Lancet',
  //   name: 'Americas',
  //   specialty: PhysicianSpecialty.OTHER,
  // },
  {
    url: 'https://www.thelancet.com/rssfeed/lanchi_current.xml',
    group: 'Lancet',
    name: BestJournals.LANCET_CHILD_ADOLESCENT_HEALTH,
    specialty: PhysicianSpecialty.PEDIATRICS,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanwh_current.xml',
    group: 'Lancet',
    name: 'Global Health',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanmic_current.xml',
    group: 'Lancet',
    name: 'EClinicalMedicine',
    specialty: PhysicianSpecialty.OTHER,
  },
  // {
  //   url: 'https://www.thelancet.com/rssfeed/lanjpx_current.xml',
  //   group: 'Lancet',
  //   name: 'Regional Health – Western Pacific',
  //   specialty: PhysicianSpecialty.OTHER,
  // },
  {
    url: 'https://www.thelancet.com/rssfeed/lanme_current.xml',
    group: 'Lancet',
    name: 'Microbe',
    specialty: PhysicianSpecialty.OTHER,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanexo_current.xml',
    group: 'Lancet',
    name: 'Healthy Longevity',
    specialty: PhysicianSpecialty.GERIATRICS,
  },
  // Current Issue feeds
  {
    url: 'https://jamanetwork.com/rss/site_3/67.xml',
    group: 'JAMA',
    name: BestJournals.JAMA,
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
  },
  {
    url: 'https://jamanetwork.com/rss/site_192/184.xml',
    group: 'JAMA',
    name: BestJournals.JAMA_CARDIOLOGY,
    specialty: PhysicianSpecialty.CARDIOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_12/68.xml',
    group: 'JAMA',
    name: BestJournals.JAMA_DERMATOLOGY,
    specialty: PhysicianSpecialty.DERMATOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_193/185.xml',
    group: 'JAMA',
    name: 'Health Forum',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
  },
  {
    url: 'https://jamanetwork.com/rss/site_15/71.xml',
    group: 'JAMA',
    name: BestJournals.JOURNAL_OF_INTERNAL_MEDICINE,
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
  },
  {
    url: 'https://jamanetwork.com/rss/site_16/72.xml',
    group: 'JAMA',
    name: BestJournals.JAMA_NEUROLOGY,
    specialty: PhysicianSpecialty.NEUROLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_159/174.xml',
    group: 'JAMA',
    name: BestJournals.LANCET_ONCOLOGY,
    specialty: PhysicianSpecialty.ONCOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_17/73.xml',
    group: 'JAMA',
    name: BestJournals.OPHTHALMOLOGY,
    specialty: PhysicianSpecialty.OPHTHALMOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_18/74.xml',
    group: 'JAMA',
    name: 'Otolaryngology–Head & Neck Surgery',
    specialty: PhysicianSpecialty.OTOLARYNGOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_19/75.xml',
    group: 'JAMA',
    name: BestJournals.PEDIATRICS,
    specialty: PhysicianSpecialty.PEDIATRICS,
  },
  {
    url: 'https://jamanetwork.com/rss/site_14/70.xml',
    group: 'JAMA',
    name: BestJournals.JAMA_PSYCHIATRY,
    specialty: PhysicianSpecialty.PSYCHIATRY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_20/76.xml',
    group: 'JAMA',
    name: BestJournals.JAMA_SURGERY,
    specialty: PhysicianSpecialty.GENERAL_SURGERY,
  },

  // Online First feeds
  {
    url: 'https://jamanetwork.com/rss/site_3/onlineFirst_67.xml',
    group: 'JAMA',
    name: BestJournals.JAMA,
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
  },
  {
    url: 'https://jamanetwork.com/rss/site_192/onlineFirst_184.xml',
    group: 'JAMA',
    name: BestJournals.JAMA_CARDIOLOGY,
    specialty: PhysicianSpecialty.CARDIOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_12/onlineFirst_68.xml',
    group: 'JAMA',
    name: BestJournals.JAMA_DERMATOLOGY,
    specialty: PhysicianSpecialty.DERMATOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_15/onlineFirst_71.xml',
    group: 'JAMA',
    name: BestJournals.JOURNAL_OF_INTERNAL_MEDICINE,
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
  },
  {
    url: 'https://jamanetwork.com/rss/site_16/onlineFirst_72.xml',
    group: 'JAMA',
    name: BestJournals.JAMA_NEUROLOGY,
    specialty: PhysicianSpecialty.NEUROLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_159/onlineFirst_174.xml',
    group: 'JAMA',
    name: BestJournals.LANCET_ONCOLOGY,
    specialty: PhysicianSpecialty.ONCOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_17/onlineFirst_73.xml',
    group: 'JAMA',
    name: BestJournals.OPHTHALMOLOGY,
    specialty: PhysicianSpecialty.OPHTHALMOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_18/onlineFirst_74.xml',
    group: 'JAMA',
    name: 'Otolaryngology–Head & Neck Surgery',
    specialty: PhysicianSpecialty.OTOLARYNGOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_19/onlineFirst_75.xml',
    group: 'JAMA',
    name: BestJournals.PEDIATRICS,
    specialty: PhysicianSpecialty.PEDIATRICS,
  },
  {
    url: 'https://jamanetwork.com/rss/site_14/onlineFirst_70.xml',
    group: 'JAMA',
    name: BestJournals.JAMA_PSYCHIATRY,
    specialty: PhysicianSpecialty.PSYCHIATRY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_20/onlineFirst_76.xml',
    group: 'JAMA',
    name: BestJournals.JAMA_SURGERY,
    specialty: PhysicianSpecialty.GENERAL_SURGERY,
  },
  {
    url: 'http://feeds.bmj.com/bmj/recent',
    group: 'BMJ',
    name: BestJournals.THE_BMJ,
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
  },
  {
    url: 'http://casereports.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'BMJ Case Reports',
    specialty: PhysicianSpecialty.OTHER,
  },
  {
    url: 'http://gh.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'BMJ Global Health',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
  },
  {
    url: 'http://bmjopen.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'BMJ Open',
    specialty: PhysicianSpecialty.OTHER,
  },
  {
    url: 'http://drc.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'BMJ Open Diabetes Research & Care',
    specialty: PhysicianSpecialty.ENDOCRINOLOGY,
  },
  {
    url: 'http://heart.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'Heart',
    specialty: PhysicianSpecialty.CARDIOLOGY,
  },
  {
    url: 'http://gut.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'Gut',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
  },
  {
    url: 'http://jnnp.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'Journal of Neurology, Neurosurgery & Psychiatry',
    specialty: PhysicianSpecialty.NEUROLOGY,
  },
  {
    url: 'http://thorax.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'Thorax',
    specialty: PhysicianSpecialty.PULMONOLOGY,
  },
  {
    url: 'http://bjsm.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'British Journal of Sports Medicine',
    specialty: PhysicianSpecialty.PHYSICAL_MEDICINE,
  },
  {
    url: 'http://emj.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'Emergency Medicine Journal',
    specialty: PhysicianSpecialty.EMERGENCY_MEDICINE,
  },
  {
    url: 'http://oem.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'Occupational and Environmental Medicine',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
  },
  {
    url: 'http://fg.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'Frontline Gastroenterology',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
  },
  {
    url: 'http://jech.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'Journal of Epidemiology and Community Health',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
  },
  {
    url: 'https://adc.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: BestJournals.ARCHIVES_OF_DISEASE_IN_CHILDHOOD,
    specialty: PhysicianSpecialty.PEDIATRICS,
  },
  {
    url: 'https://publications.aap.org/rss/site_1000005/1000005.xml',
    group: 'AAP',
    name: 'Pediatrics',
    specialty: PhysicianSpecialty.PEDIATRICS,
  },
  {
    url: 'https://journals.lww.com/annalsofsurgery/_layouts/15/OAKS.Journals/feed.aspx?FeedType=LatestArticles',
    group: 'LWW',
    name: BestJournals.ANNALS_OF_SURGERY,
    specialty: PhysicianSpecialty.GENERAL_SURGERY,
  },
  {
    url: 'https://www.atsjournals.org/action/showFeed?type=etoc&feed=rss&jc=annalsats',
    group: 'ATS',
    name: BestJournals.AMERICAN_JOURNAL_OF_RESPIRATORY_AND_CRITICAL_CARE_MEDICINE,
    specialty: PhysicianSpecialty.PULMONOLOGY,
  },

  // BMJ: "Online First" feeds
  {
    url: 'http://gut.bmj.com/rss/ahead.xml',
    group: 'BMJ',
    name: 'Gut (Online First)',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
  },
  {
    url: 'http://heart.bmj.com/rss/ahead.xml',
    group: 'BMJ',
    name: 'Heart (Online First)',
    specialty: PhysicianSpecialty.CARDIOLOGY,
  },
  {
    url: 'http://jnnp.bmj.com/rss/ahead.xml',
    group: 'BMJ',
    name: 'Journal of Neurology, Neurosurgery & Psychiatry (Online First)',
    specialty: PhysicianSpecialty.NEUROLOGY,
  },
  {
    url: 'http://thorax.bmj.com/rss/ahead.xml',
    group: 'BMJ',
    name: 'Thorax (Online First)',
    specialty: PhysicianSpecialty.PULMONOLOGY,
  },
  {
    url: 'http://bjsm.bmj.com/rss/ahead.xml',
    group: 'BMJ',
    name: 'British Journal of Sports Medicine (Online First)',
    specialty: PhysicianSpecialty.PHYSICAL_MEDICINE,
  },
  {
    url: 'http://emj.bmj.com/rss/ahead.xml',
    group: 'BMJ',
    name: 'Emergency Medicine Journal (Online First)',
    specialty: PhysicianSpecialty.EMERGENCY_MEDICINE,
  },
  {
    url: 'http://fg.bmj.com/rss/ahead.xml',
    group: 'BMJ',
    name: 'Frontline Gastroenterology (Online First)',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
  },
  {
    url: 'http://jech.bmj.com/rss/ahead.xml',
    group: 'BMJ',
    name: 'Journal of Epidemiology and Community Health (Online First)',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
  },
  /// NEJM feeds
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=allergy-immunology',
    group: 'NEJM',
    name: 'Allergy/Immunology',
    specialty: PhysicianSpecialty.ALLERGY_IMMUNOLOGY,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=cardiology',
    group: 'NEJM',
    name: BestJournals.JAMA_CARDIOLOGY,
    specialty: PhysicianSpecialty.CARDIOLOGY,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=clinical-medicine',
    group: 'NEJM',
    name: 'Clinical Medicine',
    specialty: PhysicianSpecialty.OTHER,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=dermatology',
    group: 'NEJM',
    name: BestJournals.JAMA_DERMATOLOGY,
    specialty: PhysicianSpecialty.DERMATOLOGY,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=emergency-medicine',
    group: 'NEJM',
    name: 'Emergency Medicine',
    specialty: PhysicianSpecialty.EMERGENCY_MEDICINE,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=endocrinology',
    group: 'NEJM',
    name: 'Endocrinology',
    specialty: PhysicianSpecialty.ENDOCRINOLOGY,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=gastroenterology',
    group: 'NEJM',
    name: 'Gastroenterology',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=genetics',
    group: 'NEJM',
    name: 'Genetics',
    specialty: PhysicianSpecialty.OTHER,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=geriatrics-aging',
    group: 'NEJM',
    name: 'Geriatrics/Aging',
    specialty: PhysicianSpecialty.GERIATRICS,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=health-policy',
    group: 'NEJM',
    name: 'Health Policy',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=hematology-oncology',
    group: 'NEJM',
    name: 'Hematology/Oncology',
    specialty: PhysicianSpecialty.ONCOLOGY,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=infectious-disease',
    group: 'NEJM',
    name: 'Infectious Disease',
    specialty: PhysicianSpecialty.INFECTIOUS_DISEASE,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=nephrology',
    group: 'NEJM',
    name: 'Nephrology',
    specialty: PhysicianSpecialty.NEPHROLOGY,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=neurology-neurosurgery',
    group: 'NEJM',
    name: 'Neurology/Neurosurgery',
    specialty: PhysicianSpecialty.NEUROLOGY,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=obstetrics-gynecology',
    group: 'NEJM',
    name: 'Obstetrics/Gynecology',
    specialty: PhysicianSpecialty.OBSTETRICS_GYNECOLOGY,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=pediatrics',
    group: 'NEJM',
    name: BestJournals.PEDIATRICS,
    specialty: PhysicianSpecialty.PEDIATRICS,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=psychiatry',
    group: 'NEJM',
    name: BestJournals.JAMA_PSYCHIATRY,
    specialty: PhysicianSpecialty.PSYCHIATRY,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=pulmonary-critical-care',
    group: 'NEJM',
    name: 'Pulmonary/Critical Care',
    specialty: PhysicianSpecialty.PULMONOLOGY,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=rheumatology',
    group: 'NEJM',
    name: 'Rheumatology',
    specialty: PhysicianSpecialty.RHEUMATOLOGY,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=surgery',
    group: 'NEJM',
    name: BestJournals.JAMA_SURGERY,
    specialty: PhysicianSpecialty.GENERAL_SURGERY,
  },
  // CDC MMWR
  {
    url: 'https://tools.cdc.gov/api/v2/resources/media/342778.rss',
    group: 'CDC',
    name: 'Morbidity and Mortality Weekly Report',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
  },
  {
    url: 'https://journals.lww.com/JASN/_layouts/15/OAKS.Journals/feed.aspx?FeedType=CurrentIssue',
    group: 'LWW',
    name: 'Journal of the American Society of Nephrology',
    specialty: PhysicianSpecialty.NEPHROLOGY,
  },
  {
    url: 'https://www.nature.com/nrneph.rss',
    group: 'Nature',
    name: 'Nature Reviews Nephrology',
    specialty: PhysicianSpecialty.NEPHROLOGY,
  },
  {
    url: 'https://www.nature.com/nrrheum.rss',
    group: 'Nature',
    name: 'Nature Reviews Rheumatology',
    specialty: PhysicianSpecialty.RHEUMATOLOGY,
  },
  {
    url: 'https://www.nature.com/nrendo.rss',
    group: 'Nature',
    name: 'Nature Reviews Endocrinology',
    specialty: PhysicianSpecialty.ENDOCRINOLOGY,
  },
  {
    url: 'https://journals.asm.org/action/showFeed?type=etoc&feed=rss&jc=CMR',
    group: 'ASM',
    name: 'Clinical Microbiology Reviews',
    specialty: PhysicianSpecialty.INFECTIOUS_DISEASE,
  },
  {
    url: 'https://www.nature.com/nrd.rss',
    group: 'Nature',
    name: 'Nature Reviews Drug Discovery',
    specialty: PhysicianSpecialty.OTHER,
  },
  {
    url: 'https://www.nature.com/nbt.rss',
    group: 'Nature',
    name: 'Nature Biotechnology',
    specialty: PhysicianSpecialty.OTHER,
  },
  {
    url: 'https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=stm',
    group: 'AAAS',
    name: 'Science Translational Medicine',
    specialty: PhysicianSpecialty.OTHER,
  },
  {
    url: 'https://onlinelibrary.wiley.com/feed/13652796/most-recent',
    group: 'Wiley',
    name: 'Journal of Internal Medicine',
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
  },
];
