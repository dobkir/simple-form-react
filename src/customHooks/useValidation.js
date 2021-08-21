import { useEffect, useState } from "react";

export const useValidation = (value, validations) => {

  const [isEmpty, setEmpty] = useState(true);
  const [minLength, setMinLength] = useState(false);
  const [maxLength, setMaxLength] = useState(false);
  const [isEmailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "isEmpty":
          if (!value) {
            setEmpty(true);
            setErrorMessage("Required");
          } else {
            setEmpty(false);
          }
          break;
        case "minLength":
          if (value && (value.length < validations[validation])) {
            setMinLength(true);
            setErrorMessage(`More characters ( > ${validations[validation]} )`);
          } else {
            setMinLength(false);
          }
          break;
        case "maxLength":
          if (value.length > validations[validation]) {
            setMaxLength(true);
            setErrorMessage(`Less characters ( < ${validations[validation]} )`);
          } else {
            setMaxLength(false);
          }
          break;
        case "isEmailError":
          const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (value && (!res.test(String(value).toLowerCase()))) {
            setEmailError(true);
            setErrorMessage("It's not email, dude!");
          } else {
            setEmailError(false);
          }
          break;
        default:
          alert("Something incomprehensible in validations :-O");
      }
    }
  }, [value, validations]);

  useEffect(() => {
    if (isEmpty || minLength || maxLength || isEmailError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLength, maxLength, isEmailError])

  return {
    isEmpty,
    minLength,
    maxLength,
    isEmailError,
    errorMessage,
    inputValid,
  }
};
