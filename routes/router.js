var fs = require('fs');
var path = require('path');

class Router {
    constructor() {
        this.loadedController   = undefined
        this.controllerPath     = __dirname + "/../controllers/"
    }

    route(req, res, controller) {
        this.loadController(this.controllerPath + this.getController(controller))
        var loadedController = new this.loadedController
        loadedController[this.getMethod(controller)](req, res)
    }

    loadController(path) {
        this.loadedController = require(path);
    }

    getController(controller) {
        return controller.split('@')[0] + '.js'
    }

    getMethod(controller) {
        return controller.split('@')[1]
    }
}

module.exports = Router