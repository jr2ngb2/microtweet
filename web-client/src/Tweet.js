

import React, { useState } from "react";
import "./Tweet.css";
import { useQuery } from '@apollo/react-hooks';
import { GET_TIMELINE } from "./queries";
import { CREATE_TWEET } from "./queries";
import { useLazyQuery } from "@apollo/client";  
import { Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
function Tweet ()
{
    const user_id = parseInt(localStorage.getItem("user_id"));
    console.log("Displaying user id " + user_id);
	const { called , loading , data } = useQuery(GET_TIMELINE , { variables : { id : user_id } }); 
	var i;
	var tweets = [];
	const Avatar = "https://api.adorable.io/avatars/285/johnwqalpkp.png";
	const[createTweet , { called : calling , loading : loaded , data : data_tweet }] = useMutation(CREATE_TWEET);
	const [tweettext, setTweettext] = useState("");
    const history = useHistory();

	function viewUsers(event)
	{
			history.push("/users");
	}
    
	if(calling && !loaded)
	{
    		window.location.reload(); 
    }
		
	if(called && !loading)
	{			
            console.log(data.getTimeline);
            console.log(data.getTimeline.length);
            for(var i = 0 ; i<data.getTimeline.length ; i++)
            {
            	var tweet = [];
            	const date_tweet = parseInt(data.getTimeline[i].createdAt);
            	var date = new Date(date_tweet*1000);
            	var date_string = date.toString();
            	tweet.push({"text" : data.getTimeline[i].text , "author" : data.getTimeline[i].user.username , "timestamp" : date_string});
            	// tweet.push({"author" : data.getTimeline[i].user.username});
            	// tweet.push({"timestamp " : date});	
        		console.log("displaying following usernames being followed by current user");    	
            	console.log(data.getTimeline[i].user.username);
            	tweets.push(tweet);
            	console.log(tweet);
            }
            console.log(tweets);
            tweets.map((singleTweet) => {  console.log(singleTweet[0].author) });
            var tweet_display  =  tweets.map(( singleTweet ) => { 
            
            return(		
            <div className='tweet' >
                <div className='author'>
                    <img src={Avatar} alt='avatar' />
                    <strong>{singleTweet[0].author}</strong>
                </div>

                <div className='content'>
                    <div className='twitter-logo'>
                        
                    </div>
                    {singleTweet[0].text}  
                </div> 
                <div>
				   

				   {singleTweet[0].timestamp}
				</div>                
            </div>
              );  	
                }); 


	}
	return(
	
			<div className='tweets'>
			    <h1>Hello , {localStorage.getItem("username")}</h1> <Button variant = "primary" className = "btn-primary" size = "" onClick = {viewUsers}>View Other Users</Button>
                <div className='tweet'>
                    <div className='author'>
                        <img src={" https://api.adorable.io/avatars/285/johnwqalpkp.png "} alt='user-avatar' />
                        <strong>{localStorage.getItem("username")}  Create A Tweet</strong>

                    </div>
                    <div className='content'>
                        <div className='twitter-logo'>
                            
                        </div>
                        
                        <textarea autoFocus className='editTextarea' value={tweettext} onChange={e=>setTweettext(e.target.value)} />
                    	<Button  size="sm"  onClick = { ()=> createTweet({ variables : { user_id : user_id , text : tweettext } }) }>	
                    	Create Tweet
                    	</Button>	
                    </div>
                </div>
            	<h1>Timeline</h1>
            	<div>{ tweet_display }</div>	
            </div>
	);
}

export default Tweet;