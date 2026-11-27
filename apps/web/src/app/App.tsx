import { DashboardPage } from '../pages/DashboardPage'
import { LoginPage } from '../pages/LoginPage'
import { useDemoAuth } from '../modules/auth/hooks/useDemoAuth'

export default function App() {
  const { isAuthenticated, login, logout } = useDemoAuth()

  if (!isAuthenticated) {
    return <LoginPage onLogin={login} />
  }

  return <DashboardPage onLogout={logout} />
}
