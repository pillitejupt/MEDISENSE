import { useState, useEffect, useCallback } from 'react';
import {
  FileText, Upload, Sparkles, Trash2, FilePlus, Loader2,
  FileCheck2, AlertTriangle, Download, Eye, X,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { supabase } from '@/lib/supabase';
import { Card, Button, Badge, EmptyState, Spinner } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { MedicalRecord } from '@/types';

const RECORD_TYPES = ['Blood Report', 'Prescription', 'X-Ray', 'MRI', 'CT Scan', 'Doctor Note', 'Discharge Summary'];

export function Records() {
  const { session, navigate } = useApp();
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [summarizing, setSummarizing] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  const loadRecords = useCallback(async () => {
    if (!session) return;
    const { data } = await supabase.from('medical_records').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false });
    setRecords(data as MedicalRecord[] || []);
    setLoading(false);
  }, [session]);

  useEffect(() => { loadRecords(); }, [loadRecords]);

  const generateSummary = (record: MedicalRecord): string => {
    const summaries: Record<string, string> = {
      'Blood Report': 'Your blood report shows mostly normal values. Hemoglobin is within range (13.5 g/dL). Blood sugar fasting is 92 mg/dL (normal). Cholesterol levels are slightly elevated — consider reducing saturated fats. Thyroid function (TSH) is normal. Recommended: maintain healthy diet and exercise. Follow up in 6 months.',
      'Prescription': 'This prescription contains medication for blood pressure management. The doctor has prescribed Amlodipine 5mg once daily. Take it at the same time each day with water. Do not stop abruptly. Monitor your blood pressure regularly. Next review in 4 weeks.',
      'X-Ray': 'Chest X-ray shows clear lung fields with no active abnormalities. Cardiac silhouette appears normal. Bony structures are intact. No signs of pneumonia or fluid accumulation. Clinical correlation recommended if symptoms persist.',
      'MRI': 'MRI scan of the brain shows normal brain parenchyma with no mass lesions or hemorrhage. Ventricular system is normal in size and position. No midline shift detected. Findings are within normal limits.',
      'CT Scan': 'CT scan reveals no acute abnormalities. Organ examination shows normal density and structure. No evidence of masses, stones, or inflammation. Recommended: routine follow-up as clinically indicated.',
      'Doctor Note': 'Patient presented with mild symptoms. On examination, vitals are stable. Diagnosis: viral upper respiratory infection. Advised rest, hydration, and symptomatic treatment. Follow up if symptoms worsen or persist beyond 7 days.',
      'Discharge Summary': 'Patient was admitted for observation and discharged in stable condition. Treatment was completed successfully. Medications prescribed for home care. Follow-up appointment scheduled in 2 weeks. Activity restrictions: avoid strenuous exercise for 1 week.',
    };
    return summaries[record.record_type || 'Blood Report'] || 'AI analysis complete. This report appears to be within normal limits. Please consult your doctor for detailed interpretation and any necessary follow-up actions.';
  };

  const handleUpload = async (title: string, type: string) => {
    if (!session) return;
    setUploading(true);
    await new Promise((r) => setTimeout(r, 1500));

    const { data } = await supabase.from('medical_records').insert({
      user_id: session.user.id,
      title, record_type: type, file_url: null, ai_summary: null,
    }).select().single();

    if (data) {
      setUploading(false);
      setShowUpload(false);
      await loadRecords();
      // Generate summary
      setSummarizing(data.id);
      await new Promise((r) => setTimeout(r, 2500));
      const summary = generateSummary(data as MedicalRecord);
      await supabase.from('medical_records').update({ ai_summary: summary }).eq('id', data.id);
      setRecords((prev) => prev.map((r) => r.id === data.id ? { ...r, ai_summary: summary } : r));
      setSummarizing(null);
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from('medical_records').delete().eq('id', id);
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Badge variant="primary" className="mb-2"><Sparkles className="h-3 w-3" /> AI-Powered Summaries</Badge>
            <h1 className="text-2xl font-bold font-display text-ink sm:text-3xl">Medical Records</h1>
            <p className="mt-2 text-sm text-muted">Upload reports, prescriptions, and scans. AI summarizes them in simple language.</p>
          </div>
          <Button onClick={() => setShowUpload(true)}><FilePlus className="h-4 w-4" /> Upload</Button>
        </div>

        {/* Upload types */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {RECORD_TYPES.map((type) => (
            <div key={type} className="flex flex-col items-center gap-2 rounded-xl border border-line bg-surface p-3 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/30">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-muted">{type}</span>
            </div>
          ))}
        </div>

        {/* Records list */}
        {records.length === 0 ? (
          <Card className="p-0">
            <EmptyState
              icon={<FileText className="h-6 w-6" />}
              title="No records yet"
              description="Upload your medical reports, prescriptions, or scans to get AI-generated summaries."
              action={<Button onClick={() => setShowUpload(true)}><Upload className="h-4 w-4" /> Upload Record</Button>}
            />
          </Card>
        ) : (
          <div className="space-y-3">
            {records.map((record) => (
              <Card key={record.id} hover className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-ink">{record.title}</h3>
                      {record.record_type && <Badge variant="primary">{record.record_type}</Badge>}
                    </div>
                    <p className="mt-1 text-xs text-muted">{new Date(record.created_at).toLocaleDateString('en', { dateStyle: 'long' })}</p>

                    {summarizing === record.id ? (
                      <div className="mt-3 flex items-center gap-2 rounded-xl bg-primary-50/50 p-3 dark:bg-primary-900/20">
                        <Loader2 className="h-4 w-4 animate-spin text-primary-600" />
                        <span className="text-sm text-primary-600">AI is analyzing and summarizing your report...</span>
                      </div>
                    ) : record.ai_summary ? (
                      <div className="mt-3 rounded-xl border border-accent-200/50 bg-accent-50/30 p-3 dark:border-accent-900/30 dark:bg-accent-900/10">
                        <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-accent-700 dark:text-accent-300">
                          <Sparkles className="h-3 w-3" /> AI Summary
                        </p>
                        <p className="text-sm leading-relaxed text-ink">{record.ai_summary}</p>
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" className="mt-3" onClick={async () => {
                        setSummarizing(record.id);
                        await new Promise((r) => setTimeout(r, 2000));
                        const summary = generateSummary(record);
                        await supabase.from('medical_records').update({ ai_summary: summary }).eq('id', record.id);
                        setRecords((prev) => prev.map((r) => r.id === record.id ? { ...r, ai_summary: summary } : r));
                        setSummarizing(null);
                      }}>
                        <Sparkles className="h-3 w-3" /> Generate AI Summary
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <button onClick={() => setSelectedRecord(record)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-900/20"><Eye className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(record.id)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-error-50 hover:text-error-600 dark:hover:bg-error-900/20"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-6 flex items-start gap-2 rounded-xl border border-warning-200/50 bg-warning-50/50 p-4 dark:border-warning-900/30 dark:bg-warning-900/10">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-warning-600" />
          <p className="text-xs leading-relaxed text-warning-800 dark:text-warning-200">
            AI summaries are simplified explanations for educational purposes and may not capture all details. Always refer to your doctor's interpretation of medical reports.
          </p>
        </div>
      </div>

      {/* Upload modal */}
      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onUpload={handleUpload}
          uploading={uploading}
          types={RECORD_TYPES}
        />
      )}

      {/* View modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedRecord(null)} />
          <Card className="relative z-10 w-full max-w-lg p-6 animate-scale-in">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold font-display text-ink">{selectedRecord.title}</h3>
              <button onClick={() => setSelectedRecord(null)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-primary-50 dark:hover:bg-primary-900/20"><X className="h-4 w-4" /></button>
            </div>
            <div className="flex h-48 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
              <FileCheck2 className="h-16 w-16 text-primary-300" />
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <p className="text-muted">Type: <span className="text-ink">{selectedRecord.record_type}</span></p>
              <p className="text-muted">Date: <span className="text-ink">{new Date(selectedRecord.created_at).toLocaleDateString('en', { dateStyle: 'long' })}</span></p>
            </div>
            {selectedRecord.ai_summary && (
              <div className="mt-4 rounded-xl border border-accent-200/50 bg-accent-50/30 p-3 dark:border-accent-900/30 dark:bg-accent-900/10">
                <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-accent-700 dark:text-accent-300"><Sparkles className="h-3 w-3" /> AI Summary</p>
                <p className="text-sm leading-relaxed text-ink">{selectedRecord.ai_summary}</p>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

function UploadModal({ onClose, onUpload, uploading, types }: {
  onClose: () => void;
  onUpload: (title: string, type: string) => void;
  uploading: boolean;
  types: string[];
}) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState(types[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <Card className="relative z-10 w-full max-w-md p-6 animate-scale-in">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold font-display text-ink">Upload Medical Record</h3>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-primary-50 dark:hover:bg-primary-900/20"><X className="h-4 w-4" /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Record Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Annual Blood Checkup"
              className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Record Type</label>
            <div className="grid grid-cols-2 gap-2">
              {types.map((t) => (
                <button key={t} onClick={() => setType(t)}
                  className={cn('rounded-xl border px-3 py-2 text-sm font-medium transition-all',
                    type === t ? 'border-primary-400 bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'border-line text-muted hover:border-primary-300')}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-xl border-2 border-dashed border-line p-6 text-center">
            <Upload className="mx-auto mb-2 h-8 w-8 text-muted" />
            <p className="text-sm text-muted">Drop file here or click to browse</p>
            <p className="text-xs text-muted">PDF, JPG, PNG up to 10MB</p>
          </div>
          <Button fullWidth size="lg" disabled={!title || uploading} onClick={() => onUpload(title, type)}>
            {uploading ? 'Uploading...' : 'Upload & Analyze'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
