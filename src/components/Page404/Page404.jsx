import React from "react";
import { useNavigate } from "react-router-dom";
import "./Page404.css";

function Page404() {
    const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  
  return (
    <>
      <section className="page404">
        <div className="page404__container">
          <h1 className="page404__title">404</h1>
          <p className="page404__subtitle">Страница не найдена</p>
        </div>
        <button className="page404__link" tupe="button"
          aria-label="Назад"
          onClick={goBack}
        >
        Назад
        </button>
      </section>
    </>
  );
}

export default Page404;