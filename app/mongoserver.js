var mongoose = require('mongoose');
var connectionString = process.env.MONGOLAB_URI || 'mongodb://localhost/users';
mongoose.connect(connectionString);

var db = mongoose.connection;
module.exports = db;






