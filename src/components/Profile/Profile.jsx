/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useValidation } from "../Hooks/useValidation";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile({
  onUpdateUserInfo,
  onSignOut,
  serverError,
  setServerError,
  isStatusOKServer,
  setIsStatusOKServer
}) {

  const {
    values,
    handleChange,
    errors,
    isValid,
    setValues
  } = useValidation({});

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUserInfo({
      name: values.name,
      email: values.email,
    });
  }

  useEffect(() => {
    setServerError(false);
  }, [isValid, setServerError]);

  useEffect(() => {
    setIsStatusOKServer(false);
  }, [serverError, setIsStatusOKServer]);

  return (
    <section className="profile">
      <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
      <form
        className="profile__form"
        name="profile"
        onSubmit={handleSubmit}
      >
        <fieldset className="profile__field">
          <label
            className="profile__label"
            htmlFor="name"
          >
            Имя
          </label>
          <input
            className="profile__input"
            id="name"
            name="name"
            type="text"
            placeholder="Виталий"
            autoComplete="off"
            minLength="2"
            maxLength="40"
            value={values.name || ""}
            onChange={handleChange}
            required
          />
        </fieldset>
        <span className="profile__span-error">{errors.name}</span>
        <fieldset className="profile__field">
          <label
            className="profile__label"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            className="profile__input"
            id="email"
            name="email"
            type="email"
            placeholder="pochta@yandex.ru"
            autoComplete="off"
            minLength="2"
            maxLength="40"
            value={values.email || ""}
            onChange={handleChange}
            required
          />
        </fieldset>
        <span className="profile__span-error">{errors.email}</span>
        <span
          className={`profile__span-success ${
            isStatusOKServer ? "profile__span-success_active" : ""
          }`}
        >
          Данные успешно обновлены !
        </span>
        <span
          className={`profile__span-error-server ${
            serverError ? "profile__span-error-server_active" : ""
          }`}
        >
          Что-то пошло не так! Попробуйте ещё раз
        </span>
        <button
          className={`profile__btn ${
            !isValid || (values.name === currentUser.name && values.email === currentUser.email)
              ? "profile__btn_disabled"
              : ""
          }`}
          type="submit"
        >
          Редактировать
        </button>
      </form>
      <Link
        className="profile__link-exit"
        to="/"
        onClick={onSignOut}
      >
        Выйти из аккаунта
      </Link>
    </section>
  );
}

export default Profile;