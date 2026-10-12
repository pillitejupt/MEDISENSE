import { useState } from 'react';
import {
  Activity, Mail, Lock, User, Phone, ArrowRight, ArrowLeft,
  Eye, EyeOff, CheckCircle2, AlertCircle, Shield, Sparkles,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

type AuthMode = 'login' | 'register' | 'forgot';

export function Auth() {
  const { navigate, session } = useApp();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (session) {
    navigate('dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { data: { full_name: fullName, phone } },
        });
        if (error) throw error;
        setSuccess('Account created! You can now sign in.');
        setMode('login');
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        setSuccess('Password reset link sent to your email.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-primary-400/20 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-secondary-400/20 blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />
      </div>

      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-line glass-strong shadow-card lg:grid-cols-2">
        {/* Left panel — branding */}
        <div className="relative hidden flex-col justify-between bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 p-10 text-white lg:flex animate-gradient">
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="relative">
            <button onClick={() => navigate('home')} className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                <Activity className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <span className="block text-lg font-bold font-display">MediSense AI</span>
                <span className="block text-[10px] font-semibold tracking-widest text-white/70">AI HEALTH ADVISOR</span>
              </div>
            </button>
          </div>

          <div className="relative space-y-6">
            <h2 className="text-3xl font-bold font-display leading-tight">
              Your health, powered by Artificial Intelligence
            </h2>
            <p className="text-white/80">
              Join millions who use MediSense AI for personalized health guidance, disease prediction, and 24/7 AI consultations.
            </p>
            <ul className="space-y-3">
              {['AI symptom analysis & disease prediction', 'Camera-based skin condition detection', '12 regional language support', 'Book specialist doctor consultations'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-white/90" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">
            <Shield className="h-8 w-8 flex-shrink-0" />
            <p className="text-xs text-white/80">Your medical data is encrypted and HIPAA-inspired privacy protected. We never share your information.</p>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
              <Sparkles className="h-3 w-3" />
              {mode === 'login' ? 'Welcome back' : mode === 'register' ? 'Join MediSense' : 'Reset password'}
            </div>
            <h1 className="text-2xl font-bold font-display text-ink">
              {mode === 'login' ? 'Sign in to your account' : mode === 'register' ? 'Create your account' : 'Forgot your password?'}
            </h1>
            <p className="mt-1 text-sm text-muted">
              {mode === 'login' ? 'Enter your credentials to access your health dashboard' : mode === 'register' ? 'Start your personalized health journey today' : 'Enter your email and we\'ll send you a reset link'}
            </p>
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-error-200 bg-error-50 p-3 text-sm text-error-700 dark:border-error-900/40 dark:bg-error-900/20 dark:text-error-300 animate-fade-in">
              <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
            </div>
          )}
          {success && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-accent-200 bg-accent-50 p-3 text-sm text-accent-700 dark:border-accent-900/40 dark:bg-accent-900/20 dark:text-accent-300 animate-fade-in">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" /> {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField icon={User} label="Full Name" type="text" value={fullName} onChange={setFullName} placeholder="John Doe" required />
                <InputField icon={Phone} label="Phone" type="tel" value={phone} onChange={setPhone} placeholder="+91 98765 43210" required />
              </div>
            )}
            <InputField icon={Mail} label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" required />
            {mode !== 'forgot' && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-xl border border-line bg-surface py-2.5 pl-10 pr-10 text-sm text-ink placeholder:text-muted focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted">
                  <input type="checkbox" className="rounded border-line text-primary-600 focus:ring-primary-400" /> Remember me
                </label>
                <button type="button" onClick={() => setMode('forgot')} className="font-medium text-primary-600 hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>

          {mode !== 'forgot' && (
            <>
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-line" />
                <span className="text-xs text-muted">OR CONTINUE WITH</span>
                <div className="h-px flex-1 bg-line" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <SocialButton label="Google" onClick={() => setError('Google login requires additional configuration. Please use email/password.')} />
                <SocialButton label="OTP" onClick={() => setError('OTP login requires SMS provider configuration. Please use email/password.')} />
                <SocialButton label="Mobile" onClick={() => setError('Mobile login requires SMS provider configuration. Please use email/password.')} />
              </div>
            </>
          )}

          <p className="mt-8 text-center text-sm text-muted">
            {mode === 'login' ? (
              <>Don't have an account? <button onClick={() => setMode('register')} className="font-semibold text-primary-600 hover:underline">Sign up</button></>
            ) : mode === 'register' ? (
              <>Already have an account? <button onClick={() => setMode('login')} className="font-semibold text-primary-600 hover:underline">Sign in</button></>
            ) : (
              <button onClick={() => setMode('login')} className="inline-flex items-center gap-1 font-semibold text-primary-600 hover:underline">
                <ArrowLeft className="h-4 w-4" /> Back to sign in
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function InputField({ icon: Icon, label, type, value, onChange, placeholder, required }: {
  icon: typeof Mail; label: string; type: string; value: string; onChange: (v: string) => void; placeholder: string; required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={cn(
            'w-full rounded-xl border border-line bg-surface py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-muted',
            'focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900'
          )}
        />
      </div>
    </div>
  );
}

function SocialButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded-xl border border-line bg-surface py-2.5 text-sm font-medium text-ink transition-all hover:border-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-900/20"
    >
      {label}
    </button>
  );
}
