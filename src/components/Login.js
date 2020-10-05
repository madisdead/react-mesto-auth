import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as auth from '../auth.js';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTokenCheck = this.handleTokenCheck.bind(this);
  }
  componentDidMount(){
    this.handleTokenCheck();
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
    auth.authorize(this.state.email, this.state.password)
      .then((data)=>{
        if (data.token){
          this.setState({email: '', password: ''} ,() => {
            this.props.handleLogin();
            this.handleTokenCheck();
            this.props.history.push('/');
          });
        }  
      })
      .catch(err => console.log(err));
  }
  handleTokenCheck() {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then((res) => {
          if (res){
            this.props.setNewEmail(res.data.email);
            this.props.handleLogin();
            this.props.history.push('/');
          }
        });
    }
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