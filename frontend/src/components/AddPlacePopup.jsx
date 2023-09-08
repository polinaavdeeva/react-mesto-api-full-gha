import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLnk(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          type="text"
          id="popup__text-place-name"
          placeholder="Название"
          name="placeName"
          className="popup__text popup__text_type_place-name"
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleChangeName}
          required
        />
        <span className="popup__text-error popup__text-place-name-error"></span>
        <input
          type="url"
          id="popup__text-picture-link"
          placeholder="Ссылка на картинку"
          name="imgLink"
          value={link}
          onChange={handleChangeLnk}
          className="popup__text popup__text_type_picture-link"
          required
        />
        <span className="popup__text-error popup__text-picture-link-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
