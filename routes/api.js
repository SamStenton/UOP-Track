var express     = require('express');   
var api         = express.Router();             
var router      = new (require('./router.js'))

api.get('/', (req, res) => router.route(req, res, 'API/ApiController@index'));

module.exports = api
