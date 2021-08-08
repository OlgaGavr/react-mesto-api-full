import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function EditProfilePopup({ isOpen, closePopups, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    if (currentUser.data !== undefined) {
    if (currentUser.data.name !== undefined) {
      setName(currentUser.data.name);
    }
    if (currentUser.data.about !== undefined) {
      setDescription(currentUser.data.about);
    }
  }
  }, [isOpen]);


  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    })
  }

  return (
    <PopupWithForm name='edit' title='Редактировать профиль' buttonText='Сохранить'
      isOpen={isOpen} closePopups={closePopups} onSubmit={handleSubmit} >
      <li>
        <input type="text" className="popup__field popup__field_text_name" id="name-input"
          minLength="2" maxLength="40" name="name" required
          value={name} onChange={handleChangeName} />
        <span className="name-input-error popup__input-error">Необходимо заполнить данное поле</span>
      </li>
      <li>
        <input type="text" className="popup__field popup__field_text_about" id="about-input"
          minLength="2" maxLength="200" name="about" required
          value={description}
          onChange={handleChangeDescription} />
        <span className="about-input-error popup__input-error">Необходимо заполнить данное поле</span>
      </li>
    </PopupWithForm>
  )
}

export default EditProfilePopup;