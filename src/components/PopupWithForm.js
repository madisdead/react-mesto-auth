import React from 'react';

function PopupWithForm(props) {
  return (
    <section className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <div className="popup__content">
          <h2 className="popup__text">{props.title}</h2>
          <form action="#" className={`popup__form popup__form_${props.name}`} name={`${props.name}`} onSubmit={props.onSubmit} noValidate>
            {props.children}
          </form>
          <button className={`popup__close-button popup__close-button_${props.name}`} onClick={props.onClose}></button>
        </div>
      </div>
    </section>
  );
}

export default PopupWithForm;