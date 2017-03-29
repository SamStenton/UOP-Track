var controller = require('./controller.js')

class AppController extends controller {

    index(req, res) {
        res.render('register/index');   
    }

    about(req, res) {
        res.send('about page')
    }

    post(req, res) {
        console.log(req)
        res.json('asdasd')
    }
}

module.exports = AppController


