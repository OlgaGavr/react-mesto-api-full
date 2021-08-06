import React from 'react';
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content page__content">
      <section className="profile content__profile">
        <div style={{ backgroundImage: `url(${currentUser.avatar})` }} onClick={props.onEditAvatar} className="profile__avatar" />
        <div className="profile__info">
          <div className="profile__group">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="button button_action_edit"
                    aria-label="редактировать профиль" onClick={props.onEditProfile} />
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button type="button" className="button button_action_add" 
                onClick={props.onAddPlace} aria-label="добавить" />
      </section>
      <section className="cards content__cards">
        {props.cards.map((card) => (<Card key={card._id} card={card}
                                            onCardClick={props.onCardClick}
                                            onCardLike={props.onCardLike}
                                            onCardDelete={props.onCardDelete} />
                                   )
        )}
      </section>
    </main>
  )
}

export default Main;