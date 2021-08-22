import { useState } from "react";
import { useInput } from "./customHooks/useInput";
import { api } from "./api";
import "./App.css";

function App() {
  const username = useInput("", { isEmpty: true, minLength: 5, maxLength: 50 });
  const email = useInput("", { isEmpty: true, minLength: 5, maxLength: 50, isEmailError: false });
  const password = useInput("", { isEmpty: true, minLength: 5, maxLength: 50 });
  const confirmation = useInput("", {});
  const [isFetching, setFetching] = useState(false);

  const toggleIsFetching = (toggle) => {
    toggle ? setFetching(true) : setFetching(false);
  };

  const formData = {
    username: username.value,
    email: email.value,
    password: password.value,
    confirmation: confirmation.value,
  };

  const onReset = () => {
    username.onReset();
    email.onReset();
    password.onReset();
    confirmation.onReset();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    api(formData, toggleIsFetching);
    setTimeout(onReset, 2000);
  };

  return (
    <form
      className="form"
      name="registration_form"
      onSubmit={onSubmit}
      onReset={onReset}>
      <h1 className="form__title">Register!</h1>
      {isFetching && <img className="spinner" src="loading-spinner.gif" alt="img: spinning loader" />}
      <ul>
        <li>
          <label className="field__label">
            Username: {(username.isVisited &&
              (username.isEmpty
                || username.minLength
                || username.maxLength))
              && <span className="error__message">{username.errorMessage}</span>}
          </label>
          <input
            className={(username.isVisited &&
              (username.isEmpty
                || username.minLength
                || username.maxLength))
              ? "input invalid" : "input"}
            name="username"
            type="text"
            placeholder="Enter your name..."
            value={username.value}
            onChange={event => username.onChange(event)}
            onBlur={username.onBlur}
          />
        </li>
        <li>
          <label className="field__label">
            E-mail: {(email.isVisited &&
              (email.isEmpty
                || email.minLength
                || email.maxLength
                || email.isEmailError))
              && <span className="error__message">{email.errorMessage}</span>}
          </label>
          <input
            className={(email.isVisited &&
              (email.isEmpty
                || email.minLength
                || email.maxLength
                || email.isEmailError))
              ? "input invalid" : "input"}
            name="email"
            type="text"
            placeholder="Enter your email..."
            value={email.value}
            onChange={event => email.onChange(event)}
            onBlur={email.onBlur}
          />
        </li>
        <li>
          <label className="field__label">
            Password: {(password.isVisited &&
              (password.isEmpty
                || password.minLength
                || password.maxLength))
              && <span className="error__message">{password.errorMessage}</span>}
          </label>
          <input
            className={(password.isVisited &&
              (password.isEmpty
                || password.minLength
                || password.maxLength))
              ? "input invalid" : "input"}
            name="password"
            type="password"
            placeholder="Enter your password..."
            value={password.value}
            onChange={event => password.onChange(event)}
            onBlur={password.onBlur}
          />
        </li>
        <li>
          <label className="field__label">
            Confirmation:
            {(confirmation.isVisited &&
              (confirmation.value !== password.value))
              && <span className="error__message">Must match</span>}
          </label>
          <input
            className={(confirmation.isVisited &&
              (confirmation.value !== password.value))
              ? "input invalid" : "input"}
            name="confirmation"
            type="password"
            placeholder="Repeat your password..."
            value={confirmation.value}
            onChange={event => confirmation.onChange(event)}
            onBlur={confirmation.onBlur}
          />
        </li>
        <li>
          <div className="buttons__area">
            <button className="button submit__button" type="submit" disabled={
              isFetching
              || !username.inputValid
              || !email.inputValid
              || !password.inputValid
              || (confirmation.value !== password.value)
            }></button>
            <button className="button reset__button" type="reset" disabled={
              !username.value
              && !email.value
              && !password.value
              && !confirmation.value
            }></button>
          </div>
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
