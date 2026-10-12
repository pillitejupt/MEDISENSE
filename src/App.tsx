import { AppProvider, useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Spinner } from '@/components/ui';
import { Home } from '@/pages/Home';
import { Auth } from '@/pages/Auth';
import { Dashboard } from '@/pages/Dashboard';
import { Chatbot } from '@/pages/Chatbot';
import { CameraScan } from '@/pages/CameraScan';
import { Symptoms } from '@/pages/Symptoms';
import { Prediction } from '@/pages/Prediction';
import { Medicines } from '@/pages/Medicines';
import { Doctors } from '@/pages/Doctors';
import { Records } from '@/pages/Records';
import { Emergency } from '@/pages/Emergency';
import { Wellness } from '@/pages/Wellness';
import type { Page } from '@/types';

function PageRouter() {
  const { page, session, loading } = useApp();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin" />
          </div>
          <p className="text-sm font-medium text-muted">Loading MediSense AI...</p>
        </div>
      </div>
    );
  }

  // Pages that require authentication
  const authRequired: Page[] = ['dashboard', 'records'];
  const needsAuth = authRequired.includes(page);

  if (needsAuth && !session) {
    return <Auth />;
  }

  const pages: Record<Page, React.ReactNode> = {
    home: <Home />,
    auth: <Auth />,
    dashboard: <Dashboard />,
    chatbot: <Chatbot />,
    camera: <CameraScan />,
    symptoms: <Symptoms />,
    prediction: <Prediction />,
    medicines: <Medicines />,
    doctors: <Doctors />,
    records: <Records />,
    emergency: <Emergency />,
    wellness: <Wellness />,
  };

  return <>{pages[page]}</>;
}

function AppShell() {
  const { page } = useApp();
  const hideFooter = page === 'auth' || page === 'chatbot' || page === 'camera';

  return (
    <div className="min-h-screen bg-bg text-ink">
      <Navbar />
      <main>
        <PageRouter />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
