import type { CharactersResponse } from '../model/rickAndMorty.ts';

const RICK_AND_MORTY_API_URL = 'https://rickandmortyapi.com/api/character';

export interface FetchCharactersParams {
  page?: number;
  name?: string;
  signal?: AbortSignal;
}

/**
 * Fetches a paginated list of Rick & Morty characters, optionally filtered by name.
 * Returns an empty result set when the API responds with 404 (no matches).
 */
export async function fetchCharacters({
  page = 1,
  name = '',
  signal,
}: FetchCharactersParams): Promise<CharactersResponse> {
  const url = new URL(RICK_AND_MORTY_API_URL);
  url.searchParams.set('page', String(page));

  const trimmedName = name.trim();
  if (trimmedName) {
    url.searchParams.set('name', trimmedName);
  }

  const response = await fetch(url.toString(), { signal });

  // The Rick & Morty API returns 404 when a search filter matches zero characters.
  if (response.status === 404) {
    return {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch characters (HTTP ${response.status})`);
  }

  return (await response.json()) as CharactersResponse;
}
