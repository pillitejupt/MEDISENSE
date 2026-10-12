import { useState, useEffect } from 'react';
import {
  HeartPulse, Activity, Brain, Camera, MessageCircle, Stethoscope,
  Pill, Users, Shield, ArrowRight, Sparkles, Star, Clock,
  Syringe, Microscope, Heart, Zap, TrendingUp, CheckCircle2,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, Button, Badge } from '@/components/ui';
import { TESTIMONIALS, ARTICLES } from '@/lib/medical';
import type { Page } from '@/types';

export function Home() {
  const { t, navigate, session } = useApp();

  const features: { icon: typeof Activity; title: string; desc: string; page: Page; gradient: string }[] = [
    { icon: MessageCircle, title: 'AI Health Chatbot', desc: 'Chat with our AI doctor 24/7. Describe symptoms, ask questions, get instant guidance in your language.', page: 'chatbot', gradient: 'from-blue-500 to-cyan-500' },
    { icon: Camera, title: 'Camera Disease Detection', desc: 'Scan skin conditions with your camera. AI detects acne, rashes, fungal infections and more.', page: 'camera', gradient: 'from-cyan-500 to-teal-500' },
    { icon: Stethoscope, title: 'Symptom Checker', desc: 'Enter your symptoms and answer follow-up questions for AI-powered disease prediction.', page: 'symptoms', gradient: 'from-teal-500 to-emerald-500' },
    { icon: Brain, title: 'Disease Prediction Engine', desc: 'ML-powered risk assessment for diabetes, heart disease, hypertension and 15+ conditions.', page: 'prediction', gradient: 'from-emerald-500 to-green-500' },
    { icon: Pill, title: 'Medicine Recommendations', desc: 'Get educational info on medicines, dosage, side effects, and alternatives with warnings.', page: 'medicines', gradient: 'from-green-500 to-lime-500' },
    { icon: Users, title: 'Doctor Consultation', desc: 'Book video, chat, or in-person appointments with verified specialist doctors.', page: 'doctors', gradient: 'from-blue-500 to-indigo-500' },
  ];

  const stats = [
    { label: 'Users Served', value: 2840000, suffix: '+', icon: Users },
    { label: 'Diseases Detected', value: 156000, suffix: '+', icon: Microscope },
    { label: 'AI Accuracy', value: 94, suffix: '%', icon: Zap },
    { label: 'Partner Doctors', value: 12500, suffix: '+', icon: Stethoscope },
    { label: 'Hospitals Connected', value: 890, suffix: '+', icon: HeartPulse },
  ];

  return (
    <div className="overflow-hidden">
      <Hero />
      <StatsSection stats={stats} />
      <FeaturesSection features={features} />
      <ChatbotPreview />
      <TestimonialsSection />
      <ArticlesSection />
      <CtaSection />
    </div>
  );

  function Hero() {
    return (
      <section className="relative min-h-screen flex items-center pt-20 pb-12">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary-400/20 blur-3xl animate-float-slow" />
          <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-secondary-400/20 blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />
          <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-accent-400/20 blur-3xl animate-float-slow" style={{ animationDelay: '6s' }} />

          {/* Floating medical icons */}
          <FloatingIcon icon={Heart} className="left-[10%] top-[25%] text-error-400/30" delay="0s" />
          <FloatingIcon icon={Activity} className="right-[12%] top-[20%] text-primary-400/30" delay="1s" />
          <FloatingIcon icon={Brain} className="left-[18%] bottom-[20%] text-secondary-400/30" delay="2s" />
          <FloatingIcon icon={Pill} className="right-[20%] bottom-[25%] text-accent-400/30" delay="1.5s" />
          <FloatingIcon icon={Syringe} className="left-[8%] top-[50%] text-warning-400/30" delay="2.5s" />
          <FloatingIcon icon={Stethoscope} className="right-[8%] top-[55%] text-primary-400/30" delay="0.5s" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200/50 bg-primary-50/80 px-4 py-2 text-sm font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 animate-fade-in-up">
                <Sparkles className="h-4 w-4" />
                Powered by Advanced AI Models
              </div>

              <h1 className="text-4xl font-bold font-display leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl animate-fade-in-up delay-100">
                {t('hero.title').split('24/7')[0]}
                <span className="relative inline-block">
                  <span className="gradient-text">24/7</span>
                  <HeartbeatLine />
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0 animate-fade-in-up delay-200">
                {t('hero.subtitle')}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start animate-fade-in-up delay-300">
                <Button size="lg" onClick={() => navigate(session ? 'symptoms' : 'auth')}>
                  <Stethoscope className="h-5 w-5" /> {t('cta.checkup')}
                </Button>
                <Button size="lg" variant="secondary" onClick={() => navigate('chatbot')}>
                  <MessageCircle className="h-5 w-5" /> {t('cta.chat')}
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('camera')}>
                  <Camera className="h-5 w-5" /> {t('cta.scan')}
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted lg:justify-start animate-fade-in-up delay-500">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-accent-500" /> HIPAA-inspired Privacy
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent-500" /> No Wait Times
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent-500" /> 12 Languages
                </div>
              </div>
            </div>

            {/* Interactive preview card */}
            <div className="relative animate-fade-in-up delay-300">
              <HeroPreview />
            </div>
          </div>
        </div>
      </section>
    );
  }

  function HeroPreview() {
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
      { role: 'ai', text: 'Hi! I\'m your AI Health Advisor. How can I help you today?' },
    ]);
    const demoConversation = [
      { role: 'user' as const, text: 'I have a fever and headache since 2 days' },
      { role: 'ai' as const, text: 'I understand. Let me ask a few questions: What\'s your temperature? Any cough or body ache?' },
      { role: 'user' as const, text: '102°F with body ache and mild cough' },
      { role: 'ai' as const, text: 'Based on your symptoms, this could be influenza or early dengue. I recommend rest, hydration, and paracetamol. If fever persists beyond 3 days, please consult a doctor.' },
    ];
    const [idx, setIdx] = useState(0);

    useEffect(() => {
      if (idx >= demoConversation.length) return;
      const timer = setTimeout(() => {
        setMessages((prev) => [...prev, demoConversation[idx]]);
        setIdx((i) => i + 1);
      }, idx === 0 ? 2000 : 3000);
      return () => clearTimeout(timer);
    }, [idx]);

    return (
      <div className="relative">
        {/* ECG animation behind card */}
        <svg className="absolute -top-10 -right-10 h-32 w-64 text-primary-500/30" viewBox="0 0 200 50" fill="none">
          <path className="ecg-line" d="M0,25 L40,25 L48,10 L56,40 L64,25 L100,25 L108,5 L116,45 L124,25 L200,25" stroke="currentColor" strokeWidth="2" />
        </svg>

        <Card glass className="relative overflow-hidden p-0">
          <div className="flex items-center gap-3 border-b border-line/60 bg-primary-50/50 px-5 py-3 dark:bg-primary-900/20">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500">
              <MessageCircle className="h-5 w-5 text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-accent-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">AI Health Advisor</p>
              <p className="text-xs text-accent-600">● Online now</p>
            </div>
            <Badge variant="success" className="ml-auto">Live</Badge>
          </div>

          <div className="h-80 space-y-3 overflow-y-auto p-5 no-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white'
                    : 'bg-slate-100 text-ink dark:bg-slate-800'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {idx < demoConversation.length && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-slate-100 px-4 py-3 text-slate-400 dark:bg-slate-800">
                  <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-line/60 p-3">
            <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 dark:bg-slate-800">
              <span className="text-sm text-muted flex-1">Type your symptoms...</span>
              <button onClick={() => navigate('chatbot')} className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 text-white transition-transform hover:scale-110">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Card>

        {/* Floating stat cards */}
        <div className="absolute -left-6 top-1/4 hidden animate-float lg:block">
          <Card glass className="flex items-center gap-3 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-error-50 text-error-500 dark:bg-error-900/30">
              <HeartPulse className="h-5 w-5 animate-heartbeat" />
            </div>
            <div>
              <p className="text-xs text-muted">Heart Rate</p>
              <p className="text-sm font-bold text-ink">72 BPM</p>
            </div>
          </Card>
        </div>
        <div className="absolute -right-6 bottom-1/4 hidden animate-float lg:block" style={{ animationDelay: '2s' }}>
          <Card glass className="flex items-center gap-3 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-500 dark:bg-accent-900/30">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted">Health Score</p>
              <p className="text-sm font-bold text-ink">85/100</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  function FloatingIcon({ icon: Icon, className, delay }: { icon: typeof Heart; className: string; delay: string }) {
    return (
      <div className={`absolute hidden lg:block ${className}`} style={{ animation: `float 6s ease-in-out infinite`, animationDelay: delay }}>
        <Icon className="h-12 w-12" strokeWidth={1.5} />
      </div>
    );
  }

  function HeartbeatLine() {
    return (
      <svg className="absolute -bottom-2 left-0 h-4 w-full text-primary-500" viewBox="0 0 100 20" fill="none" preserveAspectRatio="none">
        <path className="ecg-line" d="M0,10 L20,10 L25,2 L30,18 L35,10 L100,10" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  function StatsSection({ stats }: { stats: { label: string; value: number; suffix: string; icon: typeof Users }[] }) {
    return (
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5">
            {stats.map((stat, i) => (
              <Card key={stat.label} hover className="p-6 text-center animate-fade-in-up" >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 text-primary-600 dark:text-primary-400">
                  <stat.icon className="h-6 w-6" />
                </div>
                <CountUp value={stat.value} suffix={stat.suffix} />
                <p className="mt-1 text-xs font-medium text-muted sm:text-sm">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function CountUp({ value, suffix }: { value: number; suffix: string }) {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) { setDisplay(value); clearInterval(interval); }
        else setDisplay(Math.floor(current));
      }, duration / steps);
      return () => clearInterval(interval);
    }, [value]);
    const formatNum = (n: number) => n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(0)}K` : `${n}`;
    return <p className="text-2xl font-bold font-display gradient-text sm:text-3xl">{formatNum(display)}{suffix}</p>;
  }

  function FeaturesSection({ features }: { features: { icon: typeof Activity; title: string; desc: string; page: Page; gradient: string }[] }) {
    return (
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Badge variant="primary" className="mb-3">Features</Badge>
            <h2 className="text-3xl font-bold font-display text-ink sm:text-4xl">Everything you need for better health</h2>
            <p className="mt-4 text-muted">Comprehensive AI-powered tools that act as your first-level health assistant, from symptom analysis to specialist consultations.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <Card key={feature.title} hover className="group p-6 animate-fade-in-up cursor-pointer" onClick={() => navigate(feature.page)}>
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-bold font-display text-ink">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{feature.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary-600 opacity-0 transition-opacity group-hover:opacity-100">
                  Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function ChatbotPreview() {
    return (
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card glass className="overflow-hidden">
            <div className="grid items-center gap-8 p-8 lg:grid-cols-2 lg:p-12">
              <div>
                <Badge variant="success" className="mb-3">AI Chatbot</Badge>
                <h2 className="text-3xl font-bold font-display text-ink sm:text-4xl">Talk to your AI Doctor like never before</h2>
                <p className="mt-4 text-muted">Our NLP-powered chatbot understands natural language, asks intelligent follow-up questions, identifies symptoms, predicts diseases, explains lab reports, and recommends precautions — in 12 regional languages.</p>
                <ul className="mt-6 space-y-3">
                  {['Natural language understanding', 'Voice & text conversation', 'Multilingual support (12 languages)', 'Symptom identification & disease prediction', 'Lab report explanation in simple terms'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-ink">
                      <CheckCircle2 className="h-5 w-5 text-accent-500 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <Button className="mt-8" onClick={() => navigate('chatbot')}>
                  <MessageCircle className="h-5 w-5" /> Start Chatting Now
                </Button>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="AI health consultation"
                  className="rounded-2xl shadow-card"
                />
                <div className="absolute -bottom-4 -left-4 hidden sm:block">
                  <Card glass className="flex items-center gap-3 p-4 animate-float">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-50 text-accent-600 dark:bg-accent-900/30">
                      <Star className="h-5 w-5 fill-accent-500 text-accent-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">4.9/5 Rating</p>
                      <p className="text-xs text-muted">From 28K+ users</p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  function TestimonialsSection() {
    return (
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Badge variant="primary" className="mb-3">Testimonials</Badge>
            <h2 className="text-3xl font-bold font-display text-ink sm:text-4xl">Trusted by millions worldwide</h2>
            <p className="mt-4 text-muted">Real stories from people who found better health with MediSense AI.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.name} hover className="p-6">
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'fill-warning-400 text-warning-400' : 'text-slate-300'}`} />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-ink">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={testimonial.image} alt={testimonial.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
                    <p className="text-xs text-muted">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function ArticlesSection() {
    return (
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <Badge variant="primary" className="mb-3">Health Awareness</Badge>
              <h2 className="text-3xl font-bold font-display text-ink sm:text-4xl">Latest health articles</h2>
            </div>
            <Button variant="outline" onClick={() => navigate('wellness')}>
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((article) => (
              <Card key={article.title} hover className="group overflow-hidden p-0 cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img src={article.image} alt={article.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <Badge className="absolute left-3 top-3" variant="primary">{article.category}</Badge>
                </div>
                <div className="p-5">
                  <h3 className="mb-2 line-clamp-2 font-bold font-display text-ink group-hover:text-primary-600">{article.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <Clock className="h-3 w-3" /> {article.readTime} read
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function CtaSection() {
    return (
      <section className="relative py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 p-8 text-center shadow-glow-blue sm:p-12 animate-gradient">
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="relative">
              <h2 className="text-3xl font-bold font-display text-white sm:text-4xl">Start your health journey today</h2>
              <p className="mx-auto mt-4 max-w-xl text-white/90">Join 2.8M+ users who trust MediSense AI for their daily health guidance. It's free to get started.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white" onClick={() => navigate(session ? 'dashboard' : 'auth')}>
                  {session ? 'Go to Dashboard' : 'Get Started Free'} <ArrowRight className="h-5 w-5" />
                </Button>
                <Button size="lg" className="bg-white text-primary-700 hover:bg-white/90" onClick={() => navigate('doctors')}>
                  <Users className="h-5 w-5" /> Find a Doctor
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
