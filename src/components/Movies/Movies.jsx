/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { DURATION_FILM__FOR_FILTER } from "../../constants/constants";

function Movies({
  movies,
  savedMovies,
  onSaveFilm,
  onUnsaveFilm
}) {

  const [isLoading, setIsLoading] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [arrSearch, setArrSearch] = useState([]);
  const [isChecked, setIsChecked] = useState(JSON.parse(localStorage.getItem("stateCheckBox")) || false);
  const [searchEmpty, setSearchEmpty] = useState(null);
  const error = false;

  // Найденные фильмы
  const filterMovies = JSON.parse(localStorage.getItem("filteredMovies"));
  // Текст запроса
  const textSearch = localStorage.getItem("queryForSearch");
  // Состояние переключателя короткометражек
  const stateCheckBox = JSON.parse(localStorage.getItem("stateCheckBox"));

  useEffect(() => {
    setIsLoading(true);

      if (textSearch) {
        setValueSearch(textSearch);
      }
      if (stateCheckBox) {
        setIsChecked(stateCheckBox);
      }
      if (filterMovies) {
        setArrSearch(filterMovies);
      }
      setIsLoading(false);
  }, []);

  function handleCheck() {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);
  }

  // Поиск фильс=мов с фильтром (ВКЛ, ВЫКЛ)
  function filteredMovies(newIsChecked = isChecked) {
   // Заисываем в localStorage текст запроса
   localStorage.setItem("queryForSearch", valueSearch);
   // Заисываем в localStorage состояние чек-бокса
   localStorage.setItem("stateCheckBox", JSON.stringify(newIsChecked));

     // Фильтр ВКЛ
     if (newIsChecked && valueSearch) {
       const moviesAfterFilter = movies.filter((item) => {
         return (
           item.nameRU.toLowerCase().includes(valueSearch.toLowerCase()) &&
           item.duration <= DURATION_FILM__FOR_FILTER
         );
       });
       setArrSearch(moviesAfterFilter);

      if (moviesAfterFilter.length === 0) {
        setSearchEmpty("Ничего не найдено");
      } else {
        setSearchEmpty("");
      }

       //Записываем в localStorage найденные фильмы
       localStorage.setItem("filteredMovies", JSON.stringify(moviesAfterFilter));

     } else if (!newIsChecked && valueSearch) {
       // Фильтр ВЫКЛ
       const moviesAfterSearch = movies.filter((film) => {
         return film.nameRU.toLowerCase().includes(valueSearch.toLowerCase());
       });
       setArrSearch(moviesAfterSearch);

      if (moviesAfterSearch.length === 0) {
        setSearchEmpty("Ничего не найдено");
      } else {
        setSearchEmpty("");
      }

       //Записываем в localStorage найденные фильмы
       localStorage.setItem("filteredMovies", JSON.stringify(moviesAfterSearch));
     } else setArrSearch(movies);

     setIsLoading(false);
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
          Во время запроса произошла ошибка.
          Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз.
        </p>
      ) : ("")}
      {isLoading ? (
        <Preloader />
        ) : (
        <MoviesCardList
          movies={arrSearch}
          savedMovies={savedMovies}
          onSaveFilm={onSaveFilm}
          onUnsaveFilm={onUnsaveFilm}
        />
        ) }
        {searchEmpty ? (
          <p className="movies__text">{searchEmpty}</p>
        ) : ("")}
    </section>
  );
} 


export default Movies;