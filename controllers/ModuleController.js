var controller = require('./controller.js')

class ModuleController extends controller {

    create(req, res) {
        res.render('module/create');   
    } 

    edit(req, res) {
        res.render('module/edit', {itemId: req.params.itemId});   
    } 

}

module.exports = ModuleController


