function InfoTolltip({ isOpen, isSuccess, closePopups }) {
    const caption= isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';
    return (
      <article className={`popup ${isOpen ? 'popup_opened' : ' '}`}>
        <div className="popup__container-info">
          
            <div className={`${isSuccess ? 'popup__image-success' : 'popup__image-error'}`} 
            alt={`${isSuccess ? 'Галочка' : 'Крестик'}`} />
            <div className="popup__caption-info">{caption}</div>
         
          <button type="button" className="button button_action_close" aria-label="закрыть" onClick={closePopups}></button>
        </div>
      </article>
    )
  }
  
  export default InfoTolltip;