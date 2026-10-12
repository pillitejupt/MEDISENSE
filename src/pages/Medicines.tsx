import { useState } from 'react';
import {
  Pill, Search, AlertTriangle, Info, CheckCircle2, ChevronDown,
  ChevronUp, Sparkles, ShoppingCart, Activity, Shield,
} from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import { MEDICINE_DATABASE } from '@/lib/medical';
import { cn } from '@/lib/utils';
import type { Medicine } from '@/types';

export function Medicines() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const medicines = Object.values(MEDICINE_DATABASE);
  const filtered = medicines.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.purpose.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Badge variant="primary" className="mb-2"><Sparkles className="h-3 w-3" /> Educational Database</Badge>
          <h1 className="text-2xl font-bold font-display text-ink sm:text-3xl">Medicine Information</h1>
          <p className="mt-2 text-sm text-muted">Search for medicines to learn about their purpose, dosage, side effects, and precautions. For educational use only.</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medicines by name or purpose..."
            className="w-full rounded-xl border border-line bg-surface py-3 pl-10 pr-4 text-sm text-ink placeholder:text-muted focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900"
          />
        </div>

        {/* Medicine cards */}
        <div className="space-y-4">
          {filtered.map((medicine) => (
            <MedicineCard
              key={medicine.name}
              medicine={medicine}
              expanded={expanded === medicine.name}
              onToggle={() => setExpanded(expanded === medicine.name ? null : medicine.name)}
            />
          ))}
          {filtered.length === 0 && (
            <Card className="p-8 text-center">
              <Pill className="mx-auto mb-3 h-10 w-10 text-muted" />
              <p className="text-sm text-muted">No medicines found. Try a different search.</p>
            </Card>
          )}
        </div>

        {/* Warning */}
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-error-200/50 bg-error-50/50 p-4 dark:border-error-900/30 dark:bg-error-900/10">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-error-600" />
              <div>
                <p className="font-bold text-error-800 dark:text-error-200">Important Warning</p>
                <p className="mt-1 text-xs leading-relaxed text-error-700 dark:text-error-300">
                  Medicine information on MediSense AI is for educational purposes only. Always consult a licensed healthcare professional before starting, stopping, or changing any medication. Dosage and suitability vary by individual. Prescription medications require a doctor's prescription.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MedicineCard({ medicine, expanded, onToggle }: { medicine: Medicine; expanded: boolean; onToggle: () => void }) {
  const availabilityVariant = medicine.availability === 'Over-the-counter' ? 'success' : 'warning';

  return (
    <Card hover className="overflow-hidden">
      <button onClick={onToggle} className="flex w-full items-center justify-between p-5 text-left">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
            <Pill className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold font-display text-ink">{medicine.name}</h3>
            <p className="text-sm text-muted">{medicine.purpose}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={availabilityVariant as 'success' | 'warning'}>{medicine.availability}</Badge>
          {expanded ? <ChevronUp className="h-5 w-5 text-muted" /> : <ChevronDown className="h-5 w-5 text-muted" />}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-line p-5 animate-fade-in">
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoBlock icon={Activity} label="Dosage" value={medicine.dosage} />
            <InfoBlock icon={Info} label="How to Take" value={medicine.howToTake} />
            <InfoBlock icon={ShoppingCart} label="Price Estimate" value={medicine.priceEstimate} />
            <InfoBlock icon={Shield} label="Availability" value={medicine.availability} />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-error-600"><AlertTriangle className="h-4 w-4" /> Possible Side Effects</p>
              <ul className="space-y-1">
                {medicine.sideEffects.map((effect) => (
                  <li key={effect} className="flex items-start gap-2 text-sm text-ink"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-error-500" /> {effect}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-warning-600"><Info className="h-4 w-4" /> Precautions</p>
              <ul className="space-y-1">
                {medicine.precautions.map((precaution) => (
                  <li key={precaution} className="flex items-start gap-2 text-sm text-ink"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning-500" /> {precaution}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-accent-600"><CheckCircle2 className="h-4 w-4" /> Alternative Medicines</p>
            <div className="flex flex-wrap gap-2">
              {medicine.alternatives.map((alt) => (
                <Badge key={alt} variant="success">{alt}</Badge>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-warning-50/50 p-3 dark:bg-warning-900/10">
            <p className="text-xs text-warning-800 dark:text-warning-200">
              ⚠ This information is educational only. Consult a doctor before taking any medication.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}

function InfoBlock({ icon: Icon, label, value }: { icon: typeof Activity; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line p-3">
      <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-muted"><Icon className="h-3 w-3" /> {label}</p>
      <p className="text-sm text-ink">{value}</p>
    </div>
  );
}
