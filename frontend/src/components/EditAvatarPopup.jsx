import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          type="url"
          id="popup__text-avatar-link"
          placeholder="Ссылка на аватар"
          name="avatarLink"
          ref={avatarRef}
          className="popup__text popup__text_type_avatar-link"
          required
        />
        <span className="popup__text-error popup__text-avatar-link-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
