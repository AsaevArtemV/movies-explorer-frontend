import "./AboutProject.css";

function AboutProject() {
  return (
    <section
      className="about-project"
      id="project"
    >
      <h2 className="project__title">
        О проекте
      </h2>
      <div className="project__info">
        <div className="project__chapter">
          <h3 className="project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="project__chapter">
          <h3 className="project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="project__time">
        <div className="project__back-end">
          <div className="project__limited project__limited_back-end">
            1 неделя
          </div>
          <div className="project__technologie">
            Back-end
          </div>
        </div>
        <div className="project__front-end">
          <div className="project__limited project__limited_front-end">
            4 недели
          </div>
          <div className="project__technologie">
            Front-end
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;