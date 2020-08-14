import React, { Component , Fragment } from "react";
//import  useQuery  from "@apollo/react-hooks";
//import { GET_USERS, VIEW_USERS } from "./Queries";
import { Card, CardBody, CardHeader, CardSubtitle, Spinner } from 'reactstrap';
import { GET_USERS  , VIEW_USERS } from './queries';
import { useQuery } from '@apollo/react-hooks';
import  { gql } from "apollo-boost";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Home from "./home";
import "./App.css";
//import Routes from "./Routes";
import { Switch, Route, Redirect } from 'react-router-dom'
import  Login  from "./Login";
import  Tweet  from "./Tweet"; 
import { AppContext } from "./libs/contextLib";
import allUsers from "./AllUsers";
import signup   from "./Signup";
//const userInfo = useQuery(VIEW_USERS  , { variables : {id : 1}});


// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       message: "Loading...",
//     };
//   }

//   componentDidMount() {
//     fetch("http://localhost:5000/")
//       .then(response => response.json())
//       .then(data => {
//         this.setState({ message: data.message });
//       });
//   } 

    
    function App()
    {  
    
    return (
    <div className="App">
      <Switch>
      <Route exact path = "/" component = {Home}/>
      <Route exact path = "/Login" component = {Login}/>
      <Route exact path = "/tweet" component = {Tweet}/> 
      <Route exact path = "/users" component = { allUsers } />
      <Route exact path = "/signup" component = { signup } />
      </Switch>
     
    </div> 
      
    );
  
}
  

export default App;

