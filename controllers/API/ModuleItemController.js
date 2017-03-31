var controller = require('../controller.js')
var Module = require('../../models/module.js')
var Item = require('../../models/moduleItem.js')

class ModuleItemController extends controller {

    get(req, res) {
        Item.where('id', '=', req.params.itemId).then(item => {
            res.json(item[0])
        })
    }

    update(req, res) {
        let item = new Item()
        item.fill(req.body)
        item.save().then(results => {
            res.json(results)
        })
    }

    delete(req, res) {
        let item = new Item()
        item.fill({id: req.params.itemId})
        item.remove()
        res.json({message: 'Thats goneee!'})
    }
}

module.exports = ModuleItemController


