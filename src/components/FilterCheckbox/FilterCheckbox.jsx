import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <label className="checkbox">
      <input
        className="checkbox__input"
        id="checkbox"
        type="checkbox"
      />
      <span 
        className="checkbox__slider"
        htmlFor="checkbox"
      />
    </label>
  );
}

export default FilterCheckbox;