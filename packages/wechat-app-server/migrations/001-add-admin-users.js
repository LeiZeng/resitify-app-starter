const db = require('../dist/db')
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.up = function(next){
  User.create({
    name: 'admin',
    password: 'admin'
  }, (err, user) => {
    if (err) {
      next(err)
    }
    next()
  });
};

exports.down = function(next){
  
  next();
};
