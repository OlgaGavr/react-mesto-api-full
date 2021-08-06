function PopupWithForm({ isOpen, name, title, buttonText, children, closePopups, onSubmit }) {
  return (
    <article className={`popup ${isOpen ? 'popup_opened' : ' '}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="form" name={`form_${name}`} onSubmit={onSubmit} noValidate>
          <ul className="popup__fields">
            {children}
          </ul>
          <button type="submit" className="button button_action_save">{buttonText}</button>
        </form>
        <button type="button" className="button button_action_close button_action_close-edit"
          aria-label="закрыть" onClick={closePopups} />
      </div>
    </article>
  )
}

export default PopupWithForm;