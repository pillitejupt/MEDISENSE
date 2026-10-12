import { useState } from 'react';
import {
  Stethoscope, Search, Plus, X, ChevronRight, AlertTriangle,
  Activity, Pill, FlaskConical, Stethoscope as Stetho, Lightbulb,
  CheckCircle2, RotateCcw, Sparkles, TrendingUp,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { supabase } from '@/lib/supabase';
import { Card, Button, Badge, RiskMeter, Spinner } from '@/components/ui';
import { COMMON_SYMPTOMS, FOLLOW_UP_QUESTIONS, analyzeSymptoms, type SymptomRule } from '@/lib/medical';
import { cn } from '@/lib/utils';

export function Symptoms() {
  const { session } = useApp();
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [phase, setPhase] = useState<'select' | 'followup' | 'results'>('select');
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<{ diseases: (SymptomRule & { probability: number })[]; riskLevel: string; severity: string; recommendations: string[] } | null>(null);

  const filteredSymptoms = COMMON_SYMPTOMS.filter((s) => s.toLowerCase().includes(search.toLowerCase()));

  const toggleSymptom = (symptom: string) => {
    setSelected((prev) => prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]);
  };

  // Gather relevant follow-up questions
  const relevantQuestions = selected.flatMap((symptom) => {
    const key = symptom.toLowerCase();
    const questions = FOLLOW_UP_QUESTIONS[key] || FOLLOW_UP_QUESTIONS[key.split(' ')[0]] || [];
    return questions.map((q) => ({ symptom, question: q }));
  }).slice(0, 5);

  const startAnalysis = () => {
    setPhase('followup');
    setCurrentQuestion(0);
    setFollowUpAnswers({});
  };

  const answerQuestion = (answer: string) => {
    const q = relevantQuestions[currentQuestion];
    if (!q) return;
    const key = `${q.symptom}_${currentQuestion}`;
    setFollowUpAnswers((prev) => ({ ...prev, [key]: answer }));
    if (currentQuestion < relevantQuestions.length - 1) {
      setCurrentQuestion((c) => c + 1);
    } else {
      runAnalysis();
    }
  };

  const runAnalysis = async () => {
    setAnalyzing(true);
    setPhase('results');
    await new Promise((r) => setTimeout(r, 2500));
    const analysis = analyzeSymptoms(selected, followUpAnswers);
    setResults(analysis);
    setAnalyzing(false);

    if (session) {
      await supabase.from('symptom_analyses').insert({
        user_id: session.user.id,
        symptoms: selected,
        follow_up_answers: followUpAnswers,
        predicted_diseases: analysis.diseases.map((d) => ({ name: d.disease, probability: d.probability, description: d.description })),
        risk_level: analysis.riskLevel,
        severity: analysis.severity,
        recommendations: analysis.recommendations,
      });
    }
  };

  const reset = () => {
    setSelected([]);
    setSearch('');
    setPhase('select');
    setFollowUpAnswers({});
    setCurrentQuestion(0);
    setResults(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Badge variant="primary" className="mb-2"><Sparkles className="h-3 w-3" /> AI Symptom Analysis</Badge>
          <h1 className="text-2xl font-bold font-display text-ink sm:text-3xl">Symptom Checker</h1>
          <p className="mt-2 text-sm text-muted">Select your symptoms, answer follow-up questions, and get AI-powered disease prediction with recommendations.</p>
        </div>

        {/* Progress steps */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {['Select Symptoms', 'Follow-up', 'Results'].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all',
                phase === ['select', 'followup', 'results'][i] ? 'bg-primary-600 text-white scale-110' :
                (phase === 'followup' && i === 0) || (phase === 'results' && i < 2) ? 'bg-accent-500 text-white' : 'bg-slate-200 text-muted dark:bg-slate-700'
              )}>
                {i + 1}
              </div>
              <span className={cn('hidden text-sm font-medium sm:block', phase === ['select', 'followup', 'results'][i] ? 'text-ink' : 'text-muted')}>{step}</span>
              {i < 2 && <ChevronRight className="h-4 w-4 text-muted" />}
            </div>
          ))}
        </div>

        {phase === 'select' && (
          <Card className="p-6 animate-fade-in-up">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search symptoms..."
                className="w-full rounded-xl border border-line bg-surface py-3 pl-10 pr-4 text-sm text-ink placeholder:text-muted focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
              />
            </div>

            {selected.length > 0 && (
              <div className="mb-6">
                <p className="mb-2 text-sm font-semibold text-ink">Selected ({selected.length}):</p>
                <div className="flex flex-wrap gap-2">
                  {selected.map((s) => (
                    <button key={s} onClick={() => toggleSymptom(s)} className="inline-flex items-center gap-1.5 rounded-full bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-primary-700">
                      {s} <X className="h-3 w-3" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {filteredSymptoms.map((symptom) => {
                const isSelected = selected.includes(symptom);
                return (
                  <button
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={cn(
                      'flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-medium transition-all',
                      isSelected
                        ? 'border-primary-400 bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                        : 'border-line bg-surface text-ink hover:border-primary-300 hover:bg-primary-50/50 dark:hover:bg-primary-900/20'
                    )}
                  >
                    <span className="truncate">{symptom}</span>
                    {isSelected ? <CheckCircle2 className="h-4 w-4 flex-shrink-0" /> : <Plus className="h-4 w-4 flex-shrink-0 text-muted" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted">{selected.length} symptom{selected.length !== 1 ? 's' : ''} selected</p>
              <Button onClick={startAnalysis} disabled={selected.length === 0}>
                Continue <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {phase === 'followup' && (
          <Card className="p-8 animate-fade-in-up">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-900/30">
                <Stethoscope className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold font-display text-ink">A few more questions</h3>
              <p className="text-sm text-muted">Question {currentQuestion + 1} of {relevantQuestions.length}</p>
            </div>

            <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div className="h-full rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 transition-all duration-500" style={{ width: `${((currentQuestion + 1) / relevantQuestions.length) * 100}%` }} />
            </div>

            <div className="mt-8">
              <p className="mb-4 text-center text-lg font-semibold text-ink">{relevantQuestions[currentQuestion]?.question}</p>
              <div className="mx-auto flex max-w-md flex-wrap justify-center gap-2">
                {['Yes', 'No', 'Not sure', 'Mild', 'Moderate', 'Severe'].map((ans) => (
                  <button
                    key={ans}
                    onClick={() => answerQuestion(ans)}
                    className="rounded-xl border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-all hover:border-primary-400 hover:bg-primary-50/50 hover:scale-105 dark:hover:bg-primary-900/20"
                  >
                    {ans}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        )}

        {phase === 'results' && (
          <div className="animate-fade-in-up">
            {analyzing ? (
              <Card className="p-12">
                <div className="flex flex-col items-center gap-4 text-center">
                  <Spinner className="h-12 w-12" />
                  <div>
                    <p className="font-bold text-ink">AI analyzing your symptoms...</p>
                    <p className="mt-1 text-sm text-muted">Running ML model across {SYMPTOM_RULES_COUNT} disease patterns</p>
                  </div>
                  <div className="flex gap-2 text-xs text-muted">
                    {['Pattern matching', 'Risk scoring', 'Generating recommendations'].map((s, i) => (
                      <span key={s} className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} /> {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ) : results ? (
              <ResultsView results={results} onReset={reset} />
            ) : null}
          </div>
        )}

        <div className="mt-6 flex items-start gap-2 rounded-xl border border-warning-200/50 bg-warning-50/50 p-4 dark:border-warning-900/30 dark:bg-warning-900/10">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-warning-600" />
          <p className="text-xs leading-relaxed text-warning-800 dark:text-warning-200">
            Symptom analysis is for educational purposes only and is not a medical diagnosis. AI predictions may be inaccurate. Always consult a licensed healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
}

const SYMPTOM_RULES_COUNT = 16;

function ResultsView({ results, onReset }: { results: { diseases: (SymptomRule & { probability: number })[]; riskLevel: string; severity: string; recommendations: string[] }; onReset: () => void }) {
  const topDisease = results.diseases[0];
  const severityColors = {
    low: 'text-accent-600', moderate: 'text-warning-600', high: 'text-error-600', critical: 'text-error-600',
  };

  if (results.diseases.length === 0) {
    return (
      <Card className="p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-accent-500" />
        <h3 className="text-lg font-bold font-display text-ink">No significant matches found</h3>
        <p className="mt-2 text-sm text-muted">Your symptoms don't strongly match any specific condition in our database. If you're concerned, please consult a doctor.</p>
        <Button className="mt-4" variant="outline" onClick={onReset}><RotateCcw className="h-4 w-4" /> Start Over</Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden p-0">
        <div className={cn('p-6 text-white', topDisease.severity === 'critical' ? 'bg-gradient-to-br from-error-500 to-rose-600' : topDisease.severity === 'high' ? 'bg-gradient-to-br from-warning-500 to-orange-600' : 'bg-gradient-to-br from-primary-600 to-secondary-600')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Primary Assessment</p>
              <h3 className="mt-1 text-xl font-bold font-display">{topDisease.disease}</h3>
            </div>
            <Badge className="bg-white/20 text-white border-0">{results.riskLevel} Risk</Badge>
          </div>
          <div className="mt-4">
            <RiskMeter value={topDisease.probability} />
          </div>
          {topDisease.emergency && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/15 p-3 backdrop-blur">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 animate-pulse" />
              <p className="text-sm font-semibold">Seek emergency medical care. Call 108 immediately.</p>
            </div>
          )}
        </div>
        <div className="p-6">
          <p className="text-sm leading-relaxed text-muted">{topDisease.description}</p>
        </div>
      </Card>

      {/* All matches */}
      {results.diseases.length > 1 && (
        <Card className="p-6">
          <h4 className="mb-3 text-sm font-bold font-display text-ink">Other Possible Conditions</h4>
          <div className="space-y-3">
            {results.diseases.slice(1).map((d) => (
              <div key={d.disease} className="flex items-center justify-between rounded-xl border border-line p-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{d.disease}</p>
                  <p className="text-xs text-muted">{d.severity} severity</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div className={cn('h-full rounded-full', d.probability >= 70 ? 'bg-error-500' : d.probability >= 40 ? 'bg-warning-500' : 'bg-accent-500')} style={{ width: `${d.probability}%` }} />
                  </div>
                  <span className="text-sm font-bold text-ink">{d.probability}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-5">
          <h4 className="mb-3 flex items-center gap-2 font-bold font-display text-ink"><FlaskConical className="h-4 w-4 text-secondary-500" /> Recommended Tests</h4>
          <ul className="space-y-2">
            {topDisease.recommendedTests.map((test) => (
              <li key={test} className="flex items-start gap-2 text-sm text-ink"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary-500" /> {test}</li>
            ))}
          </ul>
        </Card>
        <Card className="p-5">
          <h4 className="mb-3 flex items-center gap-2 font-bold font-display text-ink"><Pill className="h-4 w-4 text-primary-500" /> Suggested Medicines</h4>
          <ul className="space-y-2">
            {topDisease.medicines.map((med) => (
              <li key={med} className="flex items-start gap-2 text-sm text-ink"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" /> {med}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-warning-600">Educational only — consult a doctor before taking any medicine.</p>
        </Card>
      </div>

      <Card className="p-5">
        <h4 className="mb-3 flex items-center gap-2 font-bold font-display text-ink"><Lightbulb className="h-4 w-4 text-warning-500" /> Lifestyle Advice</h4>
        <ul className="space-y-2">
          {topDisease.lifestyleAdvice.map((advice) => (
            <li key={advice} className="flex items-start gap-2 text-sm text-ink"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-500" /> {advice}</li>
          ))}
        </ul>
      </Card>

      <Card className="flex items-center gap-3 bg-primary-50/50 p-4 dark:bg-primary-900/20">
        <Stetho className="h-8 w-8 flex-shrink-0 text-primary-600" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-ink">Recommended Doctor</p>
          <p className="text-sm text-muted">{topDisease.recommendedDoctor}</p>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button fullWidth variant="outline" onClick={onReset}><RotateCcw className="h-4 w-4" /> Check Again</Button>
      </div>
    </div>
  );
}
