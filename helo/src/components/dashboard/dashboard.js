import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUserData } from '../../ducks/reducer';
import Home from '../../assets/home.png';
import Search from '../../assets/search.png';
import './dashboard.css';
// import Recommend from './recommend/recommend';


class Dashboard extends Component {
  constructor() {
    super()

    this.state = {
      robots:[],
      user: {},
      attribute: ''
    }

    this.logout = this.logout.bind(this);
    this.handleAttribute = this.handleAttribute.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
    
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
      // console.log("self:", response.data[0]);
      this.setState({ user: response.data[0] })
    })

    axios.get('/api/recommended').then(response => {
      this.setState({ robots: response.data })
  })
  }

  handleAttribute(event) {
    this.setState({ attribute: event.target.value })
}

  handleAddFriend(id) {
    axios.post(`/api/recommended/add`, { id })
        .then(response => { this.setState({ robots: response.data }) })
}

  logout() {
    axios.post('/api/auth/logout').then(res => {
      this.props.history.push('/')
    })
  }


  render() {

    // console.log("attribute", this.state.attribute)
        let roboFilter = this.state.robots.filter(element=>{
            return element[this.state.attribute]===this.state.user[this.state.attribute]
        }
        ).map((element, index) => {
            
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
        })

        // console.log("robofilter",roboFilter)

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

          <div className="recommended-friends-box">
          <div className="recommended-friends-heading">
          <h2 className="recommended-friends-title">Recommended Friends</h2>
          <div className="sort-container">
                        <h5 className="sorted-by-title">Sorted by</h5>
                        <select onChange={this.handleAttribute} className="recommended-friend-sorter">
                            <option>--Select--</option>
                            <option value="first_name">First Name</option>
                            <option value="last_name">Last Name</option>
                            <option value="gender">Gender</option>
                            <option value="hair">Hair Color</option>
                            <option value="eye">Eye Color</option>
                            <option value="hobby">Hobby</option>
                            <option value="bday">Birthday Day</option>
                            <option value="bmonth">Birthday Month</option>
                            <option value="byear">Birthday Year</option>
                        </select>
                    </div>
          
          </div>
          <div className="recommended-friends">
            {(roboFilter.length >= 1)
              ?(roboFilter):(<p className="no-recommendations">No Recommendations</p>)}
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




