import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { converterMinuteHour } from "../../utils/time.js";

function MoviesCard({
  film,
  savedMovies,
   onSaveFilm,
  onUnsaveFilm
}) {

  const { pathname } = useLocation();
  const isSaveButton = pathname === "/movies";
  const isDeleteButton = pathname === "/saved-movies";
  
  const imageUrl = film.image.url ? `https://api.nomoreparties.co/${film.image.url}` : film.image;
  const isSavedFilm = savedMovies ? savedMovies.some((i) => i.movieId === film.id) : false;
  const infoSaveFilm = savedMovies ? savedMovies.find((i) => i.movieId === film.id) : null;

  function handleSaveClick() {
    onSaveFilm(film, isSavedFilm, infoSaveFilm);
  }

  function handleUnsaveClick() {
    onUnsaveFilm(film);
  }

  return (
    <li className="card">
      <a
        className="card__link-image"
        href={film.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="card__image"
          src={imageUrl}
          alt="Картинка"
        />
      </a>
      <div className="card__info">
        <div className="card__description">
          <h2 className="card__name">{film.nameRU}</h2>
          <p className="card__duration">{converterMinuteHour(film.duration)}</p>
        </div>
        {isSaveButton && (
        <button
          className={`card__btn ${
            isSavedFilm
              ? "card__btn_save-active"
              : "card__btn_save"
          }`}
          type="button"
          aria-label="Кнопка добавить фильм"
          onClick={handleSaveClick}
        />
        )}
        {isDeleteButton && (
            <button
              type="button"
              className="card__btn card__btn_delete"
              aria-label="Удалить фильм из списка сохранённых фильмов"
              onClick={handleUnsaveClick}
            />
          )}
        </div>
    </li>
  );
}

export default MoviesCard;