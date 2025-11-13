import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form className="SearchBar" onSubmit={handleSubmit}>
      <input
        className="SearchInput"
        type="text"
        placeholder="Buscar series..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="SearchButton" type="submit">Buscar</button>
    </form>
  );
}