var express     = require('express');   
var api         = express.Router();             
var router      = new (require('./router.js'))

api.get('/modules', (req, res) => router.route(req, res, 'API/ModuleController@index'));
api.post('/module/create', (req, res) => router.route(req, res, 'API/ModuleController@create'));
api.post('post', (req, res) => router.route(req, res, 'API/AppController@index'));

module.exports = api
