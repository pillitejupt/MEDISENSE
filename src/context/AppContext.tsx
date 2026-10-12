import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { t as translate } from '@/lib/i18n';
import type { Language, Theme, Page, Profile } from '@/types';

interface AppState {
  session: Session | null;
  profile: Profile | null;
  language: Language;
  theme: Theme;
  page: Page;
  loading: boolean;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  navigate: (page: Page) => void;
  setProfile: (profile: Profile | null) => void;
  refreshProfile: () => Promise<void>;
  t: (key: string) => string;
}

const AppContext = createContext<AppState | undefined>(undefined);

const LANG_KEY = 'medisense_lang';
const THEME_KEY = 'medisense_theme';

export function AppProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(LANG_KEY);
    return (saved as Language) || 'en';
  });
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    return (saved as Theme) || 'light';
  });
  const [page, setPage] = useState<Page>('home');
  const [loading, setLoading] = useState(true);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, language);
  }, [language]);

  // Auth state listener
  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setSession(session);
      if (session) loadProfile(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setSession(session);
        if (session) {
          await loadProfile(session.user.id);
          setPage('dashboard');
        } else {
          setProfile(null);
          setPage('home');
        }
        setLoading(false);
      })();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const loadProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    if (error) {
      console.error('Profile load error:', error);
    }
    setProfile(data as Profile | null);
    setLoading(false);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (session) await loadProfile(session.user.id);
  }, [session, loadProfile]);

  const setLanguage = useCallback((lang: Language) => setLanguageState(lang), []);
  const setTheme = useCallback((newTheme: Theme) => setThemeState(newTheme), []);
  const navigate = useCallback((newPage: Page) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const t = useCallback((key: string) => translate(language, key), [language]);

  return (
    <AppContext.Provider value={{
      session, profile, language, theme, page, loading,
      setLanguage, setTheme, navigate, setProfile, refreshProfile, t,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
