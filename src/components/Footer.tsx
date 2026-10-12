import { Activity, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { EMERGENCY_CONTACTS } from '@/lib/medical';
import type { Page } from '@/types';

export function Footer() {
  const { t, navigate } = useApp();

  const quickLinks: { label: string; page: Page }[] = [
    { label: t('nav.chatbot'), page: 'chatbot' },
    { label: t('nav.camera'), page: 'camera' },
    { label: t('nav.symptoms'), page: 'symptoms' },
    { label: t('nav.prediction'), page: 'prediction' },
    { label: t('nav.doctors'), page: 'doctors' },
    { label: t('nav.wellness'), page: 'wellness' },
  ];

  return (
    <footer className="relative mt-20 border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-500">
                <Activity className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="block text-lg font-bold font-display gradient-text">MediSense AI</span>
                <span className="block text-[10px] font-semibold tracking-widest text-muted">AI HEALTH ADVISOR</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              Your personal AI health advisor available 24/7. Predict diseases, analyze symptoms, and get personalized healthcare guidance.
            </p>
            <div className="flex gap-2">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-all hover:bg-primary-600 hover:text-white dark:bg-primary-900/30">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-ink">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button onClick={() => navigate(link.page)} className="text-sm text-muted transition-colors hover:text-primary-600">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency contacts */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-ink">Emergency Numbers</h4>
            <ul className="space-y-2">
              {EMERGENCY_CONTACTS.slice(0, 5).map((contact) => (
                <li key={contact.service} className="flex items-center justify-between text-sm">
                  <span className="text-muted">{contact.service}</span>
                  <a href={`tel:${contact.number}`} className="font-semibold text-primary-600 hover:underline">{contact.number}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-ink">Contact Us</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-primary-500" />
                <span>1800-200-HEALTH (toll free)</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-primary-500" />
                <span>support@medisense.ai</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary-500" />
                <span>Tech Park, Bengaluru, Karnataka 560100</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 rounded-xl border border-warning-200/50 bg-warning-50/50 p-4 dark:border-warning-900/30 dark:bg-warning-900/10">
          <p className="text-xs leading-relaxed text-warning-800 dark:text-warning-200">
            <strong>Medical Disclaimer:</strong> {t('disclaimer')}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-xs text-muted">© 2026 MediSense AI. All rights reserved. For educational purposes only.</p>
          <p className="flex items-center gap-1 text-xs text-muted">
            Made with <Heart className="h-3 w-3 fill-error-500 text-error-500" /> for healthier lives
          </p>
        </div>
      </div>
    </footer>
  );
}
