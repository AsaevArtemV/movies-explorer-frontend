import { useState, useCallback } from "react";

import { REG_EXP_NAME, REG_EXP_EMAIL } from "../../utils/constants";

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
    setIsValid(event.target.closest("form").checkValidity());

    if (name === "name" && value.length !== 0) {
      const isValidRegExp = REG_EXP_NAME.test(value);
      setErrors({
        ...errors,
        [name]: isValidRegExp ? "" : "Убедитесь, что поле 'Имя' не содержит специальных символов",
      });
      if (!isValidRegExp) {
        setIsValid(false);
      } else setIsValid(true);
    } else {
      setErrors({ ...errors, [name]: event.target.validationMessage });
    }

    if (name === "email" && value.length !== 0) {
      const isValidRegExp = REG_EXP_EMAIL.test(value);
      setErrors({
        ...errors,
        [name]: isValidRegExp ? "" : "Убедитесь, что поле 'Email' введено корректно",
      });
      if (!isValidRegExp) {
        setIsValid(false);
      } else setIsValid(true);
    } else {
      setErrors({ ...errors, [name]: event.target.validationMessage });
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