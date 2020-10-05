import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value 
    });
  }

  handleSubmit(e){
    e.preventDefault();
    if (!this.state.email || !this.state.password){
      return;
    }
    this.props.onLogin(this.state.email, this.state.password)
      .then(() => {
        this.setState({email: '', password: ''} ,() => { 
          this.props.history.push('/'); 
        }); 
      })
      .catch(err => console.log(err));
  }

  render(){
    return(
      <div className="login">
        <p className="login__welcome">
          Вход
        </p>
        <form onSubmit={this.handleSubmit} className="login__form">
          <input required placeholder="Email" className="login__input login__input_email" id="email" name="email" value={this.state.email} onChange={this.handleChange} type="text"/>
          <input required placeholder="Пароль" className="login__input login__input_password" id="password" name="password" value={this.state.password} onChange={this.handleChange} type="password"/>
          <button type="submit" className="login__button"  onSubmit={this.handleSubmit}>Войти</button>
        </form>

        <div className="login__signup">
          <p>Ещё не зарегистрированы?</p>
          <Link to="/sign-up" className="login__link">&nbsp;Регистрация</Link>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);