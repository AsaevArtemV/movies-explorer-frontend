import { createRef } from "react";
import "./FilterCheckbox.css";
import { ENTER_NAME_MOVIE } from "../../constants/message";

function FilterCheckbox({
  isChecked,
  handleCheck,
  filteredMovies,
  valueSearch,
  setTextError,
  setValueSearch,
  handleCheckSavedMovies,
}) {
  const ref = createRef();

  function handleChange(e) {
    const newIsChecked = e.target.checked;
    if (handleCheck) {
      handleCheck(newIsChecked);
      if (!valueSearch) {
        setTextError(ENTER_NAME_MOVIE);
        return;
      } else {
        setValueSearch(valueSearch);
      }
      setTextError("");
      filteredMovies(newIsChecked);
    }

    if (handleCheckSavedMovies) {
      handleCheckSavedMovies(newIsChecked)
    }
  }

  return (
    <label className="checkbox">
      <input
        ref={ref}
        className="checkbox__input"
        id="checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
      <span 
        className="checkbox__slider"
        htmlFor="checkbox"
      />
    </label>
  );
}

export default FilterCheckbox;