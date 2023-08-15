import { Link } from "react-router-dom";
import myPhoto from "../../images/myPhoto.png";
import "./AboutMe.css";

function AboutMe() {
  return (
    <section className="about-me" id="stydent">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Виталий</h3>
          <h4 className="about-me__subtitle">Фронтенд-разработчик, 30 лет</h4>
          <p className="about-me__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь.
            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал
            в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
            фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link 
            className="about-me__link" 
            target="_blank"
            to="https://github.com/AsaevArtemV">
            Github
          </Link>
        </div>
        <img className="about-me__photo" src={myPhoto} alt="Фото студента" />
      </div>
    </section>
  );
}

export default AboutMe;