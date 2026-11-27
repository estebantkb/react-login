import { useEffect, useState } from 'react';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { useDemoAuth } from '../modules/auth/hooks/useDemoAuth';
import { RickAndMortyPage } from '../modules/api/components/RickAndMortyPage.tsx';

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
    return <LoginPage onLogin={login} />;
  }

  if (currentPath === '/api') {
    return <RickAndMortyPage onBack={() => navigate('/')} onLogout={logout} />;
  }

  return <DashboardPage onLogout={logout} onNavigate={navigate} />;
}
