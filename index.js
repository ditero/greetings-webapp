 const express = require('express');
 const exphbs = require('express3-handlebars');
 const bodyParser = require('body-parser');
 const flash = require('express-flash');
 const session = require('express-session');
 var greetUsers = require('./myusers');
 var MongoClient = require('mongodb').MongoClient, format = require('util').format;

 const app = express();

// Connect to Mongoose
MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db){
  if (err) {
    throw err;
  }else {
    console.log("successfully connected to the database");
  }
  db.close();

});

//Add data to DB
MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;

    var collection = db.collection('test_insert');
    collection.insert({a:2}, function(err, docs) {
        collection.count(function(err, count) {
            console.log(format("count = %s", count));
            db.close();
        });
    });
});

//Retrieve Data from collections
MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;

    var collection = db.collection('test_insert');
    collection.insert({a:2}, function(err, docs) {
        collection.count(function(err, count) {
            console.log(format("count = %s", count));
        });
    });

    // Locate all the entries using find
    collection.find().toArray(function(err, results) {
        console.dir(results);
        // Let's close the db
        db.close();
    });
});

 app.engine('handlebars', exphbs({defaultLayout: 'main'}));
 app.set('view engine', 'handlebars');

app.use(express.static('public'));

// prase application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30}}));
app.use(flash());
//Instantiate the routes
var greetUsers = greetUsers();

 app.get('/', function(req, res){
   res.send('LetsGreet');
 });
// app.get('/greetings', greetUsers.index);
 app.get('/greetings', greetUsers.greetScreen);
 app.get('/greeted', greetUsers.greeted);
 app.get('/counter/:user', greetUsers.countGreetings);
 app.post('/greetings', greetUsers.greet);



 const port = 3000;
 app.listen(process.env.PORT || port, function(){
   console.log("Web app started on port: "+port);
 });
