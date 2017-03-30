var Model        = require('./model.js');

class ModuleItem extends Model {
    constructor() {
        super('module_items')
        this.singular = 'module_item'
    }

    weightedPercentage() {
        return (this.weighting / 100) * (this.grade / 100)
    }
}

module.exports = ModuleItem