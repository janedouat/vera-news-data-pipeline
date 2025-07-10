import { PhysicianSpecialty } from '@/types/taxonomy';

export enum FamilyMedicineSubspecialties {
  AdolescentMedicine = 'adolescent_medicine',
  Geriatrics = 'geriatrics',
  SportsMedicine = 'sports_medicine',
  PalliativeCare = 'palliative_care',
  WomensHealth = 'womens_health',
  PreventiveMedicine = 'preventive_medicine',
  RuralHealth = 'rural_health',
  CommunityMedicine = 'community_medicine',
}

export enum InternalMedicineSubspecialties {
  Cardiology = 'cardiology',
  Endocrinology = 'endocrinology',
  Gastroenterology = 'gastroenterology',
  Hematology = 'hematology',
  InfectiousDiseaseMedicine = 'infectious_disease_medicine',
  Nephrology = 'nephrology',
  Oncology = 'oncology',
  PulmonaryMedicine = 'pulmonary_medicine',
  Rheumatology = 'rheumatology',
}

export enum PediatricsSubspecialties {
  AdolescentMedicine = 'adolescent_medicine',
  ChildDevelopmentDisorders = 'child_development_disorders',
  ChildPsychiatry = 'child_psychiatry',
  Neonatology = 'neonatology',
  PediatricCardiology = 'pediatric_cardiology',
  PediatricDentistry = 'pediatric_dentistry',
  PediatricEndocrinology = 'pediatric_endocrinology',
  PediatricGastroenterology = 'pediatric_gastroenterology',
  PediatricHematology = 'pediatric_hematology',
  PediatricNephrology = 'pediatric_nephrology',
  PediatricNeurology = 'pediatric_neurology',
  PediatricOncology = 'pediatric_oncology',
  PediatricOphthalmology = 'pediatric_ophthalmology',
  PediatricOrthopedics = 'pediatric_orthopedics',
  PediatricOtolaryngology = 'pediatric_otolaryngology',
  PediatricPulmonology = 'pediatric_pulmonology',
  PediatricRheumatology = 'pediatric_rheumatology',
  PediatricSurgery = 'pediatric_surgery',
}

export enum GeriatricsSubspecialties {
  GeriatricAssessment = 'geriatric_assessment',
  GeriatricPsychiatry = 'geriatric_psychiatry',
  GeriatricNursing = 'geriatric_nursing',
  GeriatricDentistry = 'geriatric_dentistry',
  GeriatricRehabilitation = 'geriatric_rehabilitation',
  GeriatricNutrition = 'geriatric_nutrition',
  GeriatricPharmacotherapy = 'geriatric_pharmacotherapy',
}

export enum EmergencyMedicineSubspecialties {
  Toxicology = 'toxicology',
  Traumatology = 'traumatology',
  PediatricEmergencyMedicine = 'pediatric_emergency_medicine',
  DisasterMedicine = 'disaster_medicine',
  SportsMedicine = 'sports_medicine',
  CriticalCare = 'critical_care',
  PreHospitalCare = 'pre_hospital_care',
  WildernessMedicine = 'wilderness_medicine',
}

export enum CriticalCareSubspecialties {
  IntensiveCareUnits = 'intensive_care_units',
  CriticalCareNursing = 'critical_care_nursing',
  TraumaCenters = 'trauma_centers',
  EmergencyMedicine = 'emergency_medicine',
  Anesthesiology = 'anesthesiology',
  RespiratoryTherapy = 'respiratory_therapy',
  CardiacIntensiveCareUnits = 'cardiac_intensive_care_units',
  NeonatalIntensiveCareUnits = 'neonatal_intensive_care_units',
  PediatricIntensiveCareUnits = 'pediatric_intensive_care_units',
  SurgicalIntensiveCareUnits = 'surgical_intensive_care_units',
}

export enum HospitalistSubspecialties {
  CriticalCare = 'critical_care',
  PalliativeCare = 'palliative_care',
  PerioperativeCare = 'perioperative_care',
  GeriatricMedicine = 'geriatric_medicine',
  Pediatrics = 'pediatrics',
  InfectiousDisease = 'infectious_disease',
  Cardiology = 'cardiology',
  Nephrology = 'nephrology',
  Pulmonology = 'pulmonology',
  Endocrinology = 'endocrinology',
  Gastroenterology = 'gastroenterology',
  Hematology = 'hematology',
  Oncology = 'oncology',
  Rheumatology = 'rheumatology',
  Neurology = 'neurology',
}

export enum CardiologySubspecialties {
  Echocardiography = 'echocardiography',
  Electrophysiology = 'electrophysiology',
  HeartFailure = 'heart_failure',
  InterventionalCardiology = 'interventional_cardiology',
  NuclearCardiology = 'nuclear_cardiology',
  PediatricCardiology = 'pediatric_cardiology',
  PreventiveCardiology = 'preventive_cardiology',
  VascularMedicine = 'vascular_medicine',
}

export enum DermatologySubspecialties {
  DermatologicSurgicalProcedures = 'dermatologic_surgical_procedures',
  DermatologyCosmetic = 'dermatology_cosmetic',
  DermatologyPediatric = 'dermatology_pediatric',
  DermatologyVeterinary = 'dermatology_veterinary',
  Dermatopathology = 'dermatopathology',
  Phototherapy = 'phototherapy',
  Teledermatology = 'teledermatology',
}

export enum EndocrinologySubspecialties {
  DiabetesMellitus = 'diabetes_mellitus',
  ThyroidDiseases = 'thyroid_diseases', // they do
  PituitaryDiseases = 'pituitary_diseases',
  AdrenalGlandDiseases = 'adrenal_gland_diseases',
  ReproductiveEndocrinology = 'reproductive_endocrinology',
  MetabolicDiseases = 'metabolic_diseases', // very very specialized
  BoneAndMineralDisorders = 'bone_and_mineral_disorders',
  EndocrineOncology = 'endocrine_oncology', // recommended by an endocrinologist, not MESH
  Oncology = 'oncology', // according to an endocrinologist, neuroendocrine_tumors too specific
  PediatricEndocrinology = 'pediatric_endocrinology',
  Obesity = 'obesity', // added following endocrinologist suggestion; MeSH: Obesity (D009765)
  ParathyroidDiseases = 'parathyroid_diseases', // added following endocrinologist suggestion; MeSH: Parathyroid Diseases (D010269)
  NutritionAndMetabolism = 'nutrition_and_metabolism', // added following endocrinologist suggestion; MeSH: Nutrition Disorders (D009753)
}

export enum GastroenterologySubspecialties {
  BiliaryTractDiseases = 'biliary_tract_diseases',
  ColorectalNeoplasms = 'colorectal_neoplasms',
  EsophagealDiseases = 'esophageal_diseases',
  GastrointestinalDiseases = 'gastrointestinal_diseases',
  GastrointestinalNeoplasms = 'gastrointestinal_neoplasms',
  InflammatoryBowelDiseases = 'inflammatory_bowel_diseases',
  LiverDiseases = 'liver_diseases',
  PancreaticDiseases = 'pancreatic_diseases',
  StomachDiseases = 'stomach_diseases',
}

export enum HematologySubspecialties {
  BloodCoagulationDisorders = 'blood_coagulation_disorders',
  HematologicNeoplasms = 'hematologic_neoplasms',
  Hemoglobinopathies = 'hemoglobinopathies',
  Anemia = 'anemia',
  Hemophilia = 'hemophilia',
  Leukemia = 'leukemia',
  Lymphoma = 'lymphoma',
  MyeloproliferativeDisorders = 'myeloproliferative_disorders',
  Thrombocytopenia = 'thrombocytopenia',
  SickleCellDisease = 'sickle_cell_disease',
}

export enum InfectiousDiseaseSubspecialties {
  Bacteriology = 'bacteriology',
  Virology = 'virology',
  Mycology = 'mycology',
  Parasitology = 'parasitology',
  Immunology = 'immunology',
  Epidemiology = 'epidemiology',
  TropicalMedicine = 'tropical_medicine',
  TravelMedicine = 'travel_medicine',
  Zoonoses = 'zoonoses',
  AntimicrobialStewardship = 'antimicrobial_stewardship',
}

export enum NephrologySubspecialties {
  RenalDialysis = 'renal_dialysis',
  KidneyTransplantation = 'kidney_transplantation',
  Hypertension = 'hypertension',
  Glomerulonephritis = 'glomerulonephritis',
  ChronicKidneyDisease = 'chronic_kidney_disease',
  AcuteKidneyInjury = 'acute_kidney_injury',
  NephroticSyndrome = 'nephrotic_syndrome',
  RenalTubularAcidosis = 'renal_tubular_acidosis',
  PolycysticKidneyDiseases = 'polycystic_kidney_diseases',
  DiabeticNephropathies = 'diabetic_nephropathies',
}

export enum NeurologySubspecialties {
  Neuroimmunology = 'neuroimmunology',
  Neurophysiology = 'neurophysiology',
  Neuropsychology = 'neuropsychology',
  Neuropharmacology = 'neuropharmacology',
  Neurogenetics = 'neurogenetics',
  Neuroepidemiology = 'neuroepidemiology',
  Neurovirology = 'neurovirology',
  Neurooncology = 'neurooncology',
  Neurotoxicology = 'neurotoxicology',
  Neuroendocrinology = 'neuroendocrinology',
}

export enum OncologySubspecialties {
  MedicalOncology = 'medical_oncology',
  RadiationOncology = 'radiation_oncology',
  SurgicalOncology = 'surgical_oncology',
  PediatricOncology = 'pediatric_oncology',
  GynecologicOncology = 'gynecologic_oncology',
  NeuroOncology = 'neuro_oncology',
  HematologicOncology = 'hematologic_oncology',
  UrologicOncology = 'urologic_oncology',
  GastrointestinalOncology = 'gastrointestinal_oncology',
  ThoracicOncology = 'thoracic_oncology',
  HeadAndNeckOncology = 'head_and_neck_oncology',
  OrthopedicOncology = 'orthopedic_oncology',
  DermatoOncology = 'dermato_oncology',
  OcularOncology = 'ocular_oncology',
  EndocrineOncology = 'endocrine_oncology',
}

export enum PulmonologySubspecialties {
  Asthma = 'asthma',
  Bronchiectasis = 'bronchiectasis',
  ChronicObstructivePulmonaryDisease = 'chronic_obstructive_pulmonary_disease',
  CysticFibrosis = 'cystic_fibrosis',
  InterstitialLungDiseases = 'interstitial_lung_diseases',
  LungNeoplasms = 'lung_neoplasms',
  PleuralDiseases = 'pleural_diseases',
  PulmonaryEmbolism = 'pulmonary_embolism',
  PulmonaryFibrosis = 'pulmonary_fibrosis',
  PulmonaryHypertension = 'pulmonary_hypertension',
  RespiratoryDistressSyndrome = 'respiratory_distress_syndrome',
  RespiratoryTractInfections = 'respiratory_tract_infections',
  SarcoidosisPulmonary = 'sarcoidosis_pulmonary',
  SleepApneaSyndromes = 'sleep_apnea_syndromes',
  TuberculosisPulmonary = 'tuberculosis_pulmonary',
}

export enum RheumatologySubspecialties {
  Arthritis = 'arthritis',
  AutoimmuneDiseases = 'autoimmune_diseases',
  ConnectiveTissueDiseases = 'connective_tissue_diseases',
  Gout = 'gout',
  LupusErythematosusSystemic = 'lupus_erythematosus_systemic',
  Osteoarthritis = 'osteoarthritis',
  RheumatoidArthritis = 'rheumatoid_arthritis',
  SclerodermaSystemic = 'scleroderma_systemic',
  Spondylarthropathies = 'spondylarthropathies',
  Vasculitis = 'vasculitis',
}

export enum GynecologySubspecialties {
  Gynecology = 'gynecology',
  Obstetrics = 'obstetrics',
  ReproductiveMedicine = 'reproductive_medicine',
  Urogynecology = 'urogynecology',
  GynecologicOncology = 'gynecologic_oncology',
  MaternalFetalMedicine = 'maternal_fetal_medicine',
  ReproductiveEndocrinology = 'reproductive_endocrinology',
  PelvicFloorDisorders = 'pelvic_floor_disorders',
}

export enum GeneralSurgerySubspecialties {
  BariatricSurgery = 'bariatric_surgery',
  CardiovascularSurgicalProcedures = 'cardiovascular_surgical_procedures',
  ColorectalSurgery = 'colorectal_surgery',
  EndocrineSurgicalProcedures = 'endocrine_surgical_procedures',
  HepatopancreaticobiliaryySurgery = 'hepatopancreaticobiliary_surgery',
  Laparoscopy = 'laparoscopy',
  MinimallyInvasiveSurgicalProcedures = 'minimally_invasive_surgical_procedures',
  NeurosurgicalProcedures = 'neurosurgical_procedures',
  OphthalmologicSurgicalProcedures = 'ophthalmologic_surgical_procedures',
  OrthopedicProcedures = 'orthopedic_procedures',
  OtorhinolaryngologicSurgicalProcedures = 'otorhinolaryngologic_surgical_procedures',
  PediatricSurgery = 'pediatric_surgery',
  PlasticSurgery = 'plastic_surgery',
  ThoracicSurgery = 'thoracic_surgery',
  Traumatology = 'traumatology',
  UrologicSurgicalProcedures = 'urologic_surgical_procedures',
  VascularSurgicalProcedures = 'vascular_surgical_procedures',
}

export enum NeurosurgerySubspecialties {
  Neurosurgery = 'neurosurgery',
  PediatricNeurosurgery = 'pediatric_neurosurgery',
  SpinalNeurosurgery = 'spinal_neurosurgery',
  VascularNeurosurgery = 'vascular_neurosurgery',
  FunctionalNeurosurgery = 'functional_neurosurgery',
  NeuroOncology = 'neuro_oncology',
  SkullBaseSurgery = 'skull_base_surgery',
  PeripheralNerveSurgery = 'peripheral_nerve_surgery',
  TraumaNeurosurgery = 'trauma_neurosurgery',
  StereotacticSurgery = 'stereotactic_surgery',
}

export enum ObstetricsGynecologySubspecialties {
  Gynecology = 'gynecology',
  Obstetrics = 'obstetrics',
  ReproductiveMedicine = 'reproductive_medicine',
  MaternalFetalMedicine = 'maternal_fetal_medicine',
  GynecologicOncology = 'gynecologic_oncology',
  Urogynecology = 'urogynecology',
  ReproductiveEndocrinology = 'reproductive_endocrinology',
  Perinatology = 'perinatology',
}

export enum OphthalmologySubspecialties {
  Ophthalmology = 'ophthalmology',
  Glaucoma = 'glaucoma',
  Retina = 'retina',
  Cornea = 'cornea',
  OculomotorMuscles = 'oculomotor_muscles',
  OphthalmicPathology = 'ophthalmic_pathology',
  NeuroOphthalmology = 'neuro_ophthalmology',
  PediatricOphthalmology = 'pediatric_ophthalmology',
  Oculoplastics = 'oculoplastics',
  OphthalmicSurgery = 'ophthalmic_surgery',
  Uveitis = 'uveitis',
  RefractiveSurgery = 'refractive_surgery',
  OphthalmicGenetics = 'ophthalmic_genetics',
}

export enum OrthopedicSurgerySubspecialties {
  Arthroplasty = 'arthroplasty',
  OrthopedicProcedures = 'orthopedic_procedures',
  SpinalFusion = 'spinal_fusion',
  JointProsthesis = 'joint_prosthesis',
  FractureFixation = 'fracture_fixation',
  Arthroscopy = 'arthroscopy',
  BoneTransplantation = 'bone_transplantation',
  FootOrthopedics = 'foot_orthopedics',
  HandOrthopedics = 'hand_orthopedics',
  PediatricOrthopedics = 'pediatric_orthopedics',
  SportsMedicine = 'sports_medicine',
  OrthopedicNursing = 'orthopedic_nursing',
}

export enum OtolaryngologySubspecialties {
  OtorhinolaryngologicDiseases = 'otorhinolaryngologic_diseases',
  HeadAndNeckNeoplasms = 'head_and_neck_neoplasms',
  Rhinology = 'rhinology',
  Otology = 'otology',
  Laryngology = 'laryngology',
  PediatricOtolaryngology = 'pediatric_otolaryngology',
  FacialPlasticSurgery = 'facial_plastic_surgery',
  SleepApneaSyndromes = 'sleep_apnea_syndromes',
  Audiology = 'audiology',
}

export enum PlasticSurgerySubspecialties {
  ReconstructiveSurgicalProcedures = 'reconstructive_surgical_procedures',
  CosmeticTechniques = 'cosmetic_techniques',
  Microsurgery = 'microsurgery',
  CraniofacialSurgery = 'craniofacial_surgery',
  HandSurgery = 'hand_surgery',
  MaxillofacialSurgery = 'maxillofacial_surgery',
  Burns = 'burns',
  BreastReconstruction = 'breast_reconstruction',
  TissueExpansion = 'tissue_expansion',
  Liposuction = 'liposuction',
}

export enum ThoracicSurgerySubspecialties {
  CardiacSurgicalProcedures = 'cardiac_surgical_procedures',
  ThoracicSurgicalProcedures = 'thoracic_surgical_procedures',
  LungSurgicalProcedures = 'lung_surgical_procedures',
  EsophagealSurgicalProcedures = 'esophageal_surgical_procedures',
  VascularSurgicalProcedures = 'vascular_surgical_procedures',
  MinimallyInvasiveSurgicalProcedures = 'minimally_invasive_surgical_procedures',
}

export enum UrologySubspecialties {
  Andrology = 'andrology',
  Endourology = 'endourology',
  FemaleUrology = 'female_urology',
  NeuroUrology = 'neuro_urology',
  PediatricUrology = 'pediatric_urology',
  ReconstructiveUrology = 'reconstructive_urology',
  UrologicNeoplasms = 'urologic_neoplasms',
  Urolithiasis = 'urolithiasis',
  UrologicSurgicalProcedures = 'urologic_surgical_procedures',
}

export enum VascularSurgerySubspecialties {
  EndovascularProcedures = 'endovascular_procedures',
  Angioplasty = 'angioplasty',
  Aneurysm = 'aneurysm',
  CarotidArteryDiseases = 'carotid_artery_diseases',
  PeripheralVascularDiseases = 'peripheral_vascular_diseases',
  VenousInsufficiency = 'venous_insufficiency',
  VaricoseVeins = 'varicose_veins',
  VascularMalformations = 'vascular_malformations',
  AorticAneurysm = 'aortic_aneurysm',
  ArteriovenousFistula = 'arteriovenous_fistula',
  Thrombectomy = 'thrombectomy',
  VascularSurgicalProcedures = 'vascular_surgical_procedures',
}

export enum AllergyImmunologySubspecialties {
  AllergyAndImmunology = 'allergy_and_immunology',
  Allergy = 'allergy',
  Immunology = 'immunology',
  ClinicalImmunology = 'clinical_immunology',
  Immunotherapy = 'immunotherapy',
  AllergicReaction = 'allergic_reaction',
  Hypersensitivity = 'hypersensitivity',
  AutoimmuneDiseases = 'autoimmune_diseases',
  ImmunologicDeficiencySyndromes = 'immunologic_deficiency_syndromes',
  ImmuneSystemDiseases = 'immune_system_diseases',
}

export enum AnesthesiologySubspecialties {
  AnesthesiaDental = 'anesthesia_dental',
  AnesthesiaEpidural = 'anesthesia_epidural',
  AnesthesiaGeneral = 'anesthesia_general',
  AnesthesiaInhalation = 'anesthesia_inhalation',
  AnesthesiaIntravenous = 'anesthesia_intravenous',
  AnesthesiaLocal = 'anesthesia_local',
  AnesthesiaObstetrical = 'anesthesia_obstetrical',
  AnesthesiaSpinal = 'anesthesia_spinal',
  AnesthesiaTopical = 'anesthesia_topical',
  AnesthesiaConduction = 'anesthesia_conduction',
  AnesthesiaCaudal = 'anesthesia_caudal',
  AnesthesiaClosedCircuit = 'anesthesia_closed_circuit',
  AnesthesiaEndotracheal = 'anesthesia_endotracheal',
  AnesthesiaNeurolept = 'anesthesia_neurolept',
  AnesthesiaRectal = 'anesthesia_rectal',
  AnesthesiaResuscitation = 'anesthesia_resuscitation',
  AnesthesiaVeterinary = 'anesthesia_veterinary',
}

export enum NuclearMedicineSubspecialties {
  Radiopharmaceuticals = 'radiopharmaceuticals',
  PositronEmissionTomography = 'positron_emission_tomography',
  SinglePhotonEmissionComputedTomography = 'single_photon_emission_computed_tomography',
  RadionuclideImaging = 'radionuclide_imaging',
  Radioimmunodetection = 'radioimmunodetection',
  RadioisotopeRenography = 'radioisotope_renography',
  RadioisotopeTeletherapy = 'radioisotope_teletherapy',
  Radioimmunotherapy = 'radioimmunotherapy',
  RadionuclideVentriculography = 'radionuclide_ventriculography',
  RadionuclideAngiography = 'radionuclide_angiography',
}

export enum PathologySubspecialties {
  AnatomicalPathology = 'anatomical_pathology',
  ClinicalPathology = 'clinical_pathology',
  Cytopathology = 'cytopathology',
  Dermatopathology = 'dermatopathology',
  ForensicPathology = 'forensic_pathology',
  Hematopathology = 'hematopathology',
  Histopathology = 'histopathology',
  Immunopathology = 'immunopathology',
  MolecularPathology = 'molecular_pathology',
  Neuropathology = 'neuropathology',
  PediatricPathology = 'pediatric_pathology',
  SurgicalPathology = 'surgical_pathology',
  TransfusionMedicine = 'transfusion_medicine',
  VeterinaryPathology = 'veterinary_pathology',
}

export enum PhysicalMedicineSubspecialties {
  PainManagement = 'pain_management',
  Rehabilitation = 'rehabilitation',
  SportsMedicine = 'sports_medicine',
  Electrodiagnosis = 'electrodiagnosis',
  MusculoskeletalDiseases = 'musculoskeletal_diseases',
  NeuromuscularDiseases = 'neuromuscular_diseases',
  SpinalCordInjuries = 'spinal_cord_injuries',
  Amputees = 'amputees',
  GaitDisordersNeurologic = 'gait_disorders_neurologic',
  OrthoticDevices = 'orthotic_devices',
  ProsthesesAndImplants = 'prostheses_and_implants',
  PhysicalTherapyModalities = 'physical_therapy_modalities',
}

export enum PreventiveMedicineSubspecialties {
  OccupationalMedicine = 'occupational_medicine',
  AerospaceMedicine = 'aerospace_medicine',
  EnvironmentalMedicine = 'environmental_medicine',
  TravelMedicine = 'travel_medicine',
  CommunityMedicine = 'community_medicine',
  PublicHealth = 'public_health',
  Epidemiology = 'epidemiology',
  HealthPromotion = 'health_promotion',
  DiseasePrevention = 'disease_prevention',
  PreventivePsychiatry = 'preventive_psychiatry',
  PreventiveDentistry = 'preventive_dentistry',
  PreventiveCardiology = 'preventive_cardiology',
  PreventiveHealthServices = 'preventive_health_services',
  PreventiveNutrition = 'preventive_nutrition',
}

export enum PsychiatrySubspecialties {
  ChildPsychiatry = 'child_psychiatry',
  AdolescentPsychiatry = 'adolescent_psychiatry',
  GeriatricPsychiatry = 'geriatric_psychiatry',
  ForensicPsychiatry = 'forensic_psychiatry',
  AddictionPsychiatry = 'addiction_psychiatry',
  ConsultationLiaisonPsychiatry = 'consultation_liaison_psychiatry',
  EmergencyPsychiatry = 'emergency_psychiatry',
  Neuropsychiatry = 'neuropsychiatry',
  PsychosomaticMedicine = 'psychosomatic_medicine',
  CommunityPsychiatry = 'community_psychiatry',
  CulturalPsychiatry = 'cultural_psychiatry',
  MilitaryPsychiatry = 'military_psychiatry',
  Psychopharmacology = 'psychopharmacology',
}

export enum RadiationOncologySubspecialties {
  Brachytherapy = 'brachytherapy',
  Radiosurgery = 'radiosurgery',
  RadiotherapyConformal = 'radiotherapy_conformal',
  RadiotherapyIntensityModulated = 'radiotherapy_intensity_modulated',
  RadiotherapyImageGuided = 'radiotherapy_image_guided',
  RadiotherapyStereotactic = 'radiotherapy_stereotactic',
  RadiotherapyComputerAssisted = 'radiotherapy_computer_assisted',
  RadiotherapyPlanningComputerAssisted = 'radiotherapy_planning_computer_assisted',
}

export enum RadiologySubspecialties {
  RadiologyInterventional = 'radiology_interventional',
  RadiologyDental = 'radiology_dental',
  RadiologyThoracic = 'radiology_thoracic',
  RadiologyCardiovascular = 'radiology_cardiovascular',
  RadiologyAbdominal = 'radiology_abdominal',
  RadiologyMusculoskeletal = 'radiology_musculoskeletal',
  RadiologyPediatric = 'radiology_pediatric',
  RadiologyNeuroradiology = 'radiology_neuroradiology',
  RadiologyNuclearMedicine = 'radiology_nuclear_medicine',
}

export enum OtherSubspecialties {
  AllergyAndImmunology = 'allergy_and_immunology',
  Anesthesiology = 'anesthesiology',
  Dermatology = 'dermatology',
  EmergencyMedicine = 'emergency_medicine',
  FamilyPractice = 'family_practice',
  InternalMedicine = 'internal_medicine',
  Neurology = 'neurology',
  ObstetricsAndGynecology = 'obstetrics_and_gynecology',
  Ophthalmology = 'ophthalmology',
  Orthopedics = 'orthopedics',
  Otolaryngology = 'otolaryngology',
  Pathology = 'pathology',
  Pediatrics = 'pediatrics',
  PhysicalMedicineAndRehabilitation = 'physical_medicine_and_rehabilitation',
  PreventiveMedicine = 'preventive_medicine',
  Psychiatry = 'psychiatry',
  Radiology = 'radiology',
  Surgery = 'surgery',
  Urology = 'urology',
}

export type Subspecialties = {
  [PhysicianSpecialty.FAMILY_MEDICINE]: FamilyMedicineSubspecialties[];
  [PhysicianSpecialty.INTERNAL_MEDICINE]: InternalMedicineSubspecialties[];
  [PhysicianSpecialty.PEDIATRICS]: PediatricsSubspecialties[];
  [PhysicianSpecialty.GERIATRICS]: GeriatricsSubspecialties[];
  [PhysicianSpecialty.EMERGENCY_MEDICINE]: EmergencyMedicineSubspecialties[];
  [PhysicianSpecialty.CRITICAL_CARE]: CriticalCareSubspecialties[];
  [PhysicianSpecialty.HOSPITALIST]: HospitalistSubspecialties[];
  [PhysicianSpecialty.CARDIOLOGY]: CardiologySubspecialties[];
  [PhysicianSpecialty.DERMATOLOGY]: DermatologySubspecialties[];
  [PhysicianSpecialty.ENDOCRINOLOGY]: EndocrinologySubspecialties[];
  [PhysicianSpecialty.GASTROENTEROLOGY]: GastroenterologySubspecialties[];
  [PhysicianSpecialty.HEMATOLOGY]: HematologySubspecialties[];
  [PhysicianSpecialty.INFECTIOUS_DISEASE]: InfectiousDiseaseSubspecialties[];
  [PhysicianSpecialty.NEPHROLOGY]: NephrologySubspecialties[];
  [PhysicianSpecialty.NEUROLOGY]: NeurologySubspecialties[];
  [PhysicianSpecialty.ONCOLOGY]: OncologySubspecialties[];
  [PhysicianSpecialty.PULMONOLOGY]: PulmonologySubspecialties[];
  [PhysicianSpecialty.RHEUMATOLOGY]: RheumatologySubspecialties[];
  [PhysicianSpecialty.GYNECOLOGY]: GynecologySubspecialties[];
  [PhysicianSpecialty.GENERAL_SURGERY]: GeneralSurgerySubspecialties[];
  [PhysicianSpecialty.NEUROSURGERY]: NeurosurgerySubspecialties[];
  [PhysicianSpecialty.OBSTETRICS_GYNECOLOGY]: ObstetricsGynecologySubspecialties[];
  [PhysicianSpecialty.OPHTHALMOLOGY]: OphthalmologySubspecialties[];
  [PhysicianSpecialty.ORTHOPEDIC_SURGERY]: OrthopedicSurgerySubspecialties[];
  [PhysicianSpecialty.OTOLARYNGOLOGY]: OtolaryngologySubspecialties[];
  [PhysicianSpecialty.PLASTIC_SURGERY]: PlasticSurgerySubspecialties[];
  [PhysicianSpecialty.THORACIC_SURGERY]: ThoracicSurgerySubspecialties[];
  [PhysicianSpecialty.UROLOGY]: UrologySubspecialties[];
  [PhysicianSpecialty.VASCULAR_SURGERY]: VascularSurgerySubspecialties[];
  [PhysicianSpecialty.ALLERGY_IMMUNOLOGY]: AllergyImmunologySubspecialties[];
  [PhysicianSpecialty.ANESTHESIOLOGY]: AnesthesiologySubspecialties[];
  [PhysicianSpecialty.NUCLEAR_MEDICINE]: NuclearMedicineSubspecialties[];
  [PhysicianSpecialty.PATHOLOGY]: PathologySubspecialties[];
  [PhysicianSpecialty.PHYSICAL_MEDICINE]: PhysicalMedicineSubspecialties[];
  [PhysicianSpecialty.PREVENTIVE_MEDICINE]: PreventiveMedicineSubspecialties[];
  [PhysicianSpecialty.PSYCHIATRY]: PsychiatrySubspecialties[];
  [PhysicianSpecialty.RADIATION_ONCOLOGY]: RadiationOncologySubspecialties[];
  [PhysicianSpecialty.RADIOLOGY]: RadiologySubspecialties[];
  [PhysicianSpecialty.OTHER]: OtherSubspecialties[];
};

export const SubspecialtiesEnumMap: {
  [key in PhysicianSpecialty]?: string[];
} = {
  [PhysicianSpecialty.FAMILY_MEDICINE]: Object.values(
    FamilyMedicineSubspecialties,
  ),
  [PhysicianSpecialty.INTERNAL_MEDICINE]: Object.values(
    InternalMedicineSubspecialties,
  ),
  [PhysicianSpecialty.PEDIATRICS]: Object.values(PediatricsSubspecialties),
  [PhysicianSpecialty.GERIATRICS]: Object.values(GeriatricsSubspecialties),
  [PhysicianSpecialty.EMERGENCY_MEDICINE]: Object.values(
    EmergencyMedicineSubspecialties,
  ),
  [PhysicianSpecialty.CRITICAL_CARE]: Object.values(CriticalCareSubspecialties),
  [PhysicianSpecialty.HOSPITALIST]: Object.values(HospitalistSubspecialties),
  [PhysicianSpecialty.CARDIOLOGY]: Object.values(CardiologySubspecialties),
  [PhysicianSpecialty.DERMATOLOGY]: Object.values(DermatologySubspecialties),
  [PhysicianSpecialty.ENDOCRINOLOGY]: Object.values(
    EndocrinologySubspecialties,
  ),
  [PhysicianSpecialty.GASTROENTEROLOGY]: Object.values(
    GastroenterologySubspecialties,
  ),
  [PhysicianSpecialty.HEMATOLOGY]: Object.values(HematologySubspecialties),
  [PhysicianSpecialty.INFECTIOUS_DISEASE]: Object.values(
    InfectiousDiseaseSubspecialties,
  ),
  [PhysicianSpecialty.NEPHROLOGY]: Object.values(NephrologySubspecialties),
  [PhysicianSpecialty.NEUROLOGY]: Object.values(NeurologySubspecialties),
  [PhysicianSpecialty.ONCOLOGY]: Object.values(OncologySubspecialties),
  [PhysicianSpecialty.PULMONOLOGY]: Object.values(PulmonologySubspecialties),
  [PhysicianSpecialty.RHEUMATOLOGY]: Object.values(RheumatologySubspecialties),
  [PhysicianSpecialty.GYNECOLOGY]: Object.values(GynecologySubspecialties),
  [PhysicianSpecialty.GENERAL_SURGERY]: Object.values(
    GeneralSurgerySubspecialties,
  ),
  [PhysicianSpecialty.NEUROSURGERY]: Object.values(NeurosurgerySubspecialties),
  [PhysicianSpecialty.OBSTETRICS_GYNECOLOGY]: Object.values(
    ObstetricsGynecologySubspecialties,
  ),
  [PhysicianSpecialty.OPHTHALMOLOGY]: Object.values(
    OphthalmologySubspecialties,
  ),
  [PhysicianSpecialty.ORTHOPEDIC_SURGERY]: Object.values(
    OrthopedicSurgerySubspecialties,
  ),
  [PhysicianSpecialty.OTOLARYNGOLOGY]: Object.values(
    OtolaryngologySubspecialties,
  ),
  [PhysicianSpecialty.PLASTIC_SURGERY]: Object.values(
    PlasticSurgerySubspecialties,
  ),
  [PhysicianSpecialty.THORACIC_SURGERY]: Object.values(
    ThoracicSurgerySubspecialties,
  ),
  [PhysicianSpecialty.UROLOGY]: Object.values(UrologySubspecialties),
  [PhysicianSpecialty.VASCULAR_SURGERY]: Object.values(
    VascularSurgerySubspecialties,
  ),
  [PhysicianSpecialty.ALLERGY_IMMUNOLOGY]: Object.values(
    AllergyImmunologySubspecialties,
  ),
  [PhysicianSpecialty.ANESTHESIOLOGY]: Object.values(
    AnesthesiologySubspecialties,
  ),
  [PhysicianSpecialty.NUCLEAR_MEDICINE]: Object.values(
    NuclearMedicineSubspecialties,
  ),
  [PhysicianSpecialty.PATHOLOGY]: Object.values(PathologySubspecialties),
  [PhysicianSpecialty.PHYSICAL_MEDICINE]: Object.values(
    PhysicalMedicineSubspecialties,
  ),
  [PhysicianSpecialty.PREVENTIVE_MEDICINE]: Object.values(
    PreventiveMedicineSubspecialties,
  ),
  [PhysicianSpecialty.PSYCHIATRY]: Object.values(PsychiatrySubspecialties),
  [PhysicianSpecialty.RADIATION_ONCOLOGY]: Object.values(
    RadiationOncologySubspecialties,
  ),
  [PhysicianSpecialty.RADIOLOGY]: Object.values(RadiologySubspecialties),
  [PhysicianSpecialty.OTHER]: Object.values(OtherSubspecialties),
};

export const ALL_SUBSPECIALTIES = [
  ...Object.values(FamilyMedicineSubspecialties),
  ...Object.values(InternalMedicineSubspecialties),
  ...Object.values(PediatricsSubspecialties),
  ...Object.values(GeriatricsSubspecialties),
  ...Object.values(EmergencyMedicineSubspecialties),
  ...Object.values(CriticalCareSubspecialties),
  ...Object.values(HospitalistSubspecialties),
  ...Object.values(CardiologySubspecialties),
  ...Object.values(DermatologySubspecialties),
  ...Object.values(EndocrinologySubspecialties),
  ...Object.values(GastroenterologySubspecialties),
  ...Object.values(HematologySubspecialties),
  ...Object.values(InfectiousDiseaseSubspecialties),
  ...Object.values(NephrologySubspecialties),
  ...Object.values(NeurologySubspecialties),
  ...Object.values(OncologySubspecialties),
  ...Object.values(PulmonologySubspecialties),
  ...Object.values(RheumatologySubspecialties),
  ...Object.values(GynecologySubspecialties),
  ...Object.values(GeneralSurgerySubspecialties),
  ...Object.values(NeurosurgerySubspecialties),
  ...Object.values(ObstetricsGynecologySubspecialties),
  ...Object.values(OphthalmologySubspecialties),
  ...Object.values(OrthopedicSurgerySubspecialties),
  ...Object.values(OtolaryngologySubspecialties),
  ...Object.values(PlasticSurgerySubspecialties),
  ...Object.values(ThoracicSurgerySubspecialties),
  ...Object.values(UrologySubspecialties),
  ...Object.values(VascularSurgerySubspecialties),
  ...Object.values(AllergyImmunologySubspecialties),
  ...Object.values(AnesthesiologySubspecialties),
  ...Object.values(NuclearMedicineSubspecialties),
  ...Object.values(PathologySubspecialties),
  ...Object.values(PhysicalMedicineSubspecialties),
  ...Object.values(PreventiveMedicineSubspecialties),
  ...Object.values(PsychiatrySubspecialties),
  ...Object.values(RadiationOncologySubspecialties),
  ...Object.values(RadiologySubspecialties),
  ...Object.values(OtherSubspecialties),
];
