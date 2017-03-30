var controller = require('./controller.js')

class ModuleController extends controller {

    create(req, res) {
        res.render('module/create');   
    } 

}

module.exports = ModuleController


