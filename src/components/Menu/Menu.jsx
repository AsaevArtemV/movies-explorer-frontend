import { NavLink, useLocation } from "react-router-dom";
import "./Menu.css";

function Menu({ close }) {
  const { pathname } = useLocation();

  return (
    <div className="profile-menu">
      <div className="profile-menu__container">
        <button 
          className="profile-menu__btn_close"
          onClick={close}
        />
        <nav className="menu">
          <div className="menu__items">
            <NavLink
              className={`menu__item ${
                pathname === "/" 
                  ? "menu__item_active" 
                  : ""
              }`}
              to="/"
            >
              Главная
            </NavLink>
            <NavLink
              className={`menu__item ${
                pathname === "/movies" 
                  ? "menu__item_active" 
                  : ""
              }`}
              to="/movies"
            >
              Фильмы
            </NavLink>
            <NavLink
              className={`menu__item ${
                pathname === "/saved-movies" 
                  ? "menu__item_active" 
                  : ""
              }`}
              to="/saved-movies"
            >
              Сохранённые фильмы
            </NavLink>
          </div>
          <NavLink
            className="profile-menu_btn"
            to="/profile"
          >
            Аккаунт
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default Menu;