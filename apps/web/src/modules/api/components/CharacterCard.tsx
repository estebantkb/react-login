import type { Character } from '../model/rickAndMorty.ts';
import { STATUS_DOT_CLASS } from './statusStyles.ts';

interface CharacterCardProps {
  character: Character;
  onSelect: (character: Character) => void;
}

/**
 * Displays a compact summary card for a Rick & Morty character.
 */
export function CharacterCard({ character, onSelect }: CharacterCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(character)}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
    >
      <div className="aspect-square w-full overflow-hidden bg-slate-100">
        <img
          src={character.image}
          alt={character.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="line-clamp-1 text-base font-semibold text-slate-900">
          {character.name}
        </h3>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span
            className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${STATUS_DOT_CLASS[character.status]}`}
            aria-hidden="true"
          />
          <span className="truncate">
            {character.status} &middot; {character.species}
          </span>
        </div>

        <p className="mt-auto pt-1 text-xs font-medium text-emerald-700 transition sm:opacity-0 sm:group-hover:opacity-100">
          Click for full details &rarr;
        </p>
      </div>
    </button>
  );
}
