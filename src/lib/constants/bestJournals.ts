import { ValueOf } from 'next/dist/shared/lib/constants';

// Top medical journals for best_journals search
export const TOP_MEDICAL_JOURNALS = [
  /* General & Multidisciplinary */
  'The New England Journal of Medicine',
  'New England Journal of Medicine',
  'Lancet, The',
  'The Lancet (London, England)',
  'The Lancet',
  'JAMA - Journal of the American Medical Association',
  'BMJ, The',
  'The BMJ',
  'The Journal of the American Medical Association',
  'JAMA',
  'Nature',
  'Cell',

  /* Oncology & Cancer Biology */
  'Ca-A Cancer Journal for Clinicians',
  'Nature Reviews Cancer',
  'Cancer Cell',
  'Journal of Clinical Oncology',
  'Nature Cancer',
  'Cancer Discovery',
  'Annals of Oncology',
  'Lancet Oncology',
  'Nature Reviews Clinical Oncology',

  /* Cardiology & Vascular Medicine */
  'Journal of the American College of Cardiology',
  'Circulation',
  'European Heart Journal',
  'Nature Reviews Cardiology',
  'JAMA Cardiology',
  'JACC: Heart Failure',

  /* Neurology & Neuroscience */
  'Lancet Neurology, The',
  'Nature Reviews Neurology',
  'JAMA Neurology',
  'Annals of Neurology',

  /* Psychiatry & Mental Health */
  'World Psychiatry',
  'JAMA Psychiatry',

  /* Dermatology */
  'JAMA Dermatology',
  'British Journal of Dermatology',

  /* Paediatrics */
  'JAMA Pediatrics',
  'The Lancet Child & Adolescent Health',
  'Pediatrics',
  'Archives of Disease in Childhood',

  /* Surgery & Surgical Specialties */
  'Annals of Surgery',
  'JAMA Surgery',
  'Journal of Thoracic and Cardiovascular Surgery',

  /* Endocrinology & Diabetes */
  'Lancet Diabetes and Endocrinology,The',
  'Diabetes Care',
  'Endocrine Reviews',

  /* Immunology & Infectious Defence */
  'Nature Reviews Immunology',
  'Immunity',
  'Annual Review of Immunology',

  /* Haematology */
  'Blood',
  'Leukemia',
  'Haematologica',

  /* Gastroenterology & Hepatology */
  'Journal of Hepatology',
  'Gastroenterology',
  'Nature Reviews Gastroenterology and Hepatology',

  /* Pulmonology / Critical Care */
  'Lancet Respiratory Medicine,The',
  'American Journal of Respiratory and Critical Care Medicine',

  /* Infectious Diseases */
  'Lancet Infectious Diseases, The',
  'Clinical Infectious Diseases',

  /* Public & Global Health / Epidemiology */
  'Lancet Public Health, The',
  'Morbidity and Mortality Weekly Report',
  'Cochrane Database Syst Rev',

  /* Nephrology */
  'Journal of the American Society of Nephrology : JASN',
  'Nature Reviews Nephrology',

  /* Ophthalmology */
  'Progress in Retinal and Eye Research',
  'Ophthalmology',
  'JAMA Ophthalmology',
  'Retina',

  /* Rheumatology */
  'Nature Reviews Rheumatology',
  'Annals of the Rheumatic Diseases',

  /* Endocrinology */
  'Nature Reviews Endocrinology',

  /* Microbiology & Infectious Diseases (General) */
  'Clinical Microbiology Reviews',

  /* Pharmacology / Drug Discovery */
  'Nature Reviews Drug Discovery',

  /* Biotechnology & Translational Science */
  'Nature Biotechnology',
  'Science Translational Medicine',

  /* General & Translational Medicine (High Impact) */
  'Nature Medicine',

  /* Internal Medicine */
  'Journal of Internal Medicine',
];

// Enum for top medical journals
export enum BestJournals {
  // General & Multidisciplinary
  NEW_ENGLAND_JOURNAL_OF_MEDICINE = 'The New England Journal of Medicine',
  NEJM = 'New England Journal of Medicine',
  LANCET = 'Lancet, The',
  LANCET_LONDON = 'The Lancet (London, England)',
  THE_LANCET = 'The Lancet',
  JAMA_FULL = 'JAMA - Journal of the American Medical Association',
  BMJ = 'BMJ, The',
  THE_BMJ = 'The BMJ',
  JAMA_JOURNAL = 'The Journal of the American Medical Association',
  JAMA = 'JAMA',
  NATURE = 'Nature',
  CELL = 'Cell',

  // Oncology & Cancer Biology
  CA_CANCER_JOURNAL = 'Ca-A Cancer Journal for Clinicians',
  NATURE_REVIEWS_CANCER = 'Nature Reviews Cancer',
  CANCER_CELL = 'Cancer Cell',
  JOURNAL_OF_CLINICAL_ONCOLOGY = 'Journal of Clinical Oncology',
  NATURE_CANCER = 'Nature Cancer',
  CANCER_DISCOVERY = 'Cancer Discovery',
  ANNALS_OF_ONCOLOGY = 'Annals of Oncology',
  LANCET_ONCOLOGY = 'Lancet Oncology',
  NATURE_REVIEWS_CLINICAL_ONCOLOGY = 'Nature Reviews Clinical Oncology',

  // Cardiology & Vascular Medicine
  JACC = 'Journal of the American College of Cardiology',
  CIRCULATION = 'Circulation',
  EUROPEAN_HEART_JOURNAL = 'European Heart Journal',
  NATURE_REVIEWS_CARDIOLOGY = 'Nature Reviews Cardiology',
  JAMA_CARDIOLOGY = 'JAMA Cardiology',
  JACC_HEART_FAILURE = 'JACC: Heart Failure',

  // Neurology & Neuroscience
  LANCET_NEUROLOGY = 'Lancet Neurology, The',
  NATURE_REVIEWS_NEUROLOGY = 'Nature Reviews Neurology',
  JAMA_NEUROLOGY = 'JAMA Neurology',
  ANNALS_OF_NEUROLOGY = 'Annals of Neurology',

  // Psychiatry & Mental Health
  WORLD_PSYCHIATRY = 'World Psychiatry',
  JAMA_PSYCHIATRY = 'JAMA Psychiatry',

  // Dermatology
  JAMA_DERMATOLOGY = 'JAMA Dermatology',
  BRITISH_JOURNAL_OF_DERMATOLOGY = 'British Journal of Dermatology',

  // Paediatrics
  JAMA_PEDIATRICS = 'JAMA Pediatrics',
  LANCET_CHILD_ADOLESCENT_HEALTH = 'The Lancet Child & Adolescent Health',
  PEDIATRICS = 'Pediatrics',
  ARCHIVES_OF_DISEASE_IN_CHILDHOOD = 'Archives of Disease in Childhood',

  // Surgery & Surgical Specialties
  ANNALS_OF_SURGERY = 'Annals of Surgery',
  JAMA_SURGERY = 'JAMA Surgery',
  JOURNAL_OF_THORACIC_AND_CARDIOVASCULAR_SURGERY = 'Journal of Thoracic and Cardiovascular Surgery',

  // Endocrinology & Diabetes
  LANCET_DIABETES_ENDOCRINOLOGY = 'Lancet Diabetes and Endocrinology,The',
  DIABETES_CARE = 'Diabetes Care',
  ENDOCRINE_REVIEWS = 'Endocrine Reviews',

  // Immunology & Infectious Defence
  NATURE_REVIEWS_IMMUNOLOGY = 'Nature Reviews Immunology',
  IMMUNITY = 'Immunity',
  ANNUAL_REVIEW_OF_IMMUNOLOGY = 'Annual Review of Immunology',

  // Haematology
  BLOOD = 'Blood',
  LEUKEMIA = 'Leukemia',
  HAEMATOLOGICA = 'Haematologica',

  // Gastroenterology & Hepatology
  JOURNAL_OF_HEPATOLOGY = 'Journal of Hepatology',
  GASTROENTEROLOGY = 'Gastroenterology',
  NATURE_REVIEWS_GASTROENTEROLOGY_HEPATOLOGY = 'Nature Reviews Gastroenterology and Hepatology',

  // Pulmonology / Critical Care
  LANCET_RESPIRATORY_MEDICINE = 'Lancet Respiratory Medicine,The',
  AMERICAN_JOURNAL_OF_RESPIRATORY_AND_CRITICAL_CARE_MEDICINE = 'American Journal of Respiratory and Critical Care Medicine',

  // Infectious Diseases
  LANCET_INFECTIOUS_DISEASES = 'Lancet Infectious Diseases, The',
  CLINICAL_INFECTIOUS_DISEASES = 'Clinical Infectious Diseases',

  // Public & Global Health / Epidemiology
  LANCET_PUBLIC_HEALTH = 'Lancet Public Health, The',
  MORBIDITY_AND_MORTALITY_WEEKLY_REPORT = 'Morbidity and Mortality Weekly Report',
  COCHRANE_DATABASE_SYSTEMATIC_REVIEWS = 'Cochrane Database Syst Rev',

  // Nephrology
  JOURNAL_OF_THE_AMERICAN_SOCIETY_OF_NEPHROLOGY = 'Journal of the American Society of Nephrology : JASN',
  NATURE_REVIEWS_NEPHROLOGY = 'Nature Reviews Nephrology',

  // Ophthalmology
  PROGRESS_IN_RETINAL_AND_EYE_RESEARCH = 'Progress in Retinal and Eye Research',
  OPHTHALMOLOGY = 'Ophthalmology',
  JAMA_OPHTHALMOLOGY = 'JAMA Ophthalmology',
  RETINA = 'Retina',

  // Rheumatology
  NATURE_REVIEWS_RHEUMATOLOGY = 'Nature Reviews Rheumatology',
  ANNALS_OF_THE_RHEUMATIC_DISEASES = 'Annals of the Rheumatic Diseases',

  // Endocrinology
  NATURE_REVIEWS_ENDOCRINOLOGY = 'Nature Reviews Endocrinology',

  // Microbiology & Infectious Diseases (General)
  CLINICAL_MICROBIOLOGY_REVIEWS = 'Clinical Microbiology Reviews',

  // Pharmacology / Drug Discovery
  NATURE_REVIEWS_DRUG_DISCOVERY = 'Nature Reviews Drug Discovery',

  // Biotechnology & Translational Science
  NATURE_BIOTECHNOLOGY = 'Nature Biotechnology',
  SCIENCE_TRANSLATIONAL_MEDICINE = 'Science Translational Medicine',

  // General & Translational Medicine (High Impact)
  NATURE_MEDICINE = 'Nature Medicine',

  // Internal Medicine
  JOURNAL_OF_INTERNAL_MEDICINE = 'Journal of Internal Medicine',
}

export const BestJournalsLabel = {
  [BestJournals.NEW_ENGLAND_JOURNAL_OF_MEDICINE]: 'NEJM',
  [BestJournals.NEJM]: 'NEJM',
  [BestJournals.LANCET]: 'Lancet',
  [BestJournals.LANCET_LONDON]: 'The Lancet',
  [BestJournals.THE_LANCET]: 'The Lancet',
  [BestJournals.JAMA_FULL]: 'JAMA',
  [BestJournals.BMJ]: 'BMJ',
  [BestJournals.THE_BMJ]: 'BMJ',
  [BestJournals.JAMA_JOURNAL]: 'JAMA',
  [BestJournals.JAMA]: 'JAMA',
  [BestJournals.NATURE]: 'Nature',
  [BestJournals.CELL]: 'Cell',

  // Oncology & Cancer Biology
  [BestJournals.CA_CANCER_JOURNAL]: 'CA Cancer Journal for Clinicians',
  [BestJournals.NATURE_REVIEWS_CANCER]: 'Nature Reviews Cancer',
  [BestJournals.CANCER_CELL]: 'Cancer Cell',
  [BestJournals.JOURNAL_OF_CLINICAL_ONCOLOGY]: 'JCO',
  [BestJournals.NATURE_CANCER]: 'Nature Cancer',
  [BestJournals.CANCER_DISCOVERY]: 'Cancer Discovery',
  [BestJournals.ANNALS_OF_ONCOLOGY]: 'Annals of Oncology',
  [BestJournals.LANCET_ONCOLOGY]: 'Lancet Oncology',
  [BestJournals.NATURE_REVIEWS_CLINICAL_ONCOLOGY]:
    'Nature Reviews Clinical Oncology',

  // Cardiology & Vascular Medicine
  [BestJournals.JACC]: 'JACC',
  [BestJournals.CIRCULATION]: 'Circulation',
  [BestJournals.EUROPEAN_HEART_JOURNAL]: 'European Heart Journal',
  [BestJournals.NATURE_REVIEWS_CARDIOLOGY]: 'Nature Reviews Cardiology',
  [BestJournals.JAMA_CARDIOLOGY]: 'JAMA Cardiology',
  [BestJournals.JACC_HEART_FAILURE]: 'JACC: Heart Failure',

  // Neurology & Neuroscience
  [BestJournals.LANCET_NEUROLOGY]: 'Lancet Neurology',
  [BestJournals.NATURE_REVIEWS_NEUROLOGY]: 'Nature Reviews Neurology',
  [BestJournals.JAMA_NEUROLOGY]: 'JAMA Neurology',
  [BestJournals.ANNALS_OF_NEUROLOGY]: 'Annals of Neurology',

  // Psychiatry & Mental Health
  [BestJournals.WORLD_PSYCHIATRY]: 'World Psychiatry',
  [BestJournals.JAMA_PSYCHIATRY]: 'JAMA Psychiatry',

  // Dermatology
  [BestJournals.JAMA_DERMATOLOGY]: 'JAMA Dermatology',
  [BestJournals.BRITISH_JOURNAL_OF_DERMATOLOGY]:
    'British Journal of Dermatology',

  // Paediatrics
  [BestJournals.JAMA_PEDIATRICS]: 'JAMA Pediatrics',
  [BestJournals.LANCET_CHILD_ADOLESCENT_HEALTH]:
    'Lancet Child & Adolescent Health',
  [BestJournals.PEDIATRICS]: 'Pediatrics',
  [BestJournals.ARCHIVES_OF_DISEASE_IN_CHILDHOOD]:
    'Archives of Disease in Childhood',

  // Surgery & Surgical Specialties
  [BestJournals.ANNALS_OF_SURGERY]: 'Annals of Surgery',
  [BestJournals.JAMA_SURGERY]: 'JAMA Surgery',
  [BestJournals.JOURNAL_OF_THORACIC_AND_CARDIOVASCULAR_SURGERY]: 'JTCVS',

  // Endocrinology & Diabetes
  [BestJournals.LANCET_DIABETES_ENDOCRINOLOGY]:
    'Lancet Diabetes & Endocrinology',
  [BestJournals.DIABETES_CARE]: 'Diabetes Care',
  [BestJournals.ENDOCRINE_REVIEWS]: 'Endocrine Reviews',

  // Immunology & Infectious Defence
  [BestJournals.NATURE_REVIEWS_IMMUNOLOGY]: 'Nature Reviews Immunology',
  [BestJournals.IMMUNITY]: 'Immunity',
  [BestJournals.ANNUAL_REVIEW_OF_IMMUNOLOGY]: 'Annual Review of Immunology',

  // Haematology
  [BestJournals.BLOOD]: 'Blood',
  [BestJournals.LEUKEMIA]: 'Leukemia',
  [BestJournals.HAEMATOLOGICA]: 'Haematologica',

  // Gastroenterology & Hepatology
  [BestJournals.JOURNAL_OF_HEPATOLOGY]: 'Journal of Hepatology',
  [BestJournals.GASTROENTEROLOGY]: 'Gastroenterology',
  [BestJournals.NATURE_REVIEWS_GASTROENTEROLOGY_HEPATOLOGY]:
    'Nature Reviews Gastroenterology & Hepatology',

  // Pulmonology / Critical Care
  [BestJournals.LANCET_RESPIRATORY_MEDICINE]: 'Lancet Respiratory Medicine',
  [BestJournals.AMERICAN_JOURNAL_OF_RESPIRATORY_AND_CRITICAL_CARE_MEDICINE]:
    'AJRCCM',

  // Infectious Diseases
  [BestJournals.LANCET_INFECTIOUS_DISEASES]: 'Lancet Infectious Diseases',
  [BestJournals.CLINICAL_INFECTIOUS_DISEASES]: 'Clinical Infectious Diseases',

  // Public & Global Health / Epidemiology
  [BestJournals.LANCET_PUBLIC_HEALTH]: 'Lancet Public Health',
  [BestJournals.MORBIDITY_AND_MORTALITY_WEEKLY_REPORT]: 'MMWR',
  [BestJournals.COCHRANE_DATABASE_SYSTEMATIC_REVIEWS]:
    'Cochrane Database Syst Rev',

  // Nephrology
  [BestJournals.JOURNAL_OF_THE_AMERICAN_SOCIETY_OF_NEPHROLOGY]: 'JASN',
  [BestJournals.NATURE_REVIEWS_NEPHROLOGY]: 'Nature Reviews Nephrology',

  // Ophthalmology
  [BestJournals.PROGRESS_IN_RETINAL_AND_EYE_RESEARCH]:
    'Progress in Retinal and Eye Research',
  [BestJournals.OPHTHALMOLOGY]: 'Ophthalmology',
  [BestJournals.JAMA_OPHTHALMOLOGY]: 'JAMA Ophthalmology',
  [BestJournals.RETINA]: 'Retina',

  // Rheumatology
  [BestJournals.NATURE_REVIEWS_RHEUMATOLOGY]: 'Nature Reviews Rheumatology',
  [BestJournals.ANNALS_OF_THE_RHEUMATIC_DISEASES]:
    'Annals of the Rheumatic Diseases',

  // Endocrinology
  [BestJournals.NATURE_REVIEWS_ENDOCRINOLOGY]: 'Nature Reviews Endocrinology',

  // Microbiology & Infectious Diseases (General)
  [BestJournals.CLINICAL_MICROBIOLOGY_REVIEWS]: 'Clinical Microbiology Reviews',

  // Pharmacology / Drug Discovery
  [BestJournals.NATURE_REVIEWS_DRUG_DISCOVERY]: 'Nature Reviews Drug Discovery',

  // Biotechnology & Translational Science
  [BestJournals.NATURE_BIOTECHNOLOGY]: 'Nature Biotechnology',
  [BestJournals.SCIENCE_TRANSLATIONAL_MEDICINE]:
    'Science Translational Medicine',

  // General & Translational Medicine (High Impact)
  [BestJournals.NATURE_MEDICINE]: 'Nature Medicine',

  // Internal Medicine
  [BestJournals.JOURNAL_OF_INTERNAL_MEDICINE]: 'Journal of Internal Medicine',
};
