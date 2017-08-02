const mongoose = require('mongoose');
//const MongoClient = require('mongodb').MongoClient, format = require('util').format;
module.exports = function(){
  mongoose.connect('mongodb://127.0.0.1:27017/greetDB');

  const Users = mongoose.model('Users', {name:"String"});

  return {
    Users
  };

}
