import React, { Component } from 'react';
import logo from '../../assets/logo.png';
import './login.css';

export default class Login extends Component {

  login() {
    let {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID} = process.env;
    let url = `${window.location.origin}/auth/callback`;

    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`
  }
  
  
  render() {
    return <div className="login-page-background">
    <div className="logo-title-login-box">
    <img src={logo} alt='' className="logo"/>
    <h1 className="title">Helo</h1>
      <button onClick={this.login}>Login/Register</button>
      </div>
    </div>
  }
}