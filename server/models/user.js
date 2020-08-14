'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    user_id : {type : DataTypes.INTEGER , autoIncrement : true , primaryKey : true} , 
    username: DataTypes.STRING,
    password: DataTypes.STRING , 
    createdAt : {type : DataTypes.DATE , defaultValue : sequelize.NOW} , 
    updatedAt : {type : DataTypes.DATE , defaultValue : sequelize.NOW}
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  		User.hasMany(models.Tweet , { foreignKey : "user_id" , as : "Tweets"});
  		User.belongsToMany(models.User , {foreignKey : "user_id" , as : "followers" , through : "UserFollowers"});
  		User.belongsToMany(models.User , {foreignKey : "followerId" , as : "following" , through : "UserFollowers"});
  };
  return User;
};