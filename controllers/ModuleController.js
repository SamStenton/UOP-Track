var controller = require('./controller.js')

class ModuleController extends controller {

    /**
     *  Render the module create form
     *
     * @param      {req}  req     The request
     * @param      {res}  res     The response
     */ 
    create(req, res) {
        res.render('module/create');   
    } 

    /**
     * Render the module edit form
     *
     * @param      {req}  req     The request
     * @param      {res}  res     The resource
     */ 
    edit(req, res) {
        res.render('module/edit', {itemId: req.params.itemId});   
    } 

}

module.exports = ModuleController


