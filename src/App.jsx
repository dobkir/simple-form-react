import { useEffect, useState } from "react";
import { api } from "./api";
import "./App.css";

function App() {

  const onSubmit = (event) => {
    event.preventDefault();
    api(formData);
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [visitedField, setVisitedField] = useState({
    username: false,
    email: false,
    password: false,
    repeatPassword: false,
  });

  const [validationError, setValidationError] = useState({
    username: "The Username field cannot be empty",
    email: "The Email field cannot be empty",
    password: "The Password field cannot be empty",
    repeatPassword: "The Repeat Password field cannot be empty",
  })

  const [formValid, setFormValid] = useState(false);

  const setCurrentData = (currentName, currentValue) => {
    setFormData({
      ...formData,
      [currentName]: currentValue,
    });
  }

  const setCurrentVisitedField = (currentName, currentState) => {
    setVisitedField({
      ...visitedField,
      [currentName]: currentState,
    });
  }

  const setCurrentValidationError = (currentName, currentError) => {
    setValidationError({
      ...validationError,
      [currentName]: currentError,
    });
  }

  useEffect(() => {
    for (let value of Object.values(validationError)) {
      if (value) {
        setFormValid(false);
      } else {
        setFormValid(true);
      }
    }
  }, [validationError]);

  const usernameValidator = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setCurrentData(name, value);

    if (!value.length) {
      setCurrentValidationError(name, "The Username field cannot be empty")
    } else if (value.length > 14) {
      setCurrentValidationError(name, "Username must be less than fourteen characters")
    } else {
      setCurrentValidationError(name, "");
    }
  }

  const emailValidator = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setCurrentData(name, value);

    const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!value.length) {
      setCurrentValidationError(name, "The Email field cannot be empty")
    } else if (!res.test(String(value).toLowerCase())) {
      setCurrentValidationError(name, "Email is incorrect");
    } else {
      setCurrentValidationError(name, "");
    }
  };

  const passwordValidator = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setCurrentData(name, value);

    if (value !== formData.repeatPassword) {
      setCurrentValidationError(name, "Values don't match");
    }
    if (!value.length) {
      setCurrentValidationError(name, "The Password field cannot be empty");
    } else if (value.length < 5) {
      setCurrentValidationError(name, "Password must be more than five characters");
    } else if (value.length > 14) {
      setCurrentValidationError(name, "Password must be less than fourteen characters");
    } else {
      setCurrentValidationError(name, "");
    }
  };

  const repeatPasswordValidator = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setCurrentData(name, value);

    if (value !== formData.password) {
      setCurrentValidationError(name, "Values don't match");
    } else {
      setCurrentValidationError(name, "");
    }
  }

  const blurHandler = (event) => {
    switch (event.target.name) {
      case 'username':
        setCurrentVisitedField('username', true);
        break;
      case 'email':
        setCurrentVisitedField('email', true);
        break;
      case 'password':
        setCurrentVisitedField('password', true);
        break;
      case 'repeatPassword':
        setCurrentVisitedField('repeatPassword', true);
        break;
      default:
        alert("Something incomprehensible here :-O");
    }
  };

  return (
    <form className="form" name="registration_form" onSubmit={onSubmit}>
      <h1 className="form__title">Register!</h1>
      <ul>
        <li>
          <label className="field__label">
            Username: {(visitedField.username && validationError.username) &&
              <span className="error__message">{validationError.username}</span>}
          </label>
          <input
            className={(visitedField.username && validationError.username) ? "input invalid" : "input"}
            name="username"
            type="text"
            placeholder="Enter your name..."
            onBlur={event => blurHandler(event)}
            value={formData.username}
            onChange={event => usernameValidator(event)}
          />
        </li>
        <li>
          <label className="field__label">
            E-mail: {(visitedField.email && validationError.email) &&
              <span className="error__message">{validationError.email}</span>}
          </label>
          <input
            className={(visitedField.email && validationError.email) ? "input invalid" : "input"}
            name="email"
            type="text"
            placeholder="Enter your email..."
            onBlur={event =>
              blurHandler(event)}
            value={formData.email}
            onInput={event => emailValidator(event)}
          />
        </li>
        <li>
          <label className="field__label">
            Password: {(visitedField.password && validationError.password) &&
              <span className="error__message">{validationError.password}</span>}
          </label>
          <input
            className={(visitedField.password && validationError.password) ? "input invalid" : "input"}
            name="password"
            type="password"
            placeholder="Enter your password..."
            onBlur={event => blurHandler(event)}
            value={formData.password}
            onInput={event => passwordValidator(event)}
          />
        </li>
        <li>
          <label className="field__label">
            Repeat Password: {(visitedField.repeatPassword && validationError.repeatPassword) &&
              <span className="error__message">{validationError.repeatPassword}</span>}
          </label>
          <input
            className={(visitedField.repeatPassword && validationError.repeatPassword) ? "input invalid" : "input"}
            name="repeatPassword"
            type="password"
            placeholder="Repeat your password..."
            onBlur={event => blurHandler(event)}
            value={formData.repeatPassword}
            onInput={event => repeatPasswordValidator(event)}
          />
        </li>
        <li>
          <button className="submit__button" type="submit" disabled={!formValid} >Go!</button>
        </li>
      </ul>

      <p className="thanks">
        Thank you for signing up, <span>{formData.username}</span>! <br />
        We will send you a confirmation e-mail to <br />
        <span>{formData.email}</span> :)
      </p>
      input data:
      <pre>{JSON.stringify(formData, 0, 2)}</pre>
    </form >
  );
}

export default App;
