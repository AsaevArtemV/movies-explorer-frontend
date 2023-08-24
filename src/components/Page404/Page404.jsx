import { Link, useNavigate } from "react-router-dom";
import "./Page404.css";

function Page404({ isLoggedIn }) {
  const navigate = useNavigate();

  return (
    <>
      <section className="page404">
        <div className="page404__container">
          <h1 className="page404__title">404</h1>
          <p className="page404__subtitle">Страница не найдена</p>
        </div>
        <Link
          className="page404__link"
          onClick={() => {
            isLoggedIn ? navigate(-2) : navigate(-1);
          }}
        >
          Назад
        </Link>
      </section>
    </>
  );
}

export default Page404;