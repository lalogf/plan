"use strict";

var bcrypt = require('bcrypt'),
    salt = bcrypt.genSaltSync(10);

var passport = require('passport'),
    localStrategy = require('passport-local').Strategy;

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      comparePass: function (userpass, dbpass){
        return bcrypt.compareSync(userpass, dbpass);
      },
      hashPass: function (password){
        return bcrypt.hashSync(password, salt);
      },
      createNewUser: function (userInfo){
        User.create({
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          username: userInfo.username,
          password: this.hashPass(userInfo.password)
        });
      } 
    }
  });

  passport.use(new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, function (username, password, done){
    User.find({
      where: {
        username: username
      }
    }).done(function(err, user){
      if(!user){
        console.log("Not user was even found");
        return done(null, false)
      } else if (user) {
        if (User.comparePass(password, user.password)){
          return done(null, user)
        } else {
          console.log("Passwords don't match");
          done(null, false) 
        }
      }
    })
  }));
  return User;
};
