import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} name="add" title="Новое место" isOpen={props.isOpen} onClose={props.onClose}>
      <label className="popup__field">
        <input name="name" type="text" className="popup__input popup__input_place" placeholder="Название"
          id="place" required minLength="1" maxLength="30" onChange={handleNameChange} value={name} />
        <span className="popup__error" id='place-input-error'></span>
      </label>
      <label className="popup__field">
        <input name="link" type="url" className="popup__input popup__input_link" placeholder="Ссылка на картинку"
          id="link" required onChange={handleLinkChange} value={link} />
        <span className="popup__error" id='link-input-error'></span>
      </label>
      <button className="popup__button popup__button_add">Создать</button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;