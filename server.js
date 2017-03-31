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
var Module      = require('./models/module.js');
var ModuleItem  = require('./models/moduleItem.js');
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

// Module.where('course_id', '=','1').then(modules => {
//     console.log(modules)
// }).catch(console.log)

// Module.create({name: 'testing', course_id: 1}).then(module => {
//     module.createItem({
//         name: 'Web App',
//         weighting: 50 
//     })
// })



app.use('/', routes.web);
app.use('/api', routes.api);
app.use(express.static(__dirname + '/resources'));

var port = process.env.PORT || 8080;      

app.listen(port);
console.log('Magic happens on port ' + port);