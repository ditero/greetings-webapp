'use strict'
module.exports = function(){

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
  var selectedRadio = req.body.selectedRadio;
  var myChoice = selectedRadio + ', '+user;
  user = convertText(user);
  var foundUser = uniqueList.find(function(currentUser){
    return currentUser === user;
  });
  if (!user || selectedRadio === undefined) {
    req.flash('error', 'Input field required');
    res.redirect('/');

  }
  else {

        if (!foundUser) {
          uniqueList.push(user);
        }
        // else {
        //   req.flash('error', 'User already greeted!');
        // }
  }

  countGreeted = uniqueList.length;
  greetedUsers.push(user);
    res.render('myusers/greet', {output: myChoice, countGreeted: countGreeted});
    //res.send('Hello, '+user +'!');
    console.log(req.body.selectedRadio);
  }

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
      res.send('Hello, '+user + ' is greeted for the ' + count +' times');


  }

  ////////////////GREETED FUNCTION: RESPONDS WITH THE LIST OF GREETED USERS THAT HAVE LINKS/////
  const greeted = function(req, res){
    //greetedUsers.forEach(function());
    var list = [];
    var user = getUser(req, res);

    // uniqueList.forEach(function(user){
    //   list.push("<a href= counter/" + user + ">" + user + "</a>");
    // });

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
