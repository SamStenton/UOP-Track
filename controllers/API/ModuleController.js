var controller = require('../controller.js')
var Module = require('../../models/module.js')

class ModuleController extends controller {
    index(req, res) {
        Module.where('course_id', '=','1').then(modules => {
            Promise.all(modules.map(module => {
                return Promise.all(module.attach(['items']))
            })).then(modules => {
                res.json(modules)
            })
        })
    }

    create(req, res) {
        // console.log(req.body)
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
            res.json({message: 'wahhooo'});   
        })

        // res.json({message: 'wahhooo'});   
    }
}

module.exports = ModuleController


