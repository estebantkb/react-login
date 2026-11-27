import { useEffect, useState } from 'react';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
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
    if (currentPath === '/register') {
      return <RegisterPage onBack={() => navigate('/')} />;
    }

    return <LoginPage onLogin={login} onRegister={() => navigate('/register')} />;
  }

  if (currentPath === '/api') {
    return <RickAndMortyPage onBack={() => navigate('/')} onLogout={logout} />;
  }

  return <DashboardPage onLogout={logout} onNavigate={navigate} />;
}
