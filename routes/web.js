var express     = require('express');   
var web         = express.Router();             
var router = new (require('./router.js'))

web.get('/', (req, res) => router.route(req, res, 'AppController@index'));

//Module Routes
web.get('/module/create', (req, res) => router.route(req, res, 'ModuleController@create'));


module.exports = web