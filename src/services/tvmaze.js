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

export async function getShowsPage(page) {
  const url = `${API_BASE}/shows?page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function getRandomShow(maxPages = 250, maxTries = 3) {
  for (let i = 0; i < maxTries; i++) {
    const page = Math.floor(Math.random() * maxPages);
    const list = await getShowsPage(page).catch(() => []);
    if (Array.isArray(list) && list.length) {
      const pick = list[Math.floor(Math.random() * list.length)];
      if (pick) return pick;
    }
  }
  return null;
}