import './App.css';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import { searchShows } from './services/tvmaze';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className="App">
      <header className="AppHeader">
        <h1>TVMaze Finder</h1>
      </header>
      <main className="AppMain">
        <SearchBar
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
      </main>
    </div>
  );
}

export default App;
