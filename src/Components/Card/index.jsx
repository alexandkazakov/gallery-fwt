import style from "./Card.module.scss";

export default function Card({
  authorsList,
  locationsList,
  imageUrl,
  name,
  authorId,
  locationId,
  created,
}) {
  const url = `https://test-front.framework.team${imageUrl}`;

  return (
    <div className={style.card}>
      <img
        src={url}
        alt={name}
        className={style.card__image}
        onLoad={(event) => (event.target.style.opacity = 1)}
        loading="lazy"
      />
      <div className={style.card__descr} id="descr">
        <div>
          <h2 className={style.card__title}>{name}</h2>
        </div>
        <div>
          <span className={style.card__span}>Author:</span>{" "}
          {authorsList.find((author) => author.id === authorId).name}
        </div>
        <div>
          <span className={style.card__span}>Created:</span> {created}
        </div>
        <div>
          <span className={style.card__span}>Location:</span>{" "}
          {locationsList.find((location) => location.id === locationId).name}
        </div>
      </div>
    </div>
  );
}
