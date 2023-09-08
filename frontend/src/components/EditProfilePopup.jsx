import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, closeAllPopups, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDesription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          type="text"
          id="popup__text-name"
          placeholder="Имя"
          name="userName"
          className="popup__text popup__text_type_name"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleChangeName}
          required
        />
        <span className="popup__text-error popup__text-name-error"></span>
        <input
          type="text"
          id="popup__text-about-oneself"
          placeholder="О себе"
          name="aboutUser"
          className="popup__text popup__text_type_about-oneself"
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleChangeDesription}
          required
        />
        <span className="popup__text-error popup__text-about-oneself-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
