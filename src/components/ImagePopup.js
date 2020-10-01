import React from 'react';

function ImagePopup(props) {
  return (
    <section className={`popup popup_zoom ${props.card.link && "popup_opened"}`}>
      <div className="popup__box">
        <img className="popup__image" src={props.card.link} alt="Картинка, которую Вы приблизили" />
        <h2 className="popup__caption">{props.card.name}</h2>
        <button className="popup__close-button popup__close-button_zoom" onClick={props.onClose}></button>
      </div>
    </section>
  );
}

export default ImagePopup;