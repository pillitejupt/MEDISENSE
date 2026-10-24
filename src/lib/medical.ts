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

// ─────────────────────────────────────────────────────────────────────────────
// Structured Health Problems Database (20 conditions) + enhanced checker
// Used by the Symptoms page for the detailed checker flow.
// ─────────────────────────────────────────────────────────────────────────────

export type UrgencyLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'EMERGENCY';

export interface HealthCondition {
  name: string;
  category: string;
  description: string;
  symptoms: string[];
  whyRelevant: string;
  nextSteps: string[];
  selfCare: string[];
  recommendedDoctor: string;
  urgency: UrgencyLevel;
  warningSigns: string[];
  followUpQuestions: string[];
}

export const HEALTH_CONDITIONS: HealthCondition[] = [
  {
    name: 'Common Cold',
    category: 'Respiratory',
    description: 'A viral infection of the upper respiratory tract that causes nasal congestion, sneezing, and a mild sore throat.',
    symptoms: ['runny nose', 'sneezing', 'sore throat', 'mild cough', 'cough', 'cold', 'nasal congestion'],
    whyRelevant: 'Several of your reported symptoms (runny nose, sneezing, sore throat) are hallmarks of a common cold, which is one of the most frequent upper respiratory infections.',
    nextSteps: ['Rest and stay hydrated with warm fluids', 'Use steam inhalation to ease congestion', 'Monitor symptoms; most colds resolve in 7-10 days', 'If symptoms persist beyond 10 days, consult a general physician'],
    selfCare: ['Drink plenty of warm fluids', 'Gargle with warm salt water', 'Use a humidifier', 'Get adequate rest (7-8 hours)'],
    recommendedDoctor: 'General Physician',
    urgency: 'LOW',
    warningSigns: ['Difficulty breathing', 'High fever above 102°F (38.9°C)', 'Symptoms worsening after 7 days', 'Severe headache or sinus pain'],
    followUpQuestions: ['How long have you had these symptoms?', 'Do you also have a fever?', 'Is the cough producing phlegm?'],
  },
  {
    name: 'Flu (Influenza)',
    category: 'Respiratory',
    description: 'A contagious respiratory illness caused by influenza viruses, with sudden onset of fever, body aches, and fatigue.',
    symptoms: ['fever', 'body ache', 'body aches', 'headache', 'fatigue', 'cough', 'chills', 'sore throat', 'high fever'],
    whyRelevant: 'Your combination of fever, body aches, headache, and fatigue matches the typical presentation of influenza, which usually begins abruptly.',
    nextSteps: ['Rest completely for 5-7 days', 'Drink plenty of fluids', 'Consider seeing a doctor within 48 hours for antiviral medication', 'Isolate to avoid spreading the virus'],
    selfCare: ['Stay hydrated with water and ORS', 'Rest in a warm, comfortable environment', 'Use paracetamol for fever if appropriate', 'Avoid contact with others'],
    recommendedDoctor: 'General Physician',
    urgency: 'MODERATE',
    warningSigns: ['Difficulty breathing or shortness of breath', 'Persistent fever above 103°F (39.4°C)', 'Chest pain or pressure', 'Confusion or severe weakness', 'Symptoms that improve then return with fever'],
    followUpQuestions: ['How suddenly did the symptoms start?', 'What is your temperature reading?', 'How long have you had the fever?'],
  },
  {
    name: 'Migraine',
    category: 'Neurological',
    description: 'A neurological condition causing intense throbbing headaches, often with sensitivity to light and sound and sometimes nausea.',
    symptoms: ['severe headache', 'headache', 'nausea', 'sensitivity to light', 'sensitivity to sound', 'light sensitivity', 'sound sensitivity', 'vomiting'],
    whyRelevant: 'A severe headache paired with nausea and sensitivity to light or sound is the classic presentation of a migraine.',
    nextSteps: ['Rest in a dark, quiet room', 'Stay hydrated', 'Track headache triggers and frequency', 'If headaches recur, consult a neurologist'],
    selfCare: ['Rest in a dark, quiet room', 'Apply a cold compress to the forehead', 'Maintain a regular sleep schedule', 'Identify and avoid trigger foods (caffeine, chocolate, aged cheese)'],
    recommendedDoctor: 'Neurologist',
    urgency: 'MODERATE',
    warningSigns: ['Sudden "worst headache of your life"', 'Headache with weakness, numbness, or difficulty speaking', 'Headache after a head injury', 'Headache with fever and stiff neck', 'Vision loss or double vision'],
    followUpQuestions: ['Is the headache on one side or both sides?', 'Is the pain throbbing or dull?', 'How long have you had this headache?'],
  },
  {
    name: 'Allergy',
    category: 'Immune / Skin',
    description: 'An immune response to allergens causing sneezing, itchy eyes, runny nose, or skin reactions.',
    symptoms: ['sneezing', 'itchy eyes', 'runny nose', 'skin rash', 'rash', 'itching', 'hives', 'redness', 'swelling'],
    whyRelevant: 'Sneezing with itchy eyes and a runny nose, or a skin rash after exposure, points toward an allergic reaction.',
    nextSteps: ['Identify and avoid the suspected allergen', 'Over-the-counter antihistamines can help mild reactions', 'Consult a doctor if symptoms persist or worsen', 'Consider allergy testing for recurring symptoms'],
    selfCare: ['Avoid known allergens', 'Use hypoallergenic products', 'Apply cool compresses to itchy skin', 'Keep indoor air clean'],
    recommendedDoctor: 'Dermatologist / Allergist',
    urgency: 'LOW',
    warningSigns: ['Swelling of the lips, tongue, or throat', 'Difficulty breathing or swallowing', 'Widespread hives', 'Dizziness or fainting after exposure', 'Rapid heartbeat'],
    followUpQuestions: ['Were you recently exposed to new foods, products, or environments?', 'How long have you had these symptoms?', 'Is there a family history of allergies?'],
  },
  {
    name: 'Asthma',
    category: 'Respiratory',
    description: 'A chronic condition of inflamed, narrowed airways causing wheezing, coughing, chest tightness, and shortness of breath.',
    symptoms: ['wheezing', 'coughing', 'cough', 'chest tightness', 'shortness of breath', 'breathing difficulty'],
    whyRelevant: 'Wheezing, chest tightness, and shortness of breath together are characteristic of asthma or an asthma flare-up.',
    nextSteps: ['Use a prescribed reliever inhaler if available', 'Identify and avoid triggers (dust, pollen, smoke)', 'If breathing does not improve, seek medical attention promptly', 'Consult a pulmonologist for ongoing management'],
    selfCare: ['Use inhalers as prescribed', 'Avoid known triggers', 'Keep indoor air clean', 'Practice breathing exercises'],
    recommendedDoctor: 'Pulmonologist',
    urgency: 'HIGH',
    warningSigns: ['Severe difficulty breathing or inability to speak full sentences', 'Bluish lips or face', 'Confusion or drowsiness', 'No improvement after using a reliever inhaler', 'Chest pain'],
    followUpQuestions: ['Do you have a history of asthma?', 'Did symptoms start suddenly or gradually?', 'Can you speak in full sentences without pausing for breath?'],
  },
  {
    name: 'Acid Reflux (GERD)',
    category: 'Gastrointestinal',
    description: 'Stomach acid flowing back into the esophagus causing heartburn, sour taste, and regurgitation.',
    symptoms: ['heartburn', 'sour taste', 'regurgitation', 'upper abdominal discomfort', 'stomach pain', 'chest pain', 'nausea'],
    whyRelevant: 'Heartburn with a sour taste and regurgitation, especially after meals or when lying down, is typical of acid reflux.',
    nextSteps: ['Avoid eating 2-3 hours before bed', 'Identify and avoid trigger foods (spicy, fatty, caffeine)', 'Consult a doctor if symptoms occur more than twice a week', 'Raise the head of your bed to reduce nighttime reflux'],
    selfCare: ['Eat smaller, more frequent meals', 'Avoid spicy and fatty foods', 'Do not lie down right after eating', 'Maintain a healthy weight'],
    recommendedDoctor: 'Gastroenterologist',
    urgency: 'LOW',
    warningSigns: ['Difficulty or pain when swallowing', 'Unexplained weight loss', 'Vomiting blood or coffee-ground material', 'Black or bloody stools', 'Persistent symptoms despite lifestyle changes'],
    followUpQuestions: ['Do symptoms worsen after eating or when lying down?', 'How long have you had these symptoms?', 'Do you have a sour taste in your mouth?'],
  },
  {
    name: 'Gastritis',
    category: 'Gastrointestinal',
    description: 'Inflammation of the stomach lining causing upper stomach pain, nausea, bloating, and loss of appetite.',
    symptoms: ['upper stomach pain', 'stomach pain', 'nausea', 'bloating', 'loss of appetite', 'vomiting'],
    whyRelevant: 'Upper stomach pain with nausea, bloating, and reduced appetite is consistent with inflammation of the stomach lining.',
    nextSteps: ['Eat bland, easily digestible foods', 'Avoid alcohol, NSAIDs, and spicy foods', 'Consult a doctor if pain persists beyond a few days', 'Seek care urgently if vomiting blood or passing black stools'],
    selfCare: ['Eat small, frequent meals', 'Avoid alcohol and irritant medications', 'Stay hydrated', 'Avoid spicy and acidic foods'],
    recommendedDoctor: 'Gastroenterologist',
    urgency: 'MODERATE',
    warningSigns: ['Vomiting blood or material that looks like coffee grounds', 'Black, tarry stools', 'Severe abdominal pain', 'Persistent vomiting', 'Dizziness or fainting'],
    followUpQuestions: ['Is the pain related to meals?', 'Have you been taking pain relievers like ibuprofen?', 'How long have you had these symptoms?'],
  },
  {
    name: 'Dehydration',
    category: 'General',
    description: 'A condition where the body loses more fluids than it takes in, causing thirst, dry mouth, dark urine, and dizziness.',
    symptoms: ['thirst', 'dry mouth', 'dark urine', 'dizziness', 'excessive thirst', 'fatigue', 'headache'],
    whyRelevant: 'Thirst, dry mouth, dark urine, and dizziness together are the hallmark signs of dehydration.',
    nextSteps: ['Drink water or ORS solution steadily', 'Avoid strenuous activity until hydrated', 'Seek medical care if dizziness is severe or persistent', 'Monitor urine color — aim for pale yellow'],
    selfCare: ['Sip water regularly', 'Use oral rehydration solution (ORS) for severe cases', 'Avoid caffeine and alcohol', 'Rest in a cool place'],
    recommendedDoctor: 'General Physician',
    urgency: 'MODERATE',
    warningSigns: ['Confusion or lethargy', 'No urination for 8+ hours', 'Rapid heartbeat or breathing', 'Fainting', 'Sunken eyes with no tears'],
    followUpQuestions: ['How much water have you been drinking today?', 'Have you had vomiting, diarrhea, or heavy sweating?', 'What color is your urine?'],
  },
  {
    name: 'Anemia',
    category: 'Blood / General',
    description: 'A condition where the body lacks enough healthy red blood cells to carry adequate oxygen, causing weakness, fatigue, and pale skin.',
    symptoms: ['weakness', 'tiredness', 'fatigue', 'pale skin', 'dizziness', 'shortness of breath', 'cold hands'],
    whyRelevant: 'Persistent tiredness, weakness, and pale skin point toward anemia, which is common across age groups.',
    nextSteps: ['Eat iron-rich foods (spinach, lentils, meat)', 'Pair iron with vitamin C for better absorption', 'Get a blood test (CBC, iron studies)', 'Consult a doctor for diagnosis and treatment'],
    selfCare: ['Include iron-rich foods in your diet', 'Take iron supplements only under medical guidance', 'Avoid tea/coffee with meals', 'Regular check-ups'],
    recommendedDoctor: 'General Physician',
    urgency: 'LOW',
    warningSigns: ['Severe shortness of breath', 'Chest pain', 'Very pale skin with fainting', 'Rapid or irregular heartbeat', 'Persistent dizziness'],
    followUpQuestions: ['How long have you felt tired or weak?', 'Do you have a history of anemia?', 'Have you noticed any unusual bleeding?'],
  },
  {
    name: 'Type 2 Diabetes',
    category: 'Endocrine / Metabolic',
    description: 'A chronic condition where the body cannot properly regulate blood sugar, causing increased thirst, frequent urination, and fatigue.',
    symptoms: ['increased thirst', 'excessive thirst', 'frequent urination', 'fatigue', 'blurred vision', 'weight loss', 'slow healing'],
    whyRelevant: 'Increased thirst, frequent urination, fatigue, and blurred vision are classic warning signs of high blood sugar.',
    nextSteps: ['Get a fasting blood sugar and HbA1c test', 'Adopt a low-sugar, balanced diet', 'Exercise regularly (30 min/day)', 'Consult an endocrinologist or general physician'],
    selfCare: ['Eat a low-glycemic, balanced diet', 'Exercise regularly', 'Monitor blood sugar if advised', 'Maintain a healthy weight'],
    recommendedDoctor: 'Endocrinologist / General Physician',
    urgency: 'MODERATE',
    warningSigns: ['Very high blood sugar readings', 'Confusion or extreme thirst with very frequent urination', 'Fainting', 'Deep, rapid breathing', 'Fruity-smelling breath'],
    followUpQuestions: ['Do you have a family history of diabetes?', 'Have you had your blood sugar tested recently?', 'Have you noticed unexplained weight loss?'],
  },
  {
    name: 'High Blood Pressure (Hypertension)',
    category: 'Cardiovascular',
    description: 'Persistently elevated blood pressure that usually has no symptoms and is identified through measurement, not symptoms alone.',
    symptoms: ['headache', 'dizziness', 'blurred vision', 'chest pain', 'shortness of breath', 'nosebleed'],
    whyRelevant: 'High blood pressure is usually silent. Headaches, dizziness, or blurred vision can occur at very high readings, but it is best identified through measurement.',
    nextSteps: ['Measure your blood pressure with a validated monitor', 'Reduce salt intake and manage stress', 'Maintain a healthy weight', 'Consult a physician if readings are consistently above 130/80 mmHg'],
    selfCare: ['Reduce sodium (under 2g/day)', 'Regular cardiovascular exercise', 'Limit alcohol and caffeine', 'Manage stress with meditation'],
    recommendedDoctor: 'Cardiologist / General Physician',
    urgency: 'MODERATE',
    warningSigns: ['Blood pressure above 180/120 mmHg', 'Severe headache with chest pain', 'Difficulty speaking or weakness on one side', 'Vision changes', 'Severe shortness of breath'],
    followUpQuestions: ['Do you have a blood pressure reading to share?', 'Do you have a family history of hypertension?', 'Have you been monitoring your blood pressure regularly?'],
  },
  {
    name: 'Urinary Tract Infection (UTI)',
    category: 'Urinary',
    description: 'A bacterial infection in the urinary system causing burning urination, frequent urination, urgency, and lower abdominal pain.',
    symptoms: ['burning urination', 'frequent urination', 'urgency', 'lower abdominal pain', 'stomach pain', 'cloudy urine'],
    whyRelevant: 'Burning during urination with frequent urges and lower abdominal pain is the classic presentation of a urinary tract infection.',
    nextSteps: ['Drink plenty of water to flush the urinary tract', 'See a doctor for a urine test', 'Antibiotics may be needed — only as prescribed', 'Complete the full course of any prescribed antibiotic'],
    selfCare: ['Drink plenty of water', 'Avoid holding urine', 'Urinate after intercourse', 'Maintain good hygiene'],
    recommendedDoctor: 'General Physician / Urologist',
    urgency: 'MODERATE',
    warningSigns: ['Fever with chills and flank pain', 'Blood in urine', 'Nausea and vomiting', 'Confusion (especially in older adults)', 'Symptoms not improving after starting antibiotics'],
    followUpQuestions: ['How long have you had these symptoms?', 'Is there any blood in your urine?', 'Do you also have a fever?'],
  },
  {
    name: 'Food Poisoning',
    category: 'Gastrointestinal',
    description: 'Illness from contaminated food or drink causing nausea, vomiting, diarrhea, and stomach cramps.',
    symptoms: ['nausea', 'vomiting', 'diarrhea', 'stomach cramps', 'stomach pain', 'fever'],
    whyRelevant: 'Sudden onset of nausea, vomiting, diarrhea, and cramps after eating is consistent with food poisoning.',
    nextSteps: ['Drink ORS or clear fluids to prevent dehydration', 'Eat bland foods once vomiting stops', 'Seek medical care if symptoms are severe or persist beyond 2 days', 'Avoid anti-diarrheal medication unless advised by a doctor'],
    selfCare: ['Sip ORS or water frequently', 'Follow the BRAT diet (bananas, rice, applesauce, toast)', 'Avoid dairy and spicy foods', 'Rest'],
    recommendedDoctor: 'Gastroenterologist / General Physician',
    urgency: 'MODERATE',
    warningSigns: ['Blood in vomit or stools', 'High fever above 102°F (38.9°C)', 'Severe dehydration (dry mouth, no urination, dizziness)', 'Symptoms lasting more than 3 days', 'Severe abdominal pain'],
    followUpQuestions: ['What did you eat recently?', 'How long after eating did symptoms start?', 'Is anyone else who ate the same food also unwell?'],
  },
  {
    name: 'Constipation',
    category: 'Gastrointestinal',
    description: 'Infrequent or difficult bowel movements with hard stools, straining, and bloating.',
    symptoms: ['hard stools', 'straining', 'infrequent bowel movements', 'bloating', 'stomach pain', 'abdominal pain'],
    whyRelevant: 'Hard stools, straining, and infrequent bowel movements are the defining features of constipation.',
    nextSteps: ['Increase fiber intake (fruits, vegetables, whole grains)', 'Drink plenty of water', 'Exercise regularly', 'If it persists beyond 2 weeks or there is bleeding, consult a doctor'],
    selfCare: ['Eat more fiber-rich foods', 'Drink 8 glasses of water daily', 'Stay physically active', 'Don\'t ignore the urge to go'],
    recommendedDoctor: 'General Physician / Gastroenterologist',
    urgency: 'LOW',
    warningSigns: ['Blood in stool', 'Severe abdominal pain', 'Unexplained weight loss', 'No bowel movement for more than a week', 'Vomiting'],
    followUpQuestions: ['How many bowel movements do you have per week?', 'Have you noticed blood in your stool?', 'What is your typical diet and water intake?'],
  },
  {
    name: 'Insomnia',
    category: 'Mental Health / Sleep',
    description: 'Difficulty falling asleep or staying asleep, leading to daytime fatigue.',
    symptoms: ['difficulty falling asleep', 'waking during the night', 'daytime fatigue', 'fatigue', 'difficulty concentrating'],
    whyRelevant: 'Trouble falling or staying asleep with daytime fatigue is the core presentation of insomnia.',
    nextSteps: ['Maintain a consistent sleep schedule', 'Limit screens and caffeine before bed', 'If poor sleep persists for more than a few weeks, consult a doctor', 'Consider a sleep specialist for chronic issues'],
    selfCare: ['Keep a regular sleep schedule', 'Avoid screens 1 hour before bed', 'Create a cool, dark sleeping environment', 'Try relaxation techniques before bed'],
    recommendedDoctor: 'General Physician / Psychiatrist',
    urgency: 'LOW',
    warningSigns: ['Loud snoring with pauses in breathing', 'Persistent daytime sleepiness despite adequate sleep time', 'Depression or anxiety with sleep problems', 'Falling asleep suddenly during the day', 'Sleepwalking with injury'],
    followUpQuestions: ['How many hours of sleep do you get on average?', 'Do you use screens before bed?', 'Is stress affecting your sleep?'],
  },
  {
    name: 'Anxiety',
    category: 'Mental Health',
    description: 'Excessive and persistent worry, restlessness, difficulty concentrating, and sometimes a rapid heartbeat.',
    symptoms: ['excessive worry', 'restlessness', 'difficulty concentrating', 'rapid heartbeat', 'fast heartbeat', 'fatigue', 'irritability'],
    whyRelevant: 'Excessive worry with restlessness, trouble concentrating, and a racing heart are hallmark symptoms of anxiety.',
    nextSteps: ['Practice relaxation techniques (deep breathing, mindfulness)', 'Regular physical activity can reduce anxiety', 'Limit caffeine and alcohol', 'If anxiety interferes with daily life, speak with a mental health professional'],
    selfCare: ['Practice deep breathing (4-7-8 technique)', 'Try meditation or mindfulness', 'Exercise regularly', 'Maintain a routine and connect with loved ones'],
    recommendedDoctor: 'Psychiatrist / Counselor',
    urgency: 'LOW',
    warningSigns: ['Thoughts of self-harm', 'Panic attacks with chest pain and a feeling of doom', 'Heart racing that does not slow down', 'Severe difficulty breathing', 'Feeling detached from reality'],
    followUpQuestions: ['How long have you been feeling this way?', 'Are certain situations triggering these feelings?', 'Is this affecting your daily activities?'],
  },
  {
    name: 'Eczema',
    category: 'Skin',
    description: 'A condition causing itchy, dry, inflamed patches of skin.',
    symptoms: ['itchy skin', 'dry skin', 'inflamed skin', 'skin rash', 'rash', 'itching', 'redness'],
    whyRelevant: 'Itchy, dry, and inflamed skin patches are the defining features of eczema (atopic dermatitis).',
    nextSteps: ['Moisturize regularly with fragrance-free lotion', 'Avoid hot showers and harsh soaps', 'Identify and avoid triggers', 'Consult a dermatologist if it persists or worsens'],
    selfCare: ['Moisturize at least twice daily', 'Use mild, fragrance-free cleansers', 'Avoid scratching', 'Identify and avoid triggers (soaps, stress, allergens)'],
    recommendedDoctor: 'Dermatologist',
    urgency: 'LOW',
    warningSigns: ['Signs of infection (pus, increased pain, fever)', 'Rash spreading rapidly', 'Blisters that ooze', 'No improvement with moisturizing', 'Rash on the face that is severe'],
    followUpQuestions: ['Where is the affected area?', 'How long have you had it?', 'Have you used any new products or eaten new foods?'],
  },
  {
    name: 'Conjunctivitis (Pink Eye)',
    category: 'Eye',
    description: 'Inflammation or infection of the conjunctiva causing red eyes, irritation, watery eyes, and discharge.',
    symptoms: ['red eyes', 'eye irritation', 'watery eyes', 'eye discharge', 'itchy eyes', 'eye pain', 'blurred vision'],
    whyRelevant: 'Red, irritated, watery eyes with discharge are the classic signs of conjunctivitis.',
    nextSteps: ['Avoid touching or rubbing the eyes', 'Use a clean, warm compress to soothe irritation', 'Do not share towels or pillowcases', 'Consult a doctor if it does not improve in a few days or is severe'],
    selfCare: ['Wash hands frequently', 'Use a clean, warm compress', 'Avoid contact lenses until healed', 'Do not share personal items'],
    recommendedDoctor: 'Eye Specialist / General Physician',
    urgency: 'LOW',
    warningSigns: ['Severe eye pain', 'Vision loss or changes', 'Sensitivity to light', 'Intense redness in one eye', 'Symptoms not improving after 7 days'],
    followUpQuestions: ['Is it in one eye or both?', 'Is there discharge, and what color?', 'Have you been around anyone with similar symptoms?'],
  },
  {
    name: 'Common Dental Problems',
    category: 'Dental',
    description: 'Toothache, gum swelling, or tooth sensitivity often caused by cavities, gum disease, or infection.',
    symptoms: ['toothache', 'gum swelling', 'tooth sensitivity', 'jaw pain', 'mouth pain', 'bleeding gums'],
    whyRelevant: 'A toothache with gum swelling or sensitivity typically points to a dental problem such as a cavity or gum disease.',
    nextSteps: ['Book an appointment with a dentist', 'Rinse with warm salt water for temporary relief', 'Avoid very hot, cold, or sweet foods', 'Take over-the-counter pain relief if appropriate'],
    selfCare: ['Brush twice daily with fluoride toothpaste', 'Floss daily', 'Rinse with warm salt water', 'Avoid sugary foods and very hot/cold items'],
    recommendedDoctor: 'Dentist',
    urgency: 'LOW',
    warningSigns: ['Severe swelling of the face or jaw', 'Fever with tooth pain', 'Difficulty breathing or swallowing', 'Pus around a tooth', 'Trauma to the tooth or jaw'],
    followUpQuestions: ['How long have you had the pain?', 'Is the pain constant or triggered by hot/cold/sweet?', 'Is there any swelling in the gums or face?'],
  },
  {
    name: 'Appendicitis (Suspected)',
    category: 'Gastrointestinal',
    description: 'Inflammation of the appendix, often starting as pain near the navel that moves to the lower right abdomen, with nausea and loss of appetite.',
    symptoms: ['abdominal pain', 'stomach pain', 'lower right abdominal pain', 'pain near navel', 'nausea', 'loss of appetite', 'fever'],
    whyRelevant: 'Abdominal pain that begins near the navel and moves to the lower right side, with nausea and loss of appetite, is the classic pattern of appendicitis — this needs urgent assessment.',
    nextSteps: ['Seek urgent medical assessment — do not eat or drink in case surgery is needed', 'Do not take painkillers or laxatives before seeing a doctor', 'Go to the emergency department if pain is severe', 'Do not delay — a ruptured appendix is a medical emergency'],
    selfCare: ['Do not attempt home treatment — this requires urgent medical evaluation', 'Avoid eating or drinking until a doctor evaluates you', 'Do not apply heat to the abdomen'],
    recommendedDoctor: 'Emergency / General Surgeon',
    urgency: 'HIGH',
    warningSigns: ['Severe pain in the lower right abdomen that worsens with movement', 'Fever with abdominal pain', 'Vomiting with abdominal pain', 'Rigid or tender abdomen', 'Pain that suddenly stops (may indicate rupture)'],
    followUpQuestions: ['Where exactly is the pain and has it moved?', 'Did the pain start near your navel?', 'Have you lost your appetite or felt nauseous?'],
  },
];

// Searchable symptom list (deduplicated, title-cased) used by the tag picker
export const SYMPTOM_TAG_LIST: string[] = Array.from(
  new Set(
    HEALTH_CONDITIONS.flatMap((c) => c.symptoms)
      .concat(COMMON_SYMPTOMS.map((s) => s.toLowerCase()))
  )
)
  .map((s) => s.replace(/\b\w/g, (c) => c.toUpperCase()))
  .sort();

// Emergency warning signs that should always trigger an emergency alert,
// regardless of the matched conditions or computed risk.
export const EMERGENCY_WARNING_SIGNS: { pattern: RegExp; label: string }[] = [
  { pattern: /severe chest pain|crushing chest|chest pressure with (pain|arm|jaw)/i, label: 'Severe chest pain' },
  { pattern: /serious difficulty breathing|cannot breathe|unable to breathe/i, label: 'Serious difficulty breathing' },
  { pattern: /stroke|face drooping|arm weakness|slurred speech|sudden weakness on one side/i, label: 'Stroke warning signs (FAST)' },
  { pattern: /loss of consciousness|fainted|unconscious/i, label: 'Loss of consciousness' },
  { pattern: /severe bleeding|heavy bleeding|uncontrolled bleeding/i, label: 'Severe bleeding' },
  { pattern: /suicidal|self.?harm|harm myself/i, label: 'Self-harm risk' },
];

export interface SymptomCheckInput {
  ageGroup: 'child' | 'teen' | 'adult' | 'senior' | '';
  symptoms: string[];
  customSymptoms: string;
  duration: 'less-than-24h' | '1-3-days' | '4-7-days' | 'more-than-7-days' | '';
  severity: 'mild' | 'moderate' | 'severe' | '';
  medicalHistory: string;
  temperature: string;
  bloodPressure: string;
  bloodGlucose: string;
}

export interface SymptomMatch {
  condition: HealthCondition;
  matchCount: number;
  matchScore: number;
  matchedSymptoms: string[];
}

export interface SymptomCheckResult {
  summary: string;
  matches: SymptomMatch[];
  emergency: boolean;
  emergencyReasons: string[];
  urgency: UrgencyLevel;
  warningSigns: string[];
  followUpQuestions: string[];
  nextSteps: string[];
  selfCare: string[];
  recommendedDoctor: string;
  analysisNotes: string;
}

function normalizeSymptom(s: string): string {
  return s.toLowerCase().trim();
}

export function analyzeSymptomCheck(input: SymptomCheckInput): SymptomCheckResult {
  const allSymptoms = [
    ...input.symptoms.map(normalizeSymptom),
    ...input.customSymptoms
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map(normalizeSymptom),
  ];

  const matches: SymptomMatch[] = HEALTH_CONDITIONS.map((condition) => {
    const conditionSymptoms = condition.symptoms.map(normalizeSymptom);
    const matchedSymptoms = conditionSymptoms.filter((cs) =>
      allSymptoms.some(
        (us) => us.includes(cs) || cs.includes(us)
      )
    );
    const matchCount = matchedSymptoms.length;
    const matchScore = conditionSymptoms.length
      ? matchCount / conditionSymptoms.length
      : 0;
    return { condition, matchCount, matchScore, matchedSymptoms };
  })
    .filter((m) => m.matchCount > 0)
    .sort((a, b) => b.matchScore - a.matchScore || b.matchCount - a.matchCount)
    .slice(0, 5);

  // Emergency detection from explicit warning signs in the reported symptoms
  const emergencyReasons: string[] = [];
  for (const warning of EMERGENCY_WARNING_SIGNS) {
    const textBlob = allSymptoms.join(' ');
    if (warning.pattern.test(textBlob)) emergencyReasons.push(warning.label);
  }
  // A severe symptom with relevant emergency condition also triggers
  const topCondition = matches[0]?.condition;
  if (topCondition?.urgency === 'EMERGENCY' && !emergencyReasons.length) {
    emergencyReasons.push(`Possible ${topCondition.name} — emergency assessment advised`);
  }
  const hasEmergencyCondition = matches.some((m) => m.condition.urgency === 'EMERGENCY');
  // Severe severity with certain high-urgency matches can also elevate
  if (input.severity === 'severe' && (topCondition?.urgency === 'HIGH' || hasEmergencyCondition) && !emergencyReasons.length) {
    emergencyReasons.push('Severe symptoms reported with a high-urgency possible condition');
  }

  const emergency = emergencyReasons.length > 0;

  // Urgency level: emergency overrides; otherwise use the top match,
  // but never let a low matchScore override an emergency warning sign.
  let urgency: UrgencyLevel = 'LOW';
  if (emergency) {
    urgency = 'EMERGENCY';
  } else if (topCondition) {
    // Use the most urgent condition in the matched set
    const urgencyOrder: Record<UrgencyLevel, number> = { LOW: 1, MODERATE: 2, HIGH: 3, EMERGENCY: 4 };
    const topUrgency = matches
      .map((m) => m.condition.urgency)
      .reduce((acc, u) => (urgencyOrder[u] > urgencyOrder[acc] ? u : acc), 'LOW' as UrgencyLevel);
    urgency = topUrgency;
  }
  // Duration and severity can raise urgency one level if relevant
  if (!emergency && input.severity === 'severe' && urgency === 'LOW') urgency = 'MODERATE';
  if (!emergency && input.duration === 'more-than-7-days' && urgency === 'LOW') urgency = 'MODERATE';

  const summary = `You reported ${allSymptoms.length} symptom${allSymptoms.length === 1 ? '' : 's'}${
    input.duration ? `, lasting ${durationLabel(input.duration)}` : ''
  }${input.severity ? `, with ${input.severity} severity` : ''}${
    input.ageGroup ? `, in the ${ageGroupLabel(input.ageGroup)} age group` : ''
  }. This analysis is based on a transparent symptom-condition reference database and is not a diagnosis.`;

  // Aggregate warning signs, follow-ups, next steps, self-care from top matches
  const warningSigns = Array.from(new Set(matches.flatMap((m) => m.condition.warningSigns))).slice(0, 8);
  const followUpQuestions = Array.from(new Set(matches.flatMap((m) => m.condition.followUpQuestions))).slice(0, 5);
  const nextSteps = Array.from(new Set(matches.flatMap((m) => m.condition.nextSteps))).slice(0, 6);
  const selfCare = Array.from(new Set(matches.flatMap((m) => m.condition.selfCare))).slice(0, 6);
  const recommendedDoctor = topCondition?.recommendedDoctor ?? 'General Physician';

  const analysisNotes =
    'All conditions listed are possible explanations based on symptom overlap, not confirmed diagnoses. ' +
    'Symptoms can have many causes. A qualified healthcare professional should make any diagnosis. ' +
    (emergency
      ? 'Because emergency warning signs were detected, they take priority and should not be overridden by any lower risk assessment.'
      : 'No emergency warning signs were detected in your reported symptoms, but seek emergency care immediately if you develop any.');

  return {
    summary,
    matches,
    emergency,
    emergencyReasons,
    urgency,
    warningSigns,
    followUpQuestions,
    nextSteps,
    selfCare,
    recommendedDoctor,
    analysisNotes,
  };
}

export function durationLabel(d: SymptomCheckInput['duration']): string {
  switch (d) {
    case 'less-than-24h': return 'less than 24 hours';
    case '1-3-days': return '1 to 3 days';
    case '4-7-days': return '4 to 7 days';
    case 'more-than-7-days': return 'more than 7 days';
    default: return 'an unspecified duration';
  }
}

export function ageGroupLabel(a: SymptomCheckInput['ageGroup']): string {
  switch (a) {
    case 'child': return 'child (0-12)';
    case 'teen': return 'teen (13-19)';
    case 'adult': return 'adult (20-59)';
    case 'senior': return 'senior (60+)';
    default: return 'unspecified age';
  }
}

export const MEDICAL_DISCLAIMER =
  'MediSense AI provides preliminary health information for educational purposes only. It does not diagnose diseases or replace professional medical advice. Symptoms can have many causes. Seek advice from a qualified healthcare professional. For life-threatening symptoms, contact emergency services immediately.';
