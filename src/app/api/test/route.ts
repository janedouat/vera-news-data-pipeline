import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod.mjs';
import { z } from 'zod';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getUrls = async (title: string) =>
  openai.responses.create({
    prompt: {
      id: 'pmpt_687877b05d888195a0ae639a47960a4f0b05afa87520c328',
      version: '1',
    },
    input: [
      {
        role: 'user',
        content: title,
      },
    ],
    reasoning: {},
    tools: [
      {
        type: 'web_search_preview',
        user_location: {
          type: 'approximate',
        },
        search_context_size: 'medium',
      },
    ],
    tool_choice: {
      type: 'web_search_preview',
    },
    max_output_tokens: 2048,
    text: {
      format: zodTextFormat(
        z.object({ press_release_url: z.string(), fda_url: z.string() }),
        'output',
      ),
    },
  });

export async function POST() {
  try {
    const titles = [
      'FDA Approves Kirsty (insulin aspart-xjhz), an Interchangeable Biosimilar to NovoLog',
      'U.S. FDA Approves Kerendia (finerenone) to Treat Patients with Heart Failure with LVEF ≥40%',
      'Moderna Receives Full U.S. FDA Approval for COVID-19 Vaccine, Spikevax in Children Aged 6 Months Through 11 Years',
      "FDA Approves Updated Label for Lilly's Kisunla (donanemab-azbt) in Early Symptomatic Alzheimer's Disease",
      'FDA Approves Ekterly (sebetralstat) for Hereditary Angioedema (HAE)',
      'FDA Grants Accelerated Approval to Lynozyfic (linvoseltamab-gcpt) for Relapsed or Refractory Multiple Myeloma',
      'FDA Grants Accelerated Approval to Zegfrovy (sunvozertinib) for EGFR Exon 20 Mutant NSCLC',
      'Takeda Announces FDA Approval of Gammagard Liquid ERC with Low IgA Content',
      "FDA Expands Indications for Neuraceq for Alzheimer's Disease Diagnosis",
      "FDA Approves Gamifant (emapalumab-lzsg) for Macrophage Activation Syndrome in Still's Disease",
      'FDA Approves Streamlined Monitoring and Removes REMS from Breyanzi and Abecma Labels',
      'Emmaus Life Sciences Receives FDA Approval for Endari Label Enhancements',
      'FDA Approves Benlysta (belimumab) Autoinjector for Children with Lupus Nephritis',
      'FDA Approves Expanded Indications for GE HealthCare’s Vizamyl PET Imaging Agent',
      'Datroway Approved in the U.S. for EGFR-Mutated Non-Small Cell Lung Cancer',
      'Dupixent (dupilumab) Approved for Bullous Pemphigoid (BP)',
      'FDA Approves Harliku (nitisinone) for Alkaptonuria',
      'FDA Approves Yeztugo (lenacapavir) for HIV Prevention',
      'FDA Approves Monjuvi (tafasitamab-cxix) + Rituximab & Lenalidomide for Follicular Lymphoma',
      'FDA Approves Arynta (lisdexamfetamine) Oral Solution for ADHD and BED',
      'FDA Approves Andembry (garadacimab-gxii) for HAE Prophylaxis',
      'FDA Approves Additional Steqeyma (ustekinumab-stba) Presentation for Pediatric Patients',
      'FDA Approves Keytruda (pembrolizumab) for Resectable Head & Neck Cancer',
      'Moderna Receives FDA Approval for RSV Vaccine, mRESVIA, in Adults at Risk',
      'FDA Approves Zusduri (mitomycin) for Non-Muscle Invasive Bladder Cancer',
      'FDA Expands Mavyret (glecaprevir/pibrentasvir) Indication to Acute Hepatitis C',
      'FDA Approves Ibtrozi (taletrectinib) for ROS1-Positive NSCLC',
      'FDA Approves Tablet Formulation of Brukinsa',
      'FDA Approves Xifyrm (meloxicam) Injection for Moderate-to-Severe Pain',
      'FDA Approves Enflonsia (clesrovimab-cfor) for RSV in Infants',
      'FDA Approves Widaplik (telmisartan, amlodipine, indapamide) for Hypertension',
      'FDA Approves Third Indication for Nubeqa (darolutamide) for Advanced Prostate Cancer',
      'FDA Expands Xenoview Indication for Children Aged 6+',
      'FDA Approves mNEXSPIKE (mRNA-1283) COVID-19 Vaccine',
      'FDA Approves Tryptyr (acoltremon) for Dry Eye Disease',
      'FDA Approves Khindivi (hydrocortisone) for Pediatric Adrenocortical Insufficiency',
      'FDA Grants Interchangeability to Hadlima (adalimumab-bwwd)',
      'FDA Approves Starjemza (ustekinumab-hmny), Biosimilar to Stelara',
      'FDA Approves Yutrepia (treprostinil) Inhalation Powder for PAH and PH-ILD',
      "Celltrion's Yuflyma (adalimumab-aaty) Receives FDA Interchangeability Designation",
    ];

    for (const title of titles) {
      console.log((await getUrls(title)).output_text);
    }
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('L Error in test route:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
