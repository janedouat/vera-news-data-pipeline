/**
 * Vera Healthcare Professional Taxonomy
 * Based on NUCC taxonomy with Vera-specific modifications
 * Includes NUCC taxonomy codes for NPI identification
 */

/**
 * Primary occupation categories for Vera users with NUCC codes
 * Based on NUCC Health Care Provider Taxonomy Code Set
 */
export enum Occupation {
  PHYSICIAN = 'Physician', // 20XXXXXXXX
  NURSE = 'Nurse', // 163WXXXXXX
  NURSE_PRACTITIONER = 'Nurse Practitioner', // 3638XXXXXX
  PHYSICIAN_ASSISTANT = 'Physician Assistant', // 363AXXXXXX
  STUDENT = 'Student', // 390XXXXXXX
  DENTIST = 'Dentist', // 122XXXXXXX
  PHARMACIST = 'Pharmacist', // 183PXXXXXX
  RESEARCHER = 'Researcher', // 10XXXXXXX
  OTHER = 'Other', // Various codes
}

/**
 * NUCC Provider Taxonomy Code root groups
 */
export enum NUCCCodeGroup {
  PHYSICIAN = '20', // Allopathic & Osteopathic Physicians
  NURSE = '163W', // Registered Nurse
  NURSE_PRACTITIONER = '363L', // Nurse Practitioner
  PHYSICIAN_ASSISTANT = '363A', // Physician Assistant
  STUDENT = '390', // Student, Health Care
  DENTIST = '122', // Dental Providers
  PHARMACIST = '183P', // Pharmacist
  BEHAVIORAL = '10', // Behavioral Health & Social Service Providers
  CHIROPRACTOR = '111', // Chiropractic Providers
  DIETARY = '133', // Dietary & Nutritional Service Providers
  EMERGENCY = '146', // Emergency Medical Service Providers
  EYE_VISION = '152', // Eye and Vision Service Providers
  PODIATRIST = '213', // Podiatrist
  RESPIRATORY = '227', // Respiratory, Developmental, Rehabilitative and Restorative Service Providers
  SPEECH = '235', // Speech, Language and Hearing Service Providers
  TECHNOLOGIST = '29', // Technologists, Technicians & Other Technical Service Providers
}

/**
 * Medical specialties by occupation
 */
export type Specialty =
  | PhysicianSpecialty
  | NurseSpecialty
  | NursePractitionerSpecialty
  | PhysicianAssistantSpecialty
  | StudentSpecialty
  | DentistSpecialty
  | PharmacistSpecialty
  | OtherSpecialty;

/**
 * Physician specialties based on NUCC classification
 * Each includes the corresponding 10-digit NUCC taxonomy code
 */
export enum PhysicianSpecialty {
  // Primary Care
  FAMILY_MEDICINE = 'Family Medicine', // 207Q00000X
  INTERNAL_MEDICINE = 'Internal Medicine', // 207R00000X
  PEDIATRICS = 'Pediatrics', // 208000000X
  GERIATRICS = 'Geriatrics', // 207RG0100X

  // Emergency and Acute Care
  EMERGENCY_MEDICINE = 'Emergency Medicine', // 207P00000X
  CRITICAL_CARE = 'Critical Care', // 207RC0200X
  HOSPITALIST = 'Hospitalist', // 208M00000X

  // Medical Specialties
  CARDIOLOGY = 'Cardiology', // 207RC0000X
  DERMATOLOGY = 'Dermatology', // 207N00000X
  ENDOCRINOLOGY = 'Endocrinology', // 207RE0101X
  GASTROENTEROLOGY = 'Gastroenterology', // 207RG0100X
  HEMATOLOGY = 'Hematology', // 207RH0000X
  INFECTIOUS_DISEASE = 'Infectious Disease', // 207RI0200X
  NEPHROLOGY = 'Nephrology', // 207RN0300X
  NEUROLOGY = 'Neurology', // 2084N0400X
  ONCOLOGY = 'Oncology', // 207RX0202X
  PULMONOLOGY = 'Pulmonology', // 207RP1001X
  RHEUMATOLOGY = 'Rheumatology', // 207RR0500X
  GYNECOLOGY = 'Gynecology', // 207VG0400X

  // Surgical Specialties
  GENERAL_SURGERY = 'General Surgery', // 208600000X
  NEUROSURGERY = 'Neurosurgery', // 207T00000X
  OBSTETRICS_GYNECOLOGY = 'Obstetrics & Gynecology', // 207V00000X
  OPHTHALMOLOGY = 'Ophthalmology', // 207W00000X
  ORTHOPEDIC_SURGERY = 'Orthopedic Surgery', // 207X00000X
  OTOLARYNGOLOGY = 'Otolaryngology', // 207Y00000X
  PLASTIC_SURGERY = 'Plastic Surgery', // 208200000X
  THORACIC_SURGERY = 'Thoracic Surgery', // 208G00000X
  UROLOGY = 'Urology', // 208800000X
  VASCULAR_SURGERY = 'Vascular Surgery', // 2086S0122X

  // Other Specialties
  ALLERGY_IMMUNOLOGY = 'Allergy & Immunology', // 207K00000X
  ANESTHESIOLOGY = 'Anesthesiology', // 207L00000X
  NUCLEAR_MEDICINE = 'Nuclear Medicine', // 207U00000X
  PATHOLOGY = 'Pathology', // 207ZP0101X
  PHYSICAL_MEDICINE = 'Physical Medicine', // 208100000X
  PREVENTIVE_MEDICINE = 'Preventive Medicine', // 2083P0500X
  PSYCHIATRY = 'Psychiatry', // 2084P0800X
  RADIATION_ONCOLOGY = 'Radiation Oncology', // 2085R0001X
  RADIOLOGY = 'Radiology', // 2085R0202X

  // General
  OTHER = 'Other', // Various codes
}

/**
 * Nurse specialties
 */
export enum NurseSpecialty {
  CRITICAL_CARE = 'Critical Care',
  EMERGENCY = 'Emergency',
  MEDICAL_SURGICAL = 'Medical Surgical',
  OBSTETRIC = 'Obstetric',
  ONCOLOGY = 'Oncology',
  PEDIATRIC = 'Pediatric',
  PERIOPERATIVE = 'Perioperative',
  PSYCHIATRIC = 'Psychiatric',
  REHABILITATION = 'Rehabilitation',
  GENERAL = 'General',
  OTHER = 'Other',
}

/**
 * Nurse Practitioner specialties
 */
export enum NursePractitionerSpecialty {
  ACUTE_CARE = 'Acute Care',
  ADULT = 'Adult',
  FAMILY = 'Family',
  GERIATRIC = 'Geriatric',
  NEONATAL = 'Neonatal',
  ONCOLOGY = 'Oncology',
  PEDIATRIC = 'Pediatric',
  PSYCHIATRIC = 'Psychiatric',
  WOMENS_HEALTH = "Women's Health",
  OTHER = 'Other',
}

/**
 * Physician Assistant specialties
 */
export enum PhysicianAssistantSpecialty {
  EMERGENCY_MEDICINE = 'Emergency Medicine',
  FAMILY_MEDICINE = 'Family Medicine',
  INTERNAL_MEDICINE = 'Internal Medicine',
  ORTHOPEDIC_SURGERY = 'Orthopedic Surgery',
  SURGICAL = 'Surgical',
  CARDIOLOGY = 'Cardiology',
  DERMATOLOGY = 'Dermatology',
  NEUROLOGY = 'Neurology',
  PSYCHIATRY = 'Psychiatry',
  OTHER = 'Other',
}

/**
 * Student categories
 */
export enum StudentSpecialty {
  MEDICAL_STUDENT = 'Medical Student',
  NURSING_STUDENT = 'Nursing Student',
  PHYSICIAN_ASSISTANT_STUDENT = 'Physician Assistant Student',
  PHARMACY_STUDENT = 'Pharmacy Student',
  DENTAL_STUDENT = 'Dental Student',
  RESIDENT = 'Resident',
  FELLOW = 'Fellow',
  OTHER = 'Other',
}

/**
 * Dentist specialties
 */
export enum DentistSpecialty {
  GENERAL_DENTISTRY = 'General Dentistry',
  ENDODONTICS = 'Endodontics',
  ORAL_SURGERY = 'Oral Surgery',
  ORTHODONTICS = 'Orthodontics',
  PEDIATRIC_DENTISTRY = 'Pediatric Dentistry',
  PERIODONTICS = 'Periodontics',
  PROSTHODONTICS = 'Prosthodontics',
  OTHER = 'Other',
}

/**
 * Pharmacist specialties
 */
export enum PharmacistSpecialty {
  AMBULATORY_CARE = 'Ambulatory Care',
  CARDIOLOGY = 'Cardiology',
  COMMUNITY = 'Community',
  CRITICAL_CARE = 'Critical Care',
  EMERGENCY_MEDICINE = 'Emergency Medicine',
  GERIATRIC = 'Geriatric',
  HOSPITAL = 'Hospital',
  INFECTIOUS_DISEASE = 'Infectious Disease',
  NUCLEAR = 'Nuclear',
  ONCOLOGY = 'Oncology',
  PEDIATRIC = 'Pediatric',
  PSYCHIATRIC = 'Psychiatric',
  OTHER = 'Other',
}

/**
 * Other healthcare professional specialties
 */
export enum OtherSpecialty {
  CHIROPRACTOR = 'Chiropractor',
  CLINICAL_PSYCHOLOGIST = 'Clinical Psychologist',
  DIETITIAN = 'Dietitian',
  OCCUPATIONAL_THERAPIST = 'Occupational Therapist',
  OPTOMETRIST = 'Optometrist',
  PHYSICAL_THERAPIST = 'Physical Therapist',
  PODIATRIST = 'Podiatrist',
  RESPIRATORY_THERAPIST = 'Respiratory Therapist',
  SPEECH_LANGUAGE_PATHOLOGIST = 'Speech Language Pathologist',
  OTHER = 'Other',
}

/**
 * Interface for a healthcare professional user
 */
export interface HealthcareProfessional {
  id: string;
  occupation: Occupation;
  specialty: Specialty;
  hasNPI: boolean;
  npiNumber?: string;
  nuccCode?: string; // 10-digit NUCC taxonomy code
  isHighPrescriber?: boolean;
  // Additional user properties can be added here
}

/**
 * Map of NUCC codes to specialties for lookup
 */
export const NUCC_CODE_MAP: Record<
  string,
  { occupation: Occupation; specialty: string }
> = {
  // Physicians - Family Medicine
  '207Q00000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.FAMILY_MEDICINE,
  },
  // Physicians - Internal Medicine
  '207R00000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.INTERNAL_MEDICINE,
  },
  // Physicians - Pediatrics
  '208000000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.PEDIATRICS,
  },
  // Physicians - Emergency Medicine
  '207P00000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.EMERGENCY_MEDICINE,
  },
  // Physicians - Cardiology
  '207RC0000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.CARDIOLOGY,
  },
  // Physicians - Neurology
  '2084N0400X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.NEUROLOGY,
  },
  // Physicians - Dermatology
  '207N00000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.DERMATOLOGY,
  },
  // Physicians - Endocrinology
  '207RE0101X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.ENDOCRINOLOGY,
  },
  // Physicians - Gastroenterology
  '207RG0100X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.GASTROENTEROLOGY,
  },
  // Physicians - Oncology
  '207RX0202X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.ONCOLOGY,
  },
  // Physicians - Psychiatry
  '2084P0800X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.PSYCHIATRY,
  },
  // Physicians - Gynecology
  '207VG0400X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.GYNECOLOGY,
  },
  // Physicians - Obstetrics & Gynecology
  '207V00000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.OBSTETRICS_GYNECOLOGY,
  },
  // Physicians - Geriatrics
  '207RG0300X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.GERIATRICS,
  },
  // Physicians - Critical Care
  '207RC0200X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.CRITICAL_CARE,
  },
  // Physicians - Hospitalist
  '208M00000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.HOSPITALIST,
  },
  // Physicians - Urology
  '208800000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.UROLOGY,
  },
  // Physicians - Vascular Surgery
  '2086S0122X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.VASCULAR_SURGERY,
  },
  // Physicians - Thoracic Surgery
  '208G00000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.THORACIC_SURGERY,
  },
  // Physicians - Nuclear Medicine
  '207U00000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.NUCLEAR_MEDICINE,
  },
  // Physicians - Pathology
  '207ZP0101X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.PATHOLOGY,
  },
  // Physicians - Physical Medicine
  '208100000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.PHYSICAL_MEDICINE,
  },
  // Physicians - Preventive Medicine
  '2083P0500X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.PREVENTIVE_MEDICINE,
  },
  // Physicians - Radiation Oncology
  '2085R0001X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.RADIATION_ONCOLOGY,
  },
  // Physicians - Radiology
  '2085R0202X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.RADIOLOGY,
  },
  // Physicians - General
  '207Z00000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.OTHER,
  },

  // Additional Physician specialties
  '207K00000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.ALLERGY_IMMUNOLOGY,
  },
  '207L00000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.ANESTHESIOLOGY,
  },
  '207RH0000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.HEMATOLOGY,
  },
  '207RI0200X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.INFECTIOUS_DISEASE,
  },
  '207RN0300X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.NEPHROLOGY,
  },
  '207RP1001X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.PULMONOLOGY,
  },
  '207RR0500X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.RHEUMATOLOGY,
  },
  '208600000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.GENERAL_SURGERY,
  },
  '207T00000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.NEUROSURGERY,
  },
  '207W00000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.OPHTHALMOLOGY,
  },
  '207X00000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.ORTHOPEDIC_SURGERY,
  },
  '207Y00000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.OTOLARYNGOLOGY,
  },
  '208200000X': {
    occupation: Occupation.PHYSICIAN,
    specialty: PhysicianSpecialty.PLASTIC_SURGERY,
  },

  // Nurse Practitioners - Family
  '363LF0000X': {
    occupation: Occupation.NURSE_PRACTITIONER,
    specialty: NursePractitionerSpecialty.FAMILY,
  },
  // Nurse Practitioners - Acute Care
  '363LA2200X': {
    occupation: Occupation.NURSE_PRACTITIONER,
    specialty: NursePractitionerSpecialty.ACUTE_CARE,
  },
  // Nurse Practitioners - Adult Health
  '363LA2100X': {
    occupation: Occupation.NURSE_PRACTITIONER,
    specialty: NursePractitionerSpecialty.ADULT,
  },
  // Nurse Practitioners - Pediatric
  '363LP0200X': {
    occupation: Occupation.NURSE_PRACTITIONER,
    specialty: NursePractitionerSpecialty.PEDIATRIC,
  },
  // Nurse Practitioners - Psychiatric
  '363LP0808X': {
    occupation: Occupation.NURSE_PRACTITIONER,
    specialty: NursePractitionerSpecialty.PSYCHIATRIC,
  },
  // Nurse Practitioners - Geriatric
  '363LG0600X': {
    occupation: Occupation.NURSE_PRACTITIONER,
    specialty: NursePractitionerSpecialty.GERIATRIC,
  },
  // Additional Nurse Practitioner specialties
  '363LN0000X': {
    occupation: Occupation.NURSE_PRACTITIONER,
    specialty: NursePractitionerSpecialty.NEONATAL,
  },
  '363LX0001X': {
    occupation: Occupation.NURSE_PRACTITIONER,
    specialty: NursePractitionerSpecialty.ONCOLOGY,
  },
  '363LW0102X': {
    occupation: Occupation.NURSE_PRACTITIONER,
    specialty: NursePractitionerSpecialty.WOMENS_HEALTH,
  },
  '363L00000X': {
    occupation: Occupation.NURSE_PRACTITIONER,
    specialty: NursePractitionerSpecialty.OTHER,
  },

  // Registered Nurses
  '163W00000X': {
    occupation: Occupation.NURSE,
    specialty: NurseSpecialty.GENERAL,
  },
  '163WC0200X': {
    occupation: Occupation.NURSE,
    specialty: NurseSpecialty.CRITICAL_CARE,
  },
  '163WE0003X': {
    occupation: Occupation.NURSE,
    specialty: NurseSpecialty.EMERGENCY,
  },
  '163WM0102X': {
    occupation: Occupation.NURSE,
    specialty: NurseSpecialty.MEDICAL_SURGICAL,
  },
  '163WX0002X': {
    occupation: Occupation.NURSE,
    specialty: NurseSpecialty.OBSTETRIC,
  },
  '163WX0100X': {
    occupation: Occupation.NURSE,
    specialty: NurseSpecialty.ONCOLOGY,
  },
  '163WP0200X': {
    occupation: Occupation.NURSE,
    specialty: NurseSpecialty.PEDIATRIC,
  },
  '163WP1700X': {
    occupation: Occupation.NURSE,
    specialty: NurseSpecialty.PERIOPERATIVE,
  },
  '163WP0808X': {
    occupation: Occupation.NURSE,
    specialty: NurseSpecialty.PSYCHIATRIC,
  },
  '163WP0000X': {
    occupation: Occupation.NURSE,
    specialty: NurseSpecialty.REHABILITATION,
  },
  '163WX0200X': {
    occupation: Occupation.NURSE,
    specialty: NurseSpecialty.OTHER,
  },

  // Physician Assistants - Medical
  '363AM0700X': {
    occupation: Occupation.PHYSICIAN_ASSISTANT,
    specialty: PhysicianAssistantSpecialty.INTERNAL_MEDICINE,
  },
  // Physician Assistants - Surgical
  '363AS0400X': {
    occupation: Occupation.PHYSICIAN_ASSISTANT,
    specialty: PhysicianAssistantSpecialty.SURGICAL,
  },
  // Physician Assistants - Family Medicine
  '363AF0400X': {
    occupation: Occupation.PHYSICIAN_ASSISTANT,
    specialty: PhysicianAssistantSpecialty.FAMILY_MEDICINE,
  },
  // Physician Assistants - Emergency Medicine
  '363AE1000X': {
    occupation: Occupation.PHYSICIAN_ASSISTANT,
    specialty: PhysicianAssistantSpecialty.EMERGENCY_MEDICINE,
  },
  // Physician Assistants - Cardiology
  '363AC0100X': {
    occupation: Occupation.PHYSICIAN_ASSISTANT,
    specialty: PhysicianAssistantSpecialty.CARDIOLOGY,
  },
  // Additional Physician Assistant specialties
  '363AD0400X': {
    occupation: Occupation.PHYSICIAN_ASSISTANT,
    specialty: PhysicianAssistantSpecialty.DERMATOLOGY,
  },
  '363AN0400X': {
    occupation: Occupation.PHYSICIAN_ASSISTANT,
    specialty: PhysicianAssistantSpecialty.NEUROLOGY,
  },
  '363AP0808X': {
    occupation: Occupation.PHYSICIAN_ASSISTANT,
    specialty: PhysicianAssistantSpecialty.PSYCHIATRY,
  },
  '363AX0200X': {
    occupation: Occupation.PHYSICIAN_ASSISTANT,
    specialty: PhysicianAssistantSpecialty.ORTHOPEDIC_SURGERY,
  },
  '363A00000X': {
    occupation: Occupation.PHYSICIAN_ASSISTANT,
    specialty: PhysicianAssistantSpecialty.OTHER,
  },

  // Pharmacists - General
  '183500000X': {
    occupation: Occupation.PHARMACIST,
    specialty: PharmacistSpecialty.COMMUNITY,
  },
  // Pharmacists - Clinical
  '1835C0205X': {
    occupation: Occupation.PHARMACIST,
    specialty: PharmacistSpecialty.CRITICAL_CARE,
  },
  // Pharmacists - Oncology
  '1835X0200X': {
    occupation: Occupation.PHARMACIST,
    specialty: PharmacistSpecialty.ONCOLOGY,
  },
  // Pharmacists - Ambulatory Care
  '1835X0000X': {
    occupation: Occupation.PHARMACIST,
    specialty: PharmacistSpecialty.AMBULATORY_CARE,
  },
  // Pharmacists - Geriatric
  '1835G0000X': {
    occupation: Occupation.PHARMACIST,
    specialty: PharmacistSpecialty.GERIATRIC,
  },
  // Additional Pharmacist specialties
  '1835C0000X': {
    occupation: Occupation.PHARMACIST,
    specialty: PharmacistSpecialty.CARDIOLOGY,
  },
  '1835E0002X': {
    occupation: Occupation.PHARMACIST,
    specialty: PharmacistSpecialty.EMERGENCY_MEDICINE,
  },
  '1835I0010X': {
    occupation: Occupation.PHARMACIST,
    specialty: PharmacistSpecialty.INFECTIOUS_DISEASE,
  },
  '1835N0905X': {
    occupation: Occupation.PHARMACIST,
    specialty: PharmacistSpecialty.NUCLEAR,
  },
  '1835P0018X': {
    occupation: Occupation.PHARMACIST,
    specialty: PharmacistSpecialty.PEDIATRIC,
  },
  '1835P0200X': {
    occupation: Occupation.PHARMACIST,
    specialty: PharmacistSpecialty.PSYCHIATRIC,
  },
  '1835H0000X': {
    occupation: Occupation.PHARMACIST,
    specialty: PharmacistSpecialty.HOSPITAL,
  },
  '1835P1200X': {
    occupation: Occupation.PHARMACIST,
    specialty: PharmacistSpecialty.OTHER,
  },

  // Dentists - General
  '1223G0001X': {
    occupation: Occupation.DENTIST,
    specialty: DentistSpecialty.GENERAL_DENTISTRY,
  },
  // Dentists - Orthodontics
  '1223X0400X': {
    occupation: Occupation.DENTIST,
    specialty: DentistSpecialty.ORTHODONTICS,
  },
  // Dentists - Oral Surgery
  '1223S0112X': {
    occupation: Occupation.DENTIST,
    specialty: DentistSpecialty.ORAL_SURGERY,
  },
  // Dentists - Pediatric
  '1223P0221X': {
    occupation: Occupation.DENTIST,
    specialty: DentistSpecialty.PEDIATRIC_DENTISTRY,
  },
  // Additional Dentist specialties
  '1223E0200X': {
    occupation: Occupation.DENTIST,
    specialty: DentistSpecialty.ENDODONTICS,
  },
  '1223P0300X': {
    occupation: Occupation.DENTIST,
    specialty: DentistSpecialty.PERIODONTICS,
  },
  '1223P0700X': {
    occupation: Occupation.DENTIST,
    specialty: DentistSpecialty.PROSTHODONTICS,
  },
  '1223D0001X': {
    occupation: Occupation.DENTIST,
    specialty: DentistSpecialty.OTHER,
  },

  // Researchers
  '100000000X': {
    occupation: Occupation.RESEARCHER,
    specialty: 'Clinical Research',
  },
  '104100000X': {
    occupation: Occupation.RESEARCHER,
    specialty: 'Social Science Research',
  },

  // Other - Clinical Psychologist
  '103TC0700X': {
    occupation: Occupation.OTHER,
    specialty: OtherSpecialty.CLINICAL_PSYCHOLOGIST,
  },
  // Other - Physical Therapist
  '225100000X': {
    occupation: Occupation.OTHER,
    specialty: OtherSpecialty.PHYSICAL_THERAPIST,
  },
  // Other - Dietitian
  '133V00000X': {
    occupation: Occupation.OTHER,
    specialty: OtherSpecialty.DIETITIAN,
  },
  // Other - Chiropractor
  '111N00000X': {
    occupation: Occupation.OTHER,
    specialty: OtherSpecialty.CHIROPRACTOR,
  },
  // Other - Optometrist
  '152W00000X': {
    occupation: Occupation.OTHER,
    specialty: OtherSpecialty.OPTOMETRIST,
  },
  // Additional Other specialties
  '224P00000X': {
    occupation: Occupation.OTHER,
    specialty: OtherSpecialty.PODIATRIST,
  },
  '225X00000X': {
    occupation: Occupation.OTHER,
    specialty: OtherSpecialty.OCCUPATIONAL_THERAPIST,
  },
  '227800000X': {
    occupation: Occupation.OTHER,
    specialty: OtherSpecialty.RESPIRATORY_THERAPIST,
  },
  '235Z00000X': {
    occupation: Occupation.OTHER,
    specialty: OtherSpecialty.SPEECH_LANGUAGE_PATHOLOGIST,
  },
  '146L00000X': {
    occupation: Occupation.OTHER,
    specialty: OtherSpecialty.OTHER,
  },

  // Student
  '390200000X': {
    occupation: Occupation.STUDENT,
    specialty: StudentSpecialty.MEDICAL_STUDENT,
  },
  '390210000X': {
    occupation: Occupation.STUDENT,
    specialty: StudentSpecialty.NURSING_STUDENT,
  },
  '390220000X': {
    occupation: Occupation.STUDENT,
    specialty: StudentSpecialty.PHYSICIAN_ASSISTANT_STUDENT,
  },
  '390230000X': {
    occupation: Occupation.STUDENT,
    specialty: StudentSpecialty.PHARMACY_STUDENT,
  },
  '390240000X': {
    occupation: Occupation.STUDENT,
    specialty: StudentSpecialty.DENTAL_STUDENT,
  },
  '390250000X': {
    occupation: Occupation.STUDENT,
    specialty: StudentSpecialty.RESIDENT,
  },
  '390260000X': {
    occupation: Occupation.STUDENT,
    specialty: StudentSpecialty.FELLOW,
  },
  '390290000X': {
    occupation: Occupation.STUDENT,
    specialty: StudentSpecialty.OTHER,
  },
};

/**
 * Helper function to get all specialties for a given occupation
 */
export function getSpecialtiesForOccupation(occupation: Occupation): string[] {
  switch (occupation) {
    case Occupation.PHYSICIAN:
      return Object.values(PhysicianSpecialty);
    case Occupation.NURSE:
      return Object.values(NurseSpecialty);
    case Occupation.NURSE_PRACTITIONER:
      return Object.values(NursePractitionerSpecialty);
    case Occupation.PHYSICIAN_ASSISTANT:
      return Object.values(PhysicianAssistantSpecialty);
    case Occupation.STUDENT:
      return Object.values(StudentSpecialty);
    case Occupation.DENTIST:
      return Object.values(DentistSpecialty);
    case Occupation.PHARMACIST:
      return Object.values(PharmacistSpecialty);
    case Occupation.OTHER:
      return Object.values(OtherSpecialty);
    default:
      return [];
  }
}

/**
 * Type guard to check if a specialty belongs to a specific occupation
 */
export function isSpecialtyForOccupation(
  occupation: Occupation,
  specialty: string,
): boolean {
  return getSpecialtiesForOccupation(occupation).includes(specialty);
}

/**
 * Get occupation and specialty from NUCC code
 * @param nuccCode The 10-digit NUCC taxonomy code
 * @returns Object with occupation and specialty, or undefined if not found
 */
export function getOccupationAndSpecialtyFromNUCC(
  nuccCode: string,
): { occupation: Occupation; specialty: string } | undefined {
  return NUCC_CODE_MAP[nuccCode];
}

/**
 * Get NUCC code from occupation and specialty
 * @param occupation The user's occupation
 * @param specialty The user's specialty
 * @returns The NUCC code if found, or undefined
 */
export function getNUCCCodeFromSpecialty(
  occupation: Occupation,
  specialty: string,
): string | undefined {
  // Find the NUCC code that matches this occupation and specialty
  for (const [code, mapping] of Object.entries(NUCC_CODE_MAP)) {
    if (mapping.occupation === occupation && mapping.specialty === specialty) {
      return code;
    }
  }

  return undefined;
}

/**
 * Get high-value specialties for advertising targeting
 * Based on prescribing patterns and pharmaceutical industry interest
 */
export function getHighValueSpecialties(): string[] {
  return [
    PhysicianSpecialty.CARDIOLOGY,
    PhysicianSpecialty.ENDOCRINOLOGY,
    PhysicianSpecialty.NEUROLOGY,
    PhysicianSpecialty.ONCOLOGY,
    PhysicianSpecialty.PSYCHIATRY,
    PhysicianSpecialty.RHEUMATOLOGY,
    NursePractitionerSpecialty.FAMILY,
    NursePractitionerSpecialty.ADULT,
    PhysicianAssistantSpecialty.FAMILY_MEDICINE,
    PharmacistSpecialty.ONCOLOGY,
    PhysicianSpecialty.INTERNAL_MEDICINE,
    PhysicianSpecialty.FAMILY_MEDICINE,
  ];
}

/**
 * List of all specialties
 */

export const ALL_SPECIALTIES = [
  ...Object.values(PhysicianSpecialty),
  ...Object.values(NurseSpecialty),
  ...Object.values(NursePractitionerSpecialty),
  ...Object.values(PhysicianAssistantSpecialty),
  ...Object.values(StudentSpecialty),
  ...Object.values(DentistSpecialty),
  ...Object.values(PharmacistSpecialty),
  ...Object.values(OtherSpecialty),
];
