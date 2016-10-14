'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, trim: true, required: true},
  admin: {type:Boolean, default: false},
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date,
  password: String
});


userSchema.statics.authenticate = function(email, password, callback) {
  console.log('**************STARTING AUTHENTICATE*****************************');
  User.findOne({email: email})
    .exec(function(error, user) {
      if (error) {
        console.log('*************************Big Error!**************************');
        return callback(error);
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function(error, result) {
        if (result === true) {
          console.log('**************PERFECTLY HAPPY*****************************')
          return callback(null, user);
        } else {
          console.log('mismatch');
          return callback();
        }
      });
  })
};

//hash password before savintg to database
userSchema.pre('save', function(next) {
  var user = this;
  user.created_at = Date.now();
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

var User = mongoose.model('User', userSchema);
module.exports = User;
