import type { CharacterStatus } from '../model/rickAndMorty.ts';

export const STATUS_DOT_CLASS: Record<CharacterStatus, string> = {
  Alive: 'bg-emerald-500',
  Dead: 'bg-rose-500',
  unknown: 'bg-slate-400',
};
