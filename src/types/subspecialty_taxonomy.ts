import { PhysicianSpecialty } from '@/types/taxonomy';

export enum PulmonologySubspecialty {
  Asthma = 'asthma',
  COPD = 'copd',
  Bronchiectasis = 'bronchiectasis',
  IPF = 'ipf',
  Sarcoidosis = 'sarcoidosis',
  HP = 'hp',
  PulmonaryHypertension = 'pulmonary_hypertension',
  PE = 'pe',
  OSA = 'osa',
  CSA = 'csa',
  Narcolepsy = 'narcolepsy',
  LungCancer = 'lung_cancer',
  Mesothelioma = 'mesothelioma',

  ARDS = 'ards',
  Ventilation = 'ventilation',
  Sepsis = 'sepsis',
  ChronicCough = 'chronic_cough',
  ShortnessOfBreath = 'shortness_of_breath',
  RecurrentPneumonia = 'recurrent_pneumonia',
}

export type Subspecialties = {
  [PhysicianSpecialty.PULMONOLOGY]: PulmonologySubspecialty[];
};

export const SubspecialtiesEnumMap: {
  [key in PhysicianSpecialty]?: string[];
} = {
  [PhysicianSpecialty.PULMONOLOGY]: Object.values(PulmonologySubspecialty),
};
