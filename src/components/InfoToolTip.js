import React from 'react';

function InfoTooltip(props) {
  return (
    <section className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <div className="popup__content">
          {props.registerSuccess ?
          <div>
            <div className="popup__success-image"></div>
            <h2 className="popup__success-text">Вы успешно зарегистрировались!</h2>
          </div>
            :
          <div>
            <div className="popup__fail-image"></div>
            <h2 className="popup__success-text">Что-то пошло не так! Попробуйте ещё раз.</h2>
          </div>
          }
          <button className={`popup__close-button popup__close-button_${props.name}`} onClick={props.onClose}></button>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;