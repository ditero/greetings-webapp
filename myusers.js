'use strict'
var MongoClient = require('mongodb').MongoClient,
  format = require('util').format;
module.exports = function() {

  ///////////GETUSER FUNCTION: RETUNRS THE VARIABLE <USER>/////////
  function getUser(req, res) {

    //  var user = req.params.user;
    var user = req.body.user;
    return user;
  }

<<<<<<< HEAD
var greetedUsers = [];
var uniqueList = [];
var countGreeted = 0;

const index = function(req, res){
  res.render('myusers/index');
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
  const greet = function(req, res){
  //  res.send('Greet a user');
  var user = req.body.user;
  user = convertText(user);
  var foundUser = uniqueList.find(function(currentUser){
    return currentUser === user;
  });
  if (!user) {
    req.flash('error', 'Name cannot be blank');

  }
  else {

        if (!foundUser) {
          uniqueList.push(user);
        }
        else {
          req.flash('error', 'User already greeted!');
        }
  }
  greetedUsers.push(user);
  countGreeted = uniqueList.length;
  var myChoice = req.body.selectedRadio + ', '+user;
    res.render('myusers/greet', {output: myChoice, countGreeted: countGreeted});
=======
  var greetedUsers = [];
  var uniqueList = [];
  var countGreeted = 0;

  const index = function(req, res) {
    res.render('myusers/index');
  };
  var convertText = function(name) {
    var userName = name.substring(0, 1).toUpperCase() + "" + name.substring(1).toLowerCase()
    return userName;
  };
  /////////////////////GREET SCREEN PAGE////////////////////////////
  const greetScreen = function(req, res) {
    res.render("myusers/greet");

  };

  //////GREET FUNCTION: RESPONDS AND PUSHES NAMES TO AN ARRAY///////
  const greet = function(req, res) {
    //  res.send('Greet a user');
    var user = req.body.user;
    user = convertText(user);
    var foundUser = uniqueList.find(function(currentUser) {
      return currentUser === user;
    });
    if (!user) {
      req.flash('error', 'Name cannot be blank');

    } else {

      if (!foundUser) {
        uniqueList.push(user);
        MongoClient.connect('mongodb://127.0.0.1:27017/greetDB', function(err, db) {
          if (err) throw err;

          var collection = db.collection('greetedUsers');
          collection.insert({
            name: user
          }, function(err, docs) {
            collection.count(function(err, count) {
              console.log(format("count = %s", count));
              db.close();
            });
          });
        });
      } else {
        req.flash('error', 'User already greeted!');
      }
    }
    greetedUsers.push(user);
    countGreeted = uniqueList.length;
    var myChoice = req.body.selectedRadio + ', ' + user;
    res.render('myusers/greet', {
      output: myChoice,
      countGreeted: countGreeted
    });
>>>>>>> 4c18dbd87ce08521d886c2f59404257095155365
    //res.send('Hello, '+user +'!');
    console.log(req.body.selectedRadio);
  }

  /////////////COUNTGREETINGS FUNCTION: COUNTS HOW TIMES A USER HAS BEEN GREETED///////
  const countGreetings = function(req, res) {
    var count = 0;
    var user = req.params.user;
    user = convertText(user);
<<<<<<< HEAD
      for (var i = 0; i < greetedUsers.length; i++) {
        if (user === greetedUsers[i]) {
          count++;
        }
=======
    for (var i = 0; i < greetedUsers.length; i++) {
      if (user === greetedUsers[i]) {
        count++;
>>>>>>> 4c18dbd87ce08521d886c2f59404257095155365
      }
    }
    res.send('Hello, ' + user + ' is greeted for the ' + count + ' times');


  }

  ////////////////GREETED FUNCTION: RESPONDS WITH THE LIST OF GREETED USERS THAT HAVE LINKS/////
  const greeted = function(req, res) {
    //greetedUsers.forEach(function());
    var list = [];
    var user = getUser(req, res);

    // uniqueList.forEach(function(user){
    //   list.push("<a href= counter/" + user + ">" + user + "</a>");
    // });

    res.render('myusers/index', {
      myusers: uniqueList
    });

  }
  return {
    greet,
    index,
    greeted,
    countGreetings,
    greetScreen
  }
}
