import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Auth from "../utils/Auth.js";

function Login({ handleLogin, setEmail }) {
  const [email, setUserEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(e) {
    setUserEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();

    Auth.authorize(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setEmail(email);
        handleLogin();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setUserEmail("");
    setPassword("");
  }, []);

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={handleChangeEmail}
          required
        ></input>
        <input
          className="auth__input"
          placeholder="Пароль"
          type="text"
          value={password}
          onChange={handleChangePassword}
          required
        ></input>
        <button className="auth__button" type="submit">
          Вход
        </button>
      </form>
    </section>
  );
}

export default Login;
