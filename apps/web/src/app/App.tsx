import { useEffect, useState } from 'react';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { useDemoAuth } from '../modules/auth/hooks/useDemoAuth';
import { RickAndMortyPage } from '../modules/api/components/RickAndMortyPage.tsx';
import Addition from '../modules/addition/components/Addition';
import Calculator from '../modules/calculator/components/Calculator';

export default function App() {
  const { isAuthenticated, login, logout } = useDemoAuth();
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
  };

  if (!isAuthenticated) {
    if (currentPath === '/register') {
      return <RegisterPage onBack={() => navigate('/')} />;
    }

    return <LoginPage onLogin={login} onRegister={() => navigate('/register')} />;
  }

  if (currentPath === '/api') {
    return <RickAndMortyPage onBack={() => navigate('/')} onLogout={logout} />;
  }

  if (currentPath === '/addition' || currentPath === '/calculator') {
    const isAddition = currentPath === '/addition';

    return (
      <main className="min-h-screen bg-slate-50">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <button
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              onClick={() => navigate('/')}
              type="button"
            >
              &larr; Volver al panel
            </button>
            <button
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              onClick={logout}
              type="button"
            >
              Cerrar sesión
            </button>
          </div>
        </header>
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          {isAddition ? <Addition /> : <Calculator />}
        </section>
      </main>
    );
  }

  return <DashboardPage onLogout={logout} onNavigate={navigate} />;
}
