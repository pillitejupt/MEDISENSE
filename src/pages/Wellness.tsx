import { useState } from 'react';
import {
  HeartPulse, Droplet, Moon, Activity, Apple, Brain, Sun,
  Shield, Moon as MoonIcon, Bell, Baby, Heart, Sparkles,
  Dumbbell, Flower2, GlassWater, Footprints, Wind,
  Calendar, Pill, Clock, ChevronRight,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, Button, Badge } from '@/components/ui';
import { HEALTH_TIPS, DIET_PLANS } from '@/lib/medical';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

const EXERCISE_PLANS = [
  { title: 'Morning Cardio', duration: '30 min', exercises: ['Jumping jacks (3 min)', 'Jogging in place (10 min)', 'High knees (5 min)', 'Burpees (10 reps x 3)', 'Cool down stretch (5 min)'], icon: Footprints, color: 'from-orange-500 to-red-500' },
  { title: 'Strength Training', duration: '45 min', exercises: ['Push-ups (15 x 3)', 'Squats (20 x 3)', 'Plank (60s x 3)', 'Lunges (12 each leg)', 'Deadlifts (10 x 3)'], icon: Dumbbell, color: 'from-blue-500 to-indigo-500' },
  { title: 'Yoga & Flexibility', duration: '40 min', exercises: ['Sun salutation (5 rounds)', 'Downward dog (30s)', 'Warrior pose (each side)', 'Tree pose (balance)', 'Corpse pose (relaxation)'], icon: Wind, color: 'from-emerald-500 to-teal-500' },
  { title: 'Evening Walk', duration: '30 min', exercises: ['Brisk walk (20 min)', 'Cool down (5 min)', 'Stretching (5 min)'], icon: Activity, color: 'from-cyan-500 to-blue-500' },
];

const WELLNESS_CATEGORIES = [
  { icon: HeartPulse, title: 'Heart Health', desc: 'Tips for cardiovascular wellness', color: 'from-rose-500 to-red-500' },
  { icon: Brain, title: 'Mental Wellness', desc: 'Stress and anxiety management', color: 'from-indigo-500 to-purple-500' },
  { icon: Baby, title: 'Child Care', desc: 'Growth, nutrition, and vaccines', color: 'from-amber-500 to-orange-500' },
  { icon: Heart, title: 'Pregnancy Care', desc: 'Maternal health guidance', color: 'from-pink-500 to-rose-500' },
  { icon: Moon, title: 'Senior Care', desc: 'Healthy aging tips', color: 'from-slate-500 to-slate-600' },
  { icon: Shield, title: 'Immunity', desc: 'Boost your natural defenses', color: 'from-emerald-500 to-green-500' },
];

const REMINDERS = [
  { icon: Pill, title: 'Medicine Reminder', desc: 'Never miss a dose', color: 'bg-primary-500' },
  { icon: Calendar, title: 'Appointment Reminder', desc: 'Stay on schedule', color: 'bg-secondary-500' },
  { icon: GlassWater, title: 'Water Reminder', desc: 'Stay hydrated all day', color: 'bg-cyan-500' },
  { icon: MoonIcon, title: 'Sleep Reminder', desc: 'Maintain sleep schedule', color: 'bg-indigo-500' },
  { icon: Shield, title: 'Vaccination Reminder', desc: 'Stay up to date', color: 'bg-accent-500' },
  { icon: Activity, title: 'Exercise Reminder', desc: 'Keep moving daily', color: 'bg-warning-500' },
];

const iconMap: Record<string, LucideIcon> = {
  droplet: Droplet, moon: Moon, activity: Activity, apple: Apple, 'heart-pulse': HeartPulse, brain: Brain, sun: Sun, shield: Shield,
};

export function Wellness() {
  const { navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'tips' | 'diet' | 'exercise' | 'categories' | 'reminders'>('tips');

  const tabs = [
    { id: 'tips' as const, label: 'Health Tips', icon: Sparkles },
    { id: 'diet' as const, label: 'Diet Plans', icon: Apple },
    { id: 'exercise' as const, label: 'Exercise', icon: Dumbbell },
    { id: 'categories' as const, label: 'Categories', icon: HeartPulse },
    { id: 'reminders' as const, label: 'Reminders', icon: Bell },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Badge variant="primary" className="mb-2"><Sparkles className="h-3 w-3" /> Wellness Hub</Badge>
          <h1 className="text-2xl font-bold font-display text-ink sm:text-3xl">Health & Wellness</h1>
          <p className="mt-2 text-sm text-muted">Daily health tips, diet plans, exercise routines, and wellness guidance for a healthier you.</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn('flex flex-shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all',
                activeTab === tab.id ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-glow-blue' : 'border border-line bg-surface text-ink hover:border-primary-400')}
            >
              <tab.icon className="h-4 w-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'tips' && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up">
            {HEALTH_TIPS.map((tip) => {
              const Icon = iconMap[tip.icon] || Sparkles;
              return (
                <Card key={tip.title} hover className="p-5">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 text-primary-600 dark:text-primary-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold font-display text-ink">{tip.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{tip.text}</p>
                </Card>
              );
            })}
          </div>
        )}

        {activeTab === 'diet' && (
          <div className="grid gap-4 sm:grid-cols-2 animate-fade-in-up">
            {DIET_PLANS.map((plan) => (
              <Card key={plan.title} hover className="overflow-hidden p-0">
                <div className={cn('bg-gradient-to-br p-5 text-white', plan.color)}>
                  <h3 className="text-lg font-bold font-display">{plan.title}</h3>
                  <p className="text-sm text-white/90">{plan.calories}</p>
                </div>
                <div className="p-5">
                  <p className="mb-3 text-sm font-semibold text-ink">Daily Menu:</p>
                  <ul className="space-y-2">
                    {plan.items.map((item, i) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-ink">
                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">{i + 1}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'exercise' && (
          <div className="grid gap-4 sm:grid-cols-2 animate-fade-in-up">
            {EXERCISE_PLANS.map((plan) => (
              <Card key={plan.title} hover className="overflow-hidden p-0">
                <div className={cn('flex items-center gap-3 bg-gradient-to-br p-5 text-white', plan.color)}>
                  <plan.icon className="h-8 w-8" />
                  <div>
                    <h3 className="text-lg font-bold font-display">{plan.title}</h3>
                    <p className="text-sm text-white/90">{plan.duration}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="mb-3 text-sm font-semibold text-ink">Exercises:</p>
                  <ul className="space-y-2">
                    {plan.exercises.map((exercise) => (
                      <li key={exercise} className="flex items-start gap-2 text-sm text-ink">
                        <Activity className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-500" /> {exercise}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" size="sm" className="mt-4 w-full">Start Workout <ChevronRight className="h-4 w-4" /></Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-up">
            {WELLNESS_CATEGORIES.map((cat) => (
              <Card key={cat.title} hover className="group p-5 cursor-pointer">
                <div className={cn('mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white transition-transform group-hover:scale-110', cat.color)}>
                  <cat.icon className="h-7 w-7" />
                </div>
                <h3 className="font-bold font-display text-ink">{cat.title}</h3>
                <p className="mt-1 text-sm text-muted">{cat.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-primary-600 opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ChevronRight className="h-4 w-4" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'reminders' && (
          <div className="space-y-4 animate-fade-in-up">
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <Bell className="h-8 w-8 text-primary-500" />
                <div>
                  <h3 className="font-bold font-display text-ink">Smart Health Reminders</h3>
                  <p className="text-sm text-muted">Never miss medicine, appointments, water, or exercise with personalized reminders.</p>
                </div>
              </div>
            </Card>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {REMINDERS.map((reminder) => (
                <Card key={reminder.title} hover className="flex items-center gap-3 p-4">
                  <div className={cn('flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-white', reminder.color)}>
                    <reminder.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-ink">{reminder.title}</h4>
                    <p className="text-xs text-muted">{reminder.desc}</p>
                  </div>
                  <Clock className="h-4 w-4 text-muted" />
                </Card>
              ))}
            </div>
            <Card className="flex flex-col items-center gap-3 p-6 text-center sm:flex-row sm:text-left">
              <Flower2 className="h-10 w-10 text-accent-500" />
              <div className="flex-1">
                <h3 className="font-bold font-display text-ink">Set up your personalized reminders</h3>
                <p className="text-sm text-muted">Get notified for medicines, water, exercise, and health check-ups right on your dashboard.</p>
              </div>
              <Button onClick={() => navigate('dashboard')}>Go to Dashboard</Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
