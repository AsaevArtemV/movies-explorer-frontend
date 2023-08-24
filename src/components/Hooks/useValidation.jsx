import { useState, useCallback } from "react";
import { REG_EXP_NAME, REG_EXP_EMAIL } from "../../constants/constants";
import { CHECK_THE_NAME_FIELD, CHECK_THE_EMAIL_FIELD } from "../../constants/message";

//Управление формой и валидацией формы
export function useValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
    setIsValid(e.target.closest("form").checkValidity());

    if (name === "name" && value.length !== 0) {
      const isValidRegExp = REG_EXP_NAME.test(value);
      setErrors({
        ...errors,
        [name]: isValidRegExp ? "" : CHECK_THE_NAME_FIELD,
      });
      if (!isValidRegExp) {
        setIsValid(false);
      } else setIsValid(true);
    } else {
      setErrors({ ...errors, [name]: e.target.validationMessage });
    }

    if (name === "email" && value.length !== 0) {
      const isValidRegExp = REG_EXP_EMAIL.test(value);
      setErrors({
        ...errors,
        [name]: isValidRegExp ? "" : CHECK_THE_EMAIL_FIELD,
      });
      if (!isValidRegExp) {
        setIsValid(false);
      } else setIsValid(true);
    } else {
      setErrors({ ...errors, [name]: e.target.validationMessage });
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, setValues };
}