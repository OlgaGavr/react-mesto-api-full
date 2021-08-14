import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { api } from '../utils/api.js'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm'; 
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Register from './Register';
import Login from './Login';
import { CurrentUserContext } from '../contexts/CurrentUserContext';  
import ProtectedRoute from './ProtectedRoute'
import * as apiAuth from '../utils/apiAuth'
import InfoTolltip from './InfoTooltip.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({
    email: '',
    _id: '',
  });

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(true);

  const history = useHistory();

  React.useEffect(() => {
    if (loggedIn) {
      api.getAllData()
        .then((data) => {
          setCurentUser(data[0].data);
          setCards(data[1].data);
          history.push('/main')
        })
    }
  }, [loggedIn, history]);
  
  React.useEffect(() => {
    api.getUser()
      .then((userData) => {
        setCurentUser(userData);
      })
      .catch(() => console.log('Ошибка загрузки данных'));
  }, []);

  React.useEffect(() => {
    api.getCards()
      .then((cards) => {
        setCards(cards.data);
      })
      .catch(() => console.log(`Ошибка загрузки данных`));
  }, []);

  React.useEffect(() => {
    tokenCheck();
  }, []);
  
  function register(data) {
    return apiAuth
      .register(data)
      .then((res) => {
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
        history.push('/sign-in');
      })
      .catch(() => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      })
  }

  function login(data) {
    return apiAuth
      .authorize(data)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        tokenCheck();
      })
      .catch(() => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      })
  }
  
  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return
    }
    
    return apiAuth
      .getContent(jwt)
      .then((data) => {
        setUserInfo({ 
          email: data.data.email,
         _id: data.data._id,
        });
        setLoggedIn(true);
      })
     .catch(err => console.log(err));
  }

  function logout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch(err => console.log(err));
  }
  
  function handleAddPlaceSubmit(card) {
    api.postCard(card)
      .then((card) => {
        setCards([card.data, ...cards])
      })
      .then(() => { closeAllPopups() })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(user) {
    api.changeUser(user)
      .then((result) => {
        setCurentUser(result.data);
      })
      .then(() => { closeAllPopups() })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(user) {
    api.changeAvatar(user)
      .then((result) => {
        setCurentUser(result.data);
      })
      .then(() => { closeAllPopups() })
      .catch(err => console.log(err));
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
  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App page">
        <Header userInfo = {userInfo} onLogout={logout} />
        <Switch>
          <Route path="/crash-test">
          </Route>
          <Route path="/sign-in">
            <Login onLogin={login} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={register} />
          </Route>
          <ProtectedRoute
            exact path="/main"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            userInfo={userInfo}
          
          />
          <Route>
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} closePopups={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} closePopups={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} closePopups={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <InfoTolltip isOpen={isInfoTooltipOpen} closePopups={closeAllPopups} isSuccess={isSuccess} />
        <PopupWithForm name='delete' title='Вы уверены?' buttonText='Да' />
        <ImagePopup card={selectedCard} closePopups={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
