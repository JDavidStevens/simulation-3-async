import React, { Component } from 'react';
import axios from 'axios';

export default class Recommend extends Component {
    constructor() {
        super()

        this.state = {
            robots: [],
            attribute: ''
        }

        this.handleAttribute = this.handleAttribute.bind(this);
        this.handleAddFriend = this.handleAddFriend.bind(this);

    }

    componentDidMount() {
        axios.get('/api/user/list').then(response => {
            this.setState({ robots: response.data })
        })
    }

    handleAttribute(event) {
        this.setState({ attribute: event.target.value })
      }
      
    handleAddFriend(id) {
        axios.post(`/api/friend/add`, { id })
            .then(results => { this.setState({ robots: results.data }) })
    }


    render() {

        console.log("recommend test:",this.state.robots)

        let filteredRobos = this.state.robots.map((element, index) => {
            return (
                <div className="recommended-friends" key={index}>
                <div className="recommended-friends-info" >
                    <img src={element.picture} alt='' className="profile-img" />
                    <div className="recommended-friend-name-box">
                        <h5 className="recommended-first-name" >{element.first_name}</h5>
                        <h5 className="recommended-last-name" >{element.last_name}</h5>
                    </div>
                    <div className="add-friend-box">
                        <button className="add-friend" onClick={() => this.handleAddFriend(element.id)}>Add Friend</button>
                    </div>
                </div>
                </div>
            )
        })
        return (
            <div className="recommended-friends-box">
            <div className="recommended-friends-heading">
              <h2 className="recommended-friends-title">Recommended Friends</h2>
              <div className="sort-container">
                <h5 className="sorted-by-title">Sorted by</h5>
                <select onChange={this.handleAttribute} className="recommended-friend-sorter">
                  <option>First Name</option>
                  <option>Last Name</option>
                  <option>Gender</option>
                  <option>Hair Color</option>
                  <option>Eye Color</option>
                  <option>Hobby</option>
                  <option>Birthday Day</option>
                  <option>Birthday Month</option>
                  <option>Birthday Year</option>
                </select>
              </div>
            </div>
            <div>{filteredRobos}</div>
            </div>
        )
    }
}