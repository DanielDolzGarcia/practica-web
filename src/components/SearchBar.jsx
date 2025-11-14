export default function SearchBar({ value, onChange, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form className="SearchBar" onSubmit={handleSubmit}>
      <input
        className="SearchInput"
        type="text"
        placeholder="Buscar series..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="SearchButton" type="submit">Buscar</button>
    </form>
  );
}