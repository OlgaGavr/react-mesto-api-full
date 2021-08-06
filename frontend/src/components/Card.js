import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`button button_action_delete ${isOwn ? '' : 'button_hidden'}`);

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`button button_action_like ${isLiked ? 'button_action_like-active' : ''}`)

  return (
    <article className="card">
      <button type="button" className={cardDeleteButtonClassName} 
              aria-label="удалить" onClick={() => onCardDelete(card)} />
      <img className="card__image" alt = {card.name} src = {card.link}
           onClick={() => onCardClick(card)} />
      <div className="card__group">
        <h2 className="card__text">{card.name}</h2>
        <div className="card__like-group">
          <button type="button" className={cardLikeButtonClassName} 
                  aria-label="поставить лайк" onClick={() => onCardLike(card)} />
          <h3 className="card__likes">{card.likes.length}</h3>
        </div>
      </div>
    </article>
  )
}

export default Card;