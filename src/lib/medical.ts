import type { PredictedDisease, Medicine, Doctor } from '@/types';

export interface SymptomRule {
  disease: string;
  description: string;
  matchSymptoms: string[];
  riskWeight: number;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  recommendedDoctor: string;
  recommendedTests: string[];
  lifestyleAdvice: string[];
  medicines: string[];
  emergency: boolean;
}

export const SYMPTOM_RULES: SymptomRule[] = [
  {
    disease: 'Common Cold / Upper Respiratory Infection',
    description: 'A viral infection of the upper respiratory tract causing nasal congestion, sneezing, and mild fever.',
    matchSymptoms: ['cold', 'cough', 'fever', 'sore throat', 'sneezing', 'runny nose'],
    riskWeight: 20, severity: 'low',
    recommendedDoctor: 'General Physician',
    recommendedTests: ['Complete Blood Count (CBC)', 'Throat swab if persistent'],
    lifestyleAdvice: ['Stay hydrated with warm fluids', 'Get adequate rest (7-8 hours sleep)', 'Use a humidifier', 'Gargle with warm salt water'],
    medicines: ['Paracetamol', 'Vitamin C', 'Cough syrup (expectorant)'],
    emergency: false,
  },
  {
    disease: 'Influenza (Flu)',
    description: 'A contagious respiratory illness caused by influenza viruses with sudden onset of fever, body aches, and fatigue.',
    matchSymptoms: ['fever', 'cough', 'fatigue', 'body ache', 'headache', 'chills', 'sore throat'],
    riskWeight: 35, severity: 'moderate',
    recommendedDoctor: 'General Physician',
    recommendedTests: ['Rapid influenza diagnostic test', 'CBC'],
    lifestyleAdvice: ['Rest completely for 5-7 days', 'Drink plenty of fluids', 'Avoid contact with others', 'Use paracetamol for fever'],
    medicines: ['Oseltamivir (Tamiflu)', 'Paracetamol', 'Zinc lozenges'],
    emergency: false,
  },
  {
    disease: 'Migraine',
    description: 'A neurological condition causing intense throbbing headaches, often with sensitivity to light and sound.',
    matchSymptoms: ['headache', 'headache (one-sided)', 'nausea', 'vomiting', 'light sensitivity', 'sound sensitivity'],
    riskWeight: 30, severity: 'moderate',
    recommendedDoctor: 'Neurologist',
    recommendedTests: ['Clinical diagnosis', 'MRI brain if first-time severe headache'],
    lifestyleAdvice: ['Rest in a dark, quiet room', 'Maintain regular sleep schedule', 'Identify and avoid trigger foods', 'Stay hydrated'],
    medicines: ['Sumatriptan', 'Ibuprofen', 'Naproxen'],
    emergency: false,
  },
  {
    disease: 'Gastroenteritis / Food Poisoning',
    description: 'Inflammation of the stomach and intestines, typically from viral or bacterial infection or contaminated food.',
    matchSymptoms: ['stomach pain', 'vomiting', 'diarrhea', 'nausea', 'fever', 'dehydration'],
    riskWeight: 40, severity: 'moderate',
    recommendedDoctor: 'Gastroenterologist',
    recommendedTests: ['Stool culture', 'CBC', 'Electrolyte panel'],
    lifestyleAdvice: ['Drink ORS/electrolyte solutions frequently', 'Eat bland foods (BRAT diet)', 'Avoid dairy and spicy foods', 'Wash hands thoroughly'],
    medicines: ['ORS sachets', 'Probiotics', 'Loperamide (short-term)'],
    emergency: false,
  },
  {
    disease: 'Dengue Fever',
    description: 'A mosquito-borne viral infection causing high fever, severe headache, and joint pain. Can become life-threatening.',
    matchSymptoms: ['high fever', 'headache', 'body ache', 'joint pain', 'rash', 'nausea', 'eye pain'],
    riskWeight: 75, severity: 'high',
    recommendedDoctor: 'General Physician / Infectious Disease Specialist',
    recommendedTests: ['Dengue NS1 antigen', 'Complete Blood Count (platelet count)', 'Dengue IgM/IgG'],
    lifestyleAdvice: ['Drink plenty of fluids (papaya leaf juice may help platelets)', 'Complete bed rest', 'Monitor platelet count daily', 'Avoid NSAIDs — use paracetamol only'],
    medicines: ['Paracetamol only', 'Fluid replacement', 'Papaya leaf extract'],
    emergency: true,
  },
  {
    disease: 'Typhoid Fever',
    description: 'A bacterial infection spread through contaminated food/water causing prolonged fever and abdominal pain.',
    matchSymptoms: ['fever', 'stomach pain', 'headache', 'fatigue', 'constipation', 'rash'],
    riskWeight: 65, severity: 'high',
    recommendedDoctor: 'General Physician',
    recommendedTests: ['Widal test', 'Blood culture', 'TyphiDot IgM'],
    lifestyleAdvice: ['Complete rest', 'Drink boiled/filtered water', 'Eat easily digestible food', 'Maintain hygiene'],
    medicines: ['Antibiotics (as prescribed)', 'Paracetamol', 'ORS'],
    emergency: false,
  },
  {
    disease: 'Malaria',
    description: 'A mosquito-borne parasitic infection causing cycles of fever, chills, and sweating.',
    matchSymptoms: ['high fever', 'chills', 'sweating', 'headache', 'body ache', 'nausea'],
    riskWeight: 70, severity: 'high',
    recommendedDoctor: 'General Physician',
    recommendedTests: ['Peripheral blood smear', 'Rapid malaria antigen test', 'CBC'],
    lifestyleAdvice: ['Use mosquito nets', 'Complete rest', 'Stay hydrated', 'Take prescribed antimalarials fully'],
    medicines: ['Artemisinin-based combination therapy', 'Paracetamol', 'Antimalarial drugs'],
    emergency: true,
  },
  {
    disease: 'Pneumonia',
    description: 'An infection that inflames air sacs in the lungs, which may fill with fluid causing breathing difficulty.',
    matchSymptoms: ['cough', 'fever', 'breathing difficulty', 'chest pain', 'fatigue', 'phlegm'],
    riskWeight: 78, severity: 'high',
    recommendedDoctor: 'Pulmonologist',
    recommendedTests: ['Chest X-ray', 'CBC', 'Sputum culture', 'Pulse oximetry'],
    lifestyleAdvice: ['Hospitalization may be needed', 'Complete rest', 'Drink warm fluids', 'Use a humidifier', 'Avoid smoking'],
    medicines: ['Antibiotics (as prescribed)', 'Bronchodilators', 'Paracetamol'],
    emergency: true,
  },
  {
    disease: 'Asthma Exacerbation',
    description: 'Narrowing and swelling of airways causing wheezing, shortness of breath, and chest tightness.',
    matchSymptoms: ['breathing difficulty', 'cough', 'chest tightness', 'wheezing', 'shortness of breath'],
    riskWeight: 60, severity: 'high',
    recommendedDoctor: 'Pulmonologist',
    recommendedTests: ['Spirometry', 'Peak flow measurement', 'Pulse oximetry'],
    lifestyleAdvice: ['Use inhaler as prescribed', 'Identify and avoid triggers', 'Keep indoor air clean', 'Practice breathing exercises'],
    medicines: ['Salbutamol inhaler', 'Corticosteroid inhaler', 'Montelukast'],
    emergency: true,
  },
  {
    disease: 'Hypertension (High Blood Pressure)',
    description: 'Persistently elevated blood pressure that increases risk for heart disease and stroke.',
    matchSymptoms: ['headache', 'dizziness', 'chest pain', 'blurred vision', 'shortness of breath'],
    riskWeight: 55, severity: 'moderate',
    recommendedDoctor: 'Cardiologist',
    recommendedTests: ['Blood pressure monitoring', 'ECG', 'Lipid profile', 'Kidney function test'],
    lifestyleAdvice: ['Reduce salt intake', 'Regular exercise (30 min/day)', 'Maintain healthy weight', 'Manage stress', 'Limit alcohol'],
    medicines: ['Amlodipine', 'Losartan', 'Telmisartan'],
    emergency: false,
  },
  {
    disease: 'Type 2 Diabetes',
    description: 'A chronic condition affecting how the body processes blood sugar (glucose).',
    matchSymptoms: ['fatigue', 'excessive thirst', 'frequent urination', 'blurred vision', 'weight loss', 'slow healing'],
    riskWeight: 50, severity: 'moderate',
    recommendedDoctor: 'Endocrinologist / General Physician',
    recommendedTests: ['Fasting blood sugar', 'HbA1c', 'Oral glucose tolerance test', 'Lipid profile'],
    lifestyleAdvice: ['Low-carb balanced diet', 'Regular exercise', 'Monitor blood sugar', 'Maintain healthy weight', 'Limit sugar'],
    medicines: ['Metformin', 'Glimepiride', 'Insulin (if prescribed)'],
    emergency: false,
  },
  {
    disease: 'Cardiac Event (Possible)',
    description: 'Warning signs of a potential heart problem requiring immediate medical attention.',
    matchSymptoms: ['chest pain', 'shortness of breath', 'left arm pain', 'jaw pain', 'sweating', 'nausea'],
    riskWeight: 92, severity: 'critical',
    recommendedDoctor: 'Cardiologist (Emergency)',
    recommendedTests: ['ECG (immediate)', 'Troponin test', 'Echocardiogram', 'Coronary angiography'],
    lifestyleAdvice: ['CALL EMERGENCY IMMEDIATELY', 'Chew aspirin if not allergic', 'Sit down and stay calm', 'Do not drive yourself'],
    medicines: ['Aspirin (emergency)', 'Nitroglycerin (if prescribed)'],
    emergency: true,
  },
  {
    disease: 'Allergic Reaction / Skin Condition',
    description: 'An immune response to allergens causing skin rashes, itching, or hives.',
    matchSymptoms: ['skin rash', 'itching', 'swelling', 'redness', 'hives'],
    riskWeight: 35, severity: 'moderate',
    recommendedDoctor: 'Dermatologist',
    recommendedTests: ['Allergy panel (IgE)', 'Skin prick test', 'Patch test'],
    lifestyleAdvice: ['Identify and avoid allergens', 'Use hypoallergenic products', 'Apply cool compresses', 'Avoid scratching'],
    medicines: ['Cetirizine', 'Loratadine', 'Hydrocortisone cream'],
    emergency: false,
  },
  {
    disease: 'Anemia',
    description: 'A condition where you lack enough healthy red blood cells to carry adequate oxygen to tissues.',
    matchSymptoms: ['fatigue', 'weakness', 'pale skin', 'dizziness', 'shortness of breath', 'cold hands'],
    riskWeight: 30, severity: 'low',
    recommendedDoctor: 'General Physician',
    recommendedTests: ['Complete Blood Count', 'Iron studies', 'Ferritin', 'Vitamin B12'],
    lifestyleAdvice: ['Eat iron-rich foods (spinach, lentils, meat)', 'Pair iron with vitamin C', 'Avoid tea/coffee with meals', 'Regular check-ups'],
    medicines: ['Iron supplements', 'Folic acid', 'Vitamin B12'],
    emergency: false,
  },
  {
    disease: 'Thyroid Disorder',
    description: 'Dysfunction of the thyroid gland affecting metabolism, energy, and weight.',
    matchSymptoms: ['fatigue', 'weight change', 'cold/heat sensitivity', 'hair loss', 'mood changes', 'irregular heartbeat'],
    riskWeight: 40, severity: 'moderate',
    recommendedDoctor: 'Endocrinologist',
    recommendedTests: ['TSH', 'T3, T4', 'Thyroid ultrasound'],
    lifestyleAdvice: ['Take medication consistently', 'Regular thyroid monitoring', 'Balanced iodine intake', 'Stress management'],
    medicines: ['Levothyroxine (hypothyroid)', 'Methimazole (hyperthyroid)'],
    emergency: false,
  },
];

export const FOLLOW_UP_QUESTIONS: Record<string, string[]> = {
  fever: ['How long have you had the fever?', 'What is your temperature reading?', 'Do you have chills or sweating?'],
  headache: ['How long have you had the headache?', 'Is the headache on one side or both sides?', 'Is it a throbbing or dull pain?'],
  cough: ['Is the cough dry or productive (with phlegm)?', 'How long have you had the cough?', 'Do you have chest tightness?'],
  'chest pain': ['Is the pain sharp, dull, or pressing?', 'Does it spread to your arm or jaw?', 'Do you have shortness of breath?'],
  'stomach pain': ['Where exactly is the pain located?', 'Is it constant or comes in waves?', 'Does eating make it better or worse?'],
  'breathing difficulty': ['Did it start suddenly or gradually?', 'Do you have a history of asthma?', 'Can you speak full sentences?'],
  'skin rash': ['Where is the rash located?', 'Is it itchy or painful?', 'Have you been exposed to new products or foods?'],
};

export function analyzeSymptoms(
  symptoms: string[],
  followUp: Record<string, string>
): {
  diseases: (SymptomRule & { probability: number })[];
  riskLevel: string;
  severity: string;
  recommendations: string[];
} {
  const matches = SYMPTOM_RULES.map((rule) => {
    const overlap = rule.matchSymptoms.filter((s) =>
      symptoms.some((sym) => sym.toLowerCase().includes(s) || s.includes(sym.toLowerCase()))
    );
    const probability = Math.min(
      95,
      rule.riskWeight + overlap.length * 8
    );
    return { ...rule, probability, overlap: overlap.length };
  })
    .filter((m) => m.overlap > 0)
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 4);

  const topRisk = matches[0]?.probability ?? 0;
  const riskLevel = topRisk >= 75 ? 'High' : topRisk >= 40 ? 'Moderate' : topRisk > 0 ? 'Low' : 'Minimal';
  const severity = matches[0]?.severity ?? 'low';

  const recommendations: string[] = [];
  matches.slice(0, 2).forEach((m) => {
    recommendations.push(`For ${m.disease}: ${m.lifestyleAdvice[0]}`);
  });
  if (topRisk >= 75) {
    recommendations.unshift('Seek medical attention promptly given the risk level.');
  }

  return { diseases: matches, riskLevel, severity, recommendations };
}

export interface SkinCondition {
  condition: string;
  confidence: number;
  severity: 'mild' | 'moderate' | 'severe';
  causes: string[];
  measures: string[];
  recommendedDoctor: string;
  medicines: Medicine[];
  emergency: boolean;
  description: string;
}

// Simulated AI vision analysis — assigns a plausible condition based on image characteristics
export const SKIN_CONDITIONS: Record<string, SkinCondition> = {
  acne: {
    condition: 'Acne Vulgaris',
    confidence: 87, severity: 'mild',
    description: 'A common skin condition occurring when hair follicles become clogged with oil and dead skin cells.',
    causes: ['Excess sebum production', 'Bacterial growth (P. acnes)', 'Hormonal changes', 'Clogged pores'],
    measures: ['Cleanse face twice daily with gentle cleanser', 'Avoid touching/picking at acne', 'Use non-comedogenic products', 'Avoid oily foods'],
    recommendedDoctor: 'Dermatologist',
    medicines: [{
      name: 'Benzoyl Peroxide 2.5% Gel', purpose: 'Topical acne treatment', dosage: 'Apply thin layer once daily',
      howToTake: 'Apply to clean, dry skin in the evening', sideEffects: ['Dryness', 'Redness', 'Peeling'],
      precautions: ['Avoid sun exposure', 'Start with lower concentration'], alternatives: ['Salicylic Acid', 'Adapalene'],
      priceEstimate: '₹150-250', availability: 'Over-the-counter',
    }],
    emergency: false,
  },
  eczema: {
    condition: 'Eczema (Atopic Dermatitis)',
    confidence: 82, severity: 'moderate',
    description: 'A condition causing inflamed, itchy, cracked, and rough patches of skin.',
    causes: ['Genetic factors', 'Immune system overreaction', 'Environmental triggers', 'Skin barrier dysfunction'],
    measures: ['Moisturize regularly with fragrance-free lotion', 'Avoid hot showers', 'Identify and avoid triggers', 'Use mild soaps'],
    recommendedDoctor: 'Dermatologist',
    medicines: [{
      name: 'Hydrocortisone 1% Cream', purpose: 'Anti-inflammatory topical', dosage: 'Apply thin layer 2x daily',
      howToTake: 'Apply to affected areas after bathing', sideEffects: ['Skin thinning (prolonged use)', 'Burning sensation'],
      precautions: ['Do not use on face for long periods', 'Avoid contact with eyes'], alternatives: ['Tacrolimus ointment', 'Ceramide creams'],
      priceEstimate: '₹80-150', availability: 'Over-the-counter',
    }],
    emergency: false,
  },
  rash: {
    condition: 'Contact Dermatitis / Allergic Rash',
    confidence: 79, severity: 'mild',
    description: 'An itchy rash caused by direct contact with a substance or allergic reaction.',
    causes: ['Contact with irritants (soaps, plants)', 'Allergic reaction to metals/chemicals', 'Medication reaction'],
    measures: ['Identify and avoid the trigger', 'Apply cool compresses', 'Use calamine lotion', 'Take antihistamines'],
    recommendedDoctor: 'Dermatologist',
    medicines: [{
      name: 'Cetirizine 10mg', purpose: 'Antihistamine for allergic reactions', dosage: '1 tablet once daily',
      howToTake: 'Take with water, preferably at night', sideEffects: ['Drowsiness', 'Dry mouth'],
      precautions: ['Avoid driving if drowsy', 'Do not exceed recommended dose'], alternatives: ['Loratadine', 'Fexofenadine'],
      priceEstimate: '₹30-60', availability: 'Over-the-counter',
    }],
    emergency: false,
  },
  fungal: {
    condition: 'Fungal Infection (Tinea/Ringworm)',
    confidence: 84, severity: 'moderate',
    description: 'A common fungal skin infection causing a red, itchy, scaly rash in a ring shape.',
    causes: ['Fungal organisms (dermatophytes)', 'Warm, moist environments', 'Skin-to-skin contact', 'Shared items'],
    measures: ['Keep affected area clean and dry', 'Avoid sharing towels/clothes', 'Wear loose, breathable clothing', 'Complete the antifungal course'],
    recommendedDoctor: 'Dermatologist',
    medicines: [{
      name: 'Clotrimazole 1% Cream', purpose: 'Topical antifungal', dosage: 'Apply 2-3 times daily for 2-4 weeks',
      howToTake: 'Apply to clean, dry affected area and surrounding skin', sideEffects: ['Mild burning', 'Itching'],
      precautions: ['Continue for full duration even if symptoms improve', 'Keep area dry'], alternatives: ['Terbinafine cream', 'Ketoconazole'],
      priceEstimate: '₹60-120', availability: 'Over-the-counter',
    }],
    emergency: false,
  },
  psoriasis: {
    condition: 'Psoriasis',
    confidence: 88, severity: 'severe',
    description: 'A chronic autoimmune condition causing rapid skin cell buildup forming scales and red patches.',
    causes: ['Autoimmune response', 'Genetic predisposition', 'Triggers: stress, infections, cold weather'],
    measures: ['Moisturize regularly', 'Avoid skin trauma (Koebner phenomenon)', 'Manage stress', 'Limit alcohol', 'Phototherapy may help'],
    recommendedDoctor: 'Dermatologist',
    medicines: [{
      name: 'Calcipotriol Ointment', purpose: 'Vitamin D analogue for psoriasis', dosage: 'Apply 1-2 times daily',
      howToTake: 'Apply thin layer to plaques', sideEffects: ['Skin irritation', 'Burning'],
      precautions: ['Avoid face and genitals', 'Regular monitoring needed'], alternatives: ['Coal tar preparations', 'Topical steroids'],
      priceEstimate: '₹300-500', availability: 'Prescription required',
    }],
    emergency: false,
  },
  burn: {
    condition: 'Skin Burn',
    confidence: 90, severity: 'severe',
    description: 'Tissue damage from heat, chemicals, electricity, or radiation requiring appropriate care.',
    causes: ['Hot liquids/steam', 'Sun exposure', 'Chemicals', 'Electricity', 'Fire'],
    measures: ['Cool the burn with running water 10-20 min', 'Do not apply ice or butter', 'Cover with sterile gauze', 'Seek medical care for large/deep burns'],
    recommendedDoctor: 'General Physician / Burn Specialist',
    medicines: [{
      name: 'Silver Sulfadiazine Cream', purpose: 'Topical antibiotic for burns', dosage: 'Apply once or twice daily',
      howToTake: 'Apply to clean burn area under sterile dressing', sideEffects: ['Burning sensation', 'Skin discoloration'],
      precautions: ['Not for severe/large burns without medical supervision', 'Not for sulfa-allergic patients'], alternatives: ['Aloe vera gel (minor burns)', 'Antibiotic ointment'],
      priceEstimate: '₹100-200', availability: 'Prescription recommended',
    }],
    emergency: true,
  },
};

export const SKIN_CONDITION_KEYS = Object.keys(SKIN_CONDITIONS);

// Deterministic pseudo-analysis based on image properties (since no real CV model runs in-browser)
export function analyzeSkinImage(imageData: string): SkinCondition {
  let hash = 0;
  for (let i = 0; i < imageData.length; i++) {
    hash = ((hash << 5) - hash + imageData.charCodeAt(i)) | 0;
  }
  const absHash = Math.abs(hash);
  const conditionKey = SKIN_CONDITION_KEYS[absHash % SKIN_CONDITION_KEYS.length];
  const base = SKIN_CONDITIONS[conditionKey];
  const confidenceVar = (absHash % 8) - 4;
  return {
    ...base,
    confidence: Math.max(70, Math.min(95, base.confidence + confidenceVar)),
  };
}

export const DISEASE_PREDICTION_DATA: { disease: string; baseRisk: number; description: string; recommendation: string; medicines: string[] }[] = [
  { disease: 'Diabetes Type 2', baseRisk: 0, description: 'Chronic condition affecting blood sugar regulation.', recommendation: 'Adopt a low-glycemic diet and exercise regularly.', medicines: ['Metformin', 'Glimepiride'] },
  { disease: 'Hypertension', baseRisk: 0, description: 'Persistently elevated blood pressure.', recommendation: 'Reduce sodium, exercise, and manage stress.', medicines: ['Amlodipine', 'Losartan'] },
  { disease: 'Heart Disease', baseRisk: 0, description: 'Conditions affecting heart function and blood vessels.', recommendation: 'Cardiovascular exercise, heart-healthy diet, regular screening.', medicines: ['Aspirin (low-dose)', 'Statins'] },
  { disease: 'Asthma', baseRisk: 0, description: 'Chronic airway inflammation causing breathing difficulty.', recommendation: 'Avoid triggers, use inhalers as prescribed.', medicines: ['Salbutamol inhaler', 'Corticosteroid inhaler'] },
  { disease: 'Thyroid Disorder', baseRisk: 0, description: 'Thyroid gland dysfunction affecting metabolism.', recommendation: 'Regular TSH monitoring and medication adherence.', medicines: ['Levothyroxine', 'Methimazole'] },
  { disease: 'Anemia', baseRisk: 0, description: 'Deficiency of healthy red blood cells or hemoglobin.', recommendation: 'Iron-rich diet and supplements as needed.', medicines: ['Iron supplements', 'Folic acid'] },
  { disease: 'Kidney Disease', baseRisk: 0, description: 'Reduced kidney function affecting filtration.', recommendation: 'Monitor blood pressure, stay hydrated, limit salt.', medicines: ['As prescribed by nephrologist'] },
  { disease: 'Liver Disease', baseRisk: 0, description: 'Conditions affecting liver function.', recommendation: 'Avoid alcohol, maintain healthy weight, balanced diet.', medicines: ['As prescribed by hepatologist'] },
];

export interface PredictionInput {
  age: number;
  bmi: number;
  familyHistory: string[];
  symptoms: string[];
  lifestyle: { smoking: boolean; alcohol: boolean; exercise: string };
}

export function predictDiseases(input: PredictionInput): (PredictedDisease & { riskLevel: string; medicines: string[]; recommendation: string })[] {
  return DISEASE_PREDICTION_DATA.map((d) => {
    let risk = d.baseRisk;
    if (input.age > 45) risk += 15;
    if (input.age > 60) risk += 10;
    if (input.bmi >= 25) risk += 12;
    if (input.bmi >= 30) risk += 10;
    if (input.familyHistory.some((f) => d.disease.toLowerCase().includes(f.toLowerCase()))) risk += 20;
    if (input.lifestyle.smoking) {
      if (d.disease.includes('Heart')) risk += 15;
      if (d.disease.includes('Asthma')) risk += 12;
    }
    if (input.lifestyle.alcohol) {
      if (d.disease.includes('Liver')) risk += 18;
      if (d.disease.includes('Heart')) risk += 8;
    }
    if (input.lifestyle.exercise === 'none') risk += 8;
    if (input.lifestyle.exercise === 'regular') risk -= 10;
    if (input.symptoms.some((s) => d.disease.toLowerCase().includes(s.toLowerCase()))) risk += 15;
    risk = Math.max(5, Math.min(95, risk));
    const riskLevel = risk >= 70 ? 'High' : risk >= 40 ? 'Moderate' : 'Low';
    return {
      name: d.disease, probability: risk, description: d.description,
      riskLevel, medicines: d.medicines,
      recommendation: d.recommendation,
    };
  }).sort((a, b) => b.probability - a.probability);
}

export const MEDICINE_DATABASE: Record<string, Medicine> = {
  Paracetamol: {
    name: 'Paracetamol (Acetaminophen)', purpose: 'Pain relief and fever reduction',
    dosage: '500-1000mg every 4-6 hours (max 4g/day)',
    howToTake: 'Take with water, with or after food',
    sideEffects: ['Nausea (rare)', 'Liver damage in overdose'],
    precautions: ['Do not exceed 4g per day', 'Avoid alcohol', 'Check cold medicines for hidden paracetamol'],
    alternatives: ['Ibuprofen', 'Aspirin'],
    priceEstimate: '₹20-40 (10 tablets)', availability: 'Over-the-counter',
  },
  Ibuprofen: {
    name: 'Ibuprofen', purpose: 'NSAID for pain, inflammation, and fever',
    dosage: '200-400mg every 6-8 hours (max 1200mg/day OTC)',
    howToTake: 'Take with food or milk to reduce stomach upset',
    sideEffects: ['Stomach upset', 'Heartburn', 'Dizziness'],
    precautions: ['Take with food', 'Avoid if you have stomach ulcers', 'Not for kidney disease patients'],
    alternatives: ['Naproxen', 'Diclofenac'],
    priceEstimate: '₹30-60 (10 tablets)', availability: 'Over-the-counter',
  },
  Cetirizine: {
    name: 'Cetirizine', purpose: 'Antihistamine for allergies and hay fever',
    dosage: '10mg once daily (5mg for children)',
    howToTake: 'Take with water, can be taken with or without food',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Fatigue'],
    precautions: ['Avoid driving if drowsy', 'Avoid alcohol', 'Consult doctor if pregnant'],
    alternatives: ['Loratadine', 'Fexofenadine', 'Levocetirizine'],
    priceEstimate: '₹30-50 (10 tablets)', availability: 'Over-the-counter',
  },
  Metformin: {
    name: 'Metformin', purpose: 'First-line medication for Type 2 diabetes',
    dosage: '500mg twice daily, may increase to 1000mg twice daily',
    howToTake: 'Take with meals to reduce gastrointestinal side effects',
    sideEffects: ['Nausea', 'Diarrhea', 'Metallic taste', 'Vitamin B12 deficiency (long-term)'],
    precautions: ['Take with food', 'Monitor blood sugar regularly', 'Stay hydrated', 'Inform doctor of kidney function'],
    alternatives: ['Glimepiride', 'Sitagliptin', 'Empagliflozin'],
    priceEstimate: '₹50-100 (15 tablets)', availability: 'Prescription required',
  },
  Amlodipine: {
    name: 'Amlodipine', purpose: 'Calcium channel blocker for hypertension',
    dosage: '2.5-10mg once daily',
    howToTake: 'Take at the same time each day, with or without food',
    sideEffects: ['Ankle swelling', 'Headache', 'Flushing', 'Dizziness'],
    precautions: ['Monitor blood pressure', 'Do not stop abruptly', 'Report swelling to doctor'],
    alternatives: ['Losartan', 'Telmisartan', 'Nifedipine'],
    priceEstimate: '₹40-90 (10 tablets)', availability: 'Prescription required',
  },
  Salbutamol: {
    name: 'Salbutamol (Albuterol) Inhaler', purpose: 'Quick-relief bronchodilator for asthma',
    dosage: '1-2 puffs as needed, every 4-6 hours',
    howToTake: 'Shake inhaler, exhale fully, inhale deeply while pressing, hold breath 10 seconds',
    sideEffects: ['Tremors', 'Fast heartbeat', 'Headache', 'Nervousness'],
    precautions: ['Carry rescue inhaler always', 'Rinse mouth after use', 'Use spacer for better delivery'],
    alternatives: ['Terbutaline', 'Formoterol'],
    priceEstimate: '₹150-300 (inhaler)', availability: 'Prescription required',
  },
  'Amoxicillin': {
    name: 'Amoxicillin', purpose: 'Antibiotic for bacterial infections',
    dosage: '500mg three times daily for 5-7 days',
    howToTake: 'Take at evenly spaced intervals with or without food',
    sideEffects: ['Nausea', 'Diarrhea', 'Rash', 'Yeast infections'],
    precautions: ['Complete the full course', 'Inform doctor of penicillin allergies', 'Take probiotics'],
    alternatives: ['Azithromycin', 'Cephalexin', 'Doxycycline'],
    priceEstimate: '₹60-120 (10 capsules)', availability: 'Prescription required',
  },
};

export const COMMON_SYMPTOMS = [
  'Fever', 'Headache', 'Cold', 'Cough', 'Chest Pain', 'Stomach Pain',
  'Vomiting', 'Diarrhea', 'Fatigue', 'Skin Rash', 'Itching', 'Swelling',
  'Breathing Difficulty', 'Sore Throat', 'Body Ache', 'Dizziness',
  'Nausea', 'Joint Pain', 'Blurred Vision', 'High Fever', 'Chills',
  'Excessive Thirst', 'Frequent Urination', 'Weight Loss', 'Hair Loss',
];

export const DOCTORS: Doctor[] = [
  { id: 'd1', name: 'Dr. Aanya Sharma', specialty: 'General Physician', experience: 12, qualification: 'MBBS, MD (Internal Medicine)', languages: ['English', 'Hindi', 'Punjabi'], rating: 4.9, reviews: 1240, fee: 400, nextAvailable: 'Today, 3:00 PM', mode: ['video', 'chat', 'in-person'], image: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=400', hospital: 'Apollo Hospital, Delhi' },
  { id: 'd2', name: 'Dr. Rohan Mehta', specialty: 'Cardiologist', experience: 18, qualification: 'MBBS, MD, DM (Cardiology)', languages: ['English', 'Hindi', 'Gujarati'], rating: 4.8, reviews: 980, fee: 800, nextAvailable: 'Tomorrow, 11:00 AM', mode: ['video', 'in-person'], image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400', hospital: 'Fortis Heart Institute, Mumbai' },
  { id: 'd3', name: 'Dr. Priya Iyer', specialty: 'Dermatologist', experience: 10, qualification: 'MBBS, MD (Dermatology)', languages: ['English', 'Tamil', 'Telugu', 'Kannada'], rating: 4.9, reviews: 1560, fee: 500, nextAvailable: 'Today, 5:30 PM', mode: ['video', 'chat', 'in-person'], image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=400', hospital: 'Manipal Hospital, Bengaluru' },
  { id: 'd4', name: 'Dr. Arjun Reddy', specialty: 'Neurologist', experience: 15, qualification: 'MBBS, MD, DM (Neurology)', languages: ['English', 'Telugu', 'Hindi'], rating: 4.7, reviews: 720, fee: 900, nextAvailable: 'Tomorrow, 2:00 PM', mode: ['video', 'in-person'], image: 'https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=400', hospital: 'NIMS, Hyderabad' },
  { id: 'd5', name: 'Dr. Kavya Nair', specialty: 'Pediatrician', experience: 8, qualification: 'MBBS, MD (Pediatrics)', languages: ['English', 'Malayalam', 'Tamil'], rating: 4.9, reviews: 1890, fee: 350, nextAvailable: 'Today, 6:00 PM', mode: ['video', 'chat', 'in-person'], image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=400', hospital: 'Rainbow Children\'s Hospital, Kochi' },
  { id: 'd6', name: 'Dr. Vikram Singh', specialty: 'Orthopedic', experience: 20, qualification: 'MBBS, MS (Orthopedics)', languages: ['English', 'Hindi', 'Punjabi'], rating: 4.8, reviews: 1100, fee: 600, nextAvailable: 'Tomorrow, 10:00 AM', mode: ['video', 'in-person'], image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400', hospital: 'Max Hospital, Chandigarh' },
  { id: 'd7', name: 'Dr. Ananya Bose', specialty: 'Gynecologist', experience: 14, qualification: 'MBBS, MS (OBGYN)', languages: ['English', 'Bengali', 'Hindi'], rating: 4.9, reviews: 1340, fee: 550, nextAvailable: 'Today, 4:00 PM', mode: ['video', 'chat', 'in-person'], image: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=400', hospital: 'Kolkata Medical Center' },
  { id: 'd8', name: 'Dr. Karthik Rao', specialty: 'ENT Specialist', experience: 11, qualification: 'MBBS, MS (ENT)', languages: ['English', 'Telugu', 'Kannada'], rating: 4.7, reviews: 680, fee: 450, nextAvailable: 'Tomorrow, 1:00 PM', mode: ['video', 'in-person'], image: 'https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=400', hospital: 'CARE Hospital, Hyderabad' },
  { id: 'd9', name: 'Dr. Meera Joshi', specialty: 'Nutritionist', experience: 9, qualification: 'MSc (Dietetics), PhD (Nutrition)', languages: ['English', 'Marathi', 'Hindi'], rating: 4.8, reviews: 920, fee: 300, nextAvailable: 'Today, 7:00 PM', mode: ['video', 'chat'], image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=400', hospital: 'Independent Practice, Pune' },
  { id: 'd10', name: 'Dr. Sanjay Gupta', specialty: 'Pulmonologist', experience: 16, qualification: 'MBBS, MD, DM (Pulmonology)', languages: ['English', 'Hindi'], rating: 4.8, reviews: 850, fee: 700, nextAvailable: 'Tomorrow, 12:00 PM', mode: ['video', 'in-person'], image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400', hospital: 'AIIMS, Delhi' },
  { id: 'd11', name: 'Dr. Lakshmi Pillai', specialty: 'Psychiatrist', experience: 13, qualification: 'MBBS, MD (Psychiatry)', languages: ['English', 'Malayalam', 'Tamil'], rating: 4.9, reviews: 1050, fee: 650, nextAvailable: 'Today, 8:00 PM', mode: ['video', 'chat'], image: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=400', hospital: 'Mindscape Clinic, Trivandrum' },
  { id: 'd12', name: 'Dr. Rajesh Kumar', specialty: 'Gastroenterologist', experience: 17, qualification: 'MBBS, MD, DM (Gastroenterology)', languages: ['English', 'Hindi', 'Bhojpuri'], rating: 4.7, reviews: 640, fee: 750, nextAvailable: 'Tomorrow, 3:30 PM', mode: ['video', 'in-person'], image: 'https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=400', hospital: 'Patna Medical College' },
];

export const SPECIALTIES = [
  'General Physician', 'Dermatologist', 'Cardiologist', 'Neurologist',
  'Pediatrician', 'Orthopedic', 'Gynecologist', 'ENT Specialist',
  'Dentist', 'Psychiatrist', 'Nutritionist', 'Eye Specialist',
  'Pulmonologist', 'Nephrologist', 'Gastroenterologist',
];

export const HEALTH_TIPS = [
  { icon: 'droplet', title: 'Stay Hydrated', text: 'Drink 8 glasses of water daily. Proper hydration improves energy, skin health, and digestion.' },
  { icon: 'moon', title: 'Sleep Well', text: 'Aim for 7-9 hours of quality sleep. Good sleep boosts immunity and mental clarity.' },
  { icon: 'activity', title: 'Move Daily', text: '30 minutes of moderate exercise daily reduces risk of heart disease and diabetes.' },
  { icon: 'apple', title: 'Eat Balanced', text: 'Include fruits, vegetables, whole grains, and lean proteins. Limit processed foods and sugar.' },
  { icon: 'brain', title: 'Mental Wellness', text: 'Practice mindfulness or meditation 10 minutes daily to reduce stress and anxiety.' },
  { icon: 'heart-pulse', title: 'Heart Health', text: 'Monitor blood pressure regularly. Reduce salt and saturated fats for cardiovascular health.' },
  { icon: 'sun', title: 'Vitamin D', text: 'Get 15-20 minutes of sunlight daily for natural vitamin D and better bone health.' },
  { icon: 'shield', title: 'Vaccination', text: 'Stay up to date with vaccinations. Prevention is always better than cure.' },
];

export const DIET_PLANS = [
  { title: 'Heart-Healthy Diet', calories: '1800-2000 cal', items: ['Oats & berries breakfast', 'Grilled fish lunch', 'Mixed nuts snack', 'Vegetable dinner'], color: 'from-rose-400 to-red-500' },
  { title: 'Diabetic-Friendly', calories: '1500-1700 cal', items: ['Egg whites & spinach', 'Quinoa salad', 'Cucumber sticks', 'Grilled chicken'], color: 'from-blue-400 to-cyan-500' },
  { title: 'Weight Loss Plan', calories: '1200-1400 cal', items: ['Greek yogurt breakfast', 'Lentil soup lunch', 'Apple snack', 'Steamed veggies dinner'], color: 'from-green-400 to-emerald-500' },
  { title: 'Muscle Building', calories: '2500-2800 cal', items: ['Protein smoothie', 'Chicken & rice bowl', 'Peanut butter sandwich', 'Salmon dinner'], color: 'from-amber-400 to-orange-500' },
];

export const EMERGENCY_CONTACTS = [
  { service: 'Ambulance', number: '108', icon: 'truck' },
  { service: 'Police', number: '100', icon: 'shield' },
  { service: 'Fire', number: '101', icon: 'flame' },
  { service: 'Women Helpline', number: '1091', icon: 'heart' },
  { service: 'Child Helpline', number: '1098', icon: 'baby' },
  { service: 'Poison Control', number: '011-25013333', icon: 'skull' },
];

export const TESTIMONIALS = [
  { name: 'Priya Sharma', role: 'Teacher, Delhi', text: 'MediSense AI helped me understand my persistent headaches. The symptom checker suggested I see a neurologist, and the diagnosis matched. Incredible tool!', rating: 5, image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Rajesh Kumar', role: 'Engineer, Bangalore', text: 'The skin scan feature detected my fungal infection early. The AI recommended the right cream and it cleared up in two weeks. Saved me a clinic visit.', rating: 5, image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Anita Reddy', role: 'Homemaker, Hyderabad', text: 'Being able to chat with the AI doctor in Telugu made everything so much easier. It explained my blood report in simple words I could understand.', rating: 5, image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Mohammed Ali', role: 'Student, Mumbai', text: 'The medicine reminders and health tips keep me on track. My health score went from 65 to 82 in three months. Really motivating!', rating: 4, image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=200' },
];

export const ARTICLES = [
  { title: '10 Warning Signs of Heart Disease You Should Never Ignore', category: 'Cardiology', readTime: '5 min', image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'Understanding Diabetes: A Complete Beginner\'s Guide', category: 'Endocrinology', readTime: '8 min', image: 'https://images.pexels.com/photos/4386468/pexels-photo-4386468.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'Skin Care in Summer: Preventing Heat Rashes and Sun Damage', category: 'Dermatology', readTime: '6 min', image: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'Mental Health Matters: Managing Anxiety in Daily Life', category: 'Mental Health', readTime: '7 min', image: 'https://images.pexels.com/photos/3759079/pexels-photo-3759079.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'Boost Your Immunity Naturally: Foods and Habits', category: 'Nutrition', readTime: '5 min', image: 'https://images.pexels.com/photos/4473752/pexels-photo-4473752.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'Pediatric Care: When to Worry About Your Child\'s Fever', category: 'Pediatrics', readTime: '6 min', image: 'https://images.pexels.com/photos/3933251/pexels-photo-3933251.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

// AI chatbot response generator
export function generateChatResponse(userMessage: string, history: { role: string; content: string }[]): string {
  const msg = userMessage.toLowerCase();
  const lowerMsg = msg.trim();

  if (/fever|temperature|hot/.test(lowerMsg)) {
    return 'I understand you\'re experiencing fever. A few questions to help assess:\n\n1. What is your temperature reading?\n2. How long have you had the fever?\n3. Do you have any other symptoms like cough, body ache, or chills?\n4. Any recent travel or contact with sick individuals?\n\nFor fever above 103°F (39.4°C) lasting more than 3 days, please consult a doctor. In the meantime: stay hydrated, rest, and take paracetamol if needed. Would you like me to connect you with a general physician?';
  }
  if (/headache|head ache|migraine/.test(lowerMsg)) {
    return 'Headaches can have many causes. Let me ask a few questions:\n\n1. Where is the pain located — one side, both sides, or behind the eyes?\n2. How would you describe it — throbbing, dull, or sharp?\n3. How long have you had it?\n4. Any nausea, light sensitivity, or visual changes?\n5. Any recent stress or lack of sleep?\n\nIf the headache is sudden and severe ("worst headache of your life"), or accompanied by weakness or confusion, seek emergency care immediately.';
  }
  if (/cough|cold|sore throat|flu/.test(lowerMsg)) {
    return 'For respiratory symptoms like cough or cold, I can help. Tell me:\n\n1. Is your cough dry or are you producing phlegm?\n2. What color is the phlegm (if any)?\n3. Do you have a fever?\n4. Any difficulty breathing or chest tightness?\n5. How long have you had these symptoms?\n\nMost colds resolve in 7-10 days. Rest, hydrate, and use steam inhalation. If symptoms persist beyond 10 days or worsen, see a doctor.';
  }
  if (/chest pain|heart|cardiac/.test(lowerMsg)) {
    return '⚠️ Chest pain should always be taken seriously. If you\'re experiencing:\n\n• Pressure or squeezing in the chest\n• Pain spreading to arm, jaw, or back\n• Shortness of breath\n• Sweating and nausea\n\n**Call 108 (ambulance) immediately.** While waiting: sit down, stay calm, chew an aspirin if you\'re not allergic and have one available.\n\nIf the pain is mild and occasional, still consult a cardiologist promptly. Would you like me to help you find one?';
  }
  if (/stomach|abdomen|nausea|vomit|diarrhea/.test(lowerMsg)) {
    return 'For stomach/digestive issues, I need a bit more information:\n\n1. Where exactly is the pain — upper, lower, left, or right?\n2. Is the pain constant or does it come and go?\n3. Any vomiting or diarrhea?\n4. What did you eat recently?\n5. Any fever?\n\nFor mild cases: stay hydrated with ORS, eat bland foods (rice, bananas, toast), and rest. If you see blood, have severe pain, or persistent vomiting, seek medical care.';
  }
  if (/skin|rash|itch|acne|allerg/.test(lowerMsg)) {
    return 'I can help with skin concerns. You can use our Camera Scan feature for visual analysis, or tell me:\n\n1. Where is the affected area?\n2. Is it itchy, painful, or both?\n3. Is there redness, swelling, or flaking?\n4. How long have you had it?\n5. Any new products, foods, or medications recently?\n\nWould you like to use the camera scan for a more detailed analysis, or shall I recommend a dermatologist?';
  }
  if (/diabet|sugar|blood sugar/.test(lowerMsg)) {
    return 'Regarding blood sugar concerns:\n\n• Normal fasting: 70-100 mg/dL\n• Prediabetes: 100-125 mg/dL\n• Diabetes: 126 mg/dL and above\n\nTo manage blood sugar:\n1. Eat low-glycemic foods (whole grains, vegetables)\n2. Exercise 30 minutes daily\n3. Monitor your levels regularly\n4. Limit sugary drinks and refined carbs\n5. Maintain a healthy weight\n\nWould you like me to recommend an endocrinologist or check your risk using our Disease Prediction tool?';
  }
  if (/blood pressure|hypertension|bp/.test(lowerMsg)) {
    return 'Blood pressure readings:\n\n• Normal: below 120/80 mmHg\n• Elevated: 120-129/80 mmHg\n• Stage 1: 130-139/80-89 mmHg\n• Stage 2: 140+/90+ mmHg\n\nTips to manage BP:\n1. Reduce sodium (under 2g/day)\n2. Regular cardio exercise\n3. Maintain healthy weight\n4. Limit alcohol and caffeine\n5. Manage stress with meditation\n\nWould you like to book a consultation with a cardiologist?';
  }
  if (/sleep|insomnia|tired|fatigue/.test(lowerMsg)) {
    return 'Sleep and fatigue are closely linked to overall health:\n\nFor better sleep:\n1. Maintain a consistent sleep schedule\n2. Avoid screens 1 hour before bed\n3. Keep your room cool and dark\n4. Avoid caffeine after 2 PM\n5. Try relaxation techniques before bed\n\nIf fatigue persists despite good sleep, it could indicate anemia, thyroid issues, or vitamin deficiency. A blood test can help. Shall I recommend tests?';
  }
  if (/anxiety|stress|depress|mental|sad/.test(lowerMsg)) {
    return 'I\'m glad you reached out. Mental health is just as important as physical health.\n\nFor managing stress and anxiety:\n1. Practice deep breathing (4-7-8 technique)\n2. Try meditation or mindfulness apps\n3. Exercise regularly — even a walk helps\n4. Connect with friends and family\n5. Maintain a routine\n\nIf you\'re feeling overwhelmed persistently, talking to a mental health professional can make a big difference. Would you like me to connect you with a psychiatrist or counselor?';
  }
  if (/pregnan|baby|child|kid/.test(lowerMsg)) {
    return 'For pregnancy and child care:\n\nPregnancy care:\n• Regular prenatal check-ups\n• Take folic acid and iron supplements\n• Eat nutrient-rich foods\n• Avoid alcohol, smoking, and raw foods\n\nFor children:\n• Follow the vaccination schedule\n• Monitor growth milestones\n• Ensure balanced nutrition\n\nWould you like to book an appointment with a gynecologist or pediatrician?';
  }
  if (/medicine|medication|drug|tablet/.test(lowerMsg)) {
    return 'I can provide general information about medicines, but always consult a doctor before taking any medication.\n\nWhat medication would you like to know about? I can share:\n• General purpose\n• Typical dosage\n• How to take it\n• Possible side effects\n• Precautions\n\nYou can also visit our Medicines section for a detailed database. Remember: this is educational information only.';
  }
  if (/report|lab|test|blood test|result/.test(lowerMsg)) {
    return 'I can help you understand medical reports. You can:\n\n1. **Upload your report** in the Records section — I\'ll summarize it in simple language\n2. **Tell me specific values** and I\'ll explain what they mean\n\nCommon tests and normal ranges:\n• Hemoglobin: 12-16 g/dL (women), 13.5-17.5 (men)\n• Fasting sugar: 70-100 mg/dL\n• TSH: 0.4-4.0 mIU/L\n• Total cholesterol: below 200 mg/dL\n\nWhat specific test would you like to understand?';
  }
  if (/hello|hi|hey|namaste|good morning|good evening/.test(lowerMsg)) {
    return 'Hello! I\'m your AI Health Advisor. I\'m here 24/7 to help with:\n\n• Understanding symptoms\n• Disease information\n• Medicine guidance\n• Lab report explanations\n• Health tips and lifestyle advice\n• Finding the right doctor\n\nHow can I help you today? You can describe your symptoms or ask any health question.';
  }
  if (/thank/.test(lowerMsg)) {
    return 'You\'re welcome! Remember, I\'m here whenever you need health guidance. If your symptoms worsen or you need a confirmed diagnosis, please consult a licensed doctor. Take care of your health!';
  }
  if (/emergency|urgent|serious/.test(lowerMsg)) {
    return '⚠️ If this is a life-threatening emergency, please call **108 (Ambulance)** immediately.\n\nOur Emergency Mode provides:\n• Nearest hospital information\n• Ambulance contact\n• First aid instructions\n• Emergency doctor contact\n\nWould you like me to open Emergency Mode?';
  }
  if (/diet|nutrition|food|eat|weight/.test(lowerMsg)) {
    return 'Nutrition is key to good health! Here are some general guidelines:\n\n• Fill half your plate with vegetables\n• Choose whole grains over refined\n• Include lean protein (fish, legumes, chicken)\n• Stay hydrated (8 glasses water)\n• Limit processed foods and added sugar\n\nFor a personalized diet plan, visit our Wellness section or consult a nutritionist. Would you like me to recommend one?';
  }
  // Default — acknowledging and guiding
  const lastAssistant = [...history].reverse().find((m) => m.role === 'assistant');
  if (!lastAssistant) {
    return 'I\'m here to help with your health questions. You can tell me about any symptoms you\'re experiencing, ask about a disease or medicine, or describe a health concern. For example:\n\n• "I have fever and body ache"\n• "What does high blood pressure mean?"\n• "Explain my blood test results"\n• "I have a skin rash"\n\nWhat would you like to know?';
  }
  return 'I understand. Could you tell me a bit more about what you\'re experiencing? For example, when did it start, how severe is it, and do you have any other symptoms? The more detail you provide, the better I can guide you. If you\'d prefer, you can also use our Symptom Checker for a structured analysis.';
}
