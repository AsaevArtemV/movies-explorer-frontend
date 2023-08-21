/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { DURATION_FILM__FOR_FILTER } from "../../utils/constants";

function Movies({ movies, savedMovies, onSaveFilm, onUnsaveFilm }) {
    const [isLoading, setIsLoading] = useState(false);

  const [valueSearch, setValueSearch] = useState("");

  const [arrSearch, setArrSearch] = useState([]);

  const [isChecked, setIsChecked] = useState(false);
  const error = false;

  /* localStorage */
  /*текст запроса, найденные фильмы и состояние переключателя короткометражек сохраняются в хранилище*/
  const filterMovies = JSON.parse(localStorage.getItem("filteredMovies"));
  const textQueryForSearch = localStorage.getItem("queryForSearch");
  const stateCheckBox = JSON.parse(localStorage.getItem("stateCheckBox"));

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      if (textQueryForSearch) {
        setValueSearch(textQueryForSearch);
      }
      if (stateCheckBox) {
        setIsChecked(stateCheckBox);
      }
      if (filterMovies) {
        setArrSearch(filterMovies);
      }
      setIsLoading(false);
    }, 500);
  }, []);

  /* ЧЕКБОКС */
  function handleCheck() {
    setIsChecked(!isChecked);
  }

  /* ПОИСК С ФИЛЬТРОМ */
  function filteredMovies() {
    // заисываем в localStorage текст запроса и состояние чек-бокса
    localStorage.setItem("queryForSearch", valueSearch);
    localStorage.setItem("stateCheckBox", JSON.stringify(isChecked));

    setTimeout(() => {
      if (!isChecked && !valueSearch) {
        console.log("фильтр не сделан и значения нет");
      }

      /* ФИЛЬТР ВКЛЮЧЕН*/
      if (isChecked && valueSearch) {
        const moviesAfterSearchWithFilter = movies.filter((item) => {
          return (
            item.nameRU.toLowerCase().includes(valueSearch.toLowerCase()) &&
            item.duration <= DURATION_FILM__FOR_FILTER
          );
        });
        setArrSearch(moviesAfterSearchWithFilter);

        //записываем в localStorage найденные фильмы
        localStorage.setItem("filteredMovies", JSON.stringify(moviesAfterSearchWithFilter));
      } else if (!isChecked && valueSearch) {
        /* ФИЛЬТР ВЫКЛЮЧЕН*/
        const moviesAfterSearch = movies.filter((item) => {
          return item.nameRU.toLowerCase().includes(valueSearch.toLowerCase());
        });
        setArrSearch(moviesAfterSearch);

        //записываем в localStorage найденные фильмы
        localStorage.setItem("filteredMovies", JSON.stringify(moviesAfterSearch));
      } else setArrSearch(movies);
      setIsLoading(false);
    }, 500);
  }

  return (
    <section className="movies">
      <SearchForm
        valueSearch={valueSearch}
        setValueSearch={setValueSearch}
        isChecked={isChecked}
        handleCheck={handleCheck}
        filteredMovies={filteredMovies}
      />
      {error && arrSearch.length === 0 ? (
        <p className="movies__text">
          Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз
        </p>
      ) : (
        ""
      )}
      {isLoading ? (
        <Preloader />
        ) : arrSearch.length ? (
        <MoviesCardList
          movies={arrSearch}
          savedMovies={savedMovies}
          onSaveFilm={onSaveFilm}
          onUnsaveFilm={onUnsaveFilm}
        />
        ) : (
          <p className="movies__text">Ничего не найдено</p>
        )}
    </section>
  );
}

export default Movies;