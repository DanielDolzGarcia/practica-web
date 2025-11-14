import './App.css';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import { searchShows, getShowById } from './services/tvmaze';
import ShowList from './components/ShowList';
import Modal from './components/Modal';
import FavoriteButton from './components/FavoriteButton';
import useLocalStorage from './hooks/useLocalStorage';
import Favorites from './components/Favorites';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (!selected) {
      setDetail(null);
      setDetailError('');
      setDetailLoading(false);
      return;
    }
    let active = true;
    setDetailLoading(true);
    setDetailError('');
    getShowById(selected.id)
      .then((d) => {
        if (active) setDetail(d);
      })
      .catch(() => {
        if (active) setDetailError('Error al cargar el detalle');
      })
      .finally(() => {
        if (active) setDetailLoading(false);
      });
    return () => {
      active = false;
    };
  }, [selected]);

  return (
    <div className="App">
      <header className="AppHeader">
        <button
          className="Brand"
          onClick={() => {
            setSelected(null);
            setQuery('');
            setResults([]);
            setError('');
            setLoading(false);
          }}
        >
          TVMaze Finder
        </button>
      </header>
      <main className="AppMain">
        <SearchBar
          value={query}
          onChange={(v) => setQuery(v)}
          onSearch={async (q) => {
            setQuery(q);
            if (!q) {
              setResults([]);
              return;
            }
            try {
              setLoading(true);
              setError('');
              const data = await searchShows(q);
              setResults(data);
            } catch (e) {
              setError('Error al buscar. Intenta de nuevo');
              setResults([]);
            } finally {
              setLoading(false);
            }
          }}
        />
        <p className="SearchInfo">
          {query ? `Buscando: ${query}` : 'Introduce un término y pulsa Buscar'}
        </p>
        {loading && <p>Buscando…</p>}
        {error && <p>{error}</p>}
        {!loading && !error && results.length > 0 && (
          <p>Encontradas: {results.length} series</p>
        )}
        {!loading && !error && results.length > 0 && (
          <ShowList
            items={results}
            onSelect={(s) => setSelected(s)}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}
        <Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />
        <Modal
          isOpen={!!selected}
          onClose={() => setSelected(null)}
          title={selected ? selected.name : ''}
        >
          {detailLoading && <p>Cargando detalle…</p>}
          {detailError && <p>{detailError}</p>}
          {!detailLoading && !detailError && selected && (
            <div className="ModalLayout">
              <div>
                {(detail?.image?.original || selected.image?.original) ? (
                  <img
                    className="ModalImage"
                    src={detail?.image?.original || selected.image?.original}
                    alt={selected.name}
                  />
                ) : null}
              </div>
              <div>
                {(detail?.genres?.length || selected.genres?.length) ? (
                  <p>Géneros: {(detail?.genres || selected.genres).join(', ')}</p>
                ) : null}
                {(detail?.premiered || detail?.status || detail?.rating?.average) && (
                  <p>
                    {detail?.premiered ? `Fecha: ${detail.premiered} ` : ''}
                    {detail?.status ? `• Estado: ${detail.status} ` : ''}
                    {detail?.rating?.average ? `• Rating: ${detail.rating.average}` : ''}
                  </p>
                )}
                {(() => {
                  const txt = (detail?.summary || selected?.summary || '').replace(/<[^>]+>/g, '');
                  return txt ? <p>{txt}</p> : null;
                })()}
                <FavoriteButton
                  isFavorite={favorites.includes(selected.id)}
                  onToggle={() => toggleFavorite(selected.id)}
                />
              </div>
            </div>
          )}
        </Modal>
      </main>
    </div>
  );
}

export default App;
