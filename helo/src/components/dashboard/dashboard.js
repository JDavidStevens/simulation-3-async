import React, { Component } from 'react'
import axios from 'axios';
import './dashboard.css';


export default class Dashboard extends Component {

  constructor(){
    super()
    this.state={
      user:{}
    }
  }

  componentDidMount() {
    axios.get('/api/auth/setUser')
    .then((res)=>{
      this.setState({
        user: res.data
      })
    })
      
  }

  render() {
    return <div>
      Dashboard
    </div>
  }
}