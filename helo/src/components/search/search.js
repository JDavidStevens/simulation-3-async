import React, { Component } from 'react'
import Home from '../../assets/home.png';
import Search from '../../assets/search.png';
import {Link} from 'react-router-dom';
import './search.css';

export default class SearchPage extends Component {
  render() {
    return <div className="search-page">
      <div className="header">
      <div className="left-header">
    <h1 className="navbar-title-helo">Helo</h1>
    <Link to='/dashboard' className="home-logo-link"><img src={Home} alt=""/></Link>
    <Link to='/search' className="search-logo-link"><img src={Search} alt=''/> </Link>
    </div>
    
    <h2 className="navbar-page-title">Dashboard</h2>
    
    <a onClick={this.logout} className="logout">Logout</a>
    
    </div>
    Search
    </div>
  }
}