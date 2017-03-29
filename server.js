// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express     = require('express');        // call express
var app         = express();                 // define our app using express
var bodyParser  = require('body-parser');
var DB          = require('./database/db.js');
var User        = require('./models/user.js');
var Course      = require('./models/course.js');
var db          = new DB();
var hbs         = require('express-hbs');
var routes      = require('./routes/routes.js') 

app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials'
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/', routes.web);
app.use('/api', routes.api);

var port = process.env.PORT || 8080;      

app.listen(port);
console.log('Magic happens on port ' + port);