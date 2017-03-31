var controller = require('./controller.js')

class AppController extends controller {

    /**
     * Render the main dashboard page
     *
     * @param      {req}  req     The request
     * @param      {res}  res     The response
     */
    index(req, res) {
        res.render('dashboard/index');   
    } 

}

module.exports = AppController


