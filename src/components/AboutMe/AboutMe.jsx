import { Link } from "react-router-dom";
import myPhoto from "../../images/myPhoto.jpg";
import "./AboutMe.css";

function AboutMe() {
  return (
    <section className="about-me" id="stydent">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Артём</h3>
          <h4 className="about-me__subtitle">Веб-разработчик, 36 лет</h4>
          <p className="about-me__text">
            Я родился в Моздоке, на данный момент живу в Пятигорске, закончил военный институт ВВВУТ в г. Вольске.
            После окончания военного института я прослужил 10 лет и ушёл на военную пенсию.
            Появилась возможность найти себя в жизни, и я решил обучиться на веб-разработчика и это затянуло.
            Я люблю слушать музыку, смотреть фильмы в жанре ужасы, а ещё увлекаюсь катанием на сноуборде.
          </p>
          <Link
            className="about-me__link"
            target="_blank"
            to="https://github.com/AsaevArtemV">
            Github
          </Link>
        </div>
        <img className="about-me__photo" src={myPhoto} alt="Моё фото" />
      </div>
    </section>
  );
}

export default AboutMe;