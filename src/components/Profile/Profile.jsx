/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../Hooks/useFormWithValidation";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile({
    onUpdateUserInfo,
    onSignOut,
    isStatusErrorServer,
    setIsStatusErrorServer,
    isStatusOKServer,
    setIsStatusOKServer,
  }) {
    const { values, handleChange, errors, isValid, setValues } = useFormWithValidation({});
  
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
      setIsStatusErrorServer(false);
    }, [isValid, setIsStatusErrorServer]);
  
    useEffect(() => {
      setIsStatusOKServer(false);
    }, [isStatusErrorServer, setIsStatusOKServer]);

  return (
    <section className="edit-profile">
      <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
      <form
        className="edit-profile__form"
        name="profile"
        onSubmit={handleSubmit}
      >
        <fieldset className="edit-profile__field">
          <label
            className="edit-profile__label"
            htmlFor="name"
          >
            Имя
          </label>
          <input
            className="edit-profile__input"
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
        <fieldset className="edit-profile__field">
          <label
            className="edit-profile__label"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            className="edit-profile__input"
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
          className={`form-profile__span-error-server ${
            isStatusErrorServer ? "form-profile__span-error-server_active" : ""
          }`}
        >
          Что-то пошло не так! Попробуйте ещё раз
        </span>
        <button
          className={`edit-profile__btn profile__btn ${
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
        to="/signin"
        onClick={onSignOut}
      >
        Выйти из аккаунта
      </Link>
    </section>
  );
}

export default Profile;