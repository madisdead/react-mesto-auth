import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription ] = useState('');
  const user = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(user.name);
    setDescription(user.about);
  }, [user]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} name="edit" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose}>
      <label className="popup__field">
        <input name="name" type="text" className="popup__input popup__input_name" required
          minLength="2" maxLength="40" id="name" pattern="[А-Яа-яA-Za-z -]{1,}" placeholder="Имя"
          value={name} onChange={handleNameChange} />
        <span className="popup__error" id='name-input-error'></span>
      </label>
      <label className="popup__field">
        <input name="about" type="text" className="popup__input popup__input_job" required
          minLength="2" maxLength="200" id="job" placeholder="О себе" 
          value={description} onChange={handleDescriptionChange} />
          <span className="popup__error" id='job-input-error'></span>
      </label>
      <button className="popup__button popup__button_edit">Сохранить</button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;