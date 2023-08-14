import { Link } from "react-router-dom";
import arrowBtn from "../../images/arrowBtn.svg";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <Link
            className="portfolio__link"
            target="_blank"
            to="https://github.com/AsaevArtemV/how-to-learn"
          >
            <p className="portfolio__text">Статичный сайт</p>
            <img
              className="portfolio__arrow-btn"
              src={arrowBtn}
              alt="Ссылка на статичный сайт"
            />
          </Link>
        </li>
        <li className="portfolio__item">
          <Link
            className="portfolio__link"
            target="_blank"
            to="https://github.com/AsaevArtemV/russian-travel"
          >
            <p className="portfolio__text">Адаптивный сайт</p>
            <img
              className="portfolio__arrow-btn"
              src={arrowBtn}
              alt="Ссылка на адаптивный сайт"
            />
          </Link>
        </li>
        <li className="portfolio__item">
          <Link
            className="portfolio__link"
            target="_blank"
            to="https://github.com/AsaevArtemV/react-mesto-api-full-gha"
          >
            <p className="portfolio__text">Одностраничное приложение</p>
            <img
              className="portfolio__arrow-btn" 
              src={arrowBtn}
               alt="Ссылка на одностраничное приложение"
            />
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;