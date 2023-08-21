/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { DURATION_FILM__FOR_FILTER } from "../../utils/constants";

function SavedMovies({ movies, onUnsaveFilm }) {
  const [isLoading, setIsLoading] = useState(false);

  const [valueSearch, setValueSearch] = useState("");

  const [arrSearchInSave, setArrSearchInSave] = useState([]);

  const [isChecked, setIsChecked] = useState(false);

  /* ЧЕКБОКС */
  function handleCheck() {
    setIsChecked(!isChecked);
  }

  /* ПОИСК С ФИЛЬТРОМ */
  function filteredMovies() {
    setIsLoading(true);

    setTimeout(() => {
      /* ФИЛЬТР ВКЛЮЧЕН*/
      if (isChecked) {
        const filterMovies = movies.filter((item) => {
          return (
            item.nameRU.toLowerCase().includes(valueSearch.toLowerCase()) &&
            item.duration <= DURATION_FILM__FOR_FILTER
          );
        });

      setArrSearchInSave(filterMovies);
      } else {
        const newmovies = movies.filter((item) => {
          return item.nameRU.toLowerCase().includes(valueSearch.toLowerCase());
        });

        setArrSearchInSave(newmovies);
      }

      setIsLoading(false);
    }, 500);
  }

  useEffect(() => {
    filteredMovies();
  }, []);

  return (
    <section className="movies">
      <SearchForm
        valueSearch={valueSearch}
        setValueSearch={setValueSearch}
        isChecked={isChecked}
        handleCheck={handleCheck}
        filteredMovies={filteredMovies}
      />
      {isLoading ? (
        <Preloader />
      ) : arrSearchInSave.length ? (
        <MoviesCardList
          movies={arrSearchInSave}
          onUnsaveFilm={onUnsaveFilm}
        />
      ) : (
        <p className="movies__text">Ничего не найдено</p>
      )}
    </section>
  );
}

export default SavedMovies;