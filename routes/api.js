var express     = require('express');   
var api         = express.Router();             
var router      = new (require('./router.js'))

api.get('/modules', (req, res) => router.route(req, res, 'API/ModuleController@index'));
api.get('/module/:itemId', (req, res) => router.route(req, res, 'API/ModuleController@get'));
api.post('/module/create', (req, res) => router.route(req, res, 'API/ModuleController@create'));
api.post('/module/:itemId/update', (req, res) => router.route(req, res, 'API/ModuleController@update'));

api.get('/module/item/:itemId', (req, res) => router.route(req, res, 'API/ModuleItemController@get'));
api.post('/module/item/:itemId/update', (req, res) => router.route(req, res, 'API/ModuleItemController@update'));

module.exports = api
