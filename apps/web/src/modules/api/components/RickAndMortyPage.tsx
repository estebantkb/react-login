import { useEffect, useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce.ts';
import type { ApiInfo, Character } from '../model/rickAndMorty.ts';
import { fetchCharacters } from '../services/rickAndMortyService.ts';
import { CharacterCard } from './CharacterCard.tsx';
import { CharacterModal } from './CharacterModal.tsx';

const INITIAL_INFO: ApiInfo = {
  count: 0,
  pages: 0,
  next: null,
  prev: null,
};

interface RickAndMortyPageProps {
  onBack?: () => void;
  onLogout?: () => void;
}

/**
 * Displays the Rick & Morty character directory with debounced search,
 * pagination, and a detail popup modal.
 */
export function RickAndMortyPage({ onBack, onLogout }: RickAndMortyPageProps) {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 400);

  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<ApiInfo>(INITIAL_INFO);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [reloadCounter, setReloadCounter] = useState(0);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const loadCharacters = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const data = await fetchCharacters({
          page,
          name: debouncedSearch,
          signal: controller.signal,
        });

        if (!isActive) {
          return;
        }

        setCharacters(data.results);
        setInfo(data.info);
      } catch (error) {
        if (!isActive || (error instanceof DOMException && error.name === 'AbortError')) {
          return;
        }

        const message =
          error instanceof Error ? error.message : 'Unexpected error loading characters.';
        setErrorMessage(message);
        setCharacters([]);
        setInfo(INITIAL_INFO);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadCharacters();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [page, debouncedSearch, reloadCounter]);

  return (
    <main className="min-h-screen bg-slate-50">
      {(onBack || onLogout) && (
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-3 sm:px-4">
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                &larr; Back to Dashboard
              </button>
            ) : (
              <span />
            )}

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      <section className="mx-auto w-full max-w-6xl px-3 py-6 sm:px-4 sm:py-8">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Rick &amp; Morty Explorer
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Browse characters from the Rick &amp; Morty API. Click any card to view full details.
          </p>
        </div>

        <div className="relative w-full sm:w-80">
          <label htmlFor="character-search" className="sr-only">
            Search characters by name
          </label>
          <input
            id="character-search"
            type="search"
            value={searchInput}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Search character by name..."
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 pr-10 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => handleSearchChange('')}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full px-1.5 py-0.5 text-sm font-semibold text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              &times;
            </button>
          )}
        </div>
      </header>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-slate-500">
        <span>
          {isLoading
            ? 'Loading characters...'
            : `${info.count} character${info.count === 1 ? '' : 's'} found`}
        </span>
        {info.pages > 0 && (
          <span>
            Page {page} of {info.pages}
          </span>
        )}
      </div>

      {errorMessage ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center">
          <p className="text-sm font-medium text-rose-800">{errorMessage}</p>
          <button
            type="button"
            onClick={() => setReloadCounter((count) => count + 1)}
            className="mt-3 rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-700"
          >
            Retry
          </button>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              className="h-72 animate-pulse rounded-xl border border-slate-200 bg-slate-100"
            />
          ))}
        </div>
      ) : characters.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-base font-semibold text-slate-800">No characters found</p>
          <p className="mt-1 text-sm text-slate-500">
            Try another search term or clear the filter.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onSelect={setSelectedCharacter}
              />
            ))}
          </div>

          {info.pages > 1 && (
            <nav
              aria-label="Pagination"
              className="mt-8 flex items-center justify-center gap-3"
            >
              <button
                type="button"
                disabled={!info.prev}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="text-sm font-medium text-slate-700">
                Page {page} / {info.pages}
              </span>

              <button
                type="button"
                disabled={!info.next}
                onClick={() => setPage((current) => current + 1)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}

      <CharacterModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />
      </section>
    </main>
  );
}
