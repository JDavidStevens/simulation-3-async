import React, { Component } from 'react'
import Home from '../../assets/home.png';
import Search from '../../assets/search.png';
import {Link} from 'react-router-dom';
import './search.css';

export default class SearchPage extends Component {
  render() {
    return <div className="search-page">
      <div>
    <h1>Helo</h1>
    <Link to='/dashboard'><img src={Home} alt=''/></Link>
    <Link to='/search'><img src={Search} alt=''/> </Link>
    <h2>Search</h2>
    <a onClick={this.logout}>Logout</a>
    
    </div>
    Search
    </div>
  }
}