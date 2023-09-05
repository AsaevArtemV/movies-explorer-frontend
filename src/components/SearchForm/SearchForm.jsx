import { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { ENTER_NAME_MOVIE } from "../../constants/message";
import "./SearchForm.css";

function SearchForm({
  valueSearch,
  setValueSearch,
  isChecked,
  handleCheck,
  filteredMovies,
  handleCheckSavedMovies,
}) {

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
    setTextError("");
  };

  return (
    <div className="search-form">
      <div className="search-form__container">
        <form className="search-form__form"
          onSubmit={handleSubmit}
          noValidate
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
            className="search-form__btn"
            type="submit"
          />
        </form>
        <div className="search-form__filter">
          <FilterCheckbox
            isChecked={isChecked}
            handleCheck={handleCheck}
            filteredMovies={filteredMovies}
            valueSearch={valueSearch}
            setTextError={setTextError}
            setValueSearch={setValueSearch}
            handleCheckSavedMovies={handleCheckSavedMovies}
          />
          <p className="search-form__text">Короткометражки</p>
        </div>
      </div>
      <span className="search-form__span-error">{textError}</span>
    </div>
  );
}

export default SearchForm;