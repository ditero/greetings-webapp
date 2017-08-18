'use strict'
module.exports = function(models) {

  ///////////GETUSER FUNCTION: RETUNRS THE VARIABLE <USER>/////////
  function getUser(req, res) {

    //  var user = req.params.user;
    var user = req.body.user;
    return user;
  }

  var greetedUsers = [];
  //var uniqueList = [];
  var countGreeted;

  const index = function(req, res) {
    res.render('myusers/index');
  };
  var convertName = function(reqName) {

    var name = reqName.substring(0, 1).toUpperCase() + "" + reqName.substring(1).toLowerCase()
    return name;
  };

  /////////////////////////Generate names Only from the Database collection/////////////////////////
  var getNames = function(collection) {
    //  findNames();
    var computedNames = [];
    for (var i = 0; i < collection.length; i++) {
      computedNames.push(collection[i].name);
    }
    //uniqueList = computedNames;
    return computedNames;
  };

  ////////////////////////////FIND NAMES FROM MONGOOSE DATABASE//////////////////////////////////
  var findCollection = function(cb) {
    models.Users.find({}).exec(function(err, results) {
      if (err) {
        return cb(err);
      }
      var names = getNames(results);
      cb(null, names);
    });
  };

  /////////////////////GREET SCREEN PAGE////////////////////////////
  const greetScreen = function(req, res, next) {
    models.Users.count()
      .exec(function(err, results) {
        if (err) {
          return next(err);
        } else {
          res.render("myusers/greet", {
            countGreeted: results
          });
        }
      });
  };

  //////GREET FUNCTION: RESPONDS AND PUSHES NAMES TO AN ARRAY///////
  const greet = function(req, res, next) {
    var user = {
      name: convertName(req.body.user),
      count: 1
    };

    var selectedRadio = req.body.selectedRadio;
    var myChoice = selectedRadio + ', ' + user.name;


    if (!user.name || selectedRadio === undefined) {
      req.flash('error', 'Input field required');
      res.redirect('/');

    } else {

      models.Users.create(user, function(err, results) {
        if (err) {
          if (err.code === 11000) {
            models.Users.findOne({
                name: user.name
              })
              .exec(function(err, results) {
                if (results) {
                  results.count = results.count + 1;
                  results.save();
                }
              });
            req.flash('error', 'Welcome back');
            greetedUsers.push(user.name);
            res.redirect('/');

          } else {
            return next(err);
          }
        } else {
          findCollection(function(err, enteredNames) {
            if (err) {
              return next(err);
            } else {
              greetedUsers.push(user.name);
              res.render('myusers/greet', {
                output: myChoice,
                countGreeted: enteredNames.length
              });
            }
          });
        }
      });

    }


  } //End Of Greet Function
  const findCountPerUser = function(cb, name) {
    models.Users.findOne({
        name: name
      })
      .exec(function(err, results) {
        if (err) {
          return cb(err);
        } else {
          cb(null, results);
        }
      });
  }
  /////////////COUNTGREETINGS FUNCTION: COUNTS HOW TIMES A USER HAS BEEN GREETED///////
  const countGreetings = function(req, res, next) {
    var user = req.params.user;
    models.Users.findOne({
        name: user
      })
      .exec(function(err, results) {
        if (err) {
          return next(err);
        } else {
          var countMyGreetings = results.count
          var thisUser = 'Hello, ' + user + ' is greeted for the ' + countMyGreetings + ' time(s)'

          res.render('myusers/countGreetings', {
            thisUser: thisUser
          });
        }
      });

  }


  ////////////////GREETED FUNCTION: RESPONDS WITH THE LIST OF GREETED USERS THAT HAVE LINKS/////
  const greeted = function(req, res) {

    findCollection(function(err, names) {
      res.render('myusers/index', {
        myusers: names
      });
    });

  }
  const resetCounter = function(req, res, next) {
    greetedUsers = [];
    models.Users.remove({}).
    exec(function(err, results) {
      if (err) {
        return next(err);
      } else {
        res.redirect("/");
      }
    });
  }
  return {
    greet,
    index,
    greeted,
    countGreetings,
    greetScreen,
    resetCounter
  }
}
