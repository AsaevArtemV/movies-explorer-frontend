import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo.svg";
import { useFormWithValidation } from "../Hooks/useFormWithValidation";

function Login({
  onLogin,
  isStatusErrorServer,
  setIsStatusErrorServer,
}) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({});

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(values.password, values.email);
  };

  useEffect(() => {
  resetForm();
  setIsStatusErrorServer(false);
  }, [resetForm, setIsStatusErrorServer]);

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
          <form 
            className="login__form"
            name="login" 
            onSubmit={handleSubmit}
          >
            <label className="login__label" htmlFor="name">
              E-mail
            </label>
            <input
              className="login__input"
              id="email"
              name="email"
              type="email"
              placeholder="Введите email"
              autoComplete="off"
              minLength="2"
              maxLength="40"
              value={values.email || ""}
              onChange={handleChange}
              required
            />
            <span className="login__span-error">{errors.email}</span>
            <label className="login__label" htmlFor="password">
              Пароль
            </label>
            <input
              className="login__input"
              id="password"
              name="password"
              type="password"
              placeholder="Введите пароль"
              autoComplete="off"
              minLength="2"
              maxLength="40"
              value={values.password || ""}
              onChange={handleChange}
              required
            />
            <span className="login__span-error">{errors.password}</span>
            <span
              className={`form-login__span-error-server ${
                isStatusErrorServer ? "form-login__span-error-server_active" : ""
              }`}
            >
              Неправильный логин или пароль! Попробуйте ещё раз
            </span>
            <button
              className={`login__btn ${!isValid ? "form-login__button_disabled" : ""}`}
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