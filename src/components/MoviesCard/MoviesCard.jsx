import "./MoviesCard.css";
import image from "../../images/pic.jpg";

import { useLocation } from "react-router-dom";

function MoviesCard() {
  const { pathname } = useLocation();

  return (
    <li className="card">
      <img
        className="card__image"
        src={image}
        alt="Картинка"
      />
      <div className="card__info">
        <div className="card__description">
          <h2 className="card__name">В погоне за Бенкси</h2>
          <p className="card__duration">1ч 42м</p>
        </div>
        <button
          className={`card__btn ${
            pathname === "/saved-movies"
              ? "card__btn-delete"
              : "card__btn_save-active"
          }`}
          type="button"
          aria-label="Кнопка удалить фильм"
        />
      </div>
    </li>
  );
}

export default MoviesCard;