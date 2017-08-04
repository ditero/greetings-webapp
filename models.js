const mongoose = require('mongoose');
//const MongoClient = require('mongodb').MongoClient, format = require('util').format;
module.exports = function(mongoUrl){
  mongoose.connect(mongoUrl);

  const Users = mongoose.model('Users', {name:"String"});

  return {
    Users
  };

}
