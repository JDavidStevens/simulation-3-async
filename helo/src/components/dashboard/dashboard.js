import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUserData } from '../../ducks/reducer';
import Home from '../../assets/home.png';
import Search from '../../assets/search.png';
import './dashboard.css';



class Dashboard extends Component {
  constructor() {
    super()

    this.state = {

      robots: []
    }

    this.logout = this.logout.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
  }


  componentDidMount() {

    axios.get('/api/user-data')

      .then((res) => {
        this.props.updateUserData(res.data)
        console.log("What?", res.data)
      })
      .catch(() => {
        this.props.history.push('/')
      })

    axios.get('/api/user/list').then(response => {
      this.setState({ robots: response.data })
    })
  }

  logout() {
    axios.post('/api/auth/logout').then(res => {
      this.props.history.push('/')
    })
  }

  handleAddFriend(id) {
    axios.post(`/api/friend/add`, { id })
      .then(results => { this.setState({ robots: results.data[0] }) })
  }

  render() {
    let self = this.state.robots.map((element, index) => {
      if (element.auth_id !== null) {
        return (
          <div key={index}>
            <div className="profile-welcome-box">
              <div className='profile-image-button'>
                <div className="profile-img-container">
                  <img src={element.picture} alt='' className="profile-img" />
                </div>
                <div className="profile-name-edit-container">
                  <div className="profile-name-container">
                    <h2 className="user-first-name">{element.first_name}</h2>
                    <h2 className="user-last-name">{element.last_name}</h2>
                  </div>
                  <div className="edit-button-container">
                    <Link to={`/profile/${element.id}`} className="edit-button">Edit Profile</Link>
                  </div>
                </div>
              </div>
              <div className='welcome'><p>Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!</p></div>
            </div>
          </div>
        )
      }
    })

    let robos = this.state.robots.map((element, index) => {
      if (element.auth_id == null && element.friend == null) {
        return (

          <div className="recommended-friends-info" key={index}>
            <img src={element.picture} alt='' className="profile-img" />
            <div className="recommended-friend-name-box">
              <h5 className="recommended-first-name" >{element.first_name}</h5>
              <h5 className="recommended-last-name" >{element.last_name}</h5>
            </div>
            <div className="add-friend-box">
              <button className="add-friend" onClick={() => this.handleAddFriend(element.id)}>Add Friend</button>
            </div>
          </div>
        )
      }
    })

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
          {self}
          <div className="recommended-friends-box">
            <div className="recommended-friends-heading">
              <h2 className="recommended-friends-title">Recommended Friends</h2>
              <h4>Sorted by</h4>
              <select>

              </select>
            </div>
            <div className="recommended-friends" >
              {robos}
            </div>
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