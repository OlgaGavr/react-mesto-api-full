import {optionAuth} from '../utils/constants.js';  

const checkResponse = (response) => {
  return response.ok ? response.json() : Promise.reject(new Error(`Ошибка ${response.status}: ${response.statusText}`));
}

const headers={
  'Content-Type': 'application/json',
}

export const register = ({ email, password}) => {
  return fetch(`${optionAuth.url}/signup`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  .then(res => checkResponse(res));
}

export const authorize = ( {email, password} ) => {
    return fetch(`${optionAuth.url}/signin`, {
      headers,
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    .then(res => checkResponse(res));
  }

  export const getContent = (token) => {
    return fetch(`${optionAuth.url}/users/me`, {
      method: 'GET',
      headers: {
        ...headers,
        'Authorization': `Bearer ${token}`,
      },
    //  credentials: 'include',
    })
    .then(res => checkResponse(res));
  }
