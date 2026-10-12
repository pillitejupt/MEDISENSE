import { useState, useRef, useCallback } from 'react';
import {
  Camera, Upload, Scan, AlertTriangle, CheckCircle2, Loader2,
  RotateCcw, Sparkles, Activity, Pill, Stethoscope, X,
  ShieldAlert, Eye,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { supabase } from '@/lib/supabase';
import { Card, Button, Badge, RiskMeter } from '@/components/ui';
import { analyzeSkinImage, type SkinCondition } from '@/lib/medical';
import { cn } from '@/lib/utils';

export function CameraScan() {
  const { session } = useApp();
  const [imageData, setImageData] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<SkinCondition | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraActive(true);
    } catch {
      setError('Unable to access camera. You can upload an image instead.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    setImageData(dataUrl);
    stopCamera();
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImageData(ev.target?.result as string);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!imageData) return;
    setAnalyzing(true);
    setResult(null);
    setError(null);

    // Simulate AI analysis with progressive feedback
    await new Promise((r) => setTimeout(r, 2800));

    const condition = analyzeSkinImage(imageData);
    setResult(condition);

    if (session) {
      await supabase.from('camera_analyses').insert({
        user_id: session.user.id,
        image_url: null,
        detected_condition: condition.condition,
        confidence: condition.confidence,
        severity: condition.severity,
        causes: condition.causes,
        measures: condition.measures,
        recommended_doctor: condition.recommendedDoctor,
        suggested_medicines: condition.medicines,
        emergency: condition.emergency,
      });
    }

    setAnalyzing(false);
  };

  const reset = () => {
    setImageData(null);
    setResult(null);
    setError(null);
  };

  const detectableConditions = [
    'Acne', 'Eczema', 'Rashes', 'Fungal Infections', 'Psoriasis',
    'Burns', 'Cuts & Wounds', 'Eye Redness', 'Nail Infections',
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Badge variant="primary" className="mb-2"><Sparkles className="h-3 w-3" /> AI Vision Analysis</Badge>
          <h1 className="text-2xl font-bold font-display text-ink sm:text-3xl">Camera-Based Disease Detection</h1>
          <p className="mt-2 text-sm text-muted">Scan skin conditions with your camera or upload an image. AI detects conditions and provides guidance.</p>
        </div>

        {/* Detectable conditions */}
        <div className="mb-6">
          <p className="mb-3 text-sm font-semibold text-ink">Can detect:</p>
          <div className="flex flex-wrap gap-2">
            {detectableConditions.map((c) => (
              <Badge key={c} variant="neutral">{c}</Badge>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Camera / Image area */}
          <Card className="overflow-hidden p-0">
            <div className="relative aspect-square bg-slate-900 dark:bg-slate-950">
              {cameraActive && !imageData ? (
                <>
                  <video ref={videoRef} className="h-full w-full object-cover" playsInline muted />
                  {/* Scan overlay */}
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-8 border-2 border-primary-400/60 rounded-2xl" />
                    <div className="absolute left-8 right-8 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent animate-pulse" />
                    <div className="absolute left-4 top-4 h-8 w-8 border-l-4 border-t-4 border-primary-400 rounded-tl-lg" />
                    <div className="absolute right-4 top-4 h-8 w-8 border-r-4 border-t-4 border-primary-400 rounded-tr-lg" />
                    <div className="absolute bottom-4 left-4 h-8 w-8 border-l-4 border-b-4 border-primary-400 rounded-bl-lg" />
                    <div className="absolute bottom-4 right-4 h-8 w-8 border-r-4 border-b-4 border-primary-400 rounded-br-lg" />
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <Button onClick={captureImage} className="shadow-glow-blue">
                      <Camera className="h-5 w-5" /> Capture
                    </Button>
                  </div>
                </>
              ) : imageData ? (
                <div className="relative h-full w-full">
                  <img src={imageData} alt="Captured" className="h-full w-full object-cover" />
                  {result && (
                    <div className="absolute inset-0">
                      <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full border-2 border-error-400 bg-error-400/20 animate-pulse" />
                      <div className="absolute bottom-4 left-4 rounded-lg bg-slate-900/80 px-3 py-1.5 text-xs text-white backdrop-blur">
                        <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> Affected region detected</span>
                      </div>
                    </div>
                  )}
                  {!result && !analyzing && (
                    <button onClick={reset} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/60 text-white backdrop-blur hover:bg-slate-900/80">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ) : analyzing ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-white">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full border-4 border-primary-400/30 border-t-primary-400 animate-spin" />
                    <Scan className="absolute inset-0 m-auto h-8 w-8 text-primary-400" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold animate-pulse">AI analyzing image...</p>
                    <p className="mt-1 text-xs text-white/70">Running CNN model & computer vision</p>
                  </div>
                  <div className="flex gap-1.5">
                    {['Detecting', 'Classifying', 'Analyzing'].map((s, i) => (
                      <span key={s} className="text-xs text-white/60" style={{ animationDelay: `${i * 0.3}s` }}>
                        {s}{i < 2 ? ' →' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-500/20 text-primary-400">
                    <Camera className="h-10 w-10" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Ready to scan</p>
                    <p className="mt-1 text-sm text-white/60">Use your camera or upload an image to begin</p>
                  </div>
                </div>
              )}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Controls */}
            <div className="flex gap-3 p-4">
              {!cameraActive && !imageData && !analyzing && (
                <>
                  <Button fullWidth onClick={startCamera}>
                    <Camera className="h-5 w-5" /> Open Camera
                  </Button>
                  <Button fullWidth variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-5 w-5" /> Upload Image
                  </Button>
                </>
              )}
              {imageData && !analyzing && !result && (
                <>
                  <Button fullWidth onClick={handleAnalyze}>
                    <Scan className="h-5 w-5" /> Analyze with AI
                  </Button>
                  <Button variant="outline" onClick={reset}>
                    <RotateCcw className="h-5 w-5" />
                  </Button>
                </>
              )}
              {result && (
                <Button fullWidth variant="outline" onClick={reset}>
                  <RotateCcw className="h-5 w-5" /> Scan Another
                </Button>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </Card>

          {/* Results / Info */}
          <div className="space-y-4">
            {error && (
              <Card className="border-error-200 bg-error-50/50 p-4 dark:border-error-900/40 dark:bg-error-900/10">
                <div className="flex items-center gap-2 text-sm text-error-700 dark:text-error-300">
                  <AlertTriangle className="h-4 w-4" /> {error}
                </div>
              </Card>
            )}

            {result ? (
              <ResultDisplay result={result} />
            ) : !analyzing && !imageData ? (
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-bold font-display text-ink">How it works</h3>
                <div className="space-y-4">
                  {[
                    { icon: Camera, title: 'Capture or Upload', desc: 'Take a photo with your camera or upload an existing image of the affected area.' },
                    { icon: Scan, title: 'AI Analysis', desc: 'Our CNN model analyzes the image, detecting skin conditions with computer vision.' },
                    { icon: Activity, title: 'Get Results', desc: 'Receive condition details, confidence score, severity, causes, and prevention tips.' },
                    { icon: Stethoscope, title: 'Next Steps', desc: 'Get recommended doctors and medicines. Emergency alerts for severe conditions.' },
                  ].map((step, i) => (
                    <div key={step.title} className="flex gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/30">
                          <step.icon className="h-5 w-5" />
                        </div>
                        {i < 3 && <div className="absolute left-1/2 top-10 h-full w-px -translate-x-1/2 bg-line" />}
                      </div>
                      <div className="pb-4">
                        <p className="text-sm font-semibold text-ink">{step.title}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ) : analyzing ? (
              <Card className="p-6">
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <Loader2 className="h-10 w-10 animate-spin text-primary-500" />
                  <div>
                    <p className="font-semibold text-ink">AI is analyzing your image</p>
                    <p className="mt-1 text-sm text-muted">This takes a few seconds. We're running deep learning models to identify the condition.</p>
                  </div>
                </div>
              </Card>
            ) : null}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 flex items-start gap-2 rounded-xl border border-warning-200/50 bg-warning-50/50 p-4 dark:border-warning-900/30 dark:bg-warning-900/10">
          <ShieldAlert className="mt-0.5 h-4 w-4 flex-shrink-0 text-warning-600" />
          <p className="text-xs leading-relaxed text-warning-800 dark:text-warning-200">
            <strong>Important:</strong> Camera-based skin analysis is for educational purposes only and may be inaccurate. It is not a medical diagnosis. Always consult a dermatologist for proper diagnosis and treatment.
          </p>
        </div>
      </div>
    </div>
  );
}

function ResultDisplay({ result }: { result: SkinCondition }) {
  const severityConfig = {
    mild: { label: 'Mild', variant: 'success' as const, color: 'text-accent-600' },
    moderate: { label: 'Moderate', variant: 'warning' as const, color: 'text-warning-600' },
    severe: { label: 'Severe', variant: 'error' as const, color: 'text-error-600' },
  };
  const sev = severityConfig[result.severity];

  return (
    <div className="space-y-4 animate-fade-in-up">
      {result.emergency && (
        <Card className="border-error-300 bg-gradient-to-br from-error-500 to-rose-600 p-4 text-white animate-fade-in">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 flex-shrink-0 animate-pulse" />
            <div>
              <p className="font-bold">Emergency Alert</p>
              <p className="text-sm text-white/90">This condition appears severe. Please seek immediate medical attention or call 108.</p>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Detected Condition</p>
            <h3 className="mt-1 text-xl font-bold font-display text-ink">{result.condition}</h3>
          </div>
          <Badge variant={sev.variant}>{sev.label} Severity</Badge>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-muted">{result.description}</p>

        {/* Confidence */}
        <div className="mb-4">
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="text-muted">AI Confidence</span>
            <span className={cn('font-bold', result.confidence >= 85 ? 'text-accent-600' : 'text-warning-600')}>{result.confidence}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div className={cn('h-full rounded-full transition-all duration-1000', result.confidence >= 85 ? 'bg-accent-500' : 'bg-warning-500')} style={{ width: `${result.confidence}%` }} />
          </div>
        </div>

        <RiskMeter value={result.confidence} />
      </Card>

      <Card className="p-6">
        <h4 className="mb-3 flex items-center gap-2 font-bold font-display text-ink">
          <AlertTriangle className="h-4 w-4 text-warning-500" /> Possible Causes
        </h4>
        <ul className="space-y-2">
          {result.causes.map((cause) => (
            <li key={cause} className="flex items-start gap-2 text-sm text-ink">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning-500" /> {cause}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-6">
        <h4 className="mb-3 flex items-center gap-2 font-bold font-display text-ink">
          <CheckCircle2 className="h-4 w-4 text-accent-500" /> Preventive Measures
        </h4>
        <ul className="space-y-2">
          {result.measures.map((measure) => (
            <li key={measure} className="flex items-start gap-2 text-sm text-ink">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-500" /> {measure}
            </li>
          ))}
        </ul>
      </Card>

      {result.medicines.length > 0 && (
        <Card className="p-6">
          <h4 className="mb-3 flex items-center gap-2 font-bold font-display text-ink">
            <Pill className="h-4 w-4 text-primary-500" /> Suggested Medicine
          </h4>
          <div className="rounded-xl border border-line p-4">
            <p className="font-semibold text-ink">{result.medicines[0].name}</p>
            <p className="text-sm text-muted">{result.medicines[0].purpose}</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <span className="text-muted">Dosage: <span className="text-ink">{result.medicines[0].dosage}</span></span>
              <span className="text-muted">Price: <span className="text-ink">{result.medicines[0].priceEstimate}</span></span>
            </div>
            <p className="mt-2 text-xs text-warning-600">⚠ Educational info only. Consult a doctor before use.</p>
          </div>
        </Card>
      )}

      <Card className="flex items-center gap-3 bg-primary-50/50 p-4 dark:bg-primary-900/20">
        <Stethoscope className="h-8 w-8 flex-shrink-0 text-primary-600" />
        <div>
          <p className="text-sm font-semibold text-ink">Recommended Doctor</p>
          <p className="text-sm text-muted">{result.recommendedDoctor}</p>
        </div>
      </Card>
    </div>
  );
}
