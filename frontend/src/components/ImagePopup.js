function ImagePopup({ card, closePopups }) {
  return (
    <article className={`popup popup_type_preview ${card ? 'popup_opened' : ''}`}>
      <div className="popup__container-preview">
        <figure className="popup__figure">
          <img className="popup__image" alt={card ? card.name : null} src={card ? card.link : null} />
          <figcaption className="popup__caption">{card ? card.name : null}</figcaption>
        </figure>
        <button type="button" className="button button_action_close button_action_close-preview" aria-label="закрыть" onClick={closePopups}></button>
      </div>
    </article>
  )
}

export default ImagePopup;