import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  return (
    <section className="edit-profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form
        className="edit-profile__form"
        name="profile"
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
            required
          />
        </fieldset>
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
            required
          />
        </fieldset>
        <button
          className="edit-profile__btn form__button_type_profile"
          type="submit"
        >
          Редактировать
        </button>
      </form>
      <Link
        className="profile__link-exit"
        to="/signin"
      >
        Выйти из аккаунта
      </Link>
    </section>
  );
}

export default Profile;