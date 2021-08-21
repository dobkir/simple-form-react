import { useState } from "react";
import { useValidation } from "./useValidation";

export const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isVisited, setVisited] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onBlur = () => {
    setVisited(true);
  };

  const onReset = () => {
    setValue(initialValue);
    setVisited(false);
  };

  return {
    value,
    onChange,
    onBlur,
    onReset,
    isVisited,
    ...valid,
  }
};
