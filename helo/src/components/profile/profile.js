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
      img: ''
    }
    console.log("bday:",this.state.bday)

    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleHair = this.handleHair.bind(this);
    this.handleEye = this.handleEye.bind(this);
    this.handleHobby = this.handleHobby.bind(this);
    this.handleDay = this.handleDay.bind(this);
    this.handleMonth = this.handleMonth.bind(this);
    this.handleMonth = this.handleMonth.bind(this);
    this.logout=this.logout.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/user/self`).then(response => {
      // console.log("Profile response", response.data[0])
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
  handleGender(event) {
    this.setState({ gender: event.target.value })
  };
  handleHair(event) {
    this.setState({ hairColor: event.target.value })
  };
  handleEye(event) {
    this.setState({ eyeColor: event.target.value })
  };
  handleHobby(event) {
    this.setState({ hobby: event.target.value })
  };
  handleDay(value) {
    this.setState({ day: value })
  };
  handleMonth(event) {
    this.setState({ month: event.target.value })
  };
  handleYear(value) {
    this.setState({ year: value })
  };

  handleUpdate(id,firstName, lastName, gender, hairColor, eyeColor, hobby, day, month, year) {

    axios.patch(`/api/user/patch/${id}`, {
      first_name: firstName,
      last_name: lastName,
      gender: gender,
      hair: hairColor,
      eye: eyeColor,
      hobby: hobby,
      bday: day,
      bmonth: month,
      byear: year
    })
      .then(response => {
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
  };

  handleCancel(){
    axios.get(`/api/user/self`).then(response => {
      
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

  logout() {
    axios.post('/api/auth/logout').then(res => {
      this.props.history.push('/')
    })
  }

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
              <img src={this.state.img} alt='' className='profile-img' />
            </div>
            <div className="profile-page-name-container">
              <h3 className="user-first-name">{this.state.firstName}</h3>
              <h3 className="user-last-name">{this.state.lastName}</h3>
            </div>
            <div className="profile-page-buttons-container">
              <button className="profile-update" onClick={() => this.handleUpdate(this.props.match.params.id, this.state.firstName,this.state.lastName,this.state.gender,this.state.hairColor,this.state.eyeColor,this.state.hobby,this.state.day, this.state.month,this.state.year)}>Update</button>
              <button className="profile-cancel" onClick={()=>this.handleCancel(this.props.match.params.id)}>Cancel</button>
            </div>
          </div>
          <div className="profile-updaters">
            <div>
              <h5 className="profile-page-h5s">First Name</h5>
              <input className="profile-page-input-color" value={this.state.firstName} onChange={e => this.handleFirstName(e.target.value)} />
            </div>
            <div className="hobby-box">
              <h5 className="profile-page-h5s">Hobby</h5>
              <select value={this.state.hobby} onChange={this.handleHobby}>
                <option>music</option>
                <option>motocross</option>
                <option>crafting</option>
                <option>basketball</option>
                <option>obstacle courses</option>
                <option>politics</option>
              </select>
            </div>
            <div className="lastname-box">
              <h5 className="profile-page-h5s">Last Name</h5>
              <input className="profile-page-input-color" value={this.state.lastName} onChange={e => this.handleLastName(e.target.value)} />
            </div>
            <div className='bday-box'>
              <h5 className="profile-page-h5s">Birthday Day</h5>
              <input className="profile-page-input" type="number" min="1" max="31" value={this.state.day} onChange={e => this.handleDay(e.target.value)}/>
            </div>
            <div className="gen-box">
              <h5 className="profile-page-h5s">Gender</h5>
              <select value={this.state.gender} onChange={this.handleGender}>
                <option>female</option>
                <option>male</option>
              </select>
            </div>
            <div className="bmonth-box">
              <h5 className="profile-page-h5s">Birthday Month</h5>

              <select value={this.state.month} onChange={this.handleMonth}>
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
              <h5 className="profile-page-h5s">Hair Color</h5>
              <select value={this.state.hairColor} onChange={this.handleHair}>
                <option>brown</option>
                <option>blonde</option>
                <option>black</option>
                <option>red</option>
                <option>grey</option>
                <option>white</option>
                <option>none</option>
              </select>
            </div>
            <div className="byear-box">
              <h5 className="profile-page-h5s">Birthday Year</h5>
              <input className="profile-page-input" type="number" min="1930" max="2018" value={this.state.year} onChange={e => this.handleYear(e.target.value)}/>
            </div>
            <div className="eye-color">
              <h5 className="profile-page-h5s">Eye Color</h5>
              <select value={this.state.eyeColor} onChange={this.handleEye}>
                <option>blue</option>
                <option>brown</option>
                <option>green</option>
              </select>
            </div>
          </div>
        </div>
      </div>

    )
  }
}