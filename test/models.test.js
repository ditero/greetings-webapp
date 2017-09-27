const assert = require('assert');
const Models = require('../models');
describe('models should be able to store greeted names', function(){
  it('store names to MonngoDB', function(done){
    var models = Models('mongodb://127.0.0.1:27017/greetDB');

    models.Users.create({name: 'Test Name'}, function(err){
      if (err) {
        if (err.code === 11000) {
          assert.ok(err, "The name is already stored on DB");

        }done()

      }else {
        done()
      }

    });
  });
});
