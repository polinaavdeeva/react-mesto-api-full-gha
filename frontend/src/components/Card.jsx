import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="elements__item">
      {isOwn && (
        <button
          className="elements__reset-button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        className="elements__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="elements__title-container">
        <p className="elements__title">{card.name}</p>
        <div className="elements__like-info">
          <button 
          className={`elements__like ${isLiked ? "elements__like_active" : ""}`} 
          onClick={handleCardLike}>
          </button>
          <p className="elements__like-nums">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
