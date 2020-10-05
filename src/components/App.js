import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
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
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoToolTip.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltippOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegisterSuccess, setRegisterSuccess] = useState(false);
  const [email, setEmail] = useState('');

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
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
    setRegisterSuccess(false);
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

  function failSuccessRegister(bool) {
    setRegisterSuccess(bool);
  }

  function handleRegister() {
    setIsInfoTooltipOpen(true);
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function exitProfile() {
    setLoggedIn(false);
  }

  function setNewEmail(email){
    setEmail(email);
  }

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header exitProfile={exitProfile} email={email} setNewEmail={setNewEmail} />
        <Switch>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} onSuccess={handleLogin} failSuccessRegister={failSuccessRegister} />
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} loggedIn={loggedIn} setNewEmail={setNewEmail} />
          </Route>
          <ProtectedRoute path="/" loggedIn={loggedIn} component={Main}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            cards={cards}
            onEditProfile={handleEditProfileClick} 
            onAddPlaceClick={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick} 
            onCardClick={handleCardClick}>
          </ProtectedRoute>
          <Route exact path="/*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        {loggedIn && <Footer />}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <PopupWithForm name="confirm" title="Вы уверены?">
          <button className="popup__button popup__button_confirm">Да</button>
        </PopupWithForm>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <InfoTooltip isOpen={isInfoTooltippOpen} onClose={closeAllPopups} registerSuccess={isRegisterSuccess} />
        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;