var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');


var db = mongoose.connection;
module.exports = db;






