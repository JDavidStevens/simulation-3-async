import React, { Component } from 'react'
import axios from 'axios';
import './dashboard.css';
import Navbar from '../navbar/navbar';


export default class Dashboard extends Component {

  constructor(){
    super()
    this.state={
      user:{}
    }
  }

  componentDidMount() {
    axios.get('/api/auth/setUser')
    .then((res)=>{
      this.setState({
        user: res.data
      })
    })
      
  }

  render() {
    return <div className="dashboard-page">
    <Navbar/>
    <div className="profile-welcome-box">
      <div className='profile-image-button'>
      <img src='' alt='' className="dash-profile-self-image"/>
      <button className="edit-button">Edit Profile</button>
      </div>
      <div className='welcome'><p>Welcome to Helo! Find recommended friends based on similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!</p></div>
      </div>
      <div className="recommended-friends"></div>
    </div>
  }
}