import { useState } from 'react';
import {
  Brain, TrendingUp, AlertTriangle, Activity, HeartPulse,
  RotateCcw, ChevronRight, Sparkles, Pill, FlaskConical,
  Lightbulb, CheckCircle2, Info,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, Button, Badge, RiskMeter, Spinner } from '@/components/ui';
import { predictDiseases, type PredictionInput } from '@/lib/medical';
import { cn } from '@/lib/utils';

export function Prediction() {
  const { session, navigate } = useApp();
  const [step, setStep] = useState<'input' | 'results'>('input');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<ReturnType<typeof predictDiseases> | null>(null);
  const [input, setInput] = useState<PredictionInput>({
    age: 30, bmi: 22, familyHistory: [], symptoms: [],
    lifestyle: { smoking: false, alcohol: false, exercise: 'moderate' },
  });

  const familyHistoryOptions = ['Diabetes', 'Heart Disease', 'Hypertension', 'Asthma', 'Thyroid', 'Kidney Disease'];
  const symptomsOptions = ['Fatigue', 'Excessive Thirst', 'Frequent Urination', 'Chest Pain', 'Headache', 'Shortness of Breath', 'Weight Change'];
  const bmiValue = input.bmi.toFixed(1);

  const toggleArrayItem = (arr: string[], item: string): string[] =>
    arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

  const runPrediction = async () => {
    setStep('results');
    setAnalyzing(true);
    await new Promise((r) => setTimeout(r, 3000));
    const predictions = predictDiseases(input);
    setResults(predictions);
    setAnalyzing(false);
  };

  const reset = () => {
    setStep('input');
    setResults(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Badge variant="primary" className="mb-2"><Sparkles className="h-3 w-3" /> ML-Powered Risk Engine</Badge>
          <h1 className="text-2xl font-bold font-display text-ink sm:text-3xl">Disease Prediction Engine</h1>
          <p className="mt-2 text-sm text-muted">Assess your risk for 8+ chronic diseases using AI. Enter your health profile for a personalized risk assessment.</p>
        </div>

        {step === 'input' && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Basic info */}
            <Card className="p-6">
              <h3 className="mb-4 flex items-center gap-2 font-bold font-display text-ink"><Activity className="h-5 w-5 text-primary-500" /> Basic Information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-ink">Age: <span className="font-bold text-primary-600">{input.age} years</span></label>
                  <input type="range" min="18" max="90" value={input.age} onChange={(e) => setInput({ ...input, age: Number(e.target.value) })} className="w-full accent-primary-600" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-ink">BMI: <span className="font-bold text-primary-600">{bmiValue}</span></label>
                  <input type="range" min="15" max="40" step="0.5" value={input.bmi} onChange={(e) => setInput({ ...input, bmi: Number(e.target.value) })} className="w-full accent-primary-600" />
                  <p className={cn('mt-1 text-xs', input.bmi < 18.5 ? 'text-warning-600' : input.bmi < 25 ? 'text-accent-600' : input.bmi < 30 ? 'text-warning-600' : 'text-error-600')}>
                    {input.bmi < 18.5 ? 'Underweight' : input.bmi < 25 ? 'Normal weight' : input.bmi < 30 ? 'Overweight' : 'Obese'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Family history */}
            <Card className="p-6">
              <h3 className="mb-4 flex items-center gap-2 font-bold font-display text-ink"><HeartPulse className="h-5 w-5 text-error-500" /> Family History</h3>
              <p className="mb-3 text-sm text-muted">Select any conditions that run in your family:</p>
              <div className="flex flex-wrap gap-2">
                {familyHistoryOptions.map((item) => (
                  <button
                    key={item}
                    onClick={() => setInput({ ...input, familyHistory: toggleArrayItem(input.familyHistory, item) })}
                    className={cn(
                      'rounded-xl border px-4 py-2 text-sm font-medium transition-all',
                      input.familyHistory.includes(item)
                        ? 'border-error-400 bg-error-50 text-error-700 dark:bg-error-900/30 dark:text-error-300'
                        : 'border-line bg-surface text-ink hover:border-error-300'
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </Card>

            {/* Symptoms */}
            <Card className="p-6">
              <h3 className="mb-4 flex items-center gap-2 font-bold font-display text-ink"><AlertTriangle className="h-5 w-5 text-warning-500" /> Current Symptoms</h3>
              <p className="mb-3 text-sm text-muted">Select any symptoms you're currently experiencing:</p>
              <div className="flex flex-wrap gap-2">
                {symptomsOptions.map((item) => (
                  <button
                    key={item}
                    onClick={() => setInput({ ...input, symptoms: toggleArrayItem(input.symptoms, item) })}
                    className={cn(
                      'rounded-xl border px-4 py-2 text-sm font-medium transition-all',
                      input.symptoms.includes(item)
                        ? 'border-warning-400 bg-warning-50 text-warning-700 dark:bg-warning-900/30 dark:text-warning-300'
                        : 'border-line bg-surface text-ink hover:border-warning-300'
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </Card>

            {/* Lifestyle */}
            <Card className="p-6">
              <h3 className="mb-4 flex items-center gap-2 font-bold font-display text-ink"><TrendingUp className="h-5 w-5 text-accent-500" /> Lifestyle</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2 text-sm font-medium text-ink">Smoking</p>
                    <div className="flex gap-2">
                      {[
                        { val: false, label: 'No' },
                        { val: true, label: 'Yes' },
                      ].map((opt) => (
                        <button key={opt.label} onClick={() => setInput({ ...input, lifestyle: { ...input.lifestyle, smoking: opt.val } })}
                          className={cn('flex-1 rounded-xl border py-2 text-sm font-medium transition-all',
                            input.lifestyle.smoking === opt.val ? 'border-primary-400 bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'border-line text-muted')}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-ink">Alcohol</p>
                    <div className="flex gap-2">
                      {[
                        { val: false, label: 'No' },
                        { val: true, label: 'Yes' },
                      ].map((opt) => (
                        <button key={opt.label} onClick={() => setInput({ ...input, lifestyle: { ...input.lifestyle, alcohol: opt.val } })}
                          className={cn('flex-1 rounded-xl border py-2 text-sm font-medium transition-all',
                            input.lifestyle.alcohol === opt.val ? 'border-primary-400 bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'border-line text-muted')}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-ink">Exercise Frequency</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: 'none', label: 'Rarely' },
                      { val: 'moderate', label: 'Sometimes' },
                      { val: 'regular', label: 'Regular' },
                    ].map((opt) => (
                      <button key={opt.val} onClick={() => setInput({ ...input, lifestyle: { ...input.lifestyle, exercise: opt.val } })}
                        className={cn('rounded-xl border py-2 text-sm font-medium transition-all',
                          input.lifestyle.exercise === opt.val ? 'border-primary-400 bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'border-line text-muted')}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Button fullWidth size="lg" onClick={runPrediction}>
              <Brain className="h-5 w-5" /> Predict Disease Risk
            </Button>
          </div>
        )}

        {step === 'results' && (
          <div className="animate-fade-in-up">
            {analyzing ? (
              <Card className="p-12">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin" />
                    <Brain className="absolute inset-0 m-auto h-8 w-8 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-bold text-ink">Running ML prediction models...</p>
                    <p className="mt-1 text-sm text-muted">Analyzing 8 disease risk patterns based on your profile</p>
                  </div>
                  <div className="flex gap-2 text-xs text-muted">
                    {['Neural network', 'Risk scoring', 'Generating report'].map((s, i) => (
                      <span key={s} className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} /> {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ) : results ? (
              <div className="space-y-4">
                {/* Summary */}
                <Card className="overflow-hidden p-0">
                  <div className="bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 p-6 text-white animate-gradient">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Risk Assessment Summary</p>
                    <h3 className="mt-1 text-2xl font-bold font-display">Your Health Risk Profile</h3>
                    <p className="mt-2 text-sm text-white/90">Based on your inputs, here are the predicted risk levels for major diseases. Higher percentages indicate greater lifetime risk.</p>
                  </div>
                </Card>

                {/* Disease cards */}
                {results.map((disease, i) => (
                  <Card key={disease.name} hover className="p-6" >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold font-display text-ink">{disease.name}</h4>
                          <Badge variant={disease.riskLevel === 'High' ? 'error' : disease.riskLevel === 'Moderate' ? 'warning' : 'success'}>
                            {disease.riskLevel} Risk
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted">{disease.description}</p>
                      </div>
                      <div className="ml-4 text-right">
                        <p className={cn('text-2xl font-bold font-display', disease.probability >= 70 ? 'text-error-600' : disease.probability >= 40 ? 'text-warning-600' : 'text-accent-600')}>
                          {disease.probability}%
                        </p>
                        <p className="text-xs text-muted">risk score</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <RiskMeter value={disease.probability} />
                    </div>

                    {i < 3 && (
                      <div className="mt-4 grid gap-3 border-t border-line pt-4 sm:grid-cols-2">
                        <div>
                          <p className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-ink"><Lightbulb className="h-3 w-3 text-warning-500" /> Recommendation</p>
                          <p className="text-xs text-muted">{disease.recommendation}</p>
                        </div>
                        <div>
                          <p className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-ink"><Pill className="h-3 w-3 text-primary-500" /> Common Medications</p>
                          <p className="text-xs text-muted">{disease.medicines.join(', ')}</p>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}

                {/* Next steps */}
                <Card className="p-6">
                  <h4 className="mb-3 flex items-center gap-2 font-bold font-display text-ink"><Info className="h-4 w-4 text-primary-500" /> Recommended Next Steps</h4>
                  <div className="space-y-3">
                    {[
                      { icon: FlaskConical, text: 'Get a comprehensive health check-up including blood tests' },
                      { icon: HeartPulse, text: 'Discuss your risk profile with a general physician' },
                      { icon: CheckCircle2, text: 'Adopt the lifestyle recommendations for high-risk conditions' },
                      { icon: Activity, text: 'Monitor your health metrics regularly on your dashboard' },
                    ].map((step) => (
                      <div key={step.text} className="flex items-start gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/30">
                          <step.icon className="h-4 w-4" />
                        </div>
                        <p className="text-sm text-ink">{step.text}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="flex gap-3">
                  <Button fullWidth variant="outline" onClick={reset}><RotateCcw className="h-4 w-4" /> New Assessment</Button>
                  <Button fullWidth onClick={() => navigate('doctors')}><ChevronRight className="h-4 w-4" /> Consult a Doctor</Button>
                </div>
              </div>
            ) : null}
          </div>
        )}

        <div className="mt-6 flex items-start gap-2 rounded-xl border border-warning-200/50 bg-warning-50/50 p-4 dark:border-warning-900/30 dark:bg-warning-900/10">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-warning-600" />
          <p className="text-xs leading-relaxed text-warning-800 dark:text-warning-200">
            Disease prediction is for educational and screening purposes only. Risk scores are estimates based on statistical models and are not a medical diagnosis. Consult a healthcare professional for proper evaluation.
          </p>
        </div>
      </div>
    </div>
  );
}
