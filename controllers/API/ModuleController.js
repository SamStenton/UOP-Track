var controller = require('../controller.js')
var Module = require('../../models/module.js')

class ModuleController extends controller {

    /**
     * Gets all modules.
     *
     * @param      {Object}  req     The request
     * @param      {Object}  res     The response
     */
    index(req, res) {
        Module.where('course_id', '=','1').then(modules => {
            Promise.all(modules.map(module => {
                return Promise.all(module.attach(['items']))
            })).then(modules => {
                res.json(modules.map(array => {
                    return array[0].attach(['moduleTotal', 'moduleAverage', 'assingedPercentage'])[0]
                }))
            })
        })
    }

    /**
     * Get a single module by ID
     *
     * @param      {req}  req     The request
     * @param      {res}  res     The responce
     */
    get(req, res) {
        Module.where('id', '=', req.params.itemId).then(module => {
            Promise.all(module[0].attach(['items'])).then(module => {
                Promise.all(module[0].attach(['moduleTotal', 'moduleAverage', 'assingedPercentage'])).then(module => {
                   res.json(module[0]) 
                })
            })
        })
    }

    /**
     * Create a module and attach submissions
     *
     * @param      {req}  req     The request
     * @param      {res}  res     The response
     */
    create(req, res) {
        Module.create({
            course_id: 1,
            name: req.body.name
        }).then(module => {
            let submissions = req.body.submissions
            for(let key in submissions) {
                module.createItem({
                    name: submissions[key].name,
                    weighting: submissions[key].weight,
                    grade: submissions[key].grade
                })
            }
            res.json({message: 'Module and Items created!'});   
        })
    }

    /**
     * Update an item and attach 
     * any (new) submissions
     *
     * @param      {req}  req     The request
     * @param      {res}  res     The response
     */
    update(req, res) {
        let item = new Module()
        item.fill({id: req.body.id, name: req.body.name})
        item.save().then(module => {
            let submissions = req.body.submissions
            for(let key in submissions) {
                if (submissions[key].id == undefined) {
                    module.createItem({
                        name: submissions[key].name,
                        weighting: submissions[key].weighting,
                        grade: submissions[key].grade
                    })
                }
            }
            res.json({message: 'Module and Items created!'});   
        })
    }
}

module.exports = ModuleController


