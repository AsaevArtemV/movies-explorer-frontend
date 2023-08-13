import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <div className="card-list">
      <ul className="gallery">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <button className="card-list__btn">Ещё</button>
    </div>
  );
}

export default MoviesCardList;