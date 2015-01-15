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

exports.UserModel = mongoose.model('User', UserSchema);

// exports.UrlModel = mongoose.model('Url', UrlSchema);

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function(){
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function(){
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

// module.exports = User;
