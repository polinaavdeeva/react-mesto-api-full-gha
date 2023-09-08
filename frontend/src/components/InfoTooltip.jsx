import React from "react";
import successPic from '../images/success.svg';
import unsuccessPic from '../images/unsuccess.svg';

function InfoTooltip({ onClose, isOpen, isSuccess }) {
  return (
    <section
      className={`popup popup_type_tooltip ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <div className="popup__result-container">
          {isSuccess ? (
            <>
              <img
                className="popup__success-image"
                src={successPic}
                alt="Вы успешно зарегистрировались!"
              />
              <p className="popup__resilt-text">
                Вы успешно<br/>зарегистрировались!
              </p>
            </>
          ) : (
            <>
              <img
                className="popup__success-image"
                src={unsuccessPic}
                alt="Что-то пошло не так!
                Попробуйте ещё раз."
              />
              <p className="popup__resilt-text">
                Что-то пошло не так!<br/>Попробуйте ещё раз.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
