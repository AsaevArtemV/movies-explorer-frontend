import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import logo from "../../images/logo.svg";
import "./Header.css";

function Header() {
  const { pathname } = useLocation();

  return (
    <header 
      className={`header ${
        pathname === "/" 
          ? "header_wrapper" 
          : "header_profile"
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
      <Navigation />
    </header>
  );
}

export default Header;