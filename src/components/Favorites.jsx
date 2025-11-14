import { useEffect, useState } from 'react';
import FavoriteButton from './FavoriteButton';
import { getShowById } from '../services/tvmaze';

export default function Favorites({ favorites, onToggleFavorite }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    if (!favorites || favorites.length === 0) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all(favorites.map((id) => getShowById(id).catch(() => null)))
      .then((list) => {
        if (active) setItems(list.filter(Boolean));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [favorites]);

  return (
    <section className="Favorites">
      <h2 className="FavoritesTitle">Favoritos ({items.length})</h2>
      {loading && <p className="FavoritesEmpty">Cargando favoritos…</p>}
      {!loading && items.length === 0 ? (
        <p className="FavoritesEmpty">No hay favoritos</p>
      ) : (
        <ul className="FavoritesList">
          {items.map((s) => (
            <li key={s.id} className="FavoritesItem">
              <span className="FavoritesName">{s.name}</span>
              <FavoriteButton
                isFavorite={true}
                onToggle={() => onToggleFavorite(s.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}