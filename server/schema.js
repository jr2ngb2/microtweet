const { gql } = require('apollo-server-express');



const typeDefs = gql`
type User {
	
	user_id : Int!
	username : String!
	password : String!
	tweets   : [Tweet]
	following : [User]
}

type Tweet 
{
	tweet_id : Int!
	text : String!
	user : User!
    createdAt : String!		
}

type Query
{
	getUser(id : Int!) : User
	getAllUsers : [User!]!
	getTweets(id : Int!)   : Tweet
	getTimeline(userId : Int!) : [Tweet!]!
	getFollowing(id : Int!) : [User!]!
	getUsername(username : String! , password : String!) : String!
	getUserID(username : String!) : String!
}

type Mutation
{
	createUser(username : String! , password : String!) : User!
	createTweet(user_id : Int! , text : String! ) : Tweet!
	Follow(user_id : Int! , followerId : Int!) : User!	
}    
`;
module.exports = typeDefs;



