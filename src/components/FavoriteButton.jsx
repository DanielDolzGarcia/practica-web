export default function FavoriteButton({ isFavorite, onToggle }) {
  return (
    <button
      type="button"
      className={`FavButton ${isFavorite ? 'isFav' : ''}`}
      onClick={onToggle}
    >
      {isFavorite ? 'Quitar favorito' : 'Añadir favorito'}
    </button>
  );
}