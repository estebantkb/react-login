import { RegisterForm } from '../modules/auth/components/RegisterForm'

type RegisterPageProps = {
  onBack: () => void
}

export function RegisterPage({ onBack }: RegisterPageProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10">
      <div aria-hidden="true" className="pointer-events-none absolute -left-36 -top-40 h-96 w-96 rounded-full bg-indigo-200/50 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -right-32 h-[30rem] w-[30rem] rounded-full bg-sky-200/50 blur-3xl" />

      <section className="relative w-full max-w-lg rounded-[2rem] bg-white px-7 py-9 shadow-2xl shadow-slate-300/50 sm:px-10 sm:py-11">
        <button
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900"
          onClick={onBack}
          type="button"
        >
          <span aria-hidden="true">←</span> Volver al inicio de sesión
        </button>
        <p className="text-sm font-semibold text-indigo-600">Únete a nuestro proyecto</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Crear cuenta</h1>
        <p className="mb-7 mt-2 text-sm leading-6 text-slate-500">
          Completa tus datos para probar el formulario de registro.
        </p>
        <RegisterForm />
      </section>
    </main>
  )
}
