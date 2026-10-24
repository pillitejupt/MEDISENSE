import { useMemo, useState } from 'react';
import {
  Search, Plus, X, ChevronRight, AlertTriangle, Activity, Pill,
  Stethoscope, Lightbulb, CheckCircle2, RotateCcw, Sparkles, ShieldAlert,
  Phone, ClipboardList, HeartPulse, Thermometer, Droplet, Clock, User,
  ArrowRight, Info,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { supabase } from '@/lib/supabase';
import { Card, Button, Badge, Spinner } from '@/components/ui';
import {
  HEALTH_CONDITIONS, SYMPTOM_TAG_LIST, analyzeSymptomCheck, MEDICAL_DISCLAIMER,
  durationLabel, ageGroupLabel,
  type SymptomCheckInput, type SymptomCheckResult, type UrgencyLevel,
} from '@/lib/medical';
import { cn } from '@/lib/utils';

const URGENCY_CONFIG: Record<UrgencyLevel, { color: string; bg: string; border: string; label: string; description: string }> = {
  LOW: {
    color: 'text-accent-700 dark:text-accent-300',
    bg: 'bg-accent-50 dark:bg-accent-900/20',
    border: 'border-accent-200 dark:border-accent-900/40',
    label: 'LOW',
    description: 'Mild symptoms without warning signs. General self-care and monitoring are appropriate.',
  },
  MODERATE: {
    color: 'text-warning-700 dark:text-warning-300',
    bg: 'bg-warning-50 dark:bg-warning-900/20',
    border: 'border-warning-200 dark:border-warning-900/40',
    label: 'MODERATE',
    description: 'Persistent or worsening symptoms that need medical advice from a healthcare professional.',
  },
  HIGH: {
    color: 'text-orange-700 dark:text-orange-300',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-200 dark:border-orange-900/40',
    label: 'HIGH',
    description: 'Symptoms requiring urgent, same-day medical assessment. Contact a doctor today.',
  },
  EMERGENCY: {
    color: 'text-error-700 dark:text-error-300',
    bg: 'bg-error-50 dark:bg-error-900/20',
    border: 'border-error-200 dark:border-error-900/40',
    label: 'EMERGENCY',
    description: 'Possible life-threatening symptoms. Call emergency services immediately.',
  },
};

const EMPTY_INPUT: SymptomCheckInput = {
  ageGroup: '',
  symptoms: [],
  customSymptoms: '',
  duration: '',
  severity: '',
  medicalHistory: '',
  temperature: '',
  bloodPressure: '',
  bloodGlucose: '',
};

export function Symptoms() {
  const { session } = useApp();
  const [input, setInput] = useState<SymptomCheckInput>(EMPTY_INPUT);
  const [search, setSearch] = useState('');
  const [phase, setPhase] = useState<'form' | 'analyzing' | 'results'>('form');
  const [error, setError] = useState('');
  const [result, setResult] = useState<SymptomCheckResult | null>(null);

  const filteredTags = useMemo(
    () => SYMPTOM_TAG_LIST.filter((s) => s.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const filteredConditions = useMemo(
    () => HEALTH_CONDITIONS.filter((c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symptoms.some((s) => s.toLowerCase().includes(search.toLowerCase()))
    ),
    [search]
  );

  const toggleTag = (tag: string) => {
    setError('');
    setInput((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(tag)
        ? prev.symptoms.filter((s) => s !== tag)
        : [...prev.symptoms, tag],
    }));
  };

  const update = <K extends keyof SymptomCheckInput>(key: K, value: SymptomCheckInput[K]) => {
    setError('');
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  const validate = (): string | null => {
    const hasSymptoms = input.symptoms.length > 0 || input.customSymptoms.trim().length > 0;
    if (!hasSymptoms) return 'Please select at least one symptom or type your symptoms.';
    if (!input.severity) return 'Please select a symptom severity.';
    if (!input.duration) return 'Please select how long your symptoms have lasted.';
    return null;
  };

  const runAnalysis = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setPhase('analyzing');
    setError('');
    await new Promise((r) => setTimeout(r, 1800));
    const analysis = analyzeSymptomCheck(input);
    setResult(analysis);
    setPhase('results');

    if (session) {
      await supabase.from('symptom_analyses').insert({
        user_id: session.user.id,
        symptoms: [...input.symptoms, ...input.customSymptoms.split(/[,\n]/).map((s) => s.trim()).filter(Boolean)],
        follow_up_answers: {
          ageGroup: input.ageGroup,
          duration: input.duration,
          severity: input.severity,
          medicalHistory: input.medicalHistory,
          temperature: input.temperature,
          bloodPressure: input.bloodPressure,
          bloodGlucose: input.bloodGlucose,
        },
        predicted_diseases: analysis.matches.map((m) => ({
          name: m.condition.name,
          matchScore: Math.round(m.matchScore * 100),
          matchedSymptoms: m.matchedSymptoms,
        })),
        risk_level: analysis.urgency,
        severity: input.severity,
        recommendations: analysis.nextSteps,
      });
    }
  };

  const reset = () => {
    setInput(EMPTY_INPUT);
    setSearch('');
    setResult(null);
    setError('');
    setPhase('form');
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Badge variant="primary" className="mb-2"><Sparkles className="h-3 w-3" /> AI Symptom Analysis</Badge>
          <h1 className="text-2xl font-bold font-display text-ink sm:text-3xl">Symptom Checker</h1>
          <p className="mt-2 text-sm text-muted">
            Select your symptoms, add details like duration and severity, and get a structured, transparent health analysis.
          </p>
        </div>

        {/* Medical disclaimer banner */}
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-warning-200/60 bg-warning-50/60 p-4 dark:border-warning-900/30 dark:bg-warning-900/10">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-warning-600" />
          <p className="text-xs leading-relaxed text-warning-800 dark:text-warning-200">{MEDICAL_DISCLAIMER}</p>
        </div>

        {phase === 'form' && (
          <FormView
            input={input}
            update={update}
            toggleTag={toggleTag}
            search={search}
            setSearch={setSearch}
            filteredTags={filteredTags}
            filteredConditions={filteredConditions}
            error={error}
            onAnalyze={runAnalysis}
          />
        )}

        {phase === 'analyzing' && (
          <Card className="p-12 animate-fade-in-up">
            <div className="flex flex-col items-center gap-4 text-center">
              <Spinner className="h-12 w-12" />
              <div>
                <p className="font-bold text-ink">Analyzing your symptoms...</p>
                <p className="mt-1 text-sm text-muted">
                  Matching against {HEALTH_CONDITIONS.length} condition patterns
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-muted">
                {['Symptom matching', 'Urgency scoring', 'Emergency check', 'Generating recommendations'].map((s, i) => (
                  <span key={s} className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse" style={{ animationDelay: `${i * 0.25}s` }} /> {s}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        )}

        {phase === 'results' && result && (
          <ResultsView result={result} onReset={reset} />
        )}
      </div>
    </div>
  );
}

// ── Form ──────────────────────────────────────────────────────────────────────
function FormView({
  input, update, toggleTag, search, setSearch, filteredTags, filteredConditions, error, onAnalyze,
}: {
  input: SymptomCheckInput;
  update: <K extends keyof SymptomCheckInput>(key: K, value: SymptomCheckInput[K]) => void;
  toggleTag: (tag: string) => void;
  search: string;
  setSearch: (v: string) => void;
  filteredTags: string[];
  filteredConditions: typeof HEALTH_CONDITIONS;
  error: string;
  onAnalyze: () => void;
}) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-error-200 bg-error-50 p-4 dark:border-error-900/40 dark:bg-error-900/20">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-error-600" />
          <p className="text-sm text-error-800 dark:text-error-200">{error}</p>
        </div>
      )}

      {/* 1. Symptom selection */}
      <Card className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary-600" />
          <h3 className="font-bold font-display text-ink">Select your symptoms</h3>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search symptoms or health conditions..."
            className="w-full rounded-xl border border-line bg-surface py-3 pl-10 pr-4 text-sm text-ink placeholder:text-muted focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
          />
        </div>

        {input.symptoms.length > 0 && (
          <div className="mb-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Selected ({input.symptoms.length})</p>
            <div className="flex flex-wrap gap-2">
              {input.symptoms.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleTag(s)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-primary-700"
                >
                  {s} <X className="h-3 w-3" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {filteredTags.slice(0, 48).map((tag) => {
            const isSelected = input.symptoms.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={cn(
                  'flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-medium transition-all',
                  isSelected
                    ? 'border-primary-400 bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                    : 'border-line bg-surface text-ink hover:border-primary-300 hover:bg-primary-50/50 dark:hover:bg-primary-900/20'
                )}
              >
                <span className="truncate">{tag}</span>
                {isSelected ? <CheckCircle2 className="h-4 w-4 flex-shrink-0" /> : <Plus className="h-4 w-4 flex-shrink-0 text-muted" />}
              </button>
            );
          })}
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted">
            Or type your symptoms (comma-separated)
          </label>
          <textarea
            value={input.customSymptoms}
            onChange={(e) => update('customSymptoms', e.target.value)}
            placeholder="e.g. lower right abdominal pain, nausea, loss of appetite"
            rows={2}
            className="w-full resize-none rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
          />
        </div>

        {/* Searchable health conditions */}
        <div className="mt-6 border-t border-line/60 pt-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">Browse health conditions</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {filteredConditions.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => c.symptoms.slice(0, 3).forEach((s) => {
                  const title = s.replace(/\b\w/g, (ch) => ch.toUpperCase());
                  if (!input.symptoms.includes(title)) toggleTag(title);
                })}
                className="flex items-start justify-between gap-2 rounded-xl border border-line bg-surface p-3 text-left transition-all hover:border-primary-300 hover:bg-primary-50/50 dark:hover:bg-primary-900/20"
              >
                <div>
                  <p className="text-sm font-semibold text-ink">{c.name}</p>
                  <p className="mt-0.5 text-xs text-muted">{c.category} · {c.symptoms.length} symptoms</p>
                </div>
                <Plus className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted" />
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* 2. Age group */}
      <Card className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-secondary-600" />
          <h3 className="font-bold font-display text-ink">Age group</h3>
          <span className="text-xs text-muted">(optional but helps tailor advice)</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {([
            { v: 'child', label: 'Child (0-12)' },
            { v: 'teen', label: 'Teen (13-19)' },
            { v: 'adult', label: 'Adult (20-59)' },
            { v: 'senior', label: 'Senior (60+)' },
          ] as const).map((opt) => (
            <button
              key={opt.v}
              type="button"
              onClick={() => update('ageGroup', opt.v)}
              className={cn(
                'rounded-xl border px-4 py-2.5 text-sm font-medium transition-all',
                input.ageGroup === opt.v
                  ? 'border-secondary-400 bg-secondary-50 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300'
                  : 'border-line bg-surface text-ink hover:border-secondary-300 hover:bg-secondary-50/50 dark:hover:bg-secondary-900/20'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Card>

      {/* 3. Duration and severity */}
      <Card className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-accent-600" />
          <h3 className="font-bold font-display text-ink">Duration & severity</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted">How long have you had these symptoms? *</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {([
                { v: 'less-than-24h', label: 'Less than 24h' },
                { v: '1-3-days', label: '1-3 days' },
                { v: '4-7-days', label: '4-7 days' },
                { v: 'more-than-7-days', label: 'More than 7 days' },
              ] as const).map((opt) => (
                <button
                  key={opt.v}
                  type="button"
                  onClick={() => update('duration', opt.v)}
                  className={cn(
                    'rounded-xl border px-3 py-2.5 text-sm font-medium transition-all',
                    input.duration === opt.v
                      ? 'border-accent-400 bg-accent-50 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300'
                      : 'border-line bg-surface text-ink hover:border-accent-300 hover:bg-accent-50/50 dark:hover:bg-accent-900/20'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted">Severity *</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { v: 'mild', label: 'Mild' },
                { v: 'moderate', label: 'Moderate' },
                { v: 'severe', label: 'Severe' },
              ] as const).map((opt) => (
                <button
                  key={opt.v}
                  type="button"
                  onClick={() => update('severity', opt.v)}
                  className={cn(
                    'rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all',
                    input.severity === opt.v
                      ? opt.v === 'severe'
                        ? 'border-error-400 bg-error-50 text-error-700 dark:bg-error-900/30 dark:text-error-300'
                        : opt.v === 'moderate'
                          ? 'border-warning-400 bg-warning-50 text-warning-700 dark:bg-warning-900/30 dark:text-warning-300'
                          : 'border-accent-400 bg-accent-50 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300'
                      : 'border-line bg-surface text-ink hover:border-primary-300 hover:bg-primary-50/50 dark:hover:bg-primary-900/20'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 4. Medical history */}
      <Card className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-primary-600" />
          <h3 className="font-bold font-display text-ink">Medical history & existing conditions</h3>
          <span className="text-xs text-muted">(optional)</span>
        </div>
        <textarea
          value={input.medicalHistory}
          onChange={(e) => update('medicalHistory', e.target.value)}
          placeholder="e.g. diabetes, hypertension, pregnancy, known allergies, current medications..."
          rows={3}
          className="w-full resize-none rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
        />
      </Card>

      {/* 5. Optional measurements */}
      <Card className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <HeartPulse className="h-5 w-5 text-error-600" />
          <h3 className="font-bold font-display text-ink">Measurements</h3>
          <span className="text-xs text-muted">(optional — only if measured)</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
              <Thermometer className="h-3.5 w-3.5" /> Temperature
            </label>
            <input
              type="text"
              value={input.temperature}
              onChange={(e) => update('temperature', e.target.value)}
              placeholder="e.g. 100.4°F"
              className="w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
            />
          </div>
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
              <HeartPulse className="h-3.5 w-3.5" /> Blood pressure
            </label>
            <input
              type="text"
              value={input.bloodPressure}
              onChange={(e) => update('bloodPressure', e.target.value)}
              placeholder="e.g. 130/85"
              className="w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
            />
          </div>
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
              <Droplet className="h-3.5 w-3.5" /> Blood glucose
            </label>
            <input
              type="text"
              value={input.bloodGlucose}
              onChange={(e) => update('bloodGlucose', e.target.value)}
              placeholder="e.g. 120 mg/dL"
              className="w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" onClick={onAnalyze}>
          Analyze Symptoms <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// ── Results ───────────────────────────────────────────────────────────────────
function ResultsView({ result, onReset }: { result: SymptomCheckResult; onReset: () => void }) {
  const urgency = URGENCY_CONFIG[result.urgency];

  return (
    <div className="space-y-5 animate-fade-in-up">
      {/* Emergency alert — always shown first if present */}
      {result.emergency && (
        <div className="overflow-hidden rounded-2xl border border-error-300 bg-gradient-to-br from-error-500 to-rose-600 text-white shadow-glow-red">
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-8 w-8 flex-shrink-0 animate-pulse" />
              <div>
                <p className="text-lg font-bold font-display">Emergency warning detected</p>
                <p className="text-sm text-white/90">
                  The following may require immediate emergency care. Call 112 (India) or your local emergency number now.
                </p>
              </div>
            </div>
            <ul className="mt-3 space-y-1.5">
              {result.emergencyReasons.map((reason) => (
                <li key={reason} className="flex items-start gap-2 text-sm">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" /> {reason}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="tel:112" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-error-700 transition-all hover:bg-white/90">
                <Phone className="h-4 w-4" /> Call 112 Now
              </a>
              <a href="tel:108" className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-5 py-2.5 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/25">
                <Phone className="h-4 w-4" /> Ambulance (108)
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      <Card className="p-6">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary-600" />
          <h3 className="font-bold font-display text-ink">Symptom Summary</h3>
        </div>
        <p className="text-sm leading-relaxed text-ink">{result.summary}</p>
      </Card>

      {/* Urgency level */}
      <Card className={cn('p-6', urgency.bg, urgency.border)}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Urgency Level</p>
            <p className={cn('mt-1 text-2xl font-bold font-display', urgency.color)}>{urgency.label}</p>
            <p className="mt-1 text-sm text-ink">{urgency.description}</p>
          </div>
          <div className={cn('flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl', urgency.bg)}>
            {result.urgency === 'EMERGENCY' ? <ShieldAlert className={cn('h-8 w-8', urgency.color)} />
              : result.urgency === 'HIGH' ? <AlertTriangle className={cn('h-8 w-8', urgency.color)} />
              : <Activity className={cn('h-8 w-8', urgency.color)} />}
          </div>
        </div>
      </Card>

      {/* Possible conditions */}
      <Card className="p-6">
        <div className="mb-1 flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-secondary-600" />
          <h3 className="font-bold font-display text-ink">Possible Health Conditions</h3>
        </div>
        <p className="mb-4 text-xs text-muted">Possible explanations, not confirmed diagnoses.</p>

        {result.matches.length === 0 ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-accent-500" />
            <p className="text-sm text-ink">No specific conditions matched your reported symptoms.</p>
            <p className="mt-1 text-xs text-muted">If you're concerned, please consult a doctor.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {result.matches.map((m, idx) => {
              const matchPct = Math.round(m.matchScore * 100);
              const condUrgency = URGENCY_CONFIG[m.condition.urgency];
              return (
                <div key={m.condition.name} className="rounded-xl border border-line bg-surface p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                          {idx + 1}
                        </span>
                        <p className="text-sm font-bold text-ink">{m.condition.name}</p>
                        <Badge variant={m.condition.urgency === 'EMERGENCY' ? 'error' : m.condition.urgency === 'HIGH' ? 'warning' : m.condition.urgency === 'MODERATE' ? 'warning' : 'success'}>
                          {condUrgency.label}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted">{m.condition.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-muted">Symptom overlap</p>
                      <p className="text-lg font-bold text-ink">{matchPct}%</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink">{m.condition.description}</p>
                  <div className="mt-2">
                    <p className="text-xs font-semibold text-muted">Matched symptoms: {m.matchedSymptoms.join(', ')}</p>
                  </div>
                  <p className="mt-2 text-xs italic text-muted">Why relevant: {m.condition.whyRelevant}</p>

                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      className={cn('h-full rounded-full transition-all duration-700',
                        matchPct >= 66 ? 'bg-error-500' : matchPct >= 33 ? 'bg-warning-500' : 'bg-accent-500')}
                      style={{ width: `${matchPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Warning signs */}
      {result.warningSigns.length > 0 && (
        <Card className="border-error-200/50 bg-error-50/40 p-6 dark:border-error-900/30 dark:bg-error-900/10">
          <div className="mb-3 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-error-600" />
            <h3 className="font-bold font-display text-ink">Warning Signs — Seek Immediate Attention If</h3>
          </div>
          <ul className="space-y-2">
            {result.warningSigns.map((w) => (
              <li key={w} className="flex items-start gap-2 text-sm text-ink">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-error-500" /> {w}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Next steps & self-care */}
      <div className="grid gap-5 sm:grid-cols-2">
        {result.nextSteps.length > 0 && (
          <Card className="p-5">
            <h4 className="mb-3 flex items-center gap-2 font-bold font-display text-ink">
              <ArrowRight className="h-4 w-4 text-primary-500" /> Recommended Next Steps
            </h4>
            <ul className="space-y-2">
              {result.nextSteps.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-ink">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-500" /> {s}
                </li>
              ))}
            </ul>
          </Card>
        )}
        {result.selfCare.length > 0 && (
          <Card className="p-5">
            <h4 className="mb-3 flex items-center gap-2 font-bold font-display text-ink">
              <Lightbulb className="h-4 w-4 text-warning-500" /> General Self-Care Guidance
            </h4>
            <ul className="space-y-2">
              {result.selfCare.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-ink">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-500" /> {s}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-warning-600">
              This is general guidance only and does not account for pregnancy, allergies, or your full medical history. Do not stop prescribed medication without consulting your doctor.
            </p>
          </Card>
        )}
      </div>

      {/* Recommended doctor */}
      <Card className="flex items-center gap-3 bg-primary-50/50 p-4 dark:bg-primary-900/20">
        <Stethoscope className="h-8 w-8 flex-shrink-0 text-primary-600" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-ink">Recommended Doctor</p>
          <p className="text-sm text-muted">{result.recommendedDoctor}</p>
        </div>
      </Card>

      {/* Follow-up questions */}
      {result.followUpQuestions.length > 0 && (
        <Card className="p-6">
          <div className="mb-3 flex items-center gap-2">
            <Info className="h-5 w-5 text-secondary-600" />
            <h3 className="font-bold font-display text-ink">Follow-up Questions to Clarify</h3>
          </div>
          <p className="mb-3 text-xs text-muted">Consider these to better understand your symptoms or discuss with a doctor:</p>
          <ul className="space-y-2">
            {result.followUpQuestions.map((q) => (
              <li key={q} className="flex items-start gap-2 text-sm text-ink">
                <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary-500" /> {q}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Analysis notes */}
      <Card className="p-5">
        <div className="mb-2 flex items-center gap-2">
          <Pill className="h-4 w-4 text-primary-500" />
          <h4 className="text-sm font-bold font-display text-ink">Analysis Notes</h4>
        </div>
        <p className="text-xs leading-relaxed text-muted">{result.analysisNotes}</p>
      </Card>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 rounded-xl border border-warning-200/50 bg-warning-50/50 p-4 dark:border-warning-900/30 dark:bg-warning-900/10">
        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-warning-600" />
        <p className="text-xs leading-relaxed text-warning-800 dark:text-warning-200">{MEDICAL_DISCLAIMER}</p>
      </div>

      <div className="flex justify-center">
        <Button size="lg" variant="outline" onClick={onReset}>
          <RotateCcw className="h-4 w-4" /> Start Again
        </Button>
      </div>
    </div>
  );
}
