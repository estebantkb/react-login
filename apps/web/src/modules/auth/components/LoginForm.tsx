import { useState, type FormEvent } from 'react'

type LoginFormProps = {
  onLogin: (username: string, password: string) => boolean
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!onLogin(username.trim(), password)) {
      setError('El usuario o la contraseña no son correctos.')
      return
    }

    setError('')
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="username">
          Usuario
        </label>
        <input
          autoComplete="username"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          id="username"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Ingresa tu usuario"
          required
          value={username}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="password">
          Contraseña
        </label>
        <input
          autoComplete="current-password"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          id="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Ingresa tu contraseña"
          required
          type="password"
          value={password}
        />
      </div>

      {error && (
        <p className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">
          {error}
        </p>
      )}

      <button
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
        type="submit"
      >
        Entrar al panel
        <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
      </button>

    </form>
  )
}
