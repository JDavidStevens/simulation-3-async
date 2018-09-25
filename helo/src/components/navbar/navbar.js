import React, { Component } from 'react';
import Home from '../../assets/home.png';
import Search from '../../assets/search.png';
import {Link} from 'react-router-dom';
import axios from 'axios';



export default class Navbar extends Component {
  constructor(){
    super()
    this.logout=this.logout.bind(this);
}

logout(){
  axios.post("/api/auth/logout")
  .then(()=>this.props.history.push("/"))
  console.log(this.props.history);
  }

  render() {
    return <div>
    <h1>Helo</h1>
    <Link to='/dashboard'><img src={Home} alt=""/></Link>
    <Link to='/search'><img src={Search} alt=''/> </Link>
    <h2>Dashboard</h2>
    <a onClick={this.logout}>Logout</a>
    
    </div>
  }
}