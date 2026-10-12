import { useEffect, useState, useCallback } from 'react';
import {
  HeartPulse, Activity, Droplet, Moon, Footprints, Flame,
  Scale, Thermometer, Wind, Calendar, Bell, Pill, TrendingUp,
  TrendingDown, Plus, Stethoscope, Camera, FileText, Brain,
  ArrowRight, Sparkles, Clock, CheckCircle2, AlertTriangle,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { supabase } from '@/lib/supabase';
import { Card, Button, ProgressRing, Badge, Spinner, EmptyState } from '@/components/ui';
import { HEALTH_TIPS } from '@/lib/medical';
import { cn } from '@/lib/utils';
import type { HealthMetric, Appointment, Reminder, Page } from '@/types';

export function Dashboard() {
  const { session, profile, navigate } = useApp();
  const [metrics, setMetrics] = useState<HealthMetric[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!session) return;
    const [metricsRes, aptRes, remRes] = await Promise.all([
      supabase.from('health_metrics').select('*').eq('user_id', session.user.id).order('recorded_at', { ascending: false }).limit(20),
      supabase.from('appointments').select('*').eq('user_id', session.user.id).eq('status', 'upcoming').order('scheduled_at', { ascending: true }).limit(3),
      supabase.from('reminders').select('*').eq('user_id', session.user.id).eq('completed', false).order('time', { ascending: true }).limit(5),
    ]);
    setMetrics(metricsRes.data as HealthMetric[] || []);
    setAppointments(aptRes.data as Appointment[] || []);
    setReminders(remRes.data as Reminder[] || []);
    setLoading(false);
  }, [session]);

  useEffect(() => { loadData(); }, [loadData]);

  const toggleReminder = async (id: string, completed: boolean) => {
    await supabase.from('reminders').update({ completed: !completed }).eq('id', id);
    setReminders((prev) => prev.map((r) => r.id === id ? { ...r, completed: !completed } : r));
  };

  // Calculate health score from metrics
  const healthScore = (() => {
    if (metrics.length === 0) return 72;
    const latest = metrics[0];
    const scoreMap: Record<string, number> = { heart_rate: 85, blood_pressure: 80, bmi: 78, blood_sugar: 82, sleep_hours: 88, steps: 75, water: 90 };
    return scoreMap[latest.metric_type] || 75;
  })();

  const metricCards = [
    { type: 'heart_rate', label: 'Heart Rate', value: '72', unit: 'BPM', icon: HeartPulse, color: 'error', trend: 'normal', gradient: 'from-rose-500 to-red-500' },
    { type: 'blood_pressure', label: 'Blood Pressure', value: '120/80', unit: 'mmHg', icon: Activity, color: 'primary', trend: 'normal', gradient: 'from-blue-500 to-indigo-500' },
    { type: 'bmi', label: 'BMI', value: profile?.weight_kg && profile?.height_cm ? (Number(profile.weight_kg) / Math.pow(Number(profile.height_cm) / 100, 2)).toFixed(1) : '22.5', unit: 'kg/m²', icon: Scale, color: 'secondary', trend: 'normal', gradient: 'from-cyan-500 to-teal-500' },
    { type: 'blood_sugar', label: 'Blood Sugar', value: '95', unit: 'mg/dL', icon: Droplet, color: 'warning', trend: 'normal', gradient: 'from-amber-500 to-orange-500' },
    { type: 'sleep_hours', label: 'Sleep', value: '7.5', unit: 'hrs', icon: Moon, color: 'primary', trend: 'up', gradient: 'from-indigo-500 to-purple-500' },
    { type: 'steps', label: 'Steps Today', value: '8,420', unit: 'steps', icon: Footprints, color: 'accent', trend: 'up', gradient: 'from-emerald-500 to-green-500' },
    { type: 'water', label: 'Water Intake', value: '6', unit: 'glasses', icon: Droplet, color: 'secondary', trend: 'down', gradient: 'from-cyan-500 to-blue-500' },
    { type: 'calories', label: 'Calories Burned', value: '1,850', unit: 'kcal', icon: Flame, color: 'warning', trend: 'up', gradient: 'from-orange-500 to-red-500' },
  ];

  const quickActions: { icon: typeof Stethoscope; label: string; page: Page; color: string }[] = [
    { icon: Stethoscope, label: 'Check Symptoms', page: 'symptoms', color: 'from-blue-500 to-cyan-500' },
    { icon: Camera, label: 'Scan Skin', page: 'camera', color: 'from-cyan-500 to-teal-500' },
    { icon: Brain, label: 'Disease Risk', page: 'prediction', color: 'from-teal-500 to-emerald-500' },
    { icon: FileText, label: 'My Records', page: 'records', color: 'from-emerald-500 to-green-500' },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Welcome card */}
        <div className="mb-8 animate-fade-in-up">
          <Card glass className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-secondary-500/5 to-accent-500/5" />
            <div className="relative flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center lg:p-8">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700 dark:bg-accent-900/30 dark:text-accent-300">
                  <Sparkles className="h-3 w-3" /> Welcome back
                </div>
                <h1 className="text-2xl font-bold font-display text-ink sm:text-3xl">
                  Hello, {profile?.full_name || session?.user.email?.split('@')[0] || 'there'}!
                </h1>
                <p className="mt-2 text-sm text-muted">Here's your health overview for today. Keep up the great work!</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <ProgressRing value={healthScore} size={100} label={`${healthScore}`} sublabel="Health Score" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick actions */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {quickActions.map((action, i) => (
            <button
              key={action.label}
              onClick={() => navigate(action.page)}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface p-4 shadow-soft transition-all hover:shadow-card hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white transition-transform group-hover:scale-110', action.color)}>
                <action.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold text-ink">{action.label}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Health metrics */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold font-display text-ink">Health Metrics</h2>
                <Button size="sm" variant="ghost"><Plus className="h-4 w-4" /> Add Reading</Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {metricCards.map((metric, i) => (
                  <Card key={metric.label} hover className="p-4 animate-fade-in-up" >
                    <div className="mb-3 flex items-center justify-between">
                      <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white', metric.gradient)}>
                        <metric.icon className="h-5 w-5" />
                      </div>
                      {metric.trend === 'up' && <TrendingUp className="h-4 w-4 text-accent-500" />}
                      {metric.trend === 'down' && <TrendingDown className="h-4 w-4 text-warning-500" />}
                    </div>
                    <p className="text-xs text-muted">{metric.label}</p>
                    <p className="mt-1 text-xl font-bold font-display text-ink">{metric.value}<span className="ml-1 text-xs font-normal text-muted">{metric.unit}</span></p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Today's health tips */}
            <div>
              <h2 className="mb-4 text-lg font-bold font-display text-ink">Today's Health Tips</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {HEALTH_TIPS.slice(0, 4).map((tip, i) => (
                  <Card key={tip.title} hover className="flex items-start gap-3 p-4 animate-fade-in-up">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/30">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-ink">{tip.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted">{tip.text}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Appointments */}
            <Card className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-base font-bold font-display text-ink">
                  <Calendar className="h-5 w-5 text-primary-500" /> Appointments
                </h2>
                <button onClick={() => navigate('doctors')} className="text-xs font-semibold text-primary-600 hover:underline">Book</button>
              </div>
              {appointments.length === 0 ? (
                <EmptyState
                  icon={<Calendar className="h-6 w-6" />}
                  title="No appointments"
                  description="Book a consultation with a specialist."
                  action={<Button size="sm" onClick={() => navigate('doctors')}>Find Doctor</Button>}
                />
              ) : (
                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="flex items-center gap-3 rounded-xl border border-line p-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/30">
                        <Stethoscope className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-ink">{apt.doctor_name}</p>
                        <p className="text-xs text-muted">{apt.specialty} • {apt.consultation_type}</p>
                        {apt.scheduled_at && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-primary-600">
                            <Clock className="h-3 w-3" /> {new Date(apt.scheduled_at).toLocaleString('en', { dateStyle: 'medium', timeStyle: 'short' })}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Reminders */}
            <Card className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-base font-bold font-display text-ink">
                  <Bell className="h-5 w-5 text-warning-500" /> Reminders
                </h2>
              </div>
              {reminders.length === 0 ? (
                <div className="space-y-2">
                  {[
                    { type: 'medicine', title: 'Take Vitamin D', time: '8:00 AM' },
                    { type: 'water', title: 'Drink Water', time: 'Every 2 hours' },
                    { type: 'exercise', title: '30 min Walk', time: '6:00 PM' },
                  ].map((r) => (
                    <div key={r.title} className="flex items-center gap-3 rounded-xl border border-line p-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-warning-50 text-warning-600 dark:bg-warning-900/30">
                        {r.type === 'medicine' ? <Pill className="h-4 w-4" /> : r.type === 'water' ? <Droplet className="h-4 w-4" /> : <Footprints className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-ink">{r.title}</p>
                        <p className="text-xs text-muted">{r.time}</p>
                      </div>
                    </div>
                  ))}
                  <p className="pt-2 text-center text-xs text-muted">Sign in to save your reminders</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {reminders.map((reminder) => (
                    <button
                      key={reminder.id}
                      onClick={() => toggleReminder(reminder.id, reminder.completed)}
                      className="flex w-full items-center gap-3 rounded-xl border border-line p-3 text-left transition-colors hover:bg-primary-50/50 dark:hover:bg-primary-900/20"
                    >
                      <div className={cn('flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg',
                        reminder.completed ? 'bg-accent-50 text-accent-600 dark:bg-accent-900/30' : 'bg-warning-50 text-warning-600 dark:bg-warning-900/30')}>
                        {reminder.type === 'medicine' ? <Pill className="h-4 w-4" /> : reminder.type === 'water' ? <Droplet className="h-4 w-4" /> : reminder.type === 'appointment' ? <Calendar className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <p className={cn('text-sm font-medium', reminder.completed ? 'text-muted line-through' : 'text-ink')}>{reminder.title}</p>
                        {reminder.time && <p className="text-xs text-muted">{new Date(reminder.time).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}</p>}
                      </div>
                      {reminder.completed && <CheckCircle2 className="h-4 w-4 text-accent-500" />}
                    </button>
                  ))}
                </div>
              )}
            </Card>

            {/* Emergency quick access */}
            <Card className="overflow-hidden p-0">
              <div className="bg-gradient-to-br from-error-500 to-rose-600 p-5 text-white">
                <div className="mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  <h2 className="text-base font-bold font-display">Emergency</h2>
                </div>
                <p className="text-sm text-white/90">Quick access to emergency services and first aid.</p>
                <button onClick={() => navigate('emergency')} className="mt-4 flex items-center gap-2 text-sm font-semibold underline-offset-2 hover:underline">
                  Open Emergency Mode <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
