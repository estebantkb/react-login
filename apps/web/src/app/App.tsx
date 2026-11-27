import { useState } from 'react';
import { Navbar, type MenuSection } from '../components/ui/Navbar.tsx';
import { RickAndMortyPage } from '../modules/api/components/RickAndMortyPage.tsx';

const PLACEHOLDER_TITLES: Record<Exclude<MenuSection, 'home' | 'api'>, string> = {
  addition: 'Addition Module',
  calculator: 'Calculator Module',
  auth: 'Authentication Module',
};

export default function App() {
  const [activeSection, setActiveSection] = useState<MenuSection>('home');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar activeSection={activeSection} onSelectSection={setActiveSection} />

      <main>
        {activeSection === 'api' ? (
          <RickAndMortyPage />
        ) : activeSection === 'home' ? (
          <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Welcome to React Login
            </h1>
            <p className="mt-3 text-base text-slate-600">
              Use the navigation menu above to open a module, or jump straight into the
              Rick &amp; Morty API explorer.
            </p>
            <button
              type="button"
              onClick={() => setActiveSection('api')}
              className="mt-6 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Open Rick &amp; Morty API
            </button>
          </section>
        ) : (
          <section className="mx-auto max-w-2xl px-4 py-20 text-center">
            <h1 className="text-2xl font-bold text-slate-900">
              {PLACEHOLDER_TITLES[activeSection]}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              This module is not implemented yet.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
