'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tweet = sequelize.define('Tweet', {
    tweet_id : {type : DataTypes.INTEGER , autoIncrement : true , primaryKey : true} , 
    text : DataTypes.STRING,
    createdAt : {type : DataTypes.DATE , defaultValue : sequelize.NOW} , 
    updatedAt : {type : DataTypes.DATE , defaultValue : sequelize.NOW}
  }, {});
  Tweet.associate = function(models) {
    // associations can be defined here
  		Tweet.belongsTo(models.User , {foreignKey : "user_id" , as : "User"});
      };
  return Tweet;
};