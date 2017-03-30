var Model        = require('./model.js');

class ModuleItem extends Model {
    constructor() {
        super('module_items')
        this.singular = 'module_item'
    }
}

module.exports = ModuleItem