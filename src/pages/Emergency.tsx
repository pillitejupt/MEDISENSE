import { useState } from 'react';
import {
  AlertTriangle, Phone, MapPin, Truck, Shield, Flame, Heart,
  Baby, Skull, Ambulance, Navigation, HeartPulse, Activity,
  Siren, Cross, Stethoscope,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Card, Button, Badge } from '@/components/ui';
import { EMERGENCY_CONTACTS } from '@/lib/medical';
import { cn } from '@/lib/utils';

const FIRST_AID_GUIDES = [
  {
    title: 'Heart Attack',
    icon: HeartPulse,
    color: 'from-rose-500 to-red-600',
    steps: [
      'Call 108 (ambulance) immediately',
      'Have the person sit down and stay calm',
      'Loosen tight clothing around chest',
      'If not allergic, chew an aspirin (300mg)',
      'If trained, perform CPR if person becomes unconscious',
      'Do not give food or water',
    ],
  },
  {
    title: 'Severe Bleeding',
    icon: Activity,
    color: 'from-red-500 to-rose-600',
    steps: [
      'Apply firm direct pressure with a clean cloth',
      'Elevate the wound above heart level if possible',
      'Do not remove embedded objects — apply pressure around them',
      'Apply a bandage firmly over the dressing',
      'Call 108 if bleeding is severe or doesn\'t stop',
      'Keep the person warm and lying down',
    ],
  },
  {
    title: 'Burns',
    icon: Flame,
    color: 'from-orange-500 to-red-500',
    steps: [
      'Cool the burn under running water for 10-20 minutes',
      'Do not apply ice, butter, or toothpaste',
      'Remove jewelry/tight items near the burn before swelling',
      'Cover loosely with sterile, non-fluffy dressing',
      'Do not burst blisters',
      'Seek medical help for burns larger than the palm',
    ],
  },
  {
    title: 'Choking',
    icon: Shield,
    color: 'from-amber-500 to-orange-600',
    steps: [
      'Encourage the person to cough',
      'Give 5 back blows between shoulder blades',
      'Give 5 abdominal thrusts (Heimlich maneuver)',
      'Alternate between back blows and abdominal thrusts',
      'Call 108 if obstruction persists',
      'If unconscious, start CPR',
    ],
  },
  {
    title: 'Seizure',
    icon: Activity,
    color: 'from-purple-500 to-indigo-600',
    steps: [
      'Do not restrain the person or put anything in their mouth',
      'Clear the area of dangerous objects',
      'Cushion their head and turn them on their side',
      'Time the seizure duration',
      'Call 108 if seizure lasts over 5 minutes',
      'Stay with them until fully conscious',
    ],
  },
  {
    title: 'Snake Bite',
    icon: Cross,
    color: 'from-emerald-500 to-teal-600',
    steps: [
      'Call 108 immediately and note the snake\'s appearance',
      'Keep the person still and calm — movement spreads venom',
      'Keep the bitten limb below heart level',
      'Remove rings and tight items near the bite',
      'Do not cut the wound, suck venom, or apply ice',
      'Do not apply a tourniquet',
    ],
  },
];

const NEARBY_HOSPITALS = [
  { name: 'Apollo Hospital', distance: '1.2 km', time: '5 min', emergency: true, phone: '011-2682XXXX' },
  { name: 'Fortis Healthcare', distance: '2.8 km', time: '10 min', emergency: true, phone: '011-4712XXXX' },
  { name: 'Max Super Speciality', distance: '3.5 km', time: '12 min', emergency: true, phone: '011-2651XXXX' },
  { name: 'AIIMS Trauma Centre', distance: '4.1 km', time: '14 min', emergency: true, phone: '011-2659XXXX' },
];

const iconMap: Record<string, typeof Truck> = {
  truck: Truck, shield: Shield, flame: Flame, heart: Heart, baby: Baby, skull: Skull,
};

export function Emergency() {
  const { navigate } = useApp();
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [sharing, setSharing] = useState(false);

  const shareLocation = () => {
    setSharing(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          alert(`Location shared with emergency contacts.\nCoordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}\n\nIn a real emergency, this would be sent to nearby hospitals and your emergency contacts.`);
          setSharing(false);
        },
        () => {
          alert('Unable to access location. Please enable location services.');
          setSharing(false);
        }
      );
    } else {
      alert('Location sharing not supported on this device.');
      setSharing(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Emergency banner */}
        <Card className="mb-8 overflow-hidden p-0">
          <div className="bg-gradient-to-br from-error-500 via-rose-600 to-red-700 p-8 text-white animate-gradient">
            <div className="flex items-center gap-4">
              <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                <Siren className="h-8 w-8 animate-pulse" />
                <div className="pulse-ring absolute inset-0 rounded-2xl text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-display sm:text-3xl">Emergency Mode</h1>
                <p className="mt-1 text-white/90">Quick access to emergency services, first aid, and live location sharing.</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="tel:108" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-error-600 shadow-lg transition-transform hover:scale-105">
                <Phone className="h-5 w-5" /> Call Ambulance (108)
              </a>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white" onClick={shareLocation} disabled={sharing}>
                <Navigation className="h-5 w-5" /> {sharing ? 'Sharing...' : 'Share Live Location'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Emergency contacts */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold font-display text-ink">Emergency Contacts</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {EMERGENCY_CONTACTS.map((contact) => {
              const Icon = iconMap[contact.icon] || Phone;
              return (
                <a key={contact.service} href={`tel:${contact.number}`}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-line bg-surface p-4 text-center transition-all hover:border-error-400 hover:shadow-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-error-50 text-error-600 transition-transform group-hover:scale-110 dark:bg-error-900/30">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{contact.service}</p>
                    <p className="text-lg font-bold font-display text-error-600">{contact.number}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Nearby hospitals */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold font-display text-ink">Nearest Emergency Hospitals</h2>
            <Badge variant="error"><span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-error-500 animate-pulse" /> Live</span></Badge>
          </div>
          <div className="space-y-3">
            {NEARBY_HOSPITALS.map((hospital) => (
              <Card key={hospital.name} hover className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-error-50 text-error-600 dark:bg-error-900/30">
                  <Ambulance className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-ink">{hospital.name}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {hospital.distance}</span>
                    <span className="flex items-center gap-1"><Navigation className="h-3 w-3" /> {hospital.time} drive</span>
                    <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {hospital.phone}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href={`tel:${hospital.phone.replace(/[^0-9]/g, '')}`} className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/30"><Phone className="h-4 w-4" /></a>
                  <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-50 text-accent-600 dark:bg-accent-900/30"><Navigation className="h-4 w-4" /></button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* First aid guides */}
        <div>
          <h2 className="mb-4 text-lg font-bold font-display text-ink">First Aid Instructions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FIRST_AID_GUIDES.map((guide) => (
              <Card key={guide.title} className="overflow-hidden p-0">
                <button
                  onClick={() => setSelectedGuide(selectedGuide === guide.title ? null : guide.title)}
                  className={cn('flex w-full items-center gap-3 bg-gradient-to-br p-4 text-white', guide.color)}
                >
                  <guide.icon className="h-6 w-6" />
                  <span className="font-bold font-display">{guide.title}</span>
                  <AlertTriangle className="ml-auto h-4 w-4" />
                </button>
                {selectedGuide === guide.title && (
                  <div className="p-4 animate-fade-in">
                    <ol className="space-y-2">
                      {guide.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-ink">
                          <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">{i + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Doctor call */}
        <Card className="mt-8 flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
            <Stethoscope className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold font-display text-ink">Need to speak with a doctor urgently?</h3>
            <p className="mt-1 text-sm text-muted">Book an immediate online consultation with an available specialist.</p>
          </div>
          <Button onClick={() => navigate('doctors')}>Consult Now</Button>
        </Card>

        {/* Disclaimer */}
        <div className="mt-6 rounded-xl border border-error-200/50 bg-error-50/50 p-4 dark:border-error-900/30 dark:bg-error-900/10">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-error-600" />
            <p className="text-xs leading-relaxed text-error-800 dark:text-error-200">
              <strong>In a life-threatening emergency, call 108 immediately.</strong> Do not rely on this app for emergency medical care. The information provided here is for general guidance only and is not a substitute for professional emergency medical services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
