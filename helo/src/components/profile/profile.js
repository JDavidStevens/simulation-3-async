import React, { Component } from 'react';
import Home from '../../assets/home.png';
import Search from '../../assets/search.png';
import {Link} from 'react-router-dom';
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
      year: ''
    }
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
      <div className="profile-page">
        <div>
    <h1>Helo</h1>
    <Link to='/dashboard'><img src={Home} alt=""/></Link>
    <Link to='/search'><img src={Search} alt=''/> </Link>
    <h2>Profile</h2>
    <a onClick={this.logout}>Logout</a>
    
    </div>
        <div className='profile-header'>
          <img src='' alt='' />
          <h3>Name</h3>
          <button className="profile-update">Update</button>
          <button className="profile-cancel">Cancel</button>
        </div>
        <div className="profile-updaters">
          <div>
            <h4>First Name</h4>
            <input onChange={e => this.handleFirstName(e.target.value)} />
          </div>
          <h4>Last Name</h4>
          <input onChange={e => this.handleLastName(e.target.value)} />
          <h4>Gender</h4>
          <select>
            <option>Female</option>
            <option>Male</option>
          </select>
          <h4>Hair Color</h4>
          <select>
            <option>Brown</option>
            <option>Blonde</option>
            <option>Black</option>
            <option>Red</option>
            <option>Grey</option>
            <option>White</option>
            <option>None</option>
          </select>
          <h4>Eye Color</h4>
          <select>
            <option>Blue</option>
            <option>Brown</option>
            <option>Green</option>
          </select>
          <h4>Hobby</h4>

          
          <select>
            <option>music</option>
            <option>crafting</option>
            <option>motocross</option>
            <option>basketball</option>
            <option>obstacle courses</option>
            <option>politics</option>
          </select>

          <h4>Birthday Day</h4>
          <input type="number" min="1" max="31" placeholder="1" />
          <h4>Birthday Month</h4>
          
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
          <h4>Birthday Year</h4>
          <input type="number" min="1930" max="2018" placeholder="2010" />
          {/* <select>
      <option></option>
    </select> */}
          {/* <h4>Birthday Month</h4>
    <select>
      <option></option>
    </select>
    <h4>Birthday Year</h4>
    <select>
      <option></option>
    </select> */}
        </div>
      </div>
    )
  }
}