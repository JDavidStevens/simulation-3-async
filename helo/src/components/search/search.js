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
      users: [],
      name: 'First Name',
      nameQuery: '',
      offSet: 0,
      pages: 1,
      activePage: 1
    }

    this.handleName = this.handleName.bind(this);
    this.handleSearchFirst = this.handleSearchFirst.bind(this);
    this.handleSearchLast = this.handleSearchLast.bind(this);
    this.lookUp = this.lookUp.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.handleRemoveFriend = this.handleRemoveFriend.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.logout = this.logout.bind(this);
  }


  componentDidMount() {

    axios.get(`/api/user/list?offset=${this.state.offSet}`).then(response => {
      this.setState({ users: response.data })
    })

    axios.get('/api/user/count').then(response => {
      this.setState({ pages: Math.ceil(response.data[0].count / 6) })
    })
  }

  handleName(event) {
    this.setState({ name: event.target.value })
  }

  lookUp(value) {
    this.setState({ nameQuery: value })
  }

  handleReset() {
    axios.get(`/api/user/list?offset=${this.state.offSet}`).then(response => {
      this.setState({ users: response.data })
    })

    axios.get('/api/user/count').then(response => {
      this.setState({ pages: Math.ceil(response.data[0].count / 6) })
    })

  }

  handleSearchFirst() {
    axios.get(`/api/user/list?first=${this.state.nameQuery}&offset=${this.state.offSet}`)
      .then(response => {
        this.setState({ users: response.data, nameQuery: "" })
      })
      .catch(err => {
        console.log("search axios request")
      })

    axios.get(`/api/user/count?first=${this.state.nameQuery}`).then(response => {
      this.setState({ pages: Math.ceil(response.data[0].count / 6) })
    })
  }

  handleSearchLast() {
    axios.get(`/api/user/list?last=${this.state.nameQuery}&offset=${this.state.offSet}`)
      .then(response => {
        this.setState({ users: response.data, nameQuery: "" })
      })
      .catch(err => {
        console.log("search axios request")
      })
    axios.get(`/api/user/count?last=${this.state.nameQuery}`).then(response => {
      this.setState({ pages: Math.ceil(response.data[0].count / 6) })
    })
  }

  handlePageChange(num) {
    this.setState({ offSet: ((num - 1) * (6)), activePage: num })

    axios.get(`/api/user/list?offset=${this.state.offSet}`)
      .then(response => {
        this.setState({ users: response.data })
      })
  }

  handleAddFriend(id) {
    axios.post(`/api/friend/add?offset=${this.state.offSet}`, { id })
      .then(results => { this.setState({ users: results.data }) })
  }

  handleRemoveFriend(id) {
    axios.post(`/api/friend/remove?offset=${this.state.offSet}`, { id })
      .then(results => { this.setState({ users: results.data }) })
  }

  logout() {
    axios.post('/api/auth/logout').then(res => {
      this.props.history.push('/')
    })
  }




  render() {

    let results = this.state.users.map((element, index) => {
      if (element.friend == null) {
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
      } else if (element.friend !== null) {
        return (

          <div className="recommended-friends-info" key={index}>
            <img src={element.picture} alt='' className="profile-img" />
            <div className="recommended-friend-name-box">
              <h5 className="recommended-first-name" >{element.first_name}</h5>
              <h5 className="recommended-last-name" >{element.last_name}</h5>
            </div>
            <div className="add-friend-box">
              <button className="delete-friend" onClick={() => this.handleRemoveFriend(element.id)}>Remove Friend</button>
            </div>
          </div>

        )
      }
    })



    let pageCount = [];

    function numPages(num) {
      for (let i = 1; i <= num; i++) {
        pageCount.push(i)
      }
    }

    numPages(this.state.pages)

    console.log("pageCount:", pageCount)

    let pagination = pageCount.map((element, id) => {

      if(element===this.state.activePage){
        return (
          <button className="active-pagination-button" key={id} onClick={() => this.handlePageChange(element)}>Page {element}</button>
        )
      }else{
      return (        
        <button className="pagination-button" key={id} onClick={() => this.handlePageChange(element)}>{element}</button>
      )}
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
        <div className="search-content">
          <div className="search-friends-box">
            <div className="search-heading">


              <select onChange={this.handleName} className="first-last-selector">
                <option>First Name</option>
                <option>Last Name</option>
              </select>
              <input value={this.state.nameQuery} onChange={e => this.lookUp(e.target.value)} className="search-input" />
              {(this.state.name === "First Name") ? (
                <button onClick={this.handleSearchFirst} className="search-button">Search</button>
              ) : (
                  <button onClick={this.handleSearchLast} className="search-button">Search</button>
                )
              }
              <button onClick={this.handleReset} className="reset-button">Reset</button>
            </div>
          </div>
          <div className="recommended-friends">
            {results}
          </div>
          <div className="pagination-box-wrapper">
            <div className="pagination-box">
              <div id="pagination" className="pagination">
                {pagination}
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}


//make loop from count to set up the number of pages needed

//for loop can be ran w/o array

//do math in the handlePageChange to specify offset