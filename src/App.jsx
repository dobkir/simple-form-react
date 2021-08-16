import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const onSubmit = (event) => {
    event.preventDefault();
    fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      body: JSON.stringify({ formData }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'X-Master-Key': '$2b$10$65lTDH3r4YCHqsLIzTJGZ.fIzJmJPTL24xO2Ol3sH9.saBA4cwWLW'
      })
    })
      .then(response => {
        // Let's check the response code
        if (!response.ok) {
          // If the server returned a response code out of range [200, 299]
          return Promise.reject(new Error(
            'Response failed: ' + response.status + ' (' + response.statusText + ')'
          ));
        }
        // Next, we will only use JSON from the response body
        return response.json();
      })
      // Let's check what form data was submitted to the server (remove it in the work version)
      .then(data => {
        alert(
          "The server received the following data from you: \n" +
          data.record.formData.map(field => {
            return `${field}; \n`;
          }).join(''));
      })
      .catch(error => alert(`Oops, any problem here: ${error.name}. ${error.message}`));
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [usernameVisited, setUsernameVisited] = useState(false);
  const [emailVisited, setEmailVisited] = useState(false);
  const [passwordVisited, setPasswordVisited] = useState(false);
  const [repeatPasswordVisited, setRepeatPasswordVisited] = useState(false);

  const [usernameError, setUsernameError] = useState("The Username field cannot be empty");
  const [emailError, setEmailError] = useState("The Email field cannot be empty");
  const [passwordError, setPasswordError] = useState("The Password field cannot be empty");
  const [repeatPasswordError, setRepeatPasswordError] = useState("The Repeat Password field cannot be empty");

  const [formValid, setFormValid] = useState(false);

  const [formData, setFormData] = useState([]);
  const getCurrentData = (currentValue) => {
    return setFormData(prevData => [...prevData, currentValue]);
  }


  useEffect(() => {
    if (usernameError || emailError || passwordError || repeatPasswordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [usernameError, emailError, passwordError, repeatPasswordError]);

  const usernameValidator = (event) => {
    setUsername(event.target.value);
    if (event.target.value.length > 14) {
      setUsernameError("Username must be less than fourteen characters")
    } else {
      getCurrentData(event.target.value);
      setUsernameError("");
    }
  }

  const emailValidator = (event) => {
    setEmail(event.target.value);
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!res.test(String(event.target.value).toLowerCase())) {
      setEmailError("Email is incorrect");
    } else {
      getCurrentData(event.target.value);
      setEmailError("");
    }
  };

  const passwordValidator = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length < 5) {
      setPasswordError("Password must be more than five characters");
    } else if (event.target.value.length > 14) {
      setPasswordError("Password must be less than fourteen characters");
    } else {
      getCurrentData(event.target.value);
      setPasswordError("");
    }
  };

  const repeatPasswordValidator = (event) => {
    setRepeatPassword(event.target.value);
    if (password !== event.target.value) {
      setRepeatPasswordError("Values do not match");
    } else {
      getCurrentData(event.target.value);
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
            value={username}
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
            value={email}
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
            value={password}
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
            value={repeatPassword}
            onChange={event => repeatPasswordValidator(event)}
          />
        </li>
        <li>
          <button className="submit__button" type="submit" disabled={!formValid} >Go!</button>
        </li>
      </ul>

      <p className="thanks">
        Thank you for signing up, <span>{username}</span>! <br />
        We will send you a confirmation e-mail to <br />
        <span>{email}</span> :)
      </p>
      input data:
      <pre>{JSON.stringify(formData, 0, 2)}</pre>
    </form >
  );
}

export default App;
