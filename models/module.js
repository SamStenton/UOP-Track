var Model        = require('./model.js');
var DB          = require('../database/db.js');
var ModuleItem  = require('./moduleItem.js');

class Module extends Model {
    constructor() {
        super('modules')
        this.singular = 'module'
    }

    items() {
        return this.oneToMany(new ModuleItem);
    }
}

module.exports = Module