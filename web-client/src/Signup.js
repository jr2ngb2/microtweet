import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import { VALIDATE } from "./queries";
import { useQuery } from '@apollo/react-hooks';
import { useLazyQuery } from "@apollo/client";
import { useAppContext } from "./libs/contextLib"; 
import { getUserID } from "./queries";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "./queries";
 
 function signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const { userHasAuthenticated } = useAppContext();  
  //const [ validateUser , {called , loading , data  } ] = useLazyQuery(VALIDATE)
  const [ validateUser , {called , loading , data  } ] = useMutation(CREATE_USER);
  const  { called : calling , loading : load ,  data : data_id } = useQuery(getUserID  , {  skip : !data , variables : {username : username} } );
  //const validate = useQuery(VALIDATE , { variables : { username :  username , password : password } });
    
  const history = useHistory();
  if(called && !loading)
  {
    console.log(data.getUsername);
            
        if(calling && !load)
        {
        console.log(data_id);
        localStorage.setItem("user_id" , data_id.getUserID);
        localStorage.setItem("username" , username);
        console.log(localStorage.getItem("user_id"));
        history.push("/tweet");  
        }
    
      
  }
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    // if(validate.data == "User logged in")
    // {
    //   alert("Logged In");
    // } 
    //userHasAuthenticated(true);  
  }

  

  return (

    <div className="Login">
      <h1>Twitter</h1>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit} class = "form-1">
        <FormGroup controlId="username" bsSize="large">
          <FormLabel>Username</FormLabel>
          <p class = "field">
          <FormControl
            autoFocus
            
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          </p>
        </FormGroup>
        <FormGroup controlId="password" bsSize="large" class = "field">
          <FormLabel>Password</FormLabel>
          <p class = "field">
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
          </p>
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} onClick = { ()=> validateUser({ variables : { username : username , password : password } }) }>
          Signup
        </Button>
      </form>
    </div>
  );
}
export default signup;