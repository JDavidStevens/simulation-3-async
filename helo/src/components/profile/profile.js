import React, { Component } from 'react';
import Home from '../../assets/home.png';
import Search from '../../assets/search.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './profile.css';


export default class Profile extends Component {
  constructor() {
    super()

    this.state = {
      firstName: '',
      lastName: '',
      gender: '',
      hairColor: '',
      eyeColor: '',
      hobby: '',
      day: '',
      month: '',
      year: '',
      img:''
    }
  }

  componentDidMount() {
    axios.get(`/api/user/list/${this.props.match.params.id}`).then(response => {
      console.log("Profile response",response.data[0])
      this.setState({
        firstName: response.data[0].first_name,
        lastName: response.data[0].last_name,
        gender: response.data[0].gender,
        hairColor: response.data[0].hair,
        eyeColor: response.data[0].eye,
        hobby: response.data[0].hobby,
        day: response.data[0].bday,
        month: response.data[0].bmonth,
        year: response.data[0].byear,
        img: response.data[0].picture
      })
    })
  }

  handleFirstName(value) {
    this.setState({ firstName: value })
  };
  handleLastName(value) {
    this.setState({ lastName: value })
  };
  handleGender(value) {
    this.setState({ gender: value })
  };
  handleHair(value) {
    this.setState({ hairColor: value })
  };
  handleEye(value) {
    this.setState({ eyeColor: value })
  };
  handleHobby(value) {
    this.setState({ hobby: value })
  };
  handleDay(value) {
    this.setState({ day: value })
  };
  handleMonth(value) {
    this.setState({ month: value })
  };
  handleYear(value) {
    this.setState({ year: value })
  };



  render() {

    return (
      <div className="profile-page" >
        <div className="header">
          <div className="left-header">
            <h1 className="navbar-title-helo">Helo</h1>
            <Link to='/dashboard' className="home-logo-link"><img src={Home} alt="" /></Link>
            <Link to='/search' className="search-logo-link"><img src={Search} alt='' /> </Link>
          </div>

          <h2 className="navbar-page-title">Profile</h2>

          <a onClick={this.logout} className="logout">Logout</a>

        </div>

        <div className="edit-content">
        <div className='profile-header'>
        <div className='profile-img-container'>
          <img src={this.state.img} alt='' className='profile-img'/>
          </div>
          <div className="profile-page-name-container">
            <h3 className="user-first-name">{this.state.firstName}</h3>
            <h3 className="user-last-name">{this.state.lastName}</h3>
          </div>
          <div className="profile-page-buttons-container">
          <button className="profile-update">Update</button>
          <button className="profile-cancel">Cancel</button>
          </div>
        </div>
        <div className="profile-updaters">
          <div>
            <h5>First Name</h5>
            <input placeholder={this.state.firstName} onChange={e => this.handleFirstName(e.target.value)} />
          </div>
          <div className="hobby-box">
          <h5>Hobby</h5>
           <select>
            <option>music</option>
            <option>crafting</option>
            <option>motocross</option>
            <option>basketball</option>
            <option>obstacle courses</option>
            <option>politics</option>
          </select>
          </div>
          <div className="lastname-box">
          <h5>Last Name</h5>
          <input placeholder={this.state.lastName} onChange={e => this.handleLastName(e.target.value)} />
          </div>
          <div className='bday-box'>
          <h5>Birthday Day</h5>
          <input type="number" min="1" max="31" placeholder={this.state.day} />
          </div>
          <div className="gen-box">
          <h5>Gender</h5>
          <select 
          // value={this.state.gender}
          >
            <option>Female</option>
            <option>Male</option>
          </select>
          </div>
          <div className="bmonth-box">
          <h5>Birthday Month</h5>

          <select>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>
          </div>
          <div className="hair-box">
          <h5>Hair Color</h5>
          <select 
          // value={this.state.hairColor}
          >
            <option>Brown</option>
            <option>Blonde</option>
            <option>Black</option>
            <option>Red</option>
            <option>Grey</option>
            <option>White</option>
            <option>None</option>
          </select>
          </div>
          <div className="byear-box">
          <h5>Birthday Year</h5>
          <input type="number" min="1930" max="2018" placeholder={this.state.year} />
          </div>
          <div className="eye-color">
          <h5>Eye Color</h5>
          <select 
          // value={this.state.eye}
          >
            <option>Blue</option>
            <option>Brown</option>
            <option>Green</option>
          </select>
          </div>
        </div>
        </div>
      </div>

    )
  }
}