var controller = require('./controller.js')

class AppController extends controller {

    index(req, res) {
        res.render('dashboard/index');   
    } 

}

module.exports = AppController


