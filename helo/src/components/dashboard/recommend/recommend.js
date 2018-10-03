import React, { Component } from 'react';
import axios from 'axios';

export default class Recommend extends Component {
    constructor() {
        super()

        this.state = {
            robots: [],
            self: {},
            attribute: ''
        }

        this.handleAttribute = this.handleAttribute.bind(this);
        this.handleAddFriend = this.handleAddFriend.bind(this);

    }

    componentDidMount() {
        axios.get('/api/user/list').then(response => {
            this.setState({ robots: response.data })
        })

        axios.get('/api/user/self').then(response => {
            this.setState({ self: response.data[0] })
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

        console.log("attribute", this.state.attribute)
        let roboFilter = this.state.robots.filter(element=>{
            return element[this.state.attribute]===this.state.self[this.state.attribute]
        }
        ).map((element, index) => {
            if(element.length===0){
                return <h1>No Recommendations</h1>
            }else{
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
            )}
        })

        let roboLastName = this.state.robots.filter(element=>{
            return this.state.attribute==="Last Name" && element.last_name===this.state.self.last_name
        }
        ).map((element, index) => {
            console.log("if test",element)
            if(roboLastName.length===0 ){
                
                return <h1>No Recommendations</h1>
            }else{
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
            )}
        })

        return (
            <div className="recommended-friends-box">
                <div className="recommended-friends-heading">
                    <h2 className="recommended-friends-title">Recommended Friends</h2>
                    <div className="sort-container">
                        <h5 className="sorted-by-title">Sorted by</h5>
                        <select onChange={this.handleAttribute} className="recommended-friend-sorter">
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
                <div>
                    {roboFilter} 
                </div>
            </div>
        )
    }
}