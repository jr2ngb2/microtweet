import { gql } from 'apollo-boost';

export const GET_USERS = gql`
  {
    getAllUsers {
      user_id , 
      username ,
      password
    }
  }
`;

export const VALIDATE = gql`
  query ($username: String! , $password : String!){
    getUsername(username: $username , password: $password) 
  }
`;

export const getUserID = gql`
  query ($username: String! ){
    getUserID(username: $username) 
      
    
  }
`;

export const FOLLOW_USER = gql`
  mutation ($user_id : Int! , $followerId : Int! ){
    Follow(user_id : $user_id , followerId : $followerId)
    {
      username
    } 
      
    
  }
`;

export const GET_ALL_USERS = gql`
  query {
    getAllUsers
    {
      user_id , 
      username

    } 
      
  }
`;

export const GET_FOLLOWING = gql`
  query($id:Int!) {
    getFollowing(id : $id)
    {
      user_id  
      

    } 
      
  }
`;
export const VIEW_USERS = gql`
  query ($id: Int){
    getUser(id: $id) {
      user_id , 
      name , 
      password
    }
  }
`;

export const GET_TIMELINE = gql`
  query ($id: Int!){
    getTimeline(userId: $id) {
      text , 
      createdAt , 
      user
      {
        username  

      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation ($username: String! , $password : String!){
    createUser(username : $username , password : $password) {
      username
    }
  }
`;

export const ADD_USER = gql`
  mutation($name: String, $email: String, $job_title: String) {
    createUser (name: $name, email: $email, job_title: $job_title)
  }
`;

export const CREATE_TWEET = gql`
  mutation($user_id : Int! , $text : String!) {
    createTweet (user_id: $user_id , text : $text)
    {
      text
    }
  }
`;

export const EDIT_USER = gql`
  mutation($id: Int, $name: String, $email: String, $job_title: String) {
    updateUserInfo (id: $id, name: $name, email: $email, job_title: $job_title)
  }
`;

export const DELETE_USER = gql`
  mutation($id: Int) {
    deleteUser(id: $id)
  }
`