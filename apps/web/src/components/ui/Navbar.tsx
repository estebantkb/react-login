import { useState } from 'react';

export type MenuSection = 'home' | 'api' | 'addition' | 'calculator' | 'auth';

interface NavItem {
  id: MenuSection;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'api', label: 'Rick & Morty API' },
  { id: 'addition', label: 'Addition' },
  { id: 'calculator', label: 'Calculator' },
  { id: 'auth', label: 'Auth' },
];

interface NavbarProps {
  activeSection: MenuSection;
  onSelectSection: (section: MenuSection) => void;
}

/**
 * Responsive top navigation bar with a collapsible menu on mobile screens.
 */
export function Navbar({ activeSection, onSelectSection }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSelect = (section: MenuSection) => {
    onSelectSection(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-6xl px-4 py-3"
      >
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => handleSelect('home')}
            className="text-base font-bold tracking-tight text-slate-900 hover:text-emerald-700 sm:text-lg"
          >
            React Login App
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-100 md:hidden"
          >
            <span className="text-lg leading-none">
              {isMobileMenuOpen ? '\u2715' : '\u2630'}
            </span>
          </button>

          <ul className="hidden items-center gap-1.5 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = item.id === activeSection;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {isMobileMenuOpen && (
          <ul
            id="mobile-nav-menu"
            className="mt-3 flex flex-col gap-1 border-t border-slate-100 pt-3 md:hidden"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = item.id === activeSection;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </header>
  );
}
