var controller = require('../controller.js')

class ApiController extends controller {

    index(req, res) {
        res.json({message: 'wahhooo'});   
    }

}

module.exports = ApiController


