import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Home from '../../assets/home.png';
import Search from '../../assets/search.png';
import './dashboard.css';



export default class Dashboard extends Component {

  constructor() {
    super()
    this.state = {
      user: {},
      robots: []
    }
  }

  componentDidMount() {

    axios.get('/api/auth/setUser')
      .then((res) => {
        this.setState({
          user: res.data
        })
      })

      // axios.get('/api/user/list').then(response=>{
      //   this.setState({robots: response.data})
      // })
  }

  render() {
    return <div className="dashboard-page">
      <div className="header">
      <div className="left-header">
    <h1 className="navbar-title-helo">Helo</h1>
    <Link to='/dashboard' className="home-logo-link"><img src={Home} alt=""/></Link>
    <Link to='/search' className="search-logo-link"><img src={Search} alt=''/> </Link>
    </div>
    
    <h2 className="navbar-page-title">Dashboard</h2>
    
    <a onClick={this.logout} className="logout">Logout</a>
    
    </div>
      <div className="profile-welcome-box">
        <div className='profile-image-button'>
          <img src='' alt='' className="dash-profile-self-image" />
          <Link to='/profile' className="edit-button">Edit Profile</Link>
        </div>
        <div className='welcome'><p>Welcome to Helo! Find recommended friends based on similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!</p></div>
      </div>
      <div className="recommended-friends"></div>
    </div>
  }
}