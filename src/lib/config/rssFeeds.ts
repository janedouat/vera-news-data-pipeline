import { PhysicianSpecialty } from '@/types/taxonomy';
import { BestJournals, BestJournalsLabel } from '@/lib/constants/bestJournals';

export type RssFeedConfig = {
  url: string;
  bestJournal?: string; // the full journal name
  specialty?: PhysicianSpecialty;
  enabled?: boolean;
  journal?: string; // from bestJournals.ts
  sourceName?: string;
  sourceId?: string;
  acceptedNewsTypes?: 'all' | string[];
} & (
  | {
      type: 'journal';
      acceptedNewsTypes?: 'all' | string[];
    }
  | {
      type?: 'drugs.com' | 'custom';
    }
);

// Common/General Medical Feeds
const COMMON_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.nature.com/nm.rss',
    sourceName: BestJournalsLabel[BestJournals.NATURE_MEDICINE],
    bestJournal: BestJournals.NATURE_MEDICINE,
    enabled: true,
    type: 'journal',
    sourceId: BestJournals.NATURE_MEDICINE,
  },
  {
    url: 'https://jamanetwork.com/rss/site_3/67.xml',
    sourceName: BestJournalsLabel[BestJournals.JAMA],
    bestJournal: BestJournals.JAMA,
    enabled: true,
    type: 'journal',
    sourceId: BestJournals.JAMA + 'current',
  },
  {
    url: 'https://jamanetwork.com/rss/site_3/onlineFirst_67.xml',
    sourceName: BestJournalsLabel[BestJournals.JAMA],
    bestJournal: BestJournals.JAMA,
    enabled: true,
    type: 'journal',
    sourceId: BestJournals.JAMA + 'online_first',
  },
  {
    url: 'http://feeds.bmj.com/bmj/recent',
    sourceName: BestJournalsLabel[BestJournals.THE_BMJ],
    bestJournal: BestJournals.THE_BMJ,
    enabled: true,
    type: 'journal',
    sourceId: 'bmj_recent',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lancet_current.xml',
    sourceName: BestJournalsLabel[BestJournals.THE_LANCET],
    bestJournal: BestJournals.THE_LANCET,
    enabled: true,
    type: 'journal',
    sourceId: 'lancet_current',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lancet_online.xml',
    sourceName: BestJournalsLabel[BestJournals.THE_LANCET],
    bestJournal: BestJournals.THE_LANCET,
    enabled: true,
    type: 'journal',
    sourceId: 'lancet_online',
  },
  {
    url: 'https://jamanetwork.com/rss/site_15/71.xml',
    sourceName: BestJournalsLabel[BestJournals.JOURNAL_OF_INTERNAL_MEDICINE],
    bestJournal: BestJournals.JOURNAL_OF_INTERNAL_MEDICINE,
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://jamanetwork.com/rss/site_15/onlineFirst_71.xml',
    sourceName: BestJournalsLabel[BestJournals.JOURNAL_OF_INTERNAL_MEDICINE],
    bestJournal: BestJournals.JOURNAL_OF_INTERNAL_MEDICINE,
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onlinelibrary.wiley.com/feed/13652796/most-recent',
    sourceName: BestJournalsLabel[BestJournals.JOURNAL_OF_INTERNAL_MEDICINE],
    bestJournal: BestJournals.JOURNAL_OF_INTERNAL_MEDICINE,
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.nature.com/nrd.rss',
    sourceName: BestJournalsLabel[BestJournals.NATURE_REVIEWS_DRUG_DISCOVERY],
    bestJournal: BestJournals.NATURE_REVIEWS_DRUG_DISCOVERY,
    specialty: PhysicianSpecialty.OTHER,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.nature.com/nbt.rss',
    sourceName: BestJournalsLabel[BestJournals.NATURE_BIOTECHNOLOGY],
    bestJournal: BestJournals.NATURE_BIOTECHNOLOGY,
    specialty: PhysicianSpecialty.OTHER,
    enabled: true,
    type: 'journal',
  },
];

// Drug/Pharmaceutical Feeds
const DRUG_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.drugs.com/feeds/new_drug_approvals.xml',
    enabled: true,
    type: 'drugs.com',
  },
];

const CDC_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://tools.cdc.gov/api/v2/resources/media/132608.rss',
    enabled: true,
    sourceId: 'CDC',
    sourceName: 'CDC',
  },
];

const AI_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://jamanetwork.com/rss/site_9/0_44024.xml',
    enabled: true,
    sourceName: 'JAMA AI',
    sourceId: 'jama_ai',
    type: 'journal',
    acceptedNewsTypes: 'all',
  },
];

// Oncology/Cancer Feeds
const ONCOLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.nature.com/natcancer.rss',
    sourceName: BestJournalsLabel[BestJournals.NATURE_CANCER],
    bestJournal: BestJournals.NATURE_CANCER,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.nature.com/nrc.rss',
    sourceName: BestJournalsLabel[BestJournals.NATURE_REVIEWS_CANCER],
    bestJournal: BestJournals.NATURE_REVIEWS_CANCER,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://ascopubs.org/action/showFeed?type=etoc&feed=rss&jc=jco',
    sourceName: BestJournalsLabel[BestJournals.JOURNAL_OF_CLINICAL_ONCOLOGY],
    bestJournal: BestJournals.JOURNAL_OF_CLINICAL_ONCOLOGY,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.cell.com/cancer-cell/inpress.rss',
    sourceName: BestJournalsLabel[BestJournals.CANCER_CELL],
    bestJournal: BestJournals.CANCER_CELL,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.cell.com/cancer-cell/current.rss',
    sourceName: BestJournalsLabel[BestJournals.CANCER_CELL],
    bestJournal: BestJournals.CANCER_CELL,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanonc_current.xml',
    sourceName: BestJournalsLabel[BestJournals.LANCET_ONCOLOGY],
    bestJournal: BestJournals.LANCET_ONCOLOGY,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanonc_online.xml',
    sourceName: BestJournalsLabel[BestJournals.LANCET_ONCOLOGY],
    bestJournal: BestJournals.LANCET_ONCOLOGY,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://jamanetwork.com/rss/site_159/174.xml',
    sourceName: BestJournalsLabel[BestJournals.LANCET_ONCOLOGY],
    bestJournal: BestJournals.LANCET_ONCOLOGY,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://jamanetwork.com/rss/site_159/onlineFirst_174.xml',
    sourceName: BestJournalsLabel[BestJournals.LANCET_ONCOLOGY],
    bestJournal: BestJournals.LANCET_ONCOLOGY,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=hematology-oncology',
    sourceName: BestJournalsLabel[BestJournals.NEJM],
    bestJournal: 'Hematology/Oncology',
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/0370647/?limit=15&name=CA%20Cancer%20J%20Clin&utm_campaign=journals',
    sourceName: 'ACS',
    bestJournal: BestJournals.CA_CANCER_JOURNAL,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/8309333/?limit=15&name=J%20Clin%20Oncol&utm_campaign=journals',
    sourceName: '',
    bestJournal: BestJournals.JOURNAL_OF_CLINICAL_ONCOLOGY,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/101561693/?limit=15&name=Cancer%20Discov&utm_campaign=journals',
    sourceName: '',
    bestJournal: BestJournals.CANCER_DISCOVERY,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/9007735/?limit=15&name=Ann%20Oncol&utm_campaign=journals',
    sourceName: '',
    bestJournal: BestJournals.ANNALS_OF_ONCOLOGY,
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.nature.com/nrclinonc.rss',
    sourceName: 'Nature',
    bestJournal: 'Nature Reviews Clinical Oncology',
    specialty: PhysicianSpecialty.ONCOLOGY,
    enabled: true,
    type: 'journal',
  },
];
// Cardiology Feeds
const CARDIOLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.nature.com/nrcardio.rss',
    sourceName: BestJournalsLabel[BestJournals.NATURE_REVIEWS_CARDIOLOGY],
    bestJournal: BestJournals.NATURE_REVIEWS_CARDIOLOGY,
    specialty: PhysicianSpecialty.CARDIOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://jamanetwork.com/rss/site_192/184.xml',
    sourceName: BestJournalsLabel[BestJournals.JAMA_CARDIOLOGY],
    bestJournal: BestJournals.JAMA_CARDIOLOGY,
    specialty: PhysicianSpecialty.CARDIOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://jamanetwork.com/rss/site_192/onlineFirst_184.xml',
    sourceName: BestJournalsLabel[BestJournals.JAMA_CARDIOLOGY],
    bestJournal: BestJournals.JAMA_CARDIOLOGY,
    specialty: PhysicianSpecialty.CARDIOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'http://heart.bmj.com/rss/current.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal: 'Heart',
    specialty: PhysicianSpecialty.CARDIOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'http://heart.bmj.com/rss/ahead.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal: 'Heart (Online First)',
    specialty: PhysicianSpecialty.CARDIOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=cardiology',
    sourceName: BestJournalsLabel[BestJournals.NEJM],
    bestJournal: BestJournals.JAMA_CARDIOLOGY,
    specialty: PhysicianSpecialty.CARDIOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/8301365/?limit=15&name=J%20Am%20Coll%20Cardiol&utm_campaign=journals',
    sourceName: '',
    bestJournal: 'Journal of the American College of Cardiology',
    specialty: PhysicianSpecialty.CARDIOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/0147763/?limit=15&name=Circulation&utm_campaign=journals',
    sourceName: '',
    bestJournal: 'Circulation',
    specialty: PhysicianSpecialty.CARDIOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/8006263/?limit=15&name=Eur%20Heart%20J&utm_campaign=journals',
    sourceName: '',
    bestJournal: BestJournals.EUROPEAN_HEART_JOURNAL,
    specialty: PhysicianSpecialty.CARDIOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/101598241/?limit=15&name=JACC%20Heart%20Fail&utm_campaign=journals',
    sourceName: '',
    bestJournal: 'JACC: Heart Failure',
    specialty: PhysicianSpecialty.CARDIOLOGY,
    enabled: true,
    type: 'journal',
  },
];

// Neurology Feeds
const NEUROLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.nature.com/nrneurol.rss',
    sourceName: BestJournalsLabel[BestJournals.NATURE_REVIEWS_NEUROLOGY],
    bestJournal: BestJournals.NATURE_REVIEWS_NEUROLOGY,
    specialty: PhysicianSpecialty.NEUROLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://jamanetwork.com/rss/site_16/72.xml',
    sourceName: BestJournalsLabel[BestJournals.JAMA_NEUROLOGY],
    bestJournal: BestJournals.JAMA_NEUROLOGY,
    specialty: PhysicianSpecialty.NEUROLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://jamanetwork.com/rss/site_16/onlineFirst_72.xml',
    sourceName: BestJournalsLabel[BestJournals.JAMA_NEUROLOGY],
    bestJournal: BestJournals.JAMA_NEUROLOGY,
    specialty: PhysicianSpecialty.NEUROLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'http://jnnp.bmj.com/rss/current.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal: 'Journal of Neurology, Neurosurgery & Psychiatry',
    specialty: PhysicianSpecialty.NEUROLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'http://jnnp.bmj.com/rss/ahead.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal:
      'Journal of Neurology, Neurosurgery & Psychiatry (Online First)',
    specialty: PhysicianSpecialty.NEUROLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onlinelibrary.wiley.com/feed/15318249/most-recent',
    sourceName: BestJournalsLabel[BestJournals.ANNALS_OF_NEUROLOGY],
    bestJournal: BestJournals.ANNALS_OF_NEUROLOGY,
    specialty: PhysicianSpecialty.NEUROLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laneur_current.xml',
    sourceName: BestJournalsLabel[BestJournals.LANCET_NEUROLOGY],
    bestJournal: BestJournals.LANCET_NEUROLOGY,
    specialty: PhysicianSpecialty.NEUROLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laneur_online.xml',
    sourceName: BestJournalsLabel[BestJournals.JAMA_NEUROLOGY],
    bestJournal: BestJournals.JAMA_NEUROLOGY,
    specialty: PhysicianSpecialty.NEUROLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=neurology-neurosurgery',
    sourceName: BestJournals.NEJM,
    bestJournal: 'Neurology/Neurosurgery',
    specialty: PhysicianSpecialty.NEUROLOGY,
    enabled: true,
    type: 'journal',
  },
];

// Gastroenterology Feeds
const GASTROENTEROLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.thelancet.com/rssfeed/langas_current.xml',
    sourceName: BestJournalsLabel[BestJournals.LANCET_DIABETES_ENDOCRINOLOGY],
    bestJournal: BestJournals.LANCET_DIABETES_ENDOCRINOLOGY,
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/langas_online.xml',
    sourceName: BestJournalsLabel[BestJournals.LANCET_DIABETES_ENDOCRINOLOGY],
    bestJournal: BestJournals.LANCET_DIABETES_ENDOCRINOLOGY,
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'http://gut.bmj.com/rss/current.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal: 'Gut',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'http://gut.bmj.com/rss/ahead.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal: 'Gut (Online First)',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'http://fg.bmj.com/rss/current.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal: 'Frontline Gastroenterology',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'http://fg.bmj.com/rss/ahead.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal: 'Frontline Gastroenterology (Online First)',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=gastroenterology',
    sourceName: BestJournalsLabel[BestJournals.NEJM],
    bestJournal: 'Gastroenterology',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/8503886/?limit=15&name=J%20Hepatol&utm_campaign=journals',
    sourceName: '',
    bestJournal: 'Journal of Hepatology',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/0374630/?limit=15&name=Gastroenterology&utm_campaign=journals',
    sourceName: '',
    bestJournal: 'Gastroenterology',
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
    enabled: true,
    type: 'journal',
  },
];

// Pulmonology/Respiratory Feeds
const PULMONOLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.thelancet.com/rssfeed/lanres_current.xml',
    sourceName: BestJournalsLabel[BestJournals.LANCET_RESPIRATORY_MEDICINE],
    bestJournal: BestJournals.LANCET_RESPIRATORY_MEDICINE,
    specialty: PhysicianSpecialty.PULMONOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanres_online.xml',
    sourceName: BestJournalsLabel[BestJournals.LANCET_RESPIRATORY_MEDICINE],
    bestJournal: BestJournals.LANCET_RESPIRATORY_MEDICINE,
    specialty: PhysicianSpecialty.PULMONOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'http://thorax.bmj.com/rss/current.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal: 'Thorax',
    specialty: PhysicianSpecialty.PULMONOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'http://thorax.bmj.com/rss/ahead.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal: 'Thorax (Online First)',
    specialty: PhysicianSpecialty.PULMONOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.atsjournals.org/action/showFeed?type=etoc&feed=rss&jc=annalsats',
    sourceName:
      BestJournalsLabel[
        BestJournals.AMERICAN_JOURNAL_OF_RESPIRATORY_AND_CRITICAL_CARE_MEDICINE
      ],
    bestJournal:
      BestJournals.AMERICAN_JOURNAL_OF_RESPIRATORY_AND_CRITICAL_CARE_MEDICINE,
    specialty: PhysicianSpecialty.PULMONOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=pulmonary-critical-care',
    sourceName: BestJournalsLabel[BestJournals.NEJM],
    bestJournal: 'Pulmonary/Critical Care',
    specialty: PhysicianSpecialty.PULMONOLOGY,
    enabled: true,
    type: 'journal',
  },
];
// Hematology Feeds
const HEMATOLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.nature.com/leu.rss',
    sourceName: BestJournalsLabel[BestJournals.LEUKEMIA],
    bestJournal: BestJournals.LEUKEMIA,
    specialty: PhysicianSpecialty.HEMATOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/7603509/?limit=15&name=Blood&utm_campaign=journals',
    sourceName: '',
    bestJournal: BestJournals.BLOOD,
    specialty: PhysicianSpecialty.HEMATOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanhae_current.xml',
    sourceName: BestJournalsLabel[BestJournals.HAEMATOLOGICA],
    bestJournal: BestJournals.HAEMATOLOGICA,
    specialty: PhysicianSpecialty.HEMATOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanhae_online.xml',
    sourceName: BestJournalsLabel[BestJournals.HAEMATOLOGICA],
    bestJournal: BestJournals.HAEMATOLOGICA,
    specialty: PhysicianSpecialty.HEMATOLOGY,
    enabled: true,
    type: 'journal',
  },
];

// Pediatrics Feeds
const PEDIATRICS_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://jamanetwork.com/rss/site_19/75.xml',
    sourceName: BestJournalsLabel[BestJournals.PEDIATRICS],
    bestJournal: BestJournals.PEDIATRICS,
    specialty: PhysicianSpecialty.PEDIATRICS,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://jamanetwork.com/rss/site_19/onlineFirst_75.xml',
    sourceName: BestJournalsLabel[BestJournals.PEDIATRICS],
    bestJournal: BestJournals.PEDIATRICS,
    specialty: PhysicianSpecialty.PEDIATRICS,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://publications.aap.org/rss/site_1000005/1000005.xml',
    sourceName: 'AAP',
    bestJournal: 'Pediatrics',
    specialty: PhysicianSpecialty.PEDIATRICS,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanchi_current.xml',
    sourceName: BestJournalsLabel[BestJournals.LANCET_CHILD_ADOLESCENT_HEALTH],
    bestJournal: BestJournals.LANCET_CHILD_ADOLESCENT_HEALTH,
    specialty: PhysicianSpecialty.PEDIATRICS,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanchi_online.xml',
    sourceName: BestJournalsLabel[BestJournals.LANCET_CHILD_ADOLESCENT_HEALTH],
    bestJournal: BestJournals.LANCET_CHILD_ADOLESCENT_HEALTH,
    specialty: PhysicianSpecialty.PEDIATRICS,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://adc.bmj.com/rss/current.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal: BestJournals.ARCHIVES_OF_DISEASE_IN_CHILDHOOD,
    specialty: PhysicianSpecialty.PEDIATRICS,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=pediatrics',
    sourceName: BestJournalsLabel[BestJournals.NEJM],
    bestJournal: BestJournals.PEDIATRICS,
    specialty: PhysicianSpecialty.PEDIATRICS,
    enabled: true,
    type: 'journal',
  },
];

// Psychiatry Feeds
const PSYCHIATRY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://jamanetwork.com/rss/site_14/70.xml',
    sourceName: BestJournalsLabel[BestJournals.JAMA_PSYCHIATRY],
    bestJournal: BestJournals.JAMA_PSYCHIATRY,
    specialty: PhysicianSpecialty.PSYCHIATRY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://jamanetwork.com/rss/site_14/onlineFirst_70.xml',
    sourceName: BestJournalsLabel[BestJournals.JAMA_PSYCHIATRY],
    bestJournal: BestJournals.JAMA_PSYCHIATRY,
    specialty: PhysicianSpecialty.PSYCHIATRY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanpsy_current.xml',
    sourceName: BestJournalsLabel[BestJournals.JAMA_PSYCHIATRY],
    bestJournal: BestJournals.JAMA_PSYCHIATRY,
    specialty: PhysicianSpecialty.PSYCHIATRY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanpsy_online.xml',
    sourceName: BestJournalsLabel[BestJournals.JAMA_PSYCHIATRY],
    bestJournal: BestJournals.JAMA_PSYCHIATRY,
    specialty: PhysicianSpecialty.PSYCHIATRY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onlinelibrary.wiley.com/feed/20515545/most-recent',
    sourceName: BestJournalsLabel[BestJournals.WORLD_PSYCHIATRY],
    bestJournal: BestJournals.WORLD_PSYCHIATRY,
    specialty: PhysicianSpecialty.PSYCHIATRY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=psychiatry',
    sourceName: BestJournalsLabel[BestJournals.NEJM],
    bestJournal: BestJournals.NEJM,
    specialty: PhysicianSpecialty.PSYCHIATRY,
    enabled: true,
    type: 'journal',
  },
];

// Ophthalmology Feeds
const OPHTHALMOLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://rss.app/feeds/62gUZPqohHlNOs3V.xml',
    sourceName: BestJournalsLabel[BestJournals.OPHTHALMOLOGY],
    bestJournal: BestJournals.OPHTHALMOLOGY,
    specialty: PhysicianSpecialty.OPHTHALMOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/101695048/?limit=100&name=Ophthalmol%20Retina&utm_campaign=journals',
    sourceName: BestJournalsLabel[BestJournals.RETINA],
    bestJournal: BestJournals.RETINA,
    specialty: PhysicianSpecialty.OPHTHALMOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://jamanetwork.com/rss/site_17/73.xml',
    sourceName: BestJournalsLabel[BestJournals.OPHTHALMOLOGY],
    bestJournal: BestJournals.OPHTHALMOLOGY,
    specialty: PhysicianSpecialty.OPHTHALMOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://jamanetwork.com/rss/site_17/onlineFirst_73.xml',
    sourceName: BestJournalsLabel[BestJournals.OPHTHALMOLOGY],
    bestJournal: BestJournals.OPHTHALMOLOGY,
    specialty: PhysicianSpecialty.OPHTHALMOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/9431859/?limit=15&name=Prog%20Retin%20Eye%20Res&utm_campaign=journals',
    sourceName: '',
    bestJournal: 'Progress in Retinal and Eye Research',
    specialty: PhysicianSpecialty.OPHTHALMOLOGY,
    enabled: true,
    type: 'journal',
  },
];

// Endocrinology Feeds
const ENDOCRINOLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.thelancet.com/rssfeed/landia_current.xml',
    sourceName: BestJournalsLabel[BestJournals.LANCET_DIABETES_ENDOCRINOLOGY],
    bestJournal: BestJournals.LANCET_DIABETES_ENDOCRINOLOGY,
    specialty: PhysicianSpecialty.ENDOCRINOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://diabetesjournals.org/rss/site_1000003/1000004.xml',
    sourceName: BestJournalsLabel[BestJournals.DIABETES_CARE],
    bestJournal: BestJournals.DIABETES_CARE,
    specialty: PhysicianSpecialty.ENDOCRINOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://diabetesjournals.org/rss/site_1000003/advanceAccess_1000004.xml',
    sourceName: BestJournalsLabel[BestJournals.DIABETES_CARE],
    bestJournal: BestJournals.DIABETES_CARE,
    specialty: PhysicianSpecialty.ENDOCRINOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://academic.oup.com/rss/site_5593/3466.xml',
    sourceName: BestJournalsLabel[BestJournals.ENDOCRINE_REVIEWS],
    bestJournal: BestJournals.ENDOCRINE_REVIEWS,
    specialty: PhysicianSpecialty.ENDOCRINOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://academic.oup.com/rss/site_5593/advanceAccess_3466.xml',
    sourceName: BestJournalsLabel[BestJournals.ENDOCRINE_REVIEWS],
    bestJournal: BestJournals.ENDOCRINE_REVIEWS,
    specialty: PhysicianSpecialty.ENDOCRINOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'http://drc.bmj.com/rss/current.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal: 'BMJ Open Diabetes Research & Care',
    specialty: PhysicianSpecialty.ENDOCRINOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.nature.com/nrendo.rss',
    sourceName: BestJournalsLabel[BestJournals.NATURE_REVIEWS_ENDOCRINOLOGY],
    bestJournal: BestJournals.NATURE_REVIEWS_ENDOCRINOLOGY,
    specialty: PhysicianSpecialty.ENDOCRINOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=endocrinology',
    sourceName: BestJournalsLabel[BestJournals.NEJM],
    bestJournal: BestJournalsLabel[BestJournals.NEJM],
    specialty: PhysicianSpecialty.ENDOCRINOLOGY,
    enabled: true,
    type: 'journal',
  },
];
// Infectious Disease Feeds
const INFECTIOUS_DISEASE_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.thelancet.com/rssfeed/laninf_current.xml',
    sourceName: BestJournalsLabel[BestJournals.LANCET_INFECTIOUS_DISEASES],
    bestJournal: BestJournals.LANCET_INFECTIOUS_DISEASES,
    specialty: PhysicianSpecialty.INFECTIOUS_DISEASE,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laninf_online.xml',
    sourceName: BestJournalsLabel[BestJournals.LANCET_INFECTIOUS_DISEASES],
    bestJournal: BestJournals.LANCET_INFECTIOUS_DISEASES,
    specialty: PhysicianSpecialty.INFECTIOUS_DISEASE,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://academic.oup.com/rss/site_5269/3135.xml',
    sourceName: BestJournalsLabel[BestJournals.CLINICAL_INFECTIOUS_DISEASES],
    bestJournal: BestJournals.CLINICAL_INFECTIOUS_DISEASES,
    specialty: PhysicianSpecialty.INFECTIOUS_DISEASE,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://academic.oup.com/rss/site_5269/advanceAccess_3135.xml',
    sourceName: BestJournalsLabel[BestJournals.CLINICAL_INFECTIOUS_DISEASES],
    bestJournal: BestJournals.CLINICAL_INFECTIOUS_DISEASES,
    specialty: PhysicianSpecialty.INFECTIOUS_DISEASE,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://journals.asm.org/action/showFeed?type=etoc&feed=rss&jc=CMR',
    sourceName: BestJournalsLabel[BestJournals.CLINICAL_MICROBIOLOGY_REVIEWS],
    bestJournal: BestJournals.CLINICAL_MICROBIOLOGY_REVIEWS,
    specialty: PhysicianSpecialty.INFECTIOUS_DISEASE,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=infectious-disease',
    sourceName: BestJournalsLabel[BestJournals.NEJM],
    bestJournal: 'Infectious Disease',
    specialty: PhysicianSpecialty.INFECTIOUS_DISEASE,
    enabled: true,
    type: 'journal',
  },
];

// Surgery Feeds
const SURGERY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://jamanetwork.com/rss/site_20/76.xml',
    sourceName: BestJournalsLabel[BestJournals.JAMA_SURGERY],
    bestJournal: BestJournals.JAMA_SURGERY,
    specialty: PhysicianSpecialty.GENERAL_SURGERY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://jamanetwork.com/rss/site_20/onlineFirst_76.xml',
    sourceName: BestJournalsLabel[BestJournals.JAMA_SURGERY],
    bestJournal: BestJournals.JAMA_SURGERY,
    specialty: PhysicianSpecialty.GENERAL_SURGERY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://journals.lww.com/annalsofsurgery/_layouts/15/OAKS.Journals/feed.aspx?FeedType=LatestArticles',
    sourceName: BestJournalsLabel[BestJournals.ANNALS_OF_SURGERY],
    bestJournal: BestJournals.ANNALS_OF_SURGERY,
    specialty: PhysicianSpecialty.GENERAL_SURGERY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=surgery',
    sourceName: BestJournalsLabel[BestJournals.NEJM],
    bestJournal: BestJournals.JAMA_SURGERY,
    specialty: PhysicianSpecialty.GENERAL_SURGERY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/0376343/?limit=15&name=J%20Thorac%20Cardiovasc%20Surg&utm_campaign=journals',
    sourceName:
      BestJournalsLabel[
        BestJournals.JOURNAL_OF_THORACIC_AND_CARDIOVASCULAR_SURGERY
      ],
    bestJournal: BestJournals.JOURNAL_OF_THORACIC_AND_CARDIOVASCULAR_SURGERY,
    specialty: PhysicianSpecialty.THORACIC_SURGERY,
    enabled: true,
    type: 'journal',
  },
];

// Emergency Medicine Feeds
const EMERGENCY_MEDICINE_FEEDS: RssFeedConfig[] = [
  {
    url: 'http://emj.bmj.com/rss/current.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal: 'Emergency Medicine Journal',
    specialty: PhysicianSpecialty.EMERGENCY_MEDICINE,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'http://emj.bmj.com/rss/ahead.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal: 'Emergency Medicine Journal (Online First)',
    specialty: PhysicianSpecialty.EMERGENCY_MEDICINE,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=emergency-medicine',
    sourceName: BestJournalsLabel[BestJournals.NEJM],
    bestJournal: 'Emergency Medicine',
    specialty: PhysicianSpecialty.EMERGENCY_MEDICINE,
    enabled: true,
    type: 'journal',
  },
];

// Immunology Feeds
const IMMUNOLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.nature.com/nri.rss',
    sourceName: BestJournalsLabel[BestJournals.NATURE_REVIEWS_IMMUNOLOGY],
    bestJournal: BestJournals.NATURE_REVIEWS_IMMUNOLOGY,
    specialty: PhysicianSpecialty.ALLERGY_IMMUNOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.cell.com/immunity/inpress.rss',
    sourceName: BestJournalsLabel[BestJournals.IMMUNITY],
    bestJournal: BestJournals.IMMUNITY,
    specialty: PhysicianSpecialty.ALLERGY_IMMUNOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.cell.com/immunity/current.rss',
    sourceName: BestJournalsLabel[BestJournals.IMMUNITY],
    bestJournal: BestJournals.IMMUNITY,
    specialty: PhysicianSpecialty.ALLERGY_IMMUNOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.annualreviews.org/rss/content/journals/immunol/latestarticles?fmt=rss',
    sourceName: BestJournalsLabel[BestJournals.ANNUAL_REVIEW_OF_IMMUNOLOGY],
    bestJournal: BestJournals.ANNUAL_REVIEW_OF_IMMUNOLOGY,
    specialty: PhysicianSpecialty.ALLERGY_IMMUNOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=allergy-immunology',
    sourceName: BestJournalsLabel[BestJournals.NEJM],
    bestJournal: 'Allergy/Immunology',
    specialty: PhysicianSpecialty.ALLERGY_IMMUNOLOGY,
    enabled: true,
    type: 'journal',
  },
];

// Specialty Feeds (additional specialties)
const DERMATOLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://jamanetwork.com/rss/site_12/68.xml',
    sourceName: BestJournalsLabel[BestJournals.JAMA],
    bestJournal: BestJournals.JAMA_DERMATOLOGY,
    specialty: PhysicianSpecialty.DERMATOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://jamanetwork.com/rss/site_12/onlineFirst_68.xml',
    sourceName: BestJournalsLabel[BestJournals.JAMA],
    bestJournal: BestJournals.JAMA_DERMATOLOGY,
    specialty: PhysicianSpecialty.DERMATOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onlinelibrary.wiley.com/feed/13652133/most-recent',
    sourceName: 'Wiley',
    bestJournal: BestJournals.BRITISH_JOURNAL_OF_DERMATOLOGY,
    specialty: PhysicianSpecialty.DERMATOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://academic.oup.com/rss/site_6497/advanceAccess_4139.xml',
    sourceName: 'Oxford Academic',
    bestJournal: 'British Journal of Dermatology',
    specialty: PhysicianSpecialty.DERMATOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://academic.oup.com/rss/site_6497/4139.xml',
    sourceName: 'Oxford Academic',
    bestJournal: 'British Journal of Dermatology',
    specialty: PhysicianSpecialty.DERMATOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=dermatology',
    sourceName: BestJournalsLabel[BestJournals.NEJM],
    bestJournal: BestJournals.JAMA_DERMATOLOGY,
    specialty: PhysicianSpecialty.DERMATOLOGY,
    enabled: true,
    type: 'journal',
  },
];

const RHEUMATOLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.thelancet.com/rssfeed/lanrhe_current.xml',
    sourceName: BestJournalsLabel[BestJournals.THE_LANCET],
    bestJournal: 'Rheumatology',
    specialty: PhysicianSpecialty.RHEUMATOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanrhe_online.xml',
    sourceName: BestJournalsLabel[BestJournals.THE_LANCET],
    bestJournal: 'Rheumatology',
    specialty: PhysicianSpecialty.RHEUMATOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.nature.com/nrrheum.rss',
    sourceName: 'Nature',
    bestJournal: 'Nature Reviews Rheumatology',
    specialty: PhysicianSpecialty.RHEUMATOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://pubmed.ncbi.nlm.nih.gov/rss/journals/0372355/?limit=15&name=Ann%20Rheum%20Dis&utm_campaign=journals',
    sourceName: '',
    bestJournal: 'Annals of the Rheumatic Diseases',
    specialty: PhysicianSpecialty.RHEUMATOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=rheumatology',
    sourceName: BestJournalsLabel[BestJournals.NEJM],
    bestJournal: 'Rheumatology',
    specialty: PhysicianSpecialty.RHEUMATOLOGY,
    enabled: true,
    type: 'journal',
  },
];

const NEPHROLOGY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://journals.lww.com/JASN/_layouts/15/OAKS.Journals/feed.aspx?FeedType=CurrentIssue',
    sourceName: 'LWW',
    bestJournal: 'Journal of the American Society of Nephrology',
    specialty: PhysicianSpecialty.NEPHROLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.nature.com/nrneph.rss',
    sourceName: 'Nature',
    bestJournal: 'Nature Reviews Nephrology',
    specialty: PhysicianSpecialty.NEPHROLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=nephrology',
    sourceName: BestJournalsLabel[BestJournals.NEJM],
    bestJournal: 'Nephrology',
    specialty: PhysicianSpecialty.NEPHROLOGY,
    enabled: true,
    type: 'journal',
  },
];

const OTHER_SPECIALTY_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://jamanetwork.com/rss/site_18/74.xml',
    sourceName: BestJournalsLabel[BestJournals.JAMA],
    bestJournal: 'Otolaryngology–Head & Neck Surgery',
    specialty: PhysicianSpecialty.OTOLARYNGOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://jamanetwork.com/rss/site_18/onlineFirst_74.xml',
    sourceName: BestJournalsLabel[BestJournals.JAMA],
    bestJournal: 'Otolaryngology–Head & Neck Surgery',
    specialty: PhysicianSpecialty.OTOLARYNGOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=obstetrics-gynecology',
    sourceName: BestJournalsLabel[BestJournals.NEJM],
    bestJournal: 'Obstetrics/Gynecology',
    specialty: PhysicianSpecialty.OBSTETRICS_GYNECOLOGY,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'http://bjsm.bmj.com/rss/current.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal: 'British Journal of Sports Medicine',
    specialty: PhysicianSpecialty.PHYSICAL_MEDICINE,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'http://bjsm.bmj.com/rss/ahead.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal: 'British Journal of Sports Medicine (Online First)',
    specialty: PhysicianSpecialty.PHYSICAL_MEDICINE,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=geriatrics-aging',
    sourceName: BestJournalsLabel[BestJournals.NEJM],
    bestJournal: 'Geriatrics/Aging',
    specialty: PhysicianSpecialty.GERIATRICS,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanexo_current.xml',
    sourceName: BestJournalsLabel[BestJournals.THE_LANCET],
    bestJournal: 'Healthy Longevity',
    specialty: PhysicianSpecialty.GERIATRICS,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanexo_online.xml',
    sourceName: BestJournalsLabel[BestJournals.THE_LANCET],
    bestJournal: 'Healthy Longevity',
    specialty: PhysicianSpecialty.GERIATRICS,
    enabled: true,
    type: 'journal',
  },
];

const PUBLIC_HEALTH_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.thelancet.com/rssfeed/lanpub_current.xml',
    sourceName: BestJournalsLabel[BestJournals.THE_LANCET],
    bestJournal: 'Public Health',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanpub_online.xml',
    sourceName: BestJournalsLabel[BestJournals.THE_LANCET],
    bestJournal: 'Public Health',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanwh_current.xml',
    sourceName: BestJournalsLabel[BestJournals.THE_LANCET],
    bestJournal: 'Global Health',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanwh_online.xml',
    sourceName: BestJournalsLabel[BestJournals.THE_LANCET],
    bestJournal: 'Global Health',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://jamanetwork.com/rss/site_193/185.xml',
    sourceName: BestJournalsLabel[BestJournals.JAMA],
    bestJournal: 'Health Forum',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'http://gh.bmj.com/rss/current.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal: 'BMJ Global Health',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'http://oem.bmj.com/rss/current.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal: 'Occupational and Environmental Medicine',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'http://jech.bmj.com/rss/current.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal: 'Journal of Epidemiology and Community Health',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'http://jech.bmj.com/rss/ahead.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal: 'Journal of Epidemiology and Community Health (Online First)',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=health-policy',
    sourceName: BestJournalsLabel[BestJournals.NEJM],
    bestJournal: 'Health Policy',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
    enabled: true,
    type: 'journal',
  },
];

// High-Impact General Feeds
const HIGH_IMPACT_FEEDS: RssFeedConfig[] = [
  {
    url: 'https://www.cell.com/cell/inpress.rss',
    sourceName: 'Cell',
    bestJournal: BestJournals.CELL,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.cell.com/cell/current.rss',
    sourceName: 'Cell',
    bestJournal: BestJournals.CELL,
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.science.org/action/showFeed?type=etoc&feed=rss&jc=stm',
    sourceName: 'AAAS',
    bestJournal: 'Science Translational Medicine',
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=clinical-medicine',
    sourceName: BestJournalsLabel[BestJournals.NEJM],
    bestJournal: 'Clinical Medicine',
    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=genetics',
    sourceName: BestJournalsLabel[BestJournals.NEJM],
    bestJournal: 'Genetics',

    enabled: true,
    type: 'journal',
  },
  {
    url: 'http://casereports.bmj.com/rss/current.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal: 'BMJ Case Reports',

    enabled: true,
    type: 'journal',
  },
  {
    url: 'http://bmjopen.bmj.com/rss/current.xml',
    sourceName: BestJournalsLabel[BestJournals.BMJ],
    bestJournal: 'BMJ Open',

    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanmic_current.xml',
    sourceName: BestJournalsLabel[BestJournals.THE_LANCET],
    bestJournal: 'EClinicalMedicine',

    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanmic_online.xml',
    sourceName: BestJournalsLabel[BestJournals.THE_LANCET],
    bestJournal: 'EClinicalMedicine (Lancet)',

    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanme_current.xml',
    sourceName: BestJournalsLabel[BestJournals.THE_LANCET],
    bestJournal: 'Microbe',

    enabled: true,
    type: 'journal',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanme_online.xml',
    sourceName: BestJournalsLabel[BestJournals.THE_LANCET],
    bestJournal: 'Microbe',

    enabled: true,
    type: 'journal',
  },
];

const ALL_FEEDS: RssFeedConfig[] = [
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

// Export the combined feeds array
export const RSS_FEEDS = ALL_FEEDS;

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
  CDC_FEEDS,
  AI_FEEDS,
};
