import { useState, useMemo } from 'react';
import {
  Search, Star, Video, MessageCircle, MapPin, Clock, Globe,
  Stethoscope, X, CheckCircle2, Sparkles, Award, Users,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { supabase } from '@/lib/supabase';
import { Card, Button, Badge } from '@/components/ui';
import { DOCTORS, SPECIALTIES } from '@/lib/medical';
import { cn } from '@/lib/utils';
import type { Doctor } from '@/types';

export function Doctors() {
  const { session, navigate } = useApp();
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [consultType, setConsultType] = useState<string>('video');

  const filtered = useMemo(() => {
    return DOCTORS.filter((d) => {
      const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.specialty.toLowerCase().includes(search.toLowerCase()) ||
        d.hospital.toLowerCase().includes(search.toLowerCase());
      const matchesSpecialty = !specialty || d.specialty === specialty;
      return matchesSearch && matchesSpecialty;
    });
  }, [search, specialty]);

  const handleBook = async () => {
    if (!selectedDoctor) return;
    if (!session) {
      navigate('auth');
      return;
    }
    setBooking(true);
    const scheduledDate = new Date();
    scheduledDate.setDate(scheduledDate.getDate() + 1);
    scheduledDate.setHours(11, 0, 0, 0);

    await supabase.from('appointments').insert({
      user_id: session.user.id,
      doctor_name: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      consultation_type: consultType,
      scheduled_at: scheduledDate.toISOString(),
      status: 'upcoming',
    });
    setBooking(false);
    setBooked(true);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
    setBooked(false);
    setConsultType('video');
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Badge variant="primary" className="mb-2"><Sparkles className="h-3 w-3" /> Multi-Speciality Platform</Badge>
          <h1 className="text-2xl font-bold font-display text-ink sm:text-3xl">Find & Consult Doctors</h1>
          <p className="mt-2 text-sm text-muted">Book video, chat, or in-person consultations with verified specialist doctors across India.</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          {[
            { icon: Users, label: 'Verified Doctors', value: '12,500+' },
            { icon: Award, label: 'Specialties', value: '15+' },
            { icon: Star, label: 'Avg Rating', value: '4.8/5' },
          ].map((stat) => (
            <Card key={stat.label} className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/30">
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-bold font-display text-ink">{stat.value}</p>
                <p className="text-xs text-muted">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Search & filter */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by doctor name, specialty, or hospital..."
              className="w-full rounded-xl border border-line bg-surface py-3 pl-10 pr-4 text-sm text-ink placeholder:text-muted focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
            />
          </div>
        </div>

        {/* Specialty filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setSpecialty(null)}
            className={cn('rounded-full px-4 py-1.5 text-sm font-medium transition-all',
              !specialty ? 'bg-primary-600 text-white' : 'border border-line bg-surface text-ink hover:border-primary-400')}
          >
            All Specialties
          </button>
          {SPECIALTIES.map((spec) => (
            <button
              key={spec}
              onClick={() => setSpecialty(specialty === spec ? null : spec)}
              className={cn('rounded-full px-4 py-1.5 text-sm font-medium transition-all',
                specialty === spec ? 'bg-primary-600 text-white' : 'border border-line bg-surface text-ink hover:border-primary-400')}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Doctor grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} onBook={() => { setSelectedDoctor(doctor); setBooked(false); }} />
          ))}
        </div>

        {filtered.length === 0 && (
          <Card className="p-12 text-center">
            <Stethoscope className="mx-auto mb-3 h-10 w-10 text-muted" />
            <p className="text-sm text-muted">No doctors found. Try a different search or specialty.</p>
          </Card>
        )}
      </div>

      {/* Booking modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in" onClick={closeModal} />
          <Card className="relative z-10 w-full max-w-lg overflow-hidden p-0 animate-scale-in">
            {booked ? (
              <div className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-50 text-accent-600 dark:bg-accent-900/30">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-display text-ink">Appointment Booked!</h3>
                <p className="mt-2 text-sm text-muted">Your consultation with {selectedDoctor.name} is confirmed. Check your dashboard for details.</p>
                <div className="mt-4 rounded-xl bg-primary-50/50 p-4 text-left dark:bg-primary-900/20">
                  <div className="flex items-center gap-2 text-sm text-ink"><Clock className="h-4 w-4 text-primary-500" /> Tomorrow at 11:00 AM</div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-ink"><Video className="h-4 w-4 text-primary-500" /> {consultType === 'video' ? 'Video Consultation' : consultType === 'chat' ? 'Chat Consultation' : 'In-Person Visit'}</div>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button fullWidth variant="outline" onClick={closeModal}>Close</Button>
                  <Button fullWidth onClick={() => { closeModal(); navigate('dashboard'); }}>View Dashboard</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="relative">
                  <div className="h-24 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500" />
                  <button onClick={closeModal} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/30">
                    <X className="h-4 w-4" />
                  </button>
                  <img src={selectedDoctor.image} alt={selectedDoctor.name} className="absolute -bottom-8 left-6 h-20 w-20 rounded-2xl border-4 border-surface object-cover shadow-card" />
                </div>
                <div className="p-6 pt-12">
                  <h3 className="text-lg font-bold font-display text-ink">{selectedDoctor.name}</h3>
                  <p className="text-sm text-primary-600">{selectedDoctor.specialty}</p>
                  <p className="mt-1 text-xs text-muted">{selectedDoctor.qualification}</p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-ink"><Award className="h-4 w-4 text-primary-500" /> {selectedDoctor.experience} yrs exp</div>
                    <div className="flex items-center gap-2 text-ink"><Star className="h-4 w-4 text-warning-500 fill-warning-500" /> {selectedDoctor.rating} ({selectedDoctor.reviews})</div>
                    <div className="flex items-center gap-2 text-ink"><MapPin className="h-4 w-4 text-primary-500" /> {selectedDoctor.hospital}</div>
                    <div className="flex items-center gap-2 text-ink"><Clock className="h-4 w-4 text-primary-500" /> {selectedDoctor.nextAvailable}</div>
                  </div>

                  <div className="mt-4">
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted"><Globe className="h-3 w-3" /> Languages</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDoctor.languages.map((lang) => <Badge key={lang} variant="neutral">{lang}</Badge>)}
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="mb-2 text-sm font-semibold text-ink">Select Consultation Type</p>
                    <div className="grid grid-cols-3 gap-2">
                      {(['video', 'chat', 'in-person'] as const).filter((m) => selectedDoctor.mode.includes(m)).map((type) => (
                        <button
                          key={type}
                          onClick={() => setConsultType(type)}
                          className={cn('flex flex-col items-center gap-1.5 rounded-xl border py-3 text-xs font-medium transition-all',
                            consultType === type ? 'border-primary-400 bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'border-line text-muted hover:border-primary-300')}
                        >
                          {type === 'video' ? <Video className="h-5 w-5" /> : type === 'chat' ? <MessageCircle className="h-5 w-5" /> : <MapPin className="h-5 w-5" />}
                          {type === 'video' ? 'Video' : type === 'chat' ? 'Chat' : 'In-Person'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-xl bg-primary-50/50 p-3 dark:bg-primary-900/20">
                    <span className="text-sm text-muted">Consultation Fee</span>
                    <span className="text-lg font-bold font-display text-ink">₹{selectedDoctor.fee}</span>
                  </div>

                  <Button fullWidth size="lg" className="mt-4" onClick={handleBook} disabled={booking}>
                    {booking ? 'Booking...' : session ? `Book for ₹${selectedDoctor.fee}` : 'Sign in to Book'}
                  </Button>
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

function DoctorCard({ doctor, onBook }: { doctor: Doctor; onBook: () => void }) {
  return (
    <Card hover className="overflow-hidden p-0">
      <div className="relative h-28 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-accent-500/10">
        <img src={doctor.image} alt={doctor.name} className="absolute -bottom-8 left-6 h-20 w-20 rounded-2xl border-4 border-surface object-cover shadow-card" />
        <div className="absolute right-3 top-3">
          <Badge variant="success"><span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-accent-500" /> Available</span></Badge>
        </div>
      </div>
      <div className="p-5 pt-12">
        <h3 className="font-bold font-display text-ink">{doctor.name}</h3>
        <p className="text-sm text-primary-600">{doctor.specialty}</p>
        <p className="mt-1 text-xs text-muted">{doctor.qualification}</p>

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-muted"><Award className="h-3 w-3 text-primary-500" /> {doctor.experience} yrs</div>
          <div className="flex items-center gap-1.5 text-muted"><Star className="h-3 w-3 fill-warning-400 text-warning-400" /> {doctor.rating}</div>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
          <Clock className="h-3 w-3 text-accent-500" /> {doctor.nextAvailable}
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {doctor.mode.map((m) => (
            <Badge key={m} variant="neutral" className="text-[10px]">
              {m === 'video' ? 'Video' : m === 'chat' ? 'Chat' : 'In-Person'}
            </Badge>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold font-display text-ink">₹{doctor.fee}</span>
            <span className="text-xs text-muted">/session</span>
          </div>
          <Button size="sm" onClick={onBook}>Book Now</Button>
        </div>
      </div>
    </Card>
  );
}
