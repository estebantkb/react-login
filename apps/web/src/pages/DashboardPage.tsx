type DashboardPageProps = {
  onLogout: () => void
}

type Application = {
  id: string
  name: string
  description: string
  symbol: string
  color: string
  href: string
}

const applications: Application[] = [
  {
    id: 'addition',
    name: 'Suma',
    description: 'Suma dos números y consulta el resultado.',
    symbol: '+',
    color: 'bg-blue-50 text-blue-700 ring-blue-100',
    href: '/addition',
  },
  {
    id: 'calculator',
    name: 'Calculadora',
    description: 'Realiza operaciones matemáticas básicas.',
    symbol: '÷',
    color: 'bg-violet-50 text-violet-700 ring-violet-100',
    href: '/calculator',
  },
  {
    id: 'api',
    name: 'API',
    description: 'Consulta información desde el servicio del proyecto.',
    symbol: '{ }',
    color: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    href: '/api',
  },
]

export function DashboardPage({ onLogout }: DashboardPageProps) {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-slate-900">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-lg font-bold text-white">∑</span>
            <span className="font-bold tracking-tight">Aplicaciones</span>
          </div>
          <button
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            onClick={onLogout}
            type="button"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Panel principal</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Dashboard</h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Accede a las aplicaciones del proyecto desde un solo lugar.
          </p>
        </div>

        <nav aria-label="Aplicaciones disponibles" className="grid gap-5 md:grid-cols-3">
          {applications.map((application, index) => (
            <a
              className="group flex min-h-64 flex-col items-start rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/60 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              href={application.href}
              key={application.id}
            >
              <div className="mb-7 flex w-full items-center justify-between">
                <span className={`grid h-14 w-14 place-items-center rounded-2xl text-2xl font-bold ring-1 ${application.color}`}>
                  {application.symbol}
                </span>
                <span className="text-sm font-semibold text-slate-300">0{index + 1}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{application.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{application.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700">
                Abrir aplicación
                <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </span>
            </a>
          ))}
        </nav>
      </div>
    </main>
  )
}
