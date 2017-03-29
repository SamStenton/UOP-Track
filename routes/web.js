var express     = require('express');   
var web         = express.Router();             
var router = new (require('./router.js'))

web.get('/', (req, res) => router.route(req, res, 'AppController@index'));
web.get('/about', (req, res) => router.route(req, res, 'AppController@about'));
web.post('/post', (req, res) => router.route(req, res, 'AppController@post'));


module.exports = web