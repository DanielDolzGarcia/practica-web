import FavoriteButton from './FavoriteButton';

export default function ShowList({ items, onSelect, favorites = [], onToggleFavorite }) {
  return (
    <ul className="ShowGrid">
      {items.map((it) => {
        const s = it.show;
        const img = s?.image?.medium || '';
        const isFav = favorites.includes(s.id);
        return (
          <li
            key={s.id}
            className="ShowCard"
            onClick={() => onSelect && onSelect(s)}
            tabIndex={0}
          >
            {img ? (
              <img className="ShowThumb" src={img} alt={s.name} />
            ) : (
              <div className="ShowThumbPlaceholder">Sin imagen</div>
            )}
            <h3 className="ShowTitle">{s.name}</h3>
            <div className="ShowActions">
              <FavoriteButton
                isFavorite={isFav}
                onToggle={(e) => {
                  e.stopPropagation();
                  onToggleFavorite && onToggleFavorite(s.id);
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}