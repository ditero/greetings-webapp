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
  var convertText = function(userName) {
    var userName = name.substring(0, 1).toUpperCase() + "" + name.substring(1).toLowerCase()
    return userName;
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
    models.Users.find({}).exec(function(err, results){
      if (err){
        return cb(err);
      }
      var names = getNames(results);
      cb(null, names);
    });
  };

  /////////////////////GREET SCREEN PAGE////////////////////////////
  const greetScreen = function(req, res, next) {
    models.Users.count()
    .exec(function(err, results){
      if (err) {
        return next(err);
      }else {
        res.render("myusers/greet", {
          countGreeted: results
        });
      }
    });
    // findCollection(function(err, results){
    //   res.render("myusers/greet", {
    //     countGreeted: results.length
    //   });
    // });
  };

  //////GREET FUNCTION: RESPONDS AND PUSHES NAMES TO AN ARRAY///////
  const greet = function(req, res, next) {
    var user = {
      name: req.body.user,
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
            models.Users.findOne({name:user.name})
            .exec(function(err, results){
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
        }
        else {
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

      // if (!foundUser) {
      //   uniqueList.push(user.name);
      // }

    }


  } //End Of Greet Function

  /////////////COUNTGREETINGS FUNCTION: COUNTS HOW TIMES A USER HAS BEEN GREETED///////
  const countGreetings = function(req, res, next) {
    var count = 0;
    var user = req.params.user;
    //user = convertText(user);
    models.Users.findOne({name: req.params.user})
    .exec(function(err, results){
      if (err) {
        return next(err);
      }else {
        var thisUser = 'Hello, ' + results.name + ' is greeted for the ' + results.count + ' time(s)'

        res.render('myusers/countGreetings', {
          thisUser: thisUser
        });
      }
    });
    // for (var i = 0; i < greetedUsers.length; i++) {
    //   if (user === greetedUsers[i]) {
    //     count++;
    //   }
    // }

  }



  ////////////////GREETED FUNCTION: RESPONDS WITH THE LIST OF GREETED USERS THAT HAVE LINKS/////
  const greeted = function(req, res) {

    findCollection(function(err, names){
      res.render('myusers/index', {
        myusers: names
      });
    });

  }
  const resetCounter = function(req, res, next) {
    greetedUsers = [];
    models.Users.remove({}).exec(function(err, results) {
      if (err) {
        return next(err);
      } else {
        findCollection(function(err, results) {
          res.render("myusers/greet", {
            countGreeted: results.length
          });
        });
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
