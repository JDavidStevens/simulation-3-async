import React, { Component } from 'react'
import Home from '../../assets/home.png';
import Search from '../../assets/search.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './search.css';

export default class SearchPage extends Component {

  constructor() {
    super()

    this.state = {

      robots: []
    }

    this.logout = this.logout.bind(this);

  }


  componentDidMount() {

    axios.get('/api/user/list').then(response => {
      this.setState({ robots: response.data })
    })
  }

  logout() {
    axios.post('/api/auth/logout').then(res => {
      this.props.history.push('/')
    })
  }


  render() {

    let results = this.state.robots.map((element, index) => {
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
      }else if(element.auth_id == null && element.friend !== null){
        return (

          <div className="recommended-friends-info" key={index}>
            <img src={element.picture} alt='' className="profile-img" />
            <div className="recommended-friend-name-box">
              <h5 className="recommended-first-name" >{element.first_name}</h5>
              <h5 className="recommended-last-name" >{element.last_name}</h5>
            </div>
            <div className="add-friend-box">
             <button className="add-friend"  onClick={() => this.handleAddFriend(element.id)}>Remove Friend</button>
            </div>
          </div>

        )
      }
    })


    return (

      <div className="search-page">
        <div className="header">
          <div className="left-header">
            <h1 className="navbar-title-helo">Helo</h1>
            <Link to='/dashboard' className="home-logo-link"><img src={Home} alt="" /></Link>
            <Link to='/search' className="search-logo-link"><img src={Search} alt='' /> </Link>
          </div>

          <h2 className="navbar-page-title">Search</h2>

          <a onClick={this.logout} className="logout">Logout</a>

        </div>
        <select>
          <option>First Name</option>
          <option>Last Name</option>
        </select>
        <input></input>
        <button>Search</button>
        <button>Reset</button>
        <div className="recommended-friends">
          {results}
        </div>
      </div>
    )
  }
}