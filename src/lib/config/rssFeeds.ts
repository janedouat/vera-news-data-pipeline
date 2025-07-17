import { PhysicianSpecialty } from '@/types/taxonomy';
import { BestJournals } from '@/lib/constants/bestJournals';

export interface RssFeedConfig {
  url: string;
  group: string; // the umbrella publisher name
  name: string; // the full journal name
  specialty?: PhysicianSpecialty;
  enabled?: boolean;
  journal?: string; // from bestJournals.ts
  type?: 'journal' | 'drugs';
}

// Common/General Medical Feeds
const COMMON_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.nature.com/nm.rss',
    group: 'Nature',
    name: BestJournals.NATURE_MEDICINE,
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
    enabled: true,
  },
  {
    url: 'https://jamanetwork.com/rss/site_3/67.xml',
    group: 'JAMA',
    name: BestJournals.JAMA,
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
    enabled: true,
  },
  {
    url: 'https://jamanetwork.com/rss/site_3/onlineFirst_67.xml',
    group: 'JAMA',
    name: BestJournals.JAMA,
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
    enabled: true,
  },
  {
    url: 'http://feeds.bmj.com/bmj/recent',
    group: 'BMJ',
    name: BestJournals.THE_BMJ,
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lancet_current.xml',
    group: 'Lancet',
    name: BestJournals.THE_LANCET,
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lancet_online.xml',
    group: 'Lancet',
    name: BestJournals.THE_LANCET,
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
    enabled: true,
  },
  {
    url: 'https://jamanetwork.com/rss/site_15/71.xml',
    group: 'JAMA',
    name: BestJournals.JOURNAL_OF_INTERNAL_MEDICINE,
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
    enabled: true,
  },
  {
    url: 'https://jamanetwork.com/rss/site_15/onlineFirst_71.xml',
    group: 'JAMA',
    name: BestJournals.JOURNAL_OF_INTERNAL_MEDICINE,
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
    enabled: true,
  },
  {
    url: 'https://onlinelibrary.wiley.com/feed/13652796/most-recent',
    group: 'Wiley',
    name: 'Journal of Internal Medicine',
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
    enabled: true,
  },
  {
    url: 'https://www.nature.com/nrd.rss',
    group: 'Nature',
    name: 'Nature Reviews Drug Discovery',
    specialty: PhysicianSpecialty.OTHER,
    enabled: true,
  },
  {
    url: 'https://www.nature.com/nbt.rss',
    group: 'Nature',
    name: 'Nature Biotechnology',
    specialty: PhysicianSpecialty.OTHER,
    enabled: true,
  },
];

// Drug/Pharmaceutical Feeds
const DRUG_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.drugs.com/feeds/new_drug_approvals.xml',
    group: 'Drugs.com',
    name: 'New Drug Approvals',
    specialty: PhysicianSpecialty.OTHER,
    enabled: true,
    type: 'drugs',
  },
];

// Oncology/Cancer Feeds
const ONCOLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.nature.com/natcancer.rss',
    group: 'Nature',
    name: BestJournals.NATURE_CANCER,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
  },
  {
    url: 'https://www.nature.com/nrc.rss',
    group: 'Nature',
    name: BestJournals.NATURE_REVIEWS_CANCER,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
  },
  {
    url: 'https://ascopubs.org/action/showFeed?type=etoc&feed=rss&jc=jco',
    group: 'ASCO',
    name: BestJournals.JOURNAL_OF_CLINICAL_ONCOLOGY,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
  },
  {
    url: 'https://www.cell.com/cancer-cell/inpress.rss',
    group: 'Cell',
    name: BestJournals.CANCER_CELL,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
  },
  {
    url: 'https://www.cell.com/cancer-cell/current.rss',
    group: 'Cell',
    name: BestJournals.CANCER_CELL,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanonc_current.xml',
    group: 'Lancet',
    name: BestJournals.LANCET_ONCOLOGY,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanonc_online.xml',
    group: 'Lancet',
    name: BestJournals.LANCET_ONCOLOGY,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
  },
  {
    url: 'https://jamanetwork.com/rss/site_159/174.xml',
    group: 'JAMA',
    name: BestJournals.LANCET_ONCOLOGY,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
  },
  {
    url: 'https://jamanetwork.com/rss/site_159/onlineFirst_174.xml',
    group: 'JAMA',
    name: BestJournals.LANCET_ONCOLOGY,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=hematology-oncology',
    group: 'NEJM',
    name: 'Hematology/Oncology',
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/0370647/?limit=15&name=CA%20Cancer%20J%20Clin&utm_campaign=journals',
    group: 'ACS',
    name: 'CA: A Cancer Journal for Clinicians',
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/8309333/?limit=15&name=J%20Clin%20Oncol&utm_campaign=journals',
    group: '',
    name: 'Journal of Clinical Oncology',
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/101561693/?limit=15&name=Cancer%20Discov&utm_campaign=journals',
    group: '',
    name: 'Cancer Discovery',
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/9007735/?limit=15&name=Ann%20Oncol&utm_campaign=journals',
    group: '',
    name: 'Annals of Oncology',
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
  },
  {
    url: 'https://www.nature.com/nrclinonc.rss',
    group: 'Nature',
    name: 'Nature Reviews Clinical Oncology',
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
  },
];

// Cardiology Feeds
const CARDIOLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.nature.com/nrcardio.rss',
    group: 'Nature',
    name: BestJournals.NATURE_REVIEWS_CARDIOLOGY,
    specialty: PhysicianSpecialty.CARDIOLOGY,
    enabled: true,
  },
  {
    url: 'https://jamanetwork.com/rss/site_192/184.xml',
    group: 'JAMA',
    name: BestJournals.JAMA_CARDIOLOGY,
    specialty: PhysicianSpecialty.CARDIOLOGY,
    enabled: true,
  },
  {
    url: 'https://jamanetwork.com/rss/site_192/onlineFirst_184.xml',
    group: 'JAMA',
    name: BestJournals.JAMA_CARDIOLOGY,
    specialty: PhysicianSpecialty.CARDIOLOGY,
    enabled: true,
  },
  {
    url: 'http://heart.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'Heart',
    specialty: PhysicianSpecialty.CARDIOLOGY,
    enabled: true,
  },
  {
    url: 'http://heart.bmj.com/rss/ahead.xml',
    group: 'BMJ',
    name: 'Heart (Online First)',
    specialty: PhysicianSpecialty.CARDIOLOGY,
    enabled: true,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=cardiology',
    group: 'NEJM',
    name: BestJournals.JAMA_CARDIOLOGY,
    specialty: PhysicianSpecialty.CARDIOLOGY,
    enabled: true,
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/8301365/?limit=15&name=J%20Am%20Coll%20Cardiol&utm_campaign=journals',
    group: '',
    name: 'Journal of the American College of Cardiology',
    specialty: PhysicianSpecialty.CARDIOLOGY,
    enabled: true,
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/0147763/?limit=15&name=Circulation&utm_campaign=journals',
    group: '',
    name: 'Circulation',
    specialty: PhysicianSpecialty.CARDIOLOGY,
    enabled: true,
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/8006263/?limit=15&name=Eur%20Heart%20J&utm_campaign=journals',
    group: '',
    name: 'European Heart Journal',
    specialty: PhysicianSpecialty.CARDIOLOGY,
    enabled: true,
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/101598241/?limit=15&name=JACC%20Heart%20Fail&utm_campaign=journals',
    group: '',
    name: 'JACC: Heart Failure',
    specialty: PhysicianSpecialty.CARDIOLOGY,
    enabled: true,
  },
];

// Neurology Feeds
const NEUROLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.nature.com/nrneurol.rss',
    group: 'Nature',
    name: BestJournals.NATURE_REVIEWS_NEUROLOGY,
    specialty: PhysicianSpecialty.NEUROLOGY,
    enabled: true,
  },
  {
    url: 'https://jamanetwork.com/rss/site_16/72.xml',
    group: 'JAMA',
    name: BestJournals.JAMA_NEUROLOGY,
    specialty: PhysicianSpecialty.NEUROLOGY,
    enabled: true,
  },
  {
    url: 'https://jamanetwork.com/rss/site_16/onlineFirst_72.xml',
    group: 'JAMA',
    name: BestJournals.JAMA_NEUROLOGY,
    specialty: PhysicianSpecialty.NEUROLOGY,
    enabled: true,
  },
  {
    url: 'http://jnnp.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'Journal of Neurology, Neurosurgery & Psychiatry',
    specialty: PhysicianSpecialty.NEUROLOGY,
    enabled: true,
  },
  {
    url: 'http://jnnp.bmj.com/rss/ahead.xml',
    group: 'BMJ',
    name: 'Journal of Neurology, Neurosurgery & Psychiatry (Online First)',
    specialty: PhysicianSpecialty.NEUROLOGY,
    enabled: true,
  },
  {
    url: 'https://onlinelibrary.wiley.com/feed/15318249/most-recent',
    group: 'Wiley',
    name: BestJournals.ANNALS_OF_NEUROLOGY,
    specialty: PhysicianSpecialty.NEUROLOGY,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laneur_current.xml',
    group: 'Lancet',
    name: BestJournals.JAMA_NEUROLOGY,
    specialty: PhysicianSpecialty.NEUROLOGY,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laneur_online.xml',
    group: 'Lancet',
    name: BestJournals.JAMA_NEUROLOGY,
    specialty: PhysicianSpecialty.NEUROLOGY,
    enabled: true,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=neurology-neurosurgery',
    group: 'NEJM',
    name: 'Neurology/Neurosurgery',
    specialty: PhysicianSpecialty.NEUROLOGY,
    enabled: true,
  },
];

// Gastroenterology Feeds
const GASTROENTEROLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.thelancet.com/rssfeed/langas_current.xml',
    group: 'Lancet',
    name: 'Gastroenterology & Hepatology',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/langas_online.xml',
    group: 'Lancet',
    name: 'Gastroenterology & Hepatology',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
    enabled: true,
  },
  {
    url: 'http://gut.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'Gut',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
    enabled: true,
  },
  {
    url: 'http://gut.bmj.com/rss/ahead.xml',
    group: 'BMJ',
    name: 'Gut (Online First)',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
    enabled: true,
  },
  {
    url: 'http://fg.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'Frontline Gastroenterology',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
    enabled: true,
  },
  {
    url: 'http://fg.bmj.com/rss/ahead.xml',
    group: 'BMJ',
    name: 'Frontline Gastroenterology (Online First)',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
    enabled: true,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=gastroenterology',
    group: 'NEJM',
    name: 'Gastroenterology',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
    enabled: true,
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/8503886/?limit=15&name=J%20Hepatol&utm_campaign=journals',
    group: '',
    name: 'Journal of Hepatology',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
    enabled: true,
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/0374630/?limit=15&name=Gastroenterology&utm_campaign=journals',
    group: '',
    name: 'Gastroenterology',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
    enabled: true,
  },
];

// Pulmonology/Respiratory Feeds
const PULMONOLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.thelancet.com/rssfeed/lanres_current.xml',
    group: 'Lancet',
    name: 'Respiratory Medicine',
    specialty: PhysicianSpecialty.PULMONOLOGY,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanres_online.xml',
    group: 'Lancet',
    name: 'Respiratory Medicine',
    specialty: PhysicianSpecialty.PULMONOLOGY,
    enabled: true,
  },
  {
    url: 'http://thorax.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'Thorax',
    specialty: PhysicianSpecialty.PULMONOLOGY,
    enabled: true,
  },
  {
    url: 'http://thorax.bmj.com/rss/ahead.xml',
    group: 'BMJ',
    name: 'Thorax (Online First)',
    specialty: PhysicianSpecialty.PULMONOLOGY,
    enabled: true,
  },
  {
    url: 'https://www.atsjournals.org/action/showFeed?type=etoc&feed=rss&jc=annalsats',
    group: 'ATS',
    name: BestJournals.AMERICAN_JOURNAL_OF_RESPIRATORY_AND_CRITICAL_CARE_MEDICINE,
    specialty: PhysicianSpecialty.PULMONOLOGY,
    enabled: true,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=pulmonary-critical-care',
    group: 'NEJM',
    name: 'Pulmonary/Critical Care',
    specialty: PhysicianSpecialty.PULMONOLOGY,
    enabled: true,
  },
];

// Hematology Feeds
const HEMATOLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.nature.com/leu.rss',
    group: 'Nature',
    name: BestJournals.LEUKEMIA,
    specialty: PhysicianSpecialty.HEMATOLOGY,
    enabled: true,
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/7603509/?limit=15&name=Blood&utm_campaign=journals',
    group: '',
    name: BestJournals.BLOOD,
    specialty: PhysicianSpecialty.HEMATOLOGY,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanhae_current.xml',
    group: 'Lancet',
    name: 'Haematology',
    specialty: PhysicianSpecialty.HEMATOLOGY,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanhae_online.xml',
    group: 'Lancet',
    name: 'Haematology',
    specialty: PhysicianSpecialty.HEMATOLOGY,
    enabled: true,
  },
];

// Pediatrics Feeds
const PEDIATRICS_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://jamanetwork.com/rss/site_19/75.xml',
    group: 'JAMA',
    name: BestJournals.PEDIATRICS,
    specialty: PhysicianSpecialty.PEDIATRICS,
    enabled: true,
  },
  {
    url: 'https://jamanetwork.com/rss/site_19/onlineFirst_75.xml',
    group: 'JAMA',
    name: BestJournals.PEDIATRICS,
    specialty: PhysicianSpecialty.PEDIATRICS,
    enabled: true,
  },
  {
    url: 'https://publications.aap.org/rss/site_1000005/1000005.xml',
    group: 'AAP',
    name: 'Pediatrics',
    specialty: PhysicianSpecialty.PEDIATRICS,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanchi_current.xml',
    group: 'Lancet',
    name: BestJournals.LANCET_CHILD_ADOLESCENT_HEALTH,
    specialty: PhysicianSpecialty.PEDIATRICS,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanchi_online.xml',
    group: 'Lancet',
    name: BestJournals.LANCET_CHILD_ADOLESCENT_HEALTH,
    specialty: PhysicianSpecialty.PEDIATRICS,
    enabled: true,
  },
  {
    url: 'https://adc.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: BestJournals.ARCHIVES_OF_DISEASE_IN_CHILDHOOD,
    specialty: PhysicianSpecialty.PEDIATRICS,
    enabled: true,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=pediatrics',
    group: 'NEJM',
    name: BestJournals.PEDIATRICS,
    specialty: PhysicianSpecialty.PEDIATRICS,
    enabled: true,
  },
];

// Psychiatry Feeds
const PSYCHIATRY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://jamanetwork.com/rss/site_14/70.xml',
    group: 'JAMA',
    name: BestJournals.JAMA_PSYCHIATRY,
    specialty: PhysicianSpecialty.PSYCHIATRY,
    enabled: true,
  },
  {
    url: 'https://jamanetwork.com/rss/site_14/onlineFirst_70.xml',
    group: 'JAMA',
    name: BestJournals.JAMA_PSYCHIATRY,
    specialty: PhysicianSpecialty.PSYCHIATRY,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanpsy_current.xml',
    group: 'Lancet',
    name: BestJournals.JAMA_PSYCHIATRY,
    specialty: PhysicianSpecialty.PSYCHIATRY,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanpsy_online.xml',
    group: 'Lancet',
    name: BestJournals.JAMA_PSYCHIATRY,
    specialty: PhysicianSpecialty.PSYCHIATRY,
    enabled: true,
  },
  {
    url: 'https://onlinelibrary.wiley.com/feed/20515545/most-recent',
    group: 'Wiley',
    name: BestJournals.WORLD_PSYCHIATRY,
    specialty: PhysicianSpecialty.PSYCHIATRY,
    enabled: true,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=psychiatry',
    group: 'NEJM',
    name: BestJournals.JAMA_PSYCHIATRY,
    specialty: PhysicianSpecialty.PSYCHIATRY,
    enabled: true,
  },
];

// Ophthalmology Feeds
const OPHTHALMOLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://rss.app/feeds/62gUZPqohHlNOs3V.xml',
    group: 'Ophthalmology',
    name: BestJournals.OPHTHALMOLOGY,
    specialty: PhysicianSpecialty.OPHTHALMOLOGY,
    enabled: true,
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/101695048/?limit=100&name=Ophthalmol%20Retina&utm_campaign=journals',
    group: 'Ophthalmology',
    name: BestJournals.RETINA,
    specialty: PhysicianSpecialty.OPHTHALMOLOGY,
    enabled: true,
  },
  {
    url: 'https://jamanetwork.com/rss/site_17/73.xml',
    group: 'JAMA',
    name: BestJournals.OPHTHALMOLOGY,
    specialty: PhysicianSpecialty.OPHTHALMOLOGY,
    enabled: true,
  },
  {
    url: 'https://jamanetwork.com/rss/site_17/onlineFirst_73.xml',
    group: 'JAMA',
    name: BestJournals.OPHTHALMOLOGY,
    specialty: PhysicianSpecialty.OPHTHALMOLOGY,
    enabled: true,
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/9431859/?limit=15&name=Prog%20Retin%20Eye%20Res&utm_campaign=journals',
    group: '',
    name: 'Progress in Retinal and Eye Research',
    specialty: PhysicianSpecialty.OPHTHALMOLOGY,
    enabled: true,
  },
];

// Endocrinology Feeds
const ENDOCRINOLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.thelancet.com/rssfeed/landia_current.xml',
    group: 'Lancet',
    name: BestJournals.LANCET_DIABETES_ENDOCRINOLOGY,
    specialty: PhysicianSpecialty.ENDOCRINOLOGY,
    enabled: true,
  },
  {
    url: 'https://diabetesjournals.org/rss/site_1000003/1000004.xml',
    group: 'Diabetes Journals',
    name: BestJournals.DIABETES_CARE,
    specialty: PhysicianSpecialty.ENDOCRINOLOGY,
    enabled: true,
  },
  {
    url: 'https://diabetesjournals.org/rss/site_1000003/advanceAccess_1000004.xml',
    group: 'Diabetes Journals',
    name: BestJournals.DIABETES_CARE,
    specialty: PhysicianSpecialty.ENDOCRINOLOGY,
    enabled: true,
  },
  {
    url: 'https://academic.oup.com/rss/site_5593/3466.xml',
    group: 'Oxford Academic',
    name: BestJournals.ENDOCRINE_REVIEWS,
    specialty: PhysicianSpecialty.ENDOCRINOLOGY,
    enabled: true,
  },
  {
    url: 'https://academic.oup.com/rss/site_5593/advanceAccess_3466.xml',
    group: 'Oxford Academic',
    name: BestJournals.ENDOCRINE_REVIEWS,
    specialty: PhysicianSpecialty.ENDOCRINOLOGY,
    enabled: true,
  },
  {
    url: 'http://drc.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'BMJ Open Diabetes Research & Care',
    specialty: PhysicianSpecialty.ENDOCRINOLOGY,
    enabled: true,
  },
  {
    url: 'https://www.nature.com/nrendo.rss',
    group: 'Nature',
    name: 'Nature Reviews Endocrinology',
    specialty: PhysicianSpecialty.ENDOCRINOLOGY,
    enabled: true,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=endocrinology',
    group: 'NEJM',
    name: 'Endocrinology',
    specialty: PhysicianSpecialty.ENDOCRINOLOGY,
    enabled: true,
  },
];

// Infectious Disease Feeds
const INFECTIOUS_DISEASE_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.thelancet.com/rssfeed/laninf_current.xml',
    group: 'Lancet',
    name: BestJournals.LANCET_INFECTIOUS_DISEASES,
    specialty: PhysicianSpecialty.INFECTIOUS_DISEASE,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laninf_online.xml',
    group: 'Lancet',
    name: BestJournals.LANCET_INFECTIOUS_DISEASES,
    specialty: PhysicianSpecialty.INFECTIOUS_DISEASE,
    enabled: true,
  },
  {
    url: 'https://academic.oup.com/rss/site_5269/3135.xml',
    group: 'Oxford Academic',
    name: BestJournals.CLINICAL_INFECTIOUS_DISEASES,
    specialty: PhysicianSpecialty.INFECTIOUS_DISEASE,
    enabled: true,
  },
  {
    url: 'https://academic.oup.com/rss/site_5269/advanceAccess_3135.xml',
    group: 'Oxford Academic',
    name: BestJournals.CLINICAL_INFECTIOUS_DISEASES,
    specialty: PhysicianSpecialty.INFECTIOUS_DISEASE,
    enabled: true,
  },
  {
    url: 'https://journals.asm.org/action/showFeed?type=etoc&feed=rss&jc=CMR',
    group: 'ASM',
    name: 'Clinical Microbiology Reviews',
    specialty: PhysicianSpecialty.INFECTIOUS_DISEASE,
    enabled: true,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=infectious-disease',
    group: 'NEJM',
    name: 'Infectious Disease',
    specialty: PhysicianSpecialty.INFECTIOUS_DISEASE,
    enabled: true,
  },
];

// Surgery Feeds
const SURGERY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://jamanetwork.com/rss/site_20/76.xml',
    group: 'JAMA',
    name: BestJournals.JAMA_SURGERY,
    specialty: PhysicianSpecialty.GENERAL_SURGERY,
    enabled: true,
  },
  {
    url: 'https://jamanetwork.com/rss/site_20/onlineFirst_76.xml',
    group: 'JAMA',
    name: BestJournals.JAMA_SURGERY,
    specialty: PhysicianSpecialty.GENERAL_SURGERY,
    enabled: true,
  },
  {
    url: 'https://journals.lww.com/annalsofsurgery/_layouts/15/OAKS.Journals/feed.aspx?FeedType=LatestArticles',
    group: 'LWW',
    name: BestJournals.ANNALS_OF_SURGERY,
    specialty: PhysicianSpecialty.GENERAL_SURGERY,
    enabled: true,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=surgery',
    group: 'NEJM',
    name: BestJournals.JAMA_SURGERY,
    specialty: PhysicianSpecialty.GENERAL_SURGERY,
    enabled: true,
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/0376343/?limit=15&name=J%20Thorac%20Cardiovasc%20Surg&utm_campaign=journals',
    group: '',
    name: 'Journal of Thoracic and Cardiovascular Surgery',
    specialty: PhysicianSpecialty.THORACIC_SURGERY,
    enabled: true,
  },
];

// Emergency Medicine Feeds
const EMERGENCY_MEDICINE_FEEDS: RssFeedConfig[] = [
  {
    url: 'http://emj.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'Emergency Medicine Journal',
    specialty: PhysicianSpecialty.EMERGENCY_MEDICINE,
    enabled: true,
  },
  {
    url: 'http://emj.bmj.com/rss/ahead.xml',
    group: 'BMJ',
    name: 'Emergency Medicine Journal (Online First)',
    specialty: PhysicianSpecialty.EMERGENCY_MEDICINE,
    enabled: true,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=emergency-medicine',
    group: 'NEJM',
    name: 'Emergency Medicine',
    specialty: PhysicianSpecialty.EMERGENCY_MEDICINE,
    enabled: true,
  },
];

// Immunology Feeds
const IMMUNOLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.nature.com/nri.rss',
    group: 'Nature',
    name: BestJournals.NATURE_REVIEWS_IMMUNOLOGY,
    specialty: PhysicianSpecialty.ALLERGY_IMMUNOLOGY,
    enabled: true,
  },
  {
    url: 'https://www.cell.com/immunity/inpress.rss',
    group: 'Cell',
    name: BestJournals.IMMUNITY,
    specialty: PhysicianSpecialty.ALLERGY_IMMUNOLOGY,
    enabled: true,
  },
  {
    url: 'https://www.cell.com/immunity/current.rss',
    group: 'Cell',
    name: BestJournals.IMMUNITY,
    specialty: PhysicianSpecialty.ALLERGY_IMMUNOLOGY,
    enabled: true,
  },
  {
    url: 'https://www.annualreviews.org/rss/content/journals/immunol/latestarticles?fmt=rss',
    group: 'Annual Reviews',
    name: BestJournals.ANNUAL_REVIEW_OF_IMMUNOLOGY,
    specialty: PhysicianSpecialty.ALLERGY_IMMUNOLOGY,
    enabled: true,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=allergy-immunology',
    group: 'NEJM',
    name: 'Allergy/Immunology',
    specialty: PhysicianSpecialty.ALLERGY_IMMUNOLOGY,
    enabled: true,
  },
];

// Specialty Feeds (additional specialties)
const DERMATOLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://jamanetwork.com/rss/site_12/68.xml',
    group: 'JAMA',
    name: BestJournals.JAMA_DERMATOLOGY,
    specialty: PhysicianSpecialty.DERMATOLOGY,
    enabled: true,
  },
  {
    url: 'https://jamanetwork.com/rss/site_12/onlineFirst_68.xml',
    group: 'JAMA',
    name: BestJournals.JAMA_DERMATOLOGY,
    specialty: PhysicianSpecialty.DERMATOLOGY,
    enabled: true,
  },
  {
    url: 'https://onlinelibrary.wiley.com/feed/13652133/most-recent',
    group: 'Wiley',
    name: BestJournals.BRITISH_JOURNAL_OF_DERMATOLOGY,
    specialty: PhysicianSpecialty.DERMATOLOGY,
    enabled: true,
  },
  {
    url: 'https://academic.oup.com/rss/site_6497/advanceAccess_4139.xml',
    group: 'Oxford Academic',
    name: 'British Journal of Dermatology',
    specialty: PhysicianSpecialty.DERMATOLOGY,
    enabled: true,
  },
  {
    url: 'https://academic.oup.com/rss/site_6497/4139.xml',
    group: 'Oxford Academic',
    name: 'British Journal of Dermatology',
    specialty: PhysicianSpecialty.DERMATOLOGY,
    enabled: true,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=dermatology',
    group: 'NEJM',
    name: BestJournals.JAMA_DERMATOLOGY,
    specialty: PhysicianSpecialty.DERMATOLOGY,
    enabled: true,
  },
];

const RHEUMATOLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.thelancet.com/rssfeed/lanrhe_current.xml',
    group: 'Lancet',
    name: 'Rheumatology',
    specialty: PhysicianSpecialty.RHEUMATOLOGY,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanrhe_online.xml',
    group: 'Lancet',
    name: 'Rheumatology',
    specialty: PhysicianSpecialty.RHEUMATOLOGY,
    enabled: true,
  },
  {
    url: 'https://www.nature.com/nrrheum.rss',
    group: 'Nature',
    name: 'Nature Reviews Rheumatology',
    specialty: PhysicianSpecialty.RHEUMATOLOGY,
    enabled: true,
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/0372355/?limit=15&name=Ann%20Rheum%20Dis&utm_campaign=journals',
    group: '',
    name: 'Annals of the Rheumatic Diseases',
    specialty: PhysicianSpecialty.RHEUMATOLOGY,
    enabled: true,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=rheumatology',
    group: 'NEJM',
    name: 'Rheumatology',
    specialty: PhysicianSpecialty.RHEUMATOLOGY,
    enabled: true,
  },
];

const NEPHROLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://journals.lww.com/JASN/_layouts/15/OAKS.Journals/feed.aspx?FeedType=CurrentIssue',
    group: 'LWW',
    name: 'Journal of the American Society of Nephrology',
    specialty: PhysicianSpecialty.NEPHROLOGY,
    enabled: true,
  },
  {
    url: 'https://www.nature.com/nrneph.rss',
    group: 'Nature',
    name: 'Nature Reviews Nephrology',
    specialty: PhysicianSpecialty.NEPHROLOGY,
    enabled: true,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=nephrology',
    group: 'NEJM',
    name: 'Nephrology',
    specialty: PhysicianSpecialty.NEPHROLOGY,
    enabled: true,
  },
];

const OTHER_SPECIALTY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://jamanetwork.com/rss/site_18/74.xml',
    group: 'JAMA',
    name: 'Otolaryngology–Head & Neck Surgery',
    specialty: PhysicianSpecialty.OTOLARYNGOLOGY,
    enabled: true,
  },
  {
    url: 'https://jamanetwork.com/rss/site_18/onlineFirst_74.xml',
    group: 'JAMA',
    name: 'Otolaryngology–Head & Neck Surgery',
    specialty: PhysicianSpecialty.OTOLARYNGOLOGY,
    enabled: true,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=obstetrics-gynecology',
    group: 'NEJM',
    name: 'Obstetrics/Gynecology',
    specialty: PhysicianSpecialty.OBSTETRICS_GYNECOLOGY,
    enabled: true,
  },
  {
    url: 'http://bjsm.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'British Journal of Sports Medicine',
    specialty: PhysicianSpecialty.PHYSICAL_MEDICINE,
    enabled: true,
  },
  {
    url: 'http://bjsm.bmj.com/rss/ahead.xml',
    group: 'BMJ',
    name: 'British Journal of Sports Medicine (Online First)',
    specialty: PhysicianSpecialty.PHYSICAL_MEDICINE,
    enabled: true,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=geriatrics-aging',
    group: 'NEJM',
    name: 'Geriatrics/Aging',
    specialty: PhysicianSpecialty.GERIATRICS,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanexo_current.xml',
    group: 'Lancet',
    name: 'Healthy Longevity',
    specialty: PhysicianSpecialty.GERIATRICS,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanexo_online.xml',
    group: 'Lancet',
    name: 'Healthy Longevity',
    specialty: PhysicianSpecialty.GERIATRICS,
    enabled: true,
  },
];

const PUBLIC_HEALTH_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.thelancet.com/rssfeed/lanpub_current.xml',
    group: 'Lancet',
    name: 'Public Health',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanpub_online.xml',
    group: 'Lancet',
    name: 'Public Health',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanwh_current.xml',
    group: 'Lancet',
    name: 'Global Health',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanwh_online.xml',
    group: 'Lancet',
    name: 'Global Health',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
    enabled: true,
  },
  {
    url: 'https://jamanetwork.com/rss/site_193/185.xml',
    group: 'JAMA',
    name: 'Health Forum',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
    enabled: true,
  },
  {
    url: 'http://gh.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'BMJ Global Health',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
    enabled: true,
  },
  {
    url: 'http://oem.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'Occupational and Environmental Medicine',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
    enabled: true,
  },
  {
    url: 'http://jech.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'Journal of Epidemiology and Community Health',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
    enabled: true,
  },
  {
    url: 'http://jech.bmj.com/rss/ahead.xml',
    group: 'BMJ',
    name: 'Journal of Epidemiology and Community Health (Online First)',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
    enabled: true,
  },
  {
    url: 'https://tools.cdc.gov/api/v2/resources/media/342778.rss',
    group: 'CDC',
    name: 'Morbidity and Mortality Weekly Report',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
    enabled: true,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=health-policy',
    group: 'NEJM',
    name: 'Health Policy',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
    enabled: true,
  },
];

// High-Impact General Feeds
const HIGH_IMPACT_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.cell.com/cell/inpress.rss',
    group: 'Cell',
    name: BestJournals.CELL,
    specialty: PhysicianSpecialty.OTHER,
    enabled: true,
  },
  {
    url: 'https://www.cell.com/cell/current.rss',
    group: 'Cell',
    name: BestJournals.CELL,
    specialty: PhysicianSpecialty.OTHER,
    enabled: true,
  },
  {
    url: 'https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=stm',
    group: 'AAAS',
    name: 'Science Translational Medicine',
    specialty: PhysicianSpecialty.OTHER,
    enabled: true,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=clinical-medicine',
    group: 'NEJM',
    name: 'Clinical Medicine',
    specialty: PhysicianSpecialty.OTHER,
    enabled: true,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=genetics',
    group: 'NEJM',
    name: 'Genetics',
    specialty: PhysicianSpecialty.OTHER,
    enabled: true,
  },
  {
    url: 'http://casereports.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'BMJ Case Reports',
    specialty: PhysicianSpecialty.OTHER,
    enabled: true,
  },
  {
    url: 'http://bmjopen.bmj.com/rss/current.xml',
    group: 'BMJ',
    name: 'BMJ Open',
    specialty: PhysicianSpecialty.OTHER,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanmic_current.xml',
    group: 'Lancet',
    name: 'EClinicalMedicine',
    specialty: PhysicianSpecialty.OTHER,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanmic_online.xml',
    group: 'Lancet',
    name: 'EClinicalMedicine (Lancet)',
    specialty: PhysicianSpecialty.OTHER,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanme_current.xml',
    group: 'Lancet',
    name: 'Microbe',
    specialty: PhysicianSpecialty.OTHER,
    enabled: true,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanme_online.xml',
    group: 'Lancet',
    name: 'Microbe',
    specialty: PhysicianSpecialty.OTHER,
    enabled: true,
  },
];

// Combined RSS_FEEDS array
export const RSS_FEEDS: RssFeedConfig[] = [
  ...COMMON_FEEDS,
  ...DRUG_FEEDS,
  ...ONCOLOGY_FEEDS,
  ...CARDIOLOGY_FEEDS,
  ...NEUROLOGY_FEEDS,
  ...GASTROENTEROLOGY_FEEDS,
  ...PULMONOLOGY_FEEDS,
  ...HEMATOLOGY_FEEDS,
  ...PEDIATRICS_FEEDS,
  ...PSYCHIATRY_FEEDS,
  ...OPHTHALMOLOGY_FEEDS,
  ...ENDOCRINOLOGY_FEEDS,
  ...INFECTIOUS_DISEASE_FEEDS,
  ...SURGERY_FEEDS,
  ...EMERGENCY_MEDICINE_FEEDS,
  ...IMMUNOLOGY_FEEDS,
  ...DERMATOLOGY_FEEDS,
  ...RHEUMATOLOGY_FEEDS,
  ...NEPHROLOGY_FEEDS,
  ...OTHER_SPECIALTY_FEEDS,
  ...PUBLIC_HEALTH_FEEDS,
  ...HIGH_IMPACT_FEEDS,
];

// Export individual arrays for easier management
export {
  COMMON_FEEDS,
  DRUG_FEEDS,
  ONCOLOGY_FEEDS,
  CARDIOLOGY_FEEDS,
  NEUROLOGY_FEEDS,
  GASTROENTEROLOGY_FEEDS,
  PULMONOLOGY_FEEDS,
  HEMATOLOGY_FEEDS,
  PEDIATRICS_FEEDS,
  PSYCHIATRY_FEEDS,
  OPHTHALMOLOGY_FEEDS,
  ENDOCRINOLOGY_FEEDS,
  INFECTIOUS_DISEASE_FEEDS,
  SURGERY_FEEDS,
  EMERGENCY_MEDICINE_FEEDS,
  IMMUNOLOGY_FEEDS,
  DERMATOLOGY_FEEDS,
  RHEUMATOLOGY_FEEDS,
  NEPHROLOGY_FEEDS,
  OTHER_SPECIALTY_FEEDS,
  PUBLIC_HEALTH_FEEDS,
  HIGH_IMPACT_FEEDS,
};
