/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useFormWithValidation } from "../Hooks/useFormWithValidation";
import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo.svg";

function Register({ onRegister, isStatusErrorServer, setIsStatusErrorServer }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({});

  const handleSubmit = (event) => {
    event.preventDefault();

    onRegister(values.name, values.email, values.password);
  };

  useEffect(() => {
    resetForm();
    setIsStatusErrorServer(false);
  }, []);

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
            onSubmit={handleSubmit}
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
              placeholder="Введите имя"
              autoComplete="off"
              minLength="2"
              maxLength="40"
              value={values.name || ""}
              onChange={handleChange}
              required
            />
            <span className="register__span-error">{errors.name}</span>
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
              placeholder="Введите email"
              autoComplete="off"
              minLength="2"
              maxLength="40"
              value={values.email || ""}
              onChange={handleChange}
              required
            />
            <span className="register__span-error">{errors.email}</span>
            <label
              className="register__label"
              htmlFor="password"
            >
              Пароль
            </label>
            <input
              className="register__input"
              id="password"
              name="password"
              type="password"
              placeholder="Введите пароль"
              minLength="2"
              maxLength="40"
              autoComplete="off"
              value={values.password || ""}
              onChange={handleChange}
              required
            />
            <span className="register__span-error">
              {errors.password}
            </span>
            <span
              className={`form-register__span-error-server ${
                isStatusErrorServer ? "form-register__span-error-server_active" : ""
              }`}
            >
              Что-то пошло не так! Попробуйте ещё раз
            </span>
            <button
              className={`register__btn ${
                !isValid ? "register__btn_disabled" : ""
              }`}
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