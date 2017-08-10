const mongoose = require('mongoose');
//const MongoClient = require('mongodb').MongoClient, format = require('util').format;
module.exports = function(mongoURL){
  mongoose.connect(mongoURL);

  const UsersSchema = mongoose.Schema({name : String});
  UsersSchema.index({name : 1}, {unique : true});

  const Users = mongoose.model('Users', UsersSchema);

  return {
    Users
  };

}
