import React from 'react';
import PopupWithForm from './PopupWithForm';
function AddPlacePopup({ isOpen, closePopups, onAddPlace }) {
  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');

  function handleAddCardName(e) {
    setCardName(e.target.value);
  }

  function handleAddCardLink(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: cardName,
      link: cardLink
    });
  }

  React.useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [isOpen]);


  return (
    <PopupWithForm isOpen={isOpen} name='add' title='Новое место' buttonText='Создать'
      closePopups={closePopups} onSubmit={handleSubmit} >
      <li>
        <input type="text" id="nameAdd-input" name="name" className="popup__field popup__field_text_name"
          minLength="2" maxLength="30" placeholder="Название" required
          value={cardName} onChange={handleAddCardName} />
        <span className="nameAdd-input-error popup__input-error">Необходимо заполнить данное поле</span>
      </li>
      <li>
        <input type="url" id="link-input" name="link" className="popup__field popup__field_text_about"
          placeholder="Ссылка на картинку" required
          value={cardLink} onChange={handleAddCardLink} />
        <span className="link-input-error popup__input-error">Необходимо заполнить данное поле</span>
      </li>
    </PopupWithForm>
  )
}

export default AddPlacePopup;