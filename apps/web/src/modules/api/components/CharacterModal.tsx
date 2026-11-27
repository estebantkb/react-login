import { useEffect } from 'react';
import type { Character } from '../model/rickAndMorty.ts';
import { STATUS_DOT_CLASS } from './statusStyles.ts';

interface CharacterModalProps {
  character: Character | null;
  onClose: () => void;
}

function getEpisodeNumbers(episodeUrls: string[]): string {
  const numbers = episodeUrls
    .map((url) => url.split('/').pop())
    .filter((id): id is string => Boolean(id));

  if (numbers.length === 0) {
    return 'None';
  }

  return numbers.join(', ');
}

function formatCreatedDate(isoDate: string): string {
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) {
    return isoDate;
  }

  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Popup modal showing all available details for a selected character.
 */
export function CharacterModal({ character, onClose }: CharacterModalProps) {
  useEffect(() => {
    if (!character) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [character, onClose]);

  if (!character) {
    return null;
  }

  const detailRows = [
    { label: 'ID', value: `#${character.id}` },
    { label: 'Species', value: character.species },
    { label: 'Type', value: character.type || 'N/A' },
    { label: 'Gender', value: character.gender },
    { label: 'Origin', value: character.origin.name },
    { label: 'Last Location', value: character.location.name },
    { label: 'Episodes Count', value: String(character.episode.length) },
    { label: 'Created', value: formatCreatedDate(character.created) },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="character-modal-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close popup"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg font-bold text-slate-700 shadow ring-1 ring-slate-200 transition hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          &times;
        </button>

        <div className="grid gap-4 p-4 sm:grid-cols-[220px_1fr] sm:gap-6 sm:p-6">
          <div className="max-h-64 overflow-hidden rounded-xl bg-slate-100 sm:max-h-none">
            <img
              src={character.image}
              alt={character.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="pr-8">
              <h2
                id="character-modal-title"
                className="text-xl font-bold text-slate-900 sm:text-2xl"
              >
                {character.name}
              </h2>
              <div className="mt-1.5 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                <span
                  className={`inline-block h-2.5 w-2.5 rounded-full ${STATUS_DOT_CLASS[character.status]}`}
                  aria-hidden="true"
                />
                <span>
                  {character.status} &middot; {character.species}
                </span>
              </div>
            </div>

            <dl className="grid grid-cols-1 gap-x-4 gap-y-2.5 text-sm sm:grid-cols-2">
              {detailRows.map((row) => (
                <div key={row.label} className="rounded-lg bg-slate-50 px-3 py-2">
                  <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    {row.label}
                  </dt>
                  <dd className="mt-0.5 font-medium text-slate-900">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Appears in Episodes
              </p>
              <p className="mt-1 max-h-24 overflow-y-auto break-words text-xs leading-relaxed text-slate-700">
                {getEpisodeNumbers(character.episode)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
