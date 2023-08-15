import { Link } from "react-router-dom";
import "./Page404.css";

function Page404() {
  return (
    <>
      <section className="page404">
        <div className="page404__container">
          <h1 className="page404__title">404</h1>
          <p className="page404__subtitle">Страница не найдена</p>
        </div>
        <Link
          className="page404__link"
          to="/"
        >
          Назад
        </Link>
      </section>
    </>
  );
}

export default Page404;