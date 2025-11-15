export default function FavoriteButton({ isFavorite, onToggle }) {
  return (
    <button
      type="button"
      className={`FavButton ${isFavorite ? 'isFav' : ''}`}
      onClick={onToggle}
      aria-label={isFavorite ? 'Quitar favorito' : 'Añadir favorito'}
      title={isFavorite ? 'Quitar favorito' : 'Añadir favorito'}
    >
      <i className={`${isFavorite ? 'fa-solid' : 'fa-regular'} fa-star`}></i>
    </button>
  );
}