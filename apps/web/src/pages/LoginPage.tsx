import { LoginForm } from '../modules/auth/components/LoginForm'

type LoginPageProps = {
  onLogin: (username: string, password: string) => boolean
  onRegister: () => void
}

export function LoginPage({ onLogin, onRegister }: LoginPageProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10">
      <div aria-hidden="true" className="pointer-events-none absolute -left-36 -top-40 h-96 w-96 rounded-full bg-indigo-200/50 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -right-32 h-[30rem] w-[30rem] rounded-full bg-sky-200/50 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-300/50 md:grid-cols-2">
        <section className="flex flex-col justify-between bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 p-8 text-white sm:p-12">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 text-xl font-bold ring-1 ring-white/20">
              ∑
            </div>
            <span className="font-semibold tracking-wide">Aplicaciones</span>
          </div>

          <div className="py-12">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-200">
              Nuestro proyecto
            </p>
            <h1 className="max-w-md text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Herramientas útiles, hechas en equipo.
            </h1>
            <p className="mt-5 max-w-sm leading-7 text-indigo-100">
              Inicia sesión para acceder a nuestras aplicaciones.
            </p>
          </div>

          <div className="border-t border-white/20 pt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
              Nuestro equipo
            </p>
            <ul className="flex flex-wrap gap-2 text-sm text-white">
              <li className="rounded-full bg-white/10 px-3 py-1.5">Esteban Narvaez</li>
              <li className="rounded-full bg-white/10 px-3 py-1.5">Bruno Sampedro</li>
              <li className="rounded-full bg-white/10 px-3 py-1.5">Daniel Tumbaco</li>
            </ul>
          </div>
        </section>

        <section className="flex items-center px-8 py-10 sm:px-12 sm:py-14">
          <div className="mx-auto w-full max-w-sm">
            <p className="text-sm font-semibold text-indigo-600">Bienvenido de nuevo</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Iniciar sesión</h2>
            <p className="mt-2 mb-8 text-sm leading-6 text-slate-500">
              Ingresa tus datos para continuar al panel principal.
            </p>
            <LoginForm onLogin={onLogin} />
            <p className="mt-6 text-center text-sm text-slate-600">
              ¿No tienes cuenta?{' '}
              <button
                className="font-semibold text-indigo-700 hover:text-indigo-900"
                onClick={onRegister}
                type="button"
              >
                Regístrate
              </button>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
