import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm() {
  return (
    <div className="search-form">
      <div className="search-form__container">
        <form className="search-form__form">
          <input
            className="search-form__input"
            id="search"
            name="search"
            type="text"
            placeholder="Фильм"
            required
          />
          <button
            className="search-form__btn"
            type="submit"
          />
        </form>
        <div className="search-form__filter">
          <FilterCheckbox />
          <p className="search-form__text">Короткометражки</p>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;