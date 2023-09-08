import React from "react";
import headerLogo from "../images/header-logo.svg";
import { useLocation, Link ,useNavigate} from "react-router-dom";

function Header({ email, setLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  function singOut() {
    localStorage.removeItem("token");
    navigate("/sign-in");
    setLoggedIn(false);
  }

  return (
    <header className="header">
      <img className="logo" src={headerLogo} alt="Логотип сервиса 'Mesto'" />
      {location.pathname === "/sign-in" && (
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      )}
      {location.pathname === "/sign-up" && (
        <Link className="header__link" to="/sign-in">
          Вход
        </Link>
      )}

      {location.pathname === "/" && (
        <div className="header__email-container">
          <p className="header__email">{email}</p>
          <Link className="header__email-link" to="/sign-in" onClick={singOut}>
            Выход
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
