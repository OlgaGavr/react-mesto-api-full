import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [registerData, setRegisterData] = React.useState({ email: '', password: '' })

  function handleChange(e) {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(registerData)
      .catch(err => console.log(err));
  }
  console.log("register");
  return (
    <div className='login page__login'>
      <h2 className="login__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="login__form">
        <div className="login__fields">
          <input type="email" id="email" name="email" className="login__field" placeholder="Email" required
            value={registerData.email} onChange={handleChange} />
          <input type="password" id="password" name="password" className="login__field" placeholder="Пароль" required
            value={registerData.password} onChange={handleChange} />
        </div>
        <button type="submit" className="button button_action_login">Зарегистрироваться</button>
      </form>
      <div className='login__signin'>
        <Link className='login__signin-link' to='/login'>Уже зарегистрированы? Войти</Link>
      </div>
    </div>


  )
}

export default Register;