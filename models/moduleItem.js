var Model        = require('./model.js');

class ModuleItem extends Model {
    constructor() {
        super('module_items')
        this.singular = 'module_item'
    }

    /**
     * Calculates the weighted percentage 
     * for the current model using the 
     * given grade and weighting. 
     *
     * @return     {Int}  The weighted percentage
     */
    weightedPercentage() {
        return (this.weighting / 100) * (this.grade / 100)
    }
}

module.exports = ModuleItem