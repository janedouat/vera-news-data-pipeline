import { PhysicianSpecialty } from '@/types/taxonomy';

export interface RssFeedConfig {
  url: string;
  group: string; // the short-form journal name
  name: string; // the full journal name
  specialty?: PhysicianSpecialty;
  enabled?: boolean;
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
    name: 'Oncology',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laninf_current.xml',
    group: 'Lancet',
    name: 'Infectious Diseases',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laneur_current.xml',
    group: 'Lancet',
    name: 'Neurology',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanpsy_current.xml',
    group: 'Lancet',
    name: 'Psychiatry',
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
  {
    url: 'https://www.thelancet.com/rssfeed/lanplh_current.xml',
    group: 'Lancet',
    name: 'Planetary Health',
  },
  //   {
  //     url: 'https://www.thelancet.com/rssfeed/lanam_current.xml',
  //     group: 'Lancet',
  //     name: 'Americas',
  //   },
  {
    url: 'https://www.thelancet.com/rssfeed/lanchi_current.xml',
    group: 'Lancet',
    name: 'Child & Adolescent Health',
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
    name: 'Lancet',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanonc_online.xml',
    group: 'Lancet',
    name: 'Oncology',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laninf_online.xml',
    group: 'Lancet',
    name: 'Infectious Diseases',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laneur_online.xml',
    group: 'Lancet',
    name: 'Neurology',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanpsy_online.xml',
    group: 'Lancet',
    name: 'Psychiatry',
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
  {
    url: 'https://www.thelancet.com/rssfeed/lanplh_online.xml',
    group: 'Lancet',
    name: 'Planetary Health',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanam_online.xml',
    group: 'Lancet',
    name: 'Americas',
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanchi_online.xml',
    group: 'Lancet',
    name: 'Child & Adolescent Health',
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
    name: 'Lancet',
    specialty: PhysicianSpecialty.OTHER,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanonc_current.xml',
    group: 'Lancet',
    name: 'Oncology',
    specialty: PhysicianSpecialty.ONCOLOGY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laninf_current.xml',
    group: 'Lancet',
    name: 'Infectious Diseases',
    specialty: PhysicianSpecialty.INFECTIOUS_DISEASE,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/laneur_current.xml',
    group: 'Lancet',
    name: 'Neurology',
    specialty: PhysicianSpecialty.NEUROLOGY,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanpsy_current.xml',
    group: 'Lancet',
    name: 'Psychiatry',
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
  {
    url: 'https://www.thelancet.com/rssfeed/lanplh_current.xml',
    group: 'Lancet',
    name: 'Planetary Health',
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanam_current.xml',
    group: 'Lancet',
    name: 'Americas',
    specialty: PhysicianSpecialty.OTHER,
  },
  {
    url: 'https://www.thelancet.com/rssfeed/lanchi_current.xml',
    group: 'Lancet',
    name: 'Child & Adolescent Health',
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
  {
    url: 'https://www.thelancet.com/rssfeed/lanjpx_current.xml',
    group: 'Lancet',
    name: 'Regional Health – Western Pacific',
    specialty: PhysicianSpecialty.OTHER,
  },
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
    name: 'JAMA',
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
  },
  {
    url: 'https://jamanetwork.com/rss/site_192/184.xml',
    group: 'JAMA',
    name: 'Cardiology',
    specialty: PhysicianSpecialty.CARDIOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_12/68.xml',
    group: 'JAMA',
    name: 'Dermatology',
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
    name: 'Internal Medicine',
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
  },
  {
    url: 'https://jamanetwork.com/rss/site_16/72.xml',
    group: 'JAMA',
    name: 'Neurology',
    specialty: PhysicianSpecialty.NEUROLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_159/174.xml',
    group: 'JAMA',
    name: 'Oncology',
    specialty: PhysicianSpecialty.ONCOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_17/73.xml',
    group: 'JAMA',
    name: 'Ophthalmology',
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
    name: 'Pediatrics',
    specialty: PhysicianSpecialty.PEDIATRICS,
  },
  {
    url: 'https://jamanetwork.com/rss/site_14/70.xml',
    group: 'JAMA',
    name: 'Psychiatry',
    specialty: PhysicianSpecialty.PSYCHIATRY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_20/76.xml',
    group: 'JAMA',
    name: 'Surgery',
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
    name: 'Cardiology',
    specialty: PhysicianSpecialty.CARDIOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_12/onlineFirst_68.xml',
    group: 'JAMA',
    name: 'Dermatology',
    specialty: PhysicianSpecialty.DERMATOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_15/onlineFirst_71.xml',
    group: 'JAMA',
    name: 'Internal Medicine',
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
  },
  {
    url: 'https://jamanetwork.com/rss/site_16/onlineFirst_72.xml',
    group: 'JAMA',
    name: 'Neurology',
    specialty: PhysicianSpecialty.NEUROLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_159/onlineFirst_174.xml',
    group: 'JAMA',
    name: 'Oncology',
    specialty: PhysicianSpecialty.ONCOLOGY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_17/onlineFirst_73.xml',
    group: 'JAMA',
    name: 'Ophthalmology',
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
    name: 'Pediatrics',
    specialty: PhysicianSpecialty.PEDIATRICS,
  },
  {
    url: 'https://jamanetwork.com/rss/site_14/onlineFirst_70.xml',
    group: 'JAMA',
    name: 'Psychiatry',
    specialty: PhysicianSpecialty.PSYCHIATRY,
  },
  {
    url: 'https://jamanetwork.com/rss/site_20/onlineFirst_76.xml',
    group: 'JAMA',
    name: 'Surgery',
    specialty: PhysicianSpecialty.GENERAL_SURGERY,
  },
  {
    url: 'http://feeds.bmj.com/bmj/recent',
    group: 'BMJ',
    name: 'The BMJ',
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
    name: 'Cardiology',
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
    name: 'Dermatology',
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
    name: 'Pediatrics',
    specialty: PhysicianSpecialty.PEDIATRICS,
  },
  {
    url: 'https://onesearch-rss.nejm.org/api/specialty/rss?context=nejm&specialty=psychiatry',
    group: 'NEJM',
    name: 'Psychiatry',
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
    name: 'Surgery',
    specialty: PhysicianSpecialty.GENERAL_SURGERY,
  },
];

// Helper functions for filtering and organizing feeds

// Filter to only get enabled feeds
export const getEnabledRssFeeds = (): RssFeedConfig[] => {
  return RSS_FEEDS.filter((feed) => feed.enabled !== false);
};

// Get feeds by group (e.g., 'Lancet', 'NEJM', 'JAMA', 'BMJ')
export const getFeedsByGroup = (group: string): RssFeedConfig[] => {
  return RSS_FEEDS.filter((feed) => feed.group === group);
};

// Get feeds by specialty
export const getFeedsBySpecialty = (
  specialty: PhysicianSpecialty,
): RssFeedConfig[] => {
  return RSS_FEEDS.filter((feed) => feed.specialty === specialty);
};

// Get all unique groups
export const getAllGroups = (): string[] => {
  return [...new Set(RSS_FEEDS.map((feed) => feed.group))];
};

// Get all unique specialties (excluding undefined)
export const getAllSpecialties = (): PhysicianSpecialty[] => {
  return [
    ...new Set(
      RSS_FEEDS.map((feed) => feed.specialty).filter(
        (specialty): specialty is PhysicianSpecialty => specialty !== undefined,
      ),
    ),
  ];
};
