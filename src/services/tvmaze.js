const API_BASE = 'https://api.tvmaze.com';

export async function searchShows(query) {
  const url = `${API_BASE}/search/shows?q=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function getShowById(id) {
  const url = `${API_BASE}/shows/${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}