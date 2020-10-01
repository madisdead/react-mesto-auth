import React from 'react';

import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';


function Main(props) {
  const user = React.useContext(CurrentUserContext);

  return (
    <main className="content">
    <section className="profile">
      <div className="profile__about">
        <img src={user.avatar} alt="Ваша фотография" className="profile__avatar" />
        <div className="profile__edit-overlay" onClick={props.onEditAvatar}>
          <div className="profile__edit-pen"></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{user.name}</h1>
          <button className="profile__edit-button" onClick={props.onEditProfile}></button>
          <p className="profile__job">{user.about}</p>
        </div>
      </div>
      <button className="profile__add-button" onClick={props.onAddPlaceClick}></button>
    </section>
    <section className="elements">
    {props.cards.map((element, i) => (
      <Card element={element} key={element._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
    ))}
    </section>
  </main>
  );
}


export default Main;