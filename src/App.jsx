import './App.css';

function App() {
  return (
    <section class="container">
      <h1>Register!</h1>
      <form data-binding="submit: registerUser">
        <label>Name: </label>
        <input name="name" type="text" placeholder="Enter your name..." />
        <br />

        <label>E-mail: </label>
        <input name="email" type="text" placeholder="Enter your email..." />
        <br />

        <label>Password: </label>
        <input name="password" type="password" placeholder="Enter your password..." />
        <br />

        <label>Repeat Password: </label>
        <input name="repeat_password" type="password" placeholder="Repeat your password..." />
        <br />

        <button type="submit">Go!</button>
      </form>
      <p>
        Thank you for signing up <span data-bind="text: name"></span>! We will send you a confirmation e-mail to <span data-bind="text: email"></span> :)
      </p>

    </section>
  );
}

export default App;
