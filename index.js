 const express = require('express');
 const exphbs = require('express3-handlebars');
 const bodyParser = require('body-parser');
 const flash = require('express-flash');
 const session = require('express-session');
 const mongoURL = process.env.MONGO_DB_URL || 'mongodb://localhost/greetDB';

//mongoose.connect(mongoURL);
 //const mongoUrl = 'mongodb://admin:admin123@ds129023.mlab.com:29023/greetednames';

 const GreetUsersRoutes = require('./myusers');
 const Models = require('./models');

 const models = Models(mongoURL);

 //Instantiate the routes
 const greetUsersRoutes = GreetUsersRoutes(models);

 const app = express();


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

 app.get('/greetings', greetUsersRoutes.index);
 app.post('/greetings', greetUsersRoutes.greet);
 app.get('/', greetUsersRoutes.greetScreen);
 app.get('/greeted', greetUsersRoutes.greeted);
 app.get('/reset', greetUsersRoutes.resetCounter);
  app.get('/counter/:user', greetUsersRoutes.countGreetings);



 app.set('port',(process.env.PORT || 5000) );

 app.listen(app.get('port'), function(){
   console.log("Web app started on port: ", app.get('port'));
 });
