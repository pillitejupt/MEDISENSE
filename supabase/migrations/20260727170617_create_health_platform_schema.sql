/*
# MediSense AI — Core Healthcare Platform Schema

## Overview
Creates the data model for a multi-user AI healthcare platform. Each user owns
their medical data (analyses, records, appointments, metrics, reminders).
All tables are owner-scoped via `user_id` with RLS enforcing `auth.uid()`.

## New Tables
1. `profiles` — extends auth.users with health-relevant fields (full name, age,
   gender, preferred language, theme, base vitals used for health score).
2. `health_metrics` — time-series vitals: BMI, heart rate, blood pressure,
   blood sugar, sleep hours, water intake, steps, calories. One row per entry.
3. `symptom_analyses` — records of symptom-checker / disease-prediction runs
   (input symptoms, predicted diseases, risk, severity, recommendations).
4. `camera_analyses` — records of camera/upload skin analysis runs (image url,
   detected condition, confidence, severity, causes, measures).
5. `medical_records` — metadata for uploaded reports / prescriptions / scans,
   plus an AI-generated plain-language summary.
6. `appointments` — doctor booking requests (doctor name, specialty, type,
   scheduled time, status).
7. `reminders` — medicine / appointment / health-check reminders.
8. `chat_messages` — AI chatbot conversation history (role + content).

## Security
- RLS enabled on every table.
- Owner-scoped CRUD policies (select/insert/update/delete) scoped to
  `auth.uid() = user_id` for authenticated users.
- `user_id` defaults to `auth.uid()` so client inserts that omit it succeed.

## Notes
1. All owner columns are `user_id uuid NOT NULL DEFAULT auth.uid()`.
2. Foreign keys reference `auth.users(id)` with `ON DELETE CASCADE` so deleting
   a user removes their health data.
3. `created_at` defaults to `now()` on every table.
*/

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  age int,
  gender text,
  phone text,
  preferred_language text DEFAULT 'en',
  theme text DEFAULT 'light',
  height_cm numeric,
  weight_kg numeric,
  blood_group text,
  allergies text,
  medical_history text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);
DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);
DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
DROP POLICY IF EXISTS "delete_own_profile" ON profiles;
CREATE POLICY "delete_own_profile" ON profiles FOR DELETE
  TO authenticated USING (auth.uid() = id);

-- 2. HEALTH METRICS
CREATE TABLE IF NOT EXISTS health_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  metric_type text NOT NULL,
  value numeric NOT NULL,
  unit text,
  recorded_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);
ALTER TABLE health_metrics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_metrics" ON health_metrics;
CREATE POLICY "select_own_metrics" ON health_metrics FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_metrics" ON health_metrics;
CREATE POLICY "insert_own_metrics" ON health_metrics FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_metrics" ON health_metrics;
CREATE POLICY "update_own_metrics" ON health_metrics FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_metrics" ON health_metrics;
CREATE POLICY "delete_own_metrics" ON health_metrics FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- 3. SYMPTOM ANALYSES
CREATE TABLE IF NOT EXISTS symptom_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  symptoms text[] NOT NULL,
  follow_up_answers jsonb,
  predicted_diseases jsonb,
  risk_level text,
  severity text,
  recommendations jsonb,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE symptom_analyses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_symptom" ON symptom_analyses;
CREATE POLICY "select_own_symptom" ON symptom_analyses FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_symptom" ON symptom_analyses;
CREATE POLICY "insert_own_symptom" ON symptom_analyses FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_symptom" ON symptom_analyses;
CREATE POLICY "update_own_symptom" ON symptom_analyses FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_symptom" ON symptom_analyses;
CREATE POLICY "delete_own_symptom" ON symptom_analyses FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- 4. CAMERA ANALYSES
CREATE TABLE IF NOT EXISTS camera_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url text,
  detected_condition text,
  confidence numeric,
  severity text,
  causes text[],
  measures text[],
  recommended_doctor text,
  suggested_medicines jsonb,
  emergency boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE camera_analyses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_camera" ON camera_analyses;
CREATE POLICY "select_own_camera" ON camera_analyses FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_camera" ON camera_analyses;
CREATE POLICY "insert_own_camera" ON camera_analyses FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_camera" ON camera_analyses;
CREATE POLICY "update_own_camera" ON camera_analyses FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_camera" ON camera_analyses;
CREATE POLICY "delete_own_camera" ON camera_analyses FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- 5. MEDICAL RECORDS
CREATE TABLE IF NOT EXISTS medical_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  record_type text,
  file_url text,
  ai_summary text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_records" ON medical_records;
CREATE POLICY "select_own_records" ON medical_records FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_records" ON medical_records;
CREATE POLICY "insert_own_records" ON medical_records FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_records" ON medical_records;
CREATE POLICY "update_own_records" ON medical_records FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_records" ON medical_records;
CREATE POLICY "delete_own_records" ON medical_records FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- 6. APPOINTMENTS
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  doctor_name text NOT NULL,
  specialty text,
  consultation_type text,
  scheduled_at timestamptz,
  status text DEFAULT 'upcoming',
  notes text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_appointments" ON appointments;
CREATE POLICY "select_own_appointments" ON appointments FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_appointments" ON appointments;
CREATE POLICY "insert_own_appointments" ON appointments FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_appointments" ON appointments;
CREATE POLICY "update_own_appointments" ON appointments FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_appointments" ON appointments;
CREATE POLICY "delete_own_appointments" ON appointments FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- 7. REMINDERS
CREATE TABLE IF NOT EXISTS reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  time timestamptz,
  frequency text,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_reminders" ON reminders;
CREATE POLICY "select_own_reminders" ON reminders FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_reminders" ON reminders;
CREATE POLICY "insert_own_reminders" ON reminders FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_reminders" ON reminders;
CREATE POLICY "update_own_reminders" ON reminders FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_reminders" ON reminders;
CREATE POLICY "delete_own_reminders" ON reminders FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- 8. CHAT MESSAGES
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL,
  content text NOT NULL,
  language text DEFAULT 'en',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_chat" ON chat_messages;
CREATE POLICY "select_own_chat" ON chat_messages FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_chat" ON chat_messages;
CREATE POLICY "insert_own_chat" ON chat_messages FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_chat" ON chat_messages;
CREATE POLICY "delete_own_chat" ON chat_messages FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_health_metrics_user ON health_metrics(user_id, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_symptom_analyses_user ON symptom_analyses(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_camera_analyses_user ON camera_analyses(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_medical_records_user ON medical_records(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_user ON appointments(user_id, scheduled_at);
CREATE INDEX IF NOT EXISTS idx_reminders_user ON reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user ON chat_messages(user_id, created_at);

-- Auto-create a profile row when a new auth user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
