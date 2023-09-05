import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import logo from "../../images/logo.svg";
import "./Header.css";

function Header({ isLogged }) {
  const { pathname } = useLocation();

  return (
    <header
      className={`header ${
        pathname === "/"
          ? "header__wrapper"
          : "header__profile"
      }`}>
      <Link
        className="header__link"
        to="/"
      >
        <img
          className="header__logo"
          src={logo}
          alt="Логотип"
        />
      </Link>
      <Navigation isLogged={isLogged} />
    </header>
  );
}

export default Header;