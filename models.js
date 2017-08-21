const mongoose = require('mongoose');
module.exports = function(mongoURL){
  mongoose.Promise = global.Promise;
  mongoose.connect(mongoURL);

  const UsersSchema = mongoose.Schema({
    name : String,
    count : Number,
    mylist : Number
  });
  UsersSchema.index({name : 1}, {unique : true});

  const Users = mongoose.model('Users', UsersSchema);

  return {
    Users
  };

}
