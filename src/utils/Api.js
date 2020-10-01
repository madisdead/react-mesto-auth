import apiOptions from './utils.js';

class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  renderLoading(isLoading, button) {
    if(isLoading){
      button.textContent += "...";
    } else {
      button.textContent = button.textContent.slice(0, -3);
    }
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    }).then((res)=>{
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  editUser(userInfo){
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about
      })
    });
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    }).then((res)=>{
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((res)=>{
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  likeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    }).then((res)=>{
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  removeLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((res)=>{
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  updateAvatar(imageUrl) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: imageUrl
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  createCard(cardData) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });;
  }
}

const newApi = new Api(apiOptions);

export default newApi;