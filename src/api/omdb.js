const API_BASE = 'https://www.omdbapi.com/';
const API_KEY = '8523cbb8'; // ключ из задания

export async function searchMovies({ query, page = 1 }) {
  const url = new URL(API_BASE);
  url.searchParams.set('apikey', API_KEY);
  url.searchParams.set('s', query.trim());
  url.searchParams.set('page', String(page));

  const res = await fetch(url.toString(), { method: 'GET' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  if (data.Response === 'True') {
    return {
      movies: data.Search ?? [],
      totalResults: Number(data.totalResults || 0),
      raw: data,
    };
  }
  return { movies: [], totalResults: 0, error: data.Error || 'Unknown error', raw: data };
}