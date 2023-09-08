import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_type_image-zoom ${card.link ? `popup_opened` : ""}`}>
      <div className="popup__image-container">
        <button className="popup__close-button" onClick={onClose}></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__description">{card.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
