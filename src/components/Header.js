import React from 'react';
import { useHistory, Route, Switch, Link } from 'react-router-dom';

function Header(props) {
  const history = useHistory();
  function signOut(){
    localStorage.removeItem('jwt');
    props.exitProfile();
    props.setNewEmail('');
    history.push('/sign-in');
  }
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo"></div>
        <div className="header__container">
          <Switch>
            <Route path="/sign-up">
              <Link to="/sign-in" className="header__link">Вход</Link>
            </Route>
            <Route path="/sign-in">
              <Link to="/sign-up" className="header__link">Регистрация</Link>
            </Route>
            <Route path="/">
              <p className="header__email">{props.email}</p>
              <p className="header__exit" onClick={signOut}>Выйти</p>
            </Route>
          </Switch>
        </div>
      </div>
    </header>
  );
}

export default Header;