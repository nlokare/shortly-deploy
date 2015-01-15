var db = require('../mongoserver');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var Schema = mongoose.Schema;

// var UrlSchema = new Schema({
//   url: String,
//   baseUrl: String,
//   code: String,
//   title: String,
//   visits: Number
// });

var UserSchema = new Schema({
  username: String,
  password: String
});


var User = mongoose.model('User', UserSchema);

User.hashPassword = function (password) {
  return new Promise(function(resolve, reject) {
    bcrypt.hash(password, null, null, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

User.comparePassword = function(user, attemptedPassword) {
  return new Promise(function(resolve, reject){
    bcrypt.compare(attemptedPassword, user[0]['password'], function(err, isMatch) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

module.exports = User;
