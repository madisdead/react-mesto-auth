import React, { useState } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import newApi from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  React.useEffect(()=>{
    newApi.getInitialCards()
    .then((res)=>{
      setCards(res);
    }).catch((err)=>{
      console.log(err);
    });
  }, []);
  React.useEffect(()=>{
    newApi.getUser()
      .then((res)=>{
        setCurrentUser(res);
      }).catch((err)=>{
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if(isLiked) {
      newApi.removeLike(card._id).then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      }).catch((err)=>{
        console.log(err);
      });
    } else {
      newApi.likeCard(card._id).then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      }).catch((err)=>{
        console.log(err);
      });
    }
  }

  function handleCardDelete(card) {
    newApi.deleteCard(card._id).then(()=>{
      const newCards = cards.filter(element=>element._id!==card._id);
      setCards(newCards);
    }).catch((err)=>{
      console.log(err);
    });
  }

  function handleCardClick(evt) {
    setSelectedCard(evt);
  }

  function handleEditAvatarClick() { 
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() { 
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() { 
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(userObj) {
    newApi.editUser(userObj)
      .then((res)=>{
        return res.json();
      }).then((res)=>{
        setCurrentUser(res);
        closeAllPopups();
      }).catch((err)=>{
        console.log(err);
    });
  }
 
  function handleUpdateAvatar(avatarUrl){
    newApi.updateAvatar(avatarUrl)
      .then((res)=>{
        setCurrentUser(res);
        closeAllPopups();
      }).catch((err)=>{
        console.log(err);
    });
  }

  function handleAddPlaceSubmit(cardObj){
    newApi.createCard(cardObj)
      .then((res)=>{
        setCards([...cards, res]);
        closeAllPopups();
      }).catch((err)=>{
        console.log(err);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <Main 
        onCardDelete={handleCardDelete}
        onCardLike={handleCardLike}
        cards={cards}
        onEditProfile={handleEditProfileClick} 
        onAddPlaceClick={handleAddPlaceClick} 
        onEditAvatar={handleEditAvatarClick} 
        onCardClick={handleCardClick} />
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm name="confirm" title="Вы уверены?">
        <button className="popup__button popup__button_confirm">Да</button>
      </PopupWithForm>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;