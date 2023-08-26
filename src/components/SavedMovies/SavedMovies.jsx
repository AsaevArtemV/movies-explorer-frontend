/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { DURATION_FILM__FOR_FILTER } from "../../constants/constants";

function SavedMovies({
  movies,
  onUnsaveFilm,
  isLoading
}) {

  const [valueSearch, setValueSearch] = useState("");
  const [arrSearchInSave, setArrSearchInSave] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [searchEmpty, setSearchEmpty] = useState(null);

  function handleCheck() {
    setIsChecked(!isChecked);
  }

  // Поиск с фильтром
  function filteredMovies() {
      // Фильтр вкл
      if (isChecked) {
        const filterMovies = movies.filter((film) => {
          return (
            film.nameRU.toLowerCase().includes(valueSearch.toLowerCase()) &&
            film.duration <= DURATION_FILM__FOR_FILTER
          );
        });
      setArrSearchInSave(filterMovies);

      //if (arrSearchInSave.length === 0) { работает только при втором клике
      if (arrSearchInSave !== 0) {
        setSearchEmpty("Ничего не найдено");
      } else {
        setSearchEmpty(null);
      }

      } else {
        const newmovies = movies.filter((film) => {
          return film.nameRU.toLowerCase().includes(valueSearch.toLowerCase());
        });
        setArrSearchInSave(newmovies);

        //if (arrSearchInSave.length === 0) { работает только при втором клике
          if (arrSearchInSave !== 0) {
            setSearchEmpty("Ничего не найдено");
          } else {
            setSearchEmpty(null);
          }

      }
  }

  useEffect(() => {
    filteredMovies();
  }, [movies]);

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
      ) : (
        <MoviesCardList
          movies={arrSearchInSave}
          onUnsaveFilm={onUnsaveFilm}
        />
        ) }
        {searchEmpty ? (
          <p className="movies__text">{searchEmpty}</p>
        ) : ("")}
    </section>
  );
}

export default SavedMovies;