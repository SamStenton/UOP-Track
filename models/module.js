var Model        = require('./model.js');
var DB          = require('../database/db.js');
var ModuleItem  = require('./moduleItem.js');

class Module extends Model {
    constructor() {
        super('modules')
        this.singular = 'module'
    }

    items() {
        return this.oneToMany(new ModuleItem).then(items => {
            this.module_items = items
            return this
        });
    }

    moduleTotal() {
        let weighted = 0;
        this.module_items.forEach(item => {
            weighted = weighted + item.weightedPercentage()
        })
        this.moduleTotal = Math.round((weighted * 100)).toFixed()
        return this
    }

    moduleAverage() {
        let average = 0
        let items = 0
        this.module_items.forEach(item => {
            if (item.grade > 0) {
                average = average + item.grade
                items++
            }
        })
        this.moduleAverage = Math.round(average / items).toFixed(2)
        return this
    }

    assingedPercentage() {
        let assigned = 0
        this.module_items.forEach(item => {
            assigned = assigned + item.weighting
        })
        this.assingedPercentage = assigned
        return this;
    }

    createItem(attributes) {
        attributes.module_id = this.id
        return ModuleItem.create(attributes)
    }
}

module.exports = Module