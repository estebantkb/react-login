const DEMO_USERNAME = 'admin'
const DEMO_PASSWORD = '1234'

export function isValidDemoCredentials(username: string, password: string) {
  return username === DEMO_USERNAME && password === DEMO_PASSWORD
}
