const { Op } = require("sequelize");
const resolvers = {

Query : {

	async getUser (root , { id } , { models }) {
		console.log("Fetching user");
		return models.User.findOne({ where : {user_id : id}});
	} , 
	async getAllUsers(root , args , { models }){
		console.log("Fetching all users");
		return models.User.findAll();
	} , 
	async getTweets(root , { id } , { models }){
		console.log("Fetching this tweet");
		return models.Tweet.findOne({ where : {tweet_id : id}});
	} , 
	async getTimeline(root , { userId} , { models })
	{
		const user = await models.User.findOne({ where : {user_id : userId}});
		//console.log(user.getFollowing());
		var following_users = await user.getFollowing();
		const user_id_not = user.user_id;
		//following_users.forEach(function(obj) {console.log(obj.username)});
		console.log("enteered1");
		console.log(user_id_not);
		//var users = await models.User.findAll();
		//console.log(users.get({plain : true}));
		//console.log(el);	
		//console.log(users.dataValues);
		//console.log(models.User.findAll());
		//console.log(following_users);
		var following_ids = [];
		for(var i = 0 ; i< following_users.length ; i++)
		{
			console.log(following_users[i].dataValues.user_id);
			if(following_users[i].dataValues.user_id != user_id_not)
			{
			//console.log("entered loop");
			console.log(following_users[i].dataValues.user_id);
			following_ids.push(following_users[i].dataValues.user_id);
			following_ids.push(user_id_not);
			}
		}

		//console.log(JSON.stringify(following_users));
		console.log("Fetching tweets for timeline");
		console.log(following_ids);
		//return user.getTweets();
		const tweets = await models.Tweet.findAll({  include : [{ model : models.User  , where : { user_id : { [Op.or] : following_ids } } , as : "User"}]  , order : [['updatedAt' ,  'DESC']]  , raw:true });	
		console.log(tweets);
		return models.Tweet.findAll({  include : [{ model : models.User  , where : { user_id :   following_ids  } , as : "User"}]  , order : [['updatedAt' ,  'DESC']]  }) ;
	} , 

	async getFollowing(root , { id } , { models })
	{
			console.log("Fetching people being followed by the user");
			const user = await models.User.findOne({ where : {user_id : id} });
			return user.getFollowing(); 
	} , 

	async getUsername(root , { username  , password } , { models })
	{
		console.log("Validating the username and password");
		const user = await models.User.findOne({ where : {username : username} });
		
		if(!user)
		{
			return "User does not exist";
		}

		else
		{
		if(user.password != password)
		{
			return "Incorrect password";
		}
			if(user.password == password)
		{
			return "User logged in";
		}
	}
	} , 

	async getUserID(root , { username } , { models })
	{
		console.log("Fetching the user id of the user");
		const user = await models.User.findOne({ where : {username : username} });
		return user.user_id;
	}



} , 


Mutation : {

	async createUser(root , { username , password } , { models }) {

		return models.User.create({ username , password });
	} , 

	async createTweet(root , { user_id , text } , { models }) {

		console.log("Tweet created ");
		return models.Tweet.create({ user_id , text });

	} , 

	async Follow(root , { user_id , followerId } , { models }) {
		const user_to_follow = await models.User.findOne({ where : { user_id : user_id }});
		const user = await models.User.findOne({ where : { user_id : followerId }});
		user_to_follow.addFollower(user);
		return user_to_follow;
	}




} , 


User : {

async tweets(parent , args , context , info)
{
	console.log("fetching the tweets of this user");
	return parent.getTweets();
} , 

async following(parent , args , context , info)
{
   console.log("fetching the people this user is following");
   return parent.getFollowing();
}

} , 

Tweet : {

 async user(parent , args , context , info)
 {
    console.log("fetching the user of this tweet");
    return parent.getUser();
 }


}

};

module.exports = resolvers;