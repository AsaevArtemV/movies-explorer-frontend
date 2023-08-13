import "./Register.css";
import logo from "../../images/logo.svg";

import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <main className="register">
        <div className="register__content">
          <Link to="/">
            <img
              className="register__logo"
              src={logo}
              alt="Логотип"
            />
          </Link>
          <h1 className="register__title">Добро пожаловать!</h1>
          <form
            className="register__form"
            name="register"
          >
            <label
              className="register__label"
              htmlFor="name"
            >
              Имя
            </label>
            <input
              className="register__input"
              id="name"
              name="name"
              type="text"
              placeholder="Виталий"
              autoComplete="off"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="register__span-error"></span>
            <label
              className="register__label"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              className="register__input"
              id="email"
              name="email"
              type="email"
              placeholder="pochta@yandex.ru"
              autoComplete="off"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="register__span-error"></span>
            <label
              className="register__label"
              htmlFor="password"
            >
              Пароль
            </label>
            <input
              className="register__input register__input-error"
              id="password"
              name="password"
              type="password"
              placeholder="••••••••••••••"
              minLength="2"
              maxLength="40"
              autoComplete="off"
              required
            />
            <span className="register__span-error">
              Что-то пошло не так...
            </span>
            <button
              className="register__btn"
              type="submit"
            >
              Зарегистрироваться
            </button>
          </form>
          <p className="register__text">
            Уже зарегистрированы?{" "}
            <Link
              className="register__link"
              to="/signin"
            >
              Войти
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default Register;