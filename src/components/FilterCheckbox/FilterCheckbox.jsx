import "./FilterCheckbox.css";

function FilterCheckbox({ isChecked, handleCheck }) {
  return (
    <label className="checkbox">
      <input
        className="checkbox__input"
        id="checkbox"
        type="checkbox"
        onChange={handleCheck}
        checked={isChecked || ""}
      />
      <span 
        className="checkbox__slider"
        htmlFor="checkbox"
      />
    </label>
  );
}

export default FilterCheckbox;