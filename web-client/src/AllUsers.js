import React  , {useState} from "react";
import "./Tweet.css";
import { useQuery } from '@apollo/react-hooks';
import { useLazyQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { GET_ALL_USERS } from "./queries";
import { FOLLOW_USER } from "./queries";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GET_FOLLOWING } from "./queries";
import { Link } from "react-router-dom";
function allUsers()
{
	const { called , loading , data } = useQuery(GET_ALL_USERS);
	const users = [];
	const Avatar = "https://api.adorable.io/avatars/285/johnwqalpkp.png";
	const [followUser , { called : calling  , loading : loaded , data : followUserData }] = useMutation(FOLLOW_USER)
	const user_id = parseInt(localStorage.getItem("user_id"));
	const {called : calledFollowers , loading : loadingFollowers , data : dataFollowers } = useQuery(GET_FOLLOWING , {variables : { id : user_id }});

	
	if(calling && !loaded)
	{
		window.location.reload();
	}
	function validateFollow(user_id)
	{
		if(calledFollowers && !loadingFollowers)
		{
			
			var flag = 0;
			const following = [];
			console.log("entered followers");
			console.log(dataFollowers);
			console.log(user_id);
			console.log("printing following " + following);
			for(var j = 0 ; j<dataFollowers.getFollowing.length ; j++)
			{
				console.log("Printing i " + dataFollowers.getFollowing[j].user_id);
				console.log("Printing user_id " + user_id);
				if(dataFollowers.getFollowing[j].user_id == user_id)
				{
					flag = 1	
					return true;
				}
			}
			if(flag == 0)
			{
				console.log("not being followed");
				return false;
			}


			//console.log(followerId);
			 
		}

	}	
	if(called && !loading)
	{
         //console.log(data);
         for(var i = 0; i<data.getAllUsers.length ; i++)
         {
         	const user = [];
         	user.push({ "user_id" : data.getAllUsers[i].user_id , "username":data.getAllUsers[i].username });
         	console.log(data.getAllUsers[i].username);
         	users.push(user);		
            if(data.getAllUsers[i].user_id == user_id)
            {
            	users.splice(i);
            }
         }

         var user_display  =  users.map(( singleUser ) => { 
            
            return(		
            <div className='tweet' >
                <div className='author'>
                    <img src={Avatar} alt='avatar' />
                    <strong>{singleUser[0].username}</strong>
                    <div className = 'author'>
                    Follow the user through below button.	
                    </div>
                    <Button variant = "primary" disabled = {validateFollow(parseInt(parseInt(singleUser[0].user_id)))} onClick = {()=> followUser({ variables : { user_id : parseInt(singleUser[0].user_id) , followerId : user_id  } })}>Follow User </Button> 
                </div>

                                
            </div>
              );  	
                }); 


	}
	
	return(
        <div>
            <Link to = "/tweet">Go Back to tweets</Link><h1>Displaying All Users</h1>
            <div>
            {user_display}
            </div>

		</div>	
		);
}

export default allUsers;