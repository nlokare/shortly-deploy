var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');
var mongoose = require('mongoose');

var db = require('../app/mongoserver');
var User = require('../app/models/user');
var Link = require('../app/models/link');
var Users = require('../app/collections/users');
var Links = require('../app/collections/links');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  Link.find(function(err, links) {
    if(err){
      return err;
    }
    res.send(200, links);
  });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }

  Link.find({ url: uri }, function(err, link){
    if (err) {
      return err;
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        }
        Link.createCode(uri).then(function (code) {
          var link = new Link({
            url: uri,
            title: title,
            baseUrl: req.headers.origin,
            code: code,
            visits: 0
          });
          link.save(function(err, newLink) {
            if(err) {
              res.send(204)
            } else {
              res.send(200, newLink);
            }
          });
        });
      });
    }
  });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  User.find({username: username}, function (err, user) {
    if (err) {
      return err;
    } else {
      User.comparePassword(user, password).then(function(match) {
        if (match) {
          util.createSession(req, res, user);
        } else {
          res.redirect('/login');
        }
      });
    }
  });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  User.hashPassword(password).then(function (password) {
    User.find({username: username}, function (err, user) {
      if (err) {
        return err;
      }
      if (user.length === 0) {
        var newUser = new User({
          username: username,
          password: password
        });
        newUser.save(function (err, newUser) {
          if (err) {
            return err;
          }
          console.log("added");
          res.redirect('/login');
        });
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
      }
    });
  });
};

exports.navToLink = function(req, res) {
  Link.find({ code: req.params[0] }, function(err, link) {
    if (err) {
      res.redirect('/');
    } else {
      res.redirect(link[0].url);
    }
  });
};
