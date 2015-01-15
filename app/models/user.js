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

UserSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    callback(isMatch);
  });
};

UserSchema.methods.hashPassword = function(){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.get('password'), null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
    });
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
