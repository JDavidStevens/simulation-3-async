import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUserData } from '../../ducks/reducer';
import Home from '../../assets/home.png';
import Search from '../../assets/search.png';
import './dashboard.css';
import Recommend from './recommend/recommend';


class Dashboard extends Component {
  constructor() {
    super()

    this.state = {
      user: {}
    }

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {

    axios.get('/api/user-data')
      .then((res) => {
        this.props.updateUserData(res.data)
        // console.log("What?", res.data)
      })
      .catch(() => {
        this.props.history.push('/')
      })

    axios.get('/api/user/self').then(response => {
      console.log("self:", response.data[0]);
      this.setState({ user: response.data[0] })
    })
  }

  logout() {
    axios.post('/api/auth/logout').then(res => {
      this.props.history.push('/')
    })
  }


  render() {

    return (
      <div className="dashboard-page">
        <div className="header">
          <div className="left-header">
            <h1 className="navbar-title-helo">Helo</h1>
            <Link to='/dashboard' className="home-logo-link"><img src={Home} alt="" /></Link>
            <Link to='/search' className="search-logo-link"><img src={Search} alt='' /> </Link>
          </div>
          <h2 className="navbar-page-title">Dashboard</h2>
          <a onClick={this.logout} className="logout">Logout</a>
        </div>
        <div className="dashboard-content">
          <div className="profile-welcome-box">
            <div className='profile-image-button'>
              <div className="profile-img-container">
                <img src={this.state.user.picture} alt='' className="profile-img" />
              </div>
              <div className="profile-name-edit-container">
                <div className="profile-name-container">
                  <h2 className="user-first-name">{this.state.user.first_name}</h2>
                  <h2 className="user-last-name">{this.state.user.last_name}</h2>
                </div>
                <div className="edit-button-container">
                  <Link to={`/profile/${this.state.user.id}`} className="edit-button">Edit Profile</Link>
                </div>
              </div>
            </div>
            <div className='welcome'><p>Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!</p></div>
          </div>
          <div>
            <Recommend />
          </div>

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { updateUserData }
)(Dashboard)




