import React , { Component } from 'react';
import "./Home.css";
import { Link } from "react-router-dom";
class Home extends Component 
{
	render()
	{
      return (
          
          <div className="Home">
      <div className="lander">
        <h1>Twitter</h1>
        <p>Create tweets and share them</p>
        <Link to = "/login"> Login </Link>
        <Link to = "/signup"> Signup </Link>
      </div>
    </div>
      	);
	}	
}

export default Home