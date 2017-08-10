'use strict'
module.exports = function(models){

///////////GETUSER FUNCTION: RETUNRS THE VARIABLE <USER>/////////
  function getUser(req, res){

  //  var user = req.params.user;
  var user = req.body.user;
    return user;
  }

var greetedUsers = [];
var uniqueList = [];
var countGreeted = 0;

const index = function(req, res){
  var countGreeted = uniqueList.length;
  res.render('myusers/index', {countGreeted: countGreeted});
};
var convertText = function(name){
    var userName = name.substring(0,1).toUpperCase() +""+name.substring(1).toLowerCase()
    return userName;
};
/////////////////////GREET SCREEN PAGE////////////////////////////
const greetScreen = function(req, res){
  res.render("myusers/greet");

};

//////GREET FUNCTION: RESPONDS AND PUSHES NAMES TO AN ARRAY///////
  const greet = function(req, res, next){
  var user = {
    name: req.body.user
  };

  var selectedRadio = req.body.selectedRadio;
  var myChoice = selectedRadio + ', '+user.name;
  var foundUser = uniqueList.find(function(currentUser){
    return currentUser === user.name;
  });
  if (!user || selectedRadio === undefined) {
    req.flash('error', 'Input field required');
    res.redirect('/');

  }
  else {
        models.Users.create(user, function(err, results){
          if (err) {
            if (err.code === 11000) {
              // req.flash('error', 'Welcome back');
            }
            else {
              return next(err);
            }
          }
        });
        if (!foundUser) {
          uniqueList.push(user.name);
        }
  }

  countGreeted = uniqueList.length;
  greetedUsers.push(user.name);
    res.render('myusers/greet', {output: myChoice, countGreeted: countGreeted});

  } //End Of Greet Function

/////////////COUNTGREETINGS FUNCTION: COUNTS HOW TIMES A USER HAS BEEN GREETED///////
  const countGreetings = function(req, res){
    var count = 0;
    var user = req.params.user;
    user = convertText(user);
      for (var i = 0; i < greetedUsers.length; i++) {
        if (user === greetedUsers[i]) {
          count++;
        }
      }
      var thisUser = 'Hello, '+user + ' is greeted for the ' + count +' time(s)'
      res.render('myusers/countGreetings', {thisUser: thisUser});


  }

  ////////////////GREETED FUNCTION: RESPONDS WITH THE LIST OF GREETED USERS THAT HAVE LINKS/////
  const greeted = function(req, res, next){
    models.Users.find({})
    .exec(function(err, results){
      if (err) {
        return next(err);
      }else {
        console.log(results);
      }
    });
    res.render('myusers/index',{myusers: uniqueList});

  }
  return{
    greet,
    index,
    greeted,
    countGreetings,
    greetScreen
  }
}
