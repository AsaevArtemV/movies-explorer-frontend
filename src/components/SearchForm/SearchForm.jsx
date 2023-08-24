import { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { ENTER_NAME_MOVIE } from "../../constants/message";
import "./SearchForm.css";

function SearchForm({ valueSearch, setValueSearch, isChecked, handleCheck, filteredMovies }) {
  const [textError, setTextError] = useState("");

  const handleChange = (e) => {
    setValueSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    filteredMovies();
    if (!valueSearch) {
      setTextError(ENTER_NAME_MOVIE);
      return;
    } else {
      setValueSearch(valueSearch);
    }
  };

  return (
    <div className="search-form">
      <div className="search-form__container">
        <form className="search-form__form"
          onSubmit={handleSubmit}
        >
          <input
            className="search-form__input"
            id="search"
            name="search"
            type="text"
            placeholder="Фильм"
            value={valueSearch || ""}
            onChange={handleChange}
            required
          />
          <button
            className={`search-form__btn ${!valueSearch ? "search-form__btn_disabled" : ""}`}
            type="submit"
          />
        </form>
        <div className="search-form__filter">
          <FilterCheckbox 
            isChecked={isChecked}
            handleCheck={handleCheck}
          />
          <p className="search-form__text">Короткометражки</p>
        </div>
      </div>
      <span className="search-form__span-error">{textError}</span>
    </div>
  );
}

export default SearchForm;