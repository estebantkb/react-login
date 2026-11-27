import { useState } from 'react'
import { isValidDemoCredentials } from '../model/demoCredentials'

export function useDemoAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  function login(username: string, password: string) {
    if (!isValidDemoCredentials(username, password)) {
      return false
    }

    setIsAuthenticated(true)
    return true
  }

  function logout() {
    setIsAuthenticated(false)
  }

  return { isAuthenticated, login, logout }
}
