import "./Promo.css";
import NavTab from "../NavTab/NavTab";
import logoP from "../../images/logoP.svg";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <img className="promo__logo" src={logoP} alt="Логотип" />
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      </div>
      <NavTab />
    </section>
  );
}

export default Promo;