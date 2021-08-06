import { options } from '../utils/constants.js';
class Api {
  constructor(options) {
    this._url = options.url;
    this._authorization = options.headers.authorization;
  }
  
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse);
  }

  getAllData() {
    return Promise.all([this.getUser(), this.getCards()])
  }

  changeUser(user) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    })
      .then(this._checkResponse);
  }

  postCard(newCard) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link
      })
    })
      .then(this._checkResponse);
  }

  deleteCard(delCardId) {
    return fetch(`${this._url}/cards/${delCardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      },
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(id, isNoLiked) {
    return fetch(`${this._url}/cards/likes/${id} `, {
      method: isNoLiked ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._authorization,
      },
    })
      .then(this._checkResponse);
  }

  changeAvatar(user) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: user.avatar
      })
    })
      .then(this._checkResponse);
  }
}

export const api = new Api(options);
