var mongoose = require('mongoose');
var url = process.env.MONGOLAB || 'mongodb://localhost/users';
mongoose.connect('mongodb://localhost/users');


var db = mongoose.connection;
module.exports = db;






