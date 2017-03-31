// server.js

// call the packages we need
var express     = require('express');    
var app         = express();  
var env         = require('node-env-file');
env(__dirname + '/.env');

var bodyParser  = require('body-parser');
var DB          = require('./database/db.js');
var db          = new DB();

var hbs         = require('express-hbs');
var routes      = require('./routes/routes.js') 

app.engine('hbs', hbs.express4({partialsDir: __dirname + '/views/partials'}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/', routes.web);
app.use('/api', routes.api);
app.use(express.static(__dirname + '/resources'));

var port = process.env.PORT || 8080;      

app.listen(port);
console.log('What happens on port ' + port + ' stays on port ' + port);