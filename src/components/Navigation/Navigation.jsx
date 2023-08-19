import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Menu from "../Menu/Menu";
import "./Navigation.css";

function Navigation({ isLogged }) {
  const { pathname } = useLocation();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const openMenu = () => {
    setIsOpenMenu(true);
  };

  const closeMenu = () => {
    setIsOpenMenu(false);
  };

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeMenu();
      }
    }
    function closeByOverlay(evt) {
      if (evt.target.classList.contains("burger-menu")) {
        closeMenu();
      }
    }

    if (isOpenMenu) {
      // Навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      document.addEventListener("mousedown", closeByOverlay);
      // Удаляем в cleanup функции
      return () => {
        document.removeEventListener("keydown", closeByEscape);
        document.removeEventListener("mousedown", closeByOverlay);
      };
    }
  }, [isOpenMenu]);

  return (
    <>
      {isLogged ? (
        <nav className="navigation">
          <div className="navigation__texts">
            <NavLink
              className={`navigation__text ${
                pathname === "/movies"
                  ? "navigation__text_active"
                  : ""
              }`}
              to="/movies"
            >
              Фильмы
            </NavLink>
            <NavLink
              className={`navigation__text ${
                pathname === "/saved-movies"
                  ? "navigation__text_active"
                  : ""
              }`}
              to="/saved-movies"
            >
              Сохранённые фильмы
            </NavLink>
          </div>
          <NavLink
            className="profile__button"
            to="/profile"
          >
            Аккаунт
          </NavLink>
          {isOpenMenu ? (
            <Menu close={closeMenu} />
          ) : (
            <ul
              className="header__burger-btn"
              onClick={openMenu}
            >
              <li className="burger-btn__item" />
              <li className="burger-btn__item" />
              <li className="burger-btn__item" />
            </ul>
          )}
        </nav>
        ) : (
          <nav className="header__container">
            <NavLink
              className="header__btn"
              to="/signup"
            >
              Регистрация
            </NavLink>
            <NavLink
              className="header__btn header__btn_signin"
              to="/signin"
            >
              Войти
            </NavLink>
          </nav>
        )}
    </>
  );
}

export default Navigation;