export type Language = 'en' | 'hi' | 'te' | 'ta' | 'kn' | 'ml' | 'mr' | 'bn' | 'gu' | 'pa' | 'or' | 'ur';

export type Theme = 'light' | 'dark';

export type Page =
  | 'home'
  | 'auth'
  | 'dashboard'
  | 'chatbot'
  | 'camera'
  | 'symptoms'
  | 'prediction'
  | 'medicines'
  | 'doctors'
  | 'records'
  | 'emergency'
  | 'wellness';

export interface Profile {
  id: string;
  full_name: string | null;
  age: number | null;
  gender: string | null;
  phone: string | null;
  preferred_language: Language;
  theme: Theme;
  height_cm: number | null;
  weight_kg: number | null;
  blood_group: string | null;
  allergies: string | null;
  medical_history: string | null;
}

export interface HealthMetric {
  id: string;
  user_id: string;
  metric_type: string;
  value: number;
  unit: string | null;
  recorded_at: string;
}

export interface SymptomAnalysis {
  id: string;
  user_id: string;
  symptoms: string[];
  follow_up_answers: Record<string, string> | null;
  predicted_diseases: PredictedDisease[] | null;
  risk_level: string | null;
  severity: string | null;
  recommendations: string[] | null;
  created_at: string;
}

export interface PredictedDisease {
  name: string;
  probability: number;
  description: string;
}

export interface CameraAnalysis {
  id: string;
  user_id: string;
  image_url: string | null;
  detected_condition: string | null;
  confidence: number | null;
  severity: string | null;
  causes: string[] | null;
  measures: string[] | null;
  recommended_doctor: string | null;
  suggested_medicines: Medicine[] | null;
  emergency: boolean;
  created_at: string;
}

export interface Medicine {
  name: string;
  purpose: string;
  dosage: string;
  howToTake: string;
  sideEffects: string[];
  precautions: string[];
  alternatives: string[];
  priceEstimate: string;
  availability: string;
}

export interface MedicalRecord {
  id: string;
  user_id: string;
  title: string;
  record_type: string | null;
  file_url: string | null;
  ai_summary: string | null;
  created_at: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  doctor_name: string;
  specialty: string | null;
  consultation_type: string | null;
  scheduled_at: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

export interface Reminder {
  id: string;
  user_id: string;
  type: string;
  title: string;
  time: string | null;
  frequency: string | null;
  completed: boolean;
}

export interface ChatMessage {
  id?: string;
  user_id?: string;
  role: 'user' | 'assistant';
  content: string;
  language?: Language;
  created_at?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  qualification: string;
  languages: string[];
  rating: number;
  reviews: number;
  fee: number;
  nextAvailable: string;
  mode: ('video' | 'chat' | 'in-person')[];
  image: string;
  hospital: string;
}
