const mongoose = require('mongoose');
//const MongoClient = require('mongodb').MongoClient, format = require('util').format;
module.exports = function(mongoURL){
  mongoose.connect(mongoURL);

  const Users = mongoose.model('Users', {name:"String"});

  return {
    Users
  };

}
