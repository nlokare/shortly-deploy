var db = require('../mongoserver');
var mongoose = require('mongoose');
var crypto = require('crypto');
var Promise = require('bluebird');

var Schema = mongoose.Schema;

var LinkSchema = new Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number
});

var Link = mongoose.model('Link', LinkSchema);

Link.createCode = function(url){
  return new Promise(function(resolve, reject) {
    var shasum = crypto.createHash('sha1');
    shasum.update(url);
    var code = shasum.digest('hex').slice(0, 5);
    resolve(code);
  });
};


module.exports = Link;
