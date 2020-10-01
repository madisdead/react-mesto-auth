import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} name="update" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose}>
      <label className="popup__field">
        <input name="avatar" type="text" className="popup__input popup__input_avatar" placeholder="URL Вашей новой фотографии"
          id="avatar" required minLength="1" ref={avatarRef} />
        <span className="popup__error" id='place-input-error'></span>
      </label>
      <button className="popup__button popup__button_update">Сохранить</button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;