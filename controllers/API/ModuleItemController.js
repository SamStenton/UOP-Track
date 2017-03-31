var controller = require('../controller.js')
var Module = require('../../models/module.js')
var Item = require('../../models/moduleItem.js')

class ModuleItemController extends controller {

    /**
     * Get a single Module Item
     *
     * @param      {req}  req     The request
     * @param      {res}  res     The response
     */
    get(req, res) {
        Item.where('id', '=', req.params.itemId).then(item => {
            res.json(item[0])
        })
    }

    /**
     * Update a single item
     *
     * @param      {<type>}  req     The request
     * @param      {<type>}  res     The resource
     */
    update(req, res) {
        let item = new Item()
        item.fill(req.body)
        item.save().then(results => {
            res.json(results)
        })
    }

    /**
     * Delete an Item
     */
    delete(req, res) {
        let item = new Item()
        item.fill({id: req.params.itemId})
        item.remove()
        res.json({message: 'Thats goneee!'})
    }
}

module.exports = ModuleItemController


