import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card(props) {
  const user = React.useContext(CurrentUserContext);
  const isOwn = props.element.owner._id === user._id;
  const cardDeleteButtonClassName = (
    `element__remove ${isOwn ? '' : 'element__remove_hidden'}`
  );
  const isLiked = props.element.likes.some(i => i._id === user._id);
  const cardLikeButtonClassName = `element__like_active`;

  function handleLikeClick() {
    props.onCardLike(props.element);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.element);
  }

  function handleClick() {
    props.onCardClick(props.element);
  }
  
  return (
    <div className="element">
      <button className={`element__remove ${cardDeleteButtonClassName}`} onClick={handleDeleteClick} />
      <img className="element__image" alt={props.element.name} src={props.element.link} onClick={handleClick}/>
      <div className="element__caption">
        <h2 className="element__heading">{props.element.name}</h2>
        <div className="element__likes">
          <button className={`element__like ${isLiked && cardLikeButtonClassName}`} onClick={handleLikeClick} />
          <p className="element__like-counter">{props.element.likes.length}</p>
        </div>
        </div>
    </div>
  );
}

export default Card;