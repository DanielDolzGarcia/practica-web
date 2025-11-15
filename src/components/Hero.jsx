export default function Hero({ show, isFavorite, onToggleFavorite }) {
  if (!show) return null;
  const img = show.image?.original || show.image?.medium || '';
  const text = (show.summary || '').replace(/<[^>]+>/g, '');
  return (
    <section className="Hero">
      <div className="HeroInner">
        <div className="HeroContent">
          <h2 className="HeroTitle">{show.name}</h2>
          {text && <p className="HeroDesc">{text}</p>}
          <div className="HeroActions">
            <button className="HeroButton" onClick={onToggleFavorite}>
              {isFavorite ? 'Quitar favorito' : 'Añadir a favoritos'}
            </button>
          </div>
        </div>
        <div className="HeroImageWrap">
          {img ? (
            <img className="HeroImage" src={img} alt={show.name} />
          ) : (
            <div className="HeroImagePlaceholder">Sin imagen</div>
          )}
        </div>
      </div>
    </section>
  );
}