import React from 'react';

function Login({ onLogin }) {
  const [loginData, setLoginData] = React.useState({ email: '', password: '' })
 
  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value, 
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!loginData.email || !loginData.password)
      return;
    
    onLogin(loginData)
      .catch(err => console.log(err));
  }

  return (
    <div className='login page__login'>
      <h2 className="login__title">Вход</h2>
      <form onSubmit={handleSubmit} className="login__form">
        <div className="login__fields">
          <input type="email" id="email" name="email" className="login__field" placeholder="Email" required
            value={loginData.email} onChange={handleChange} />
          <input type="password" id="password" name="password" className="login__field" placeholder="Пароль" required
            value={loginData.password} onChange={handleChange} />
        </div>
        <button type="submit" className="button button_action_login">Войти</button>
      </form>

    </div>

  )
}

export default Login;