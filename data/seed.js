'use strict';

var Blog = require('../data/models/blog');
var User = require('../data/models/user');

var users = [
  {
    name: "Matt Condit",
    username:"mcondit",
    password: "hockey333"
  },
  {
    name: "Ben Condit",
    username: "bcondit",
    password: "bigpapi34"
  },
  {
    name: "Dan Condit",
    username: "dcondit",
    password: "bobbyorrsgonnascore"
  }
];

var blog = [
  {
    
  },


]

users.forEach(function(user, index){
  User.find({'username': user.username}, function(err, users){
    if (!err && !users.length) {
      User.create({name: user.name, username: user.username, password: user.password});
    }
    if (err) {
      console.error(err);
    }
  })
});
