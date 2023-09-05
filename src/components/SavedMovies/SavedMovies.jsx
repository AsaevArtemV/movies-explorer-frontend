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

  function handleCheckSavedMovies() {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);
    filteredMovies(newIsChecked);
  }

  // Поиск с фильтром
  function filteredMovies(newIsChecked = isChecked) {
    // console.log(newIsChecked)
    // Фильтр вкл
    if (newIsChecked) {
      const filterMovies = movies.filter((film) => {
        return (
          film.nameRU.toLowerCase().includes(valueSearch.toLowerCase()) &&
          film.duration <= DURATION_FILM__FOR_FILTER
        );
      });

      setArrSearchInSave(filterMovies);

      if (filterMovies.length === 0) {
        setSearchEmpty("Ничего не найдено");
      } else {
        setSearchEmpty("");
      } 
      return;

    } else {
      const newmovies = movies.filter((film) => {
        return film.nameRU.toLowerCase().includes(valueSearch.toLowerCase());
      });
        
      setArrSearchInSave(newmovies);

      if (newmovies.length === 0 && valueSearch) {
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
        handleCheckSavedMovies={handleCheckSavedMovies}
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
