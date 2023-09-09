import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Auth from "../utils/Auth";

function Register({ setSuccess, setInfoTooltipOpen }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log(email,password);
    Auth.register(email,password)
      .then((data) => {
        navigate("/sign-in");
        setSuccess(true);
      })
      .catch((err) => {
        setSuccess(false);
        console.log(err.status);
      })
      .finally(() => {
        setInfoTooltipOpen(true);
      });
  }

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [setEmail,setPassword]);

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
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
          type="password"
          value={password}
          onChange={handleChangePassword}
          required
        ></input>
        <button className="auth__button" type="submit">
          Регистрация
        </button>
      </form>
      <p className="auth__registration-text">
        Уже зарегистрированы?{" "}
        {
          <Link className="auth__link" to="/sign-in">
            Вход
          </Link>
        }
      </p>
    </section>
  );
}

export default Register;
