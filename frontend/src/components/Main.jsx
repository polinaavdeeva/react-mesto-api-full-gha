import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onAddPlace,
  onEditProfile,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const cardsItems = cards.map((card) => (
    <Card
      key={card._id}
      card={card}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
    ></Card>
  ));

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-update">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватарка профиля"
          />
          <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <div className="profile__title-block">
            <h1 className="profile__info-title">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              onClick={onEditProfile}
              type="button"
            ></button>
          </div>
          <p className="profile__info-subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={onAddPlace}
          type="button"
        ></button>
      </section>
      <section className="elements" aria-label="Места">
        <ul className="elements__items">{cardsItems}</ul>
      </section>
    </main>
  );
}

export default Main;
