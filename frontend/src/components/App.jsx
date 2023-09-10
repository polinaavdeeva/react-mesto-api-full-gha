import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import * as Auth from "../utils/Auth";
import InfoTooltip from "../components/InfoTooltip";
import { useEffect } from "react";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isSuccess, setSuccess] = React.useState(false);
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    if(loggedIn){
      Promise.all([api.getUserInfo(), api.getInitalCards()])
        .then(([userInfo, cards]) => {
          setCurrentUser(userInfo);
          setCards(cards);
        })
        .catch((error) => {
          console.log(`Ошибка ${error}`);
        });
    }
  }, [loggedIn]);

  const navigate = useNavigate();

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api
        .putLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          console.log(`Ошибка ${error}`);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          console.log(`Ошибка ${error}`);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.log(`Ошибка ${error}`);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopup(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopup(true);
  }

  function handleUpdateUser(userData) {
    api
      .editUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка ${error}`);
      });
  }

  function handleUpdateAvatar(userData) {
    api
      .editUserAvatar(userData)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка ${error}`);
      });
  }

  function handleAddPlaceSubmit(cardData) {
    api
      .addNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка ${error}`);
      });
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleTokenCheck() {
    if (localStorage.getItem("token")) {
      const jwt = localStorage.getItem("token");
      console.log(jwt);
      Auth.checkToken(jwt)
        .then((data) => {
          if (!data) {
            return;
          }
          setLoggedIn(true);
          setCurrentUser(data);
          setEmail(data.data.email);
          navigate("/",{replace: true});
        })
        .catch(() => {
          setLoggedIn(false);
        });
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header email={email} setLoggedIn={setLoggedIn} />

          <Routes>
            <Route
              path="/sign-in"
              element={<Login handleLogin={handleLogin} setEmail={setEmail} />}
            />

            <Route
              path="/sign-up"
              element={
                <Register
                  setSuccess={setSuccess}
                  setInfoTooltipOpen={setInfoTooltipOpen}
                />
              }
            />

            <Route
              path="/react-mesto-auth"
              element={
                loggedIn ? (
                  <Navigate to="/" replace/>
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />

            <Route path="*" element={<Navigate to="/sign-in" replace />} />

            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  loggedIn={loggedIn}
                />
              }
            />
          </Routes>

          {loggedIn && <Footer />}

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm title="Вы уверены?" name="delete" buttonText="Да" />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccess}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
