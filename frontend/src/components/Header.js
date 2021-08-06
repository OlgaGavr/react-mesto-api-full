import logo from '../images/logo.svg';
import { Link, Route, Switch } from 'react-router-dom';
function Header({ userInfo, onLogout }) {
  return (
    <header className="header page__header">
      <a href="#" target="_blank" rel="noopener">
        <img src={logo} alt='Логотип Место Россия' className="header__logo" />
      </a>
      <div className='header__nav'>
        <Switch>
          <Route path='/main'>
            <p className='header__email'>{userInfo.email}</p>
            <Link className='header__link' to='/sign-in' onClick={onLogout} >Выйти</Link>
          </Route>
          <Route path='/sign-in'>
            <Link className='header__link' to='/sign-up'>Регистрация</Link>
          </Route>
          <Route path='/sign-up'>
            <Link className='header__link' to='/sign-in'>Войти</Link>
          </Route>
        </Switch>
      </div>
    </header>
  )
}

export default Header;
