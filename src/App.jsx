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
    repeatPassword: ""
  });

  const [usernameVisited, setUsernameVisited] = useState(false);
  const [emailVisited, setEmailVisited] = useState(false);
  const [passwordVisited, setPasswordVisited] = useState(false);
  const [repeatPasswordVisited, setRepeatPasswordVisited] = useState(false);

  const [usernameError, setUsernameError] = useState("The Username field cannot be empty");
  const [emailError, setEmailError] = useState("The Email field cannot be empty");
  const [passwordError, setPasswordError] = useState("The Password field cannot be empty");
  const [repeatPasswordError, setRepeatPasswordError] = useState("The Repeat Password field cannot be empty");

  const [formValid, setFormValid] = useState(false);

  const setCurrentData = (currentName, currentValue) => {
    setFormData({
      ...formData,
      [currentName]: currentValue
    });
  }

  useEffect(() => {
    if (usernameError || emailError || passwordError || repeatPasswordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [usernameError, emailError, passwordError, repeatPasswordError]);

  const usernameValidator = (event) => {
    setCurrentData(event.target.name, event.target.value);
    if (!event.target.value.length) {
      setUsernameError("The Username field cannot be empty")
    } else if (event.target.value.length > 14) {
      setUsernameError("Username must be less than fourteen characters")
    } else {
      setUsernameError("");
    }
  }

  const emailValidator = (event) => {
    setCurrentData(event.target.name, event.target.value);
    const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!event.target.value.length) {
      setEmailError("The Email field cannot be empty")
    } else if (!res.test(String(event.target.value).toLowerCase())) {
      setEmailError("Email is incorrect");
    } else {
      setEmailError("");
    }
  };

  const passwordValidator = (event) => {
    setCurrentData(event.target.name, event.target.value);

    if (event.target.value !== formData.repeatPassword) {
      setRepeatPasswordError("Values don't match");
    } else {
      setPasswordError("");
    }

    if (!event.target.value.length) {
      setPasswordError("The Password field cannot be empty");
    } else if (event.target.value.length < 5) {
      setPasswordError("Password must be more than five characters");
    } else if (event.target.value.length > 14) {
      setPasswordError("Password must be less than fourteen characters");
    } else {
      setPasswordError("");
    }

  };

  const repeatPasswordValidator = (event) => {
    setCurrentData(event.target.name, event.target.value);

    if (formData.password !== event.target.value) {
      setRepeatPasswordError("Values don't match");
    } else {
      setRepeatPasswordError("");
    }
  }

  const blurHandler = (event) => {
    switch (event.target.name) {
      case 'username':
        setUsernameVisited(true);
        break;
      case 'email':
        setEmailVisited(true);
        break;
      case 'password':
        setPasswordVisited(true);
        break;
      case 'repeatPassword':
        setRepeatPasswordVisited(true);
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
            Username: {(usernameVisited && usernameError) &&
              <span className="error__message">{usernameError}</span>}
          </label>
          <input
            className={(usernameVisited && usernameError) ? "input invalid" : "input"}
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
            E-mail: {(emailVisited && emailError) &&
              <span className="error__message">{emailError}</span>}
          </label>
          <input
            className={(emailVisited && emailError) ? "input invalid" : "input"}
            name="email"
            type="text"
            placeholder="Enter your email..."
            onBlur={event =>
              blurHandler(event)}
            value={formData.email}
            onChange={event => emailValidator(event)}
          />
        </li>
        <li>
          <label className="field__label">
            Password: {(passwordVisited && passwordError) &&
              <span className="error__message">{passwordError}</span>}
          </label>
          <input
            className={(passwordVisited && passwordError) ? "input invalid" : "input"}
            name="password"
            type="password"
            placeholder="Enter your password..."
            onBlur={event => blurHandler(event)}
            value={formData.password}
            onChange={event => passwordValidator(event)}
          />
        </li>
        <li>
          <label className="field__label">
            Repeat Password: {(repeatPasswordVisited && repeatPasswordError) &&
              <span className="error__message">{repeatPasswordError}</span>}
          </label>
          <input
            className={(repeatPasswordVisited && repeatPasswordError) ? "input invalid" : "input"}
            name="repeatPassword"
            type="password"
            placeholder="Repeat your password..."
            onBlur={event => blurHandler(event)}
            value={formData.repeatPassword}
            onChange={event => repeatPasswordValidator(event)}
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
