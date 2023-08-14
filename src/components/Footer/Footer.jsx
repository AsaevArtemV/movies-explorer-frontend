import { Link, useLocation } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const { pathname } = useLocation();

  return (
    <footer
      className={`footer ${
        pathname === "/" 
          ? "footer__film-save"
          : "footer__movies"
        }`}
    >
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__info">
        <p className="footer__copyright">
          &copy; {new Date().getFullYear()}
        </p>
        <div className="footer__links">
          <Link
            className="footer__link"
            target="_blank"
            to="https://practicum.yandex.ru"
          >
            Яндекс.Практикум
          </Link>
          <Link
            className="footer__link"
            target="_blank"
            to="https://github.com/AsaevArtemV"
          >
            Github
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;