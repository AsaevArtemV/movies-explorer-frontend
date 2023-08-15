import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo.svg";

function Login() {
  return (
    <>
      <section className="login">
        <div className="login__content">
          <Link to="/">
            <img
              className="login__logo"
              src={logo}
              alt="Логотип"
            />
          </Link>
          <h1 className="login__title">Рады видеть!</h1>
          <form className="login__form" name="login">
            <label className="login__label" htmlFor="name">
              E-mail
            </label>
            <input
              className="login__input"
              id="email"
              name="email"
              type="email"
              placeholder="pochta@yandex.ru"
              autoComplete="off"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="login__span-error"></span>
            <label className="login__label" htmlFor="password">
              Пароль
            </label>
            <input
              className="login__input login__input-error"
              id="password"
              name="password"
              type="password"
              placeholder="Введите пароль"
              autoComplete="off"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="login__span-error">
              Что-то пошло не так...
            </span>
            <button
              className="login__btn"
              type="submit"
            >
              Войти
            </button>
          </form>
          <p className="login__text">
            Ещё не зарегистрированы?
            <Link
              className="login__link"
              to="/signup"
             >
              Регистрация
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
export default Login;