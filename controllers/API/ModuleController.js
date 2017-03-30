var controller = require('../controller.js')

class ModuleController extends controller {

    create(req, res) {
        console.log(req.body)
        res.json({message: 'wahhooo'});   
    }
}

module.exports = ModuleController


