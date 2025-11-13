import './App.css';
import { useState } from 'react';
import SearchBar from './components/SearchBar';

function App() {
  const [query, setQuery] = useState('');

  return (
    <div className="App">
      <header className="AppHeader">
        <h1>TVMaze Finder</h1>
      </header>
      <main className="AppMain">
        <SearchBar onSearch={(q) => setQuery(q)} />
        <p className="SearchInfo">
          {query ? `Buscando: ${query}` : 'Introduce un término y pulsa Buscar'}
        </p>
      </main>
    </div>
  );
}

export default App;
