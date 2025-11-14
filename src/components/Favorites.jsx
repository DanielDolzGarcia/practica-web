import FavoriteButton from './FavoriteButton';

export default function Favorites({ favorites, results, onToggleFavorite }) {
  const items = results.filter((it) => favorites.includes(it.show.id));
  return (
    <section className="Favorites">
      <h2 className="FavoritesTitle">Favoritos ({items.length})</h2>
      {items.length === 0 ? (
        <p className="FavoritesEmpty">No hay favoritos en esta búsqueda</p>
      ) : (
        <ul className="FavoritesList">
          {items.map((it) => (
            <li key={it.show.id} className="FavoritesItem">
              <span className="FavoritesName">{it.show.name}</span>
              <FavoriteButton
                isFavorite={true}
                onToggle={() => onToggleFavorite(it.show.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}