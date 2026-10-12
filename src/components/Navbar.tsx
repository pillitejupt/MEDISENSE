import { useState, useEffect, useRef } from 'react';
import {
  Activity, Menu, X, Sun, Moon, Globe, LogOut, LayoutDashboard,
  MessageCircle, Camera, Stethoscope, Pill, Users, FileText,
  AlertTriangle, HeartPulse, Brain, ChevronDown, Calendar,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { LANGUAGES } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import type { Page, Language } from '@/types';

const NAV_ITEMS: { page: Page; icon: typeof Activity; labelKey: string; authRequired?: boolean }[] = [
  { page: 'home', icon: Activity, labelKey: 'nav.home' },
  { page: 'dashboard', icon: LayoutDashboard, labelKey: 'nav.dashboard', authRequired: true },
  { page: 'chatbot', icon: MessageCircle, labelKey: 'nav.chatbot' },
  { page: 'camera', icon: Camera, labelKey: 'nav.camera' },
  { page: 'symptoms', icon: Stethoscope, labelKey: 'nav.symptoms' },
  { page: 'prediction', icon: Brain, labelKey: 'nav.prediction' },
  { page: 'medicines', icon: Pill, labelKey: 'nav.medicines' },
  { page: 'doctors', icon: Users, labelKey: 'nav.doctors' },
  { page: 'records', icon: FileText, labelKey: 'nav.records', authRequired: true },
  { page: 'wellness', icon: HeartPulse, labelKey: 'nav.wellness' },
  { page: 'emergency', icon: AlertTriangle, labelKey: 'nav.emergency' },
];

export function Navbar() {
  const { session, language, theme, page, navigate, setLanguage, setTheme, t } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const handleNav = (target: Page) => {
    if (target === 'home' || !NAV_ITEMS.find((n) => n.page === target)?.authRequired || session) {
      navigate(target);
    } else {
      navigate('auth');
    }
    setMobileOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    navigate('home');
  };

  const currentLang = LANGUAGES.find((l) => l.code === language);

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass-strong shadow-soft' : 'bg-transparent'
      )}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <button onClick={() => handleNav('home')} className="flex items-center gap-2.5 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-500 shadow-glow-blue transition-transform group-hover:scale-110">
              <Activity className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <span className="block text-lg font-bold font-display leading-none gradient-text">MediSense</span>
              <span className="block text-[10px] font-semibold tracking-widest text-muted">AI HEALTH</span>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.slice(0, 8).map((item) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                  page === item.page
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
                    : 'text-muted hover:bg-primary-50/50 hover:text-primary-600 dark:hover:bg-primary-900/20'
                )}
              >
                <item.icon className="h-4 w-4" />
                {t(item.labelKey)}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-primary-50/50 hover:text-primary-600 dark:hover:bg-primary-900/20"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{currentLang?.nativeLabel}</span>
                <ChevronDown className={cn('h-3 w-3 transition-transform', langOpen && 'rotate-180')} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 max-h-80 overflow-y-auto rounded-xl border border-line bg-surface p-2 shadow-card animate-scale-in">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code as Language); setLangOpen(false); }}
                      className={cn(
                        'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                        language === lang.code
                          ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
                          : 'text-ink hover:bg-primary-50/50 dark:hover:bg-primary-900/20'
                      )}
                    >
                      <span>{lang.label}</span>
                      <span className="text-xs text-muted">{lang.nativeLabel}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-primary-50/50 hover:text-primary-600 dark:hover:bg-primary-900/20"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            {/* Auth */}
            {session ? (
              <div ref={userRef} className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-sm font-bold text-white shadow-glow-blue"
                >
                  {(session.user.email?.[0] || 'U').toUpperCase()}
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-line bg-surface p-2 shadow-card animate-scale-in">
                    <div className="border-b border-line px-3 py-2">
                      <p className="truncate text-sm font-semibold text-ink">{session.user.email}</p>
                      <p className="text-xs text-muted">Signed in</p>
                    </div>
                    <button onClick={() => { handleNav('dashboard'); setUserMenuOpen(false); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink hover:bg-primary-50 dark:hover:bg-primary-900/20">
                      <LayoutDashboard className="h-4 w-4" /> {t('nav.dashboard')}
                    </button>
                    <button onClick={() => { handleNav('records'); setUserMenuOpen(false); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink hover:bg-primary-50 dark:hover:bg-primary-900/20">
                      <FileText className="h-4 w-4" /> {t('nav.records')}
                    </button>
                    <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-error-600 hover:bg-error-50 dark:hover:bg-error-900/20">
                      <LogOut className="h-4 w-4" /> {t('common.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleNav('auth')}
                className="hidden rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-2 text-sm font-semibold text-white shadow-glow-blue transition-all hover:shadow-lg hover:scale-105 sm:inline-flex"
              >
                {t('common.login')}
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-ink lg:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 overflow-y-auto glass-strong p-4 pt-20 shadow-card animate-slide-in-right">
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNav(item.page)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                    page === item.page
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
                      : 'text-ink hover:bg-primary-50/50 dark:hover:bg-primary-900/20'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {t(item.labelKey)}
                  {item.authRequired && !session && <Calendar className="ml-auto h-3 w-3 text-muted" />}
                </button>
              ))}
              {!session && (
                <button
                  onClick={() => handleNav('auth')}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-3 text-sm font-semibold text-white shadow-glow-blue"
                >
                  {t('common.login')} / {t('common.signup')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
