var Model        = require('./model.js');
var DB          = require('../database/db.js');
var ModuleItem  = require('./moduleItem.js');

class Module extends Model {
    constructor() {
        super('modules')
        this.singular = 'module'
    }

    /**
     * Returns the related module items
     *
     * @return     {Relation}  The current object with the
     * connected relation
     */
    items() {
        return this.oneToMany(new ModuleItem).then(items => {
            this.module_items = items
            return this
        });
    }

    /**
     * Calulcates the total grade percentage of the 
     * current module. This method requires that 
     * the items() method has aready been attached
     */
    moduleTotal() {
        let weighted = 0;
        this.module_items.forEach(item => {
            weighted = weighted + item.weightedPercentage()
        })
        this.moduleTotal = Math.round((weighted * 100)).toFixed()
        return this
    }

    /**
     * Calculates the average grade for the grades
     * given within the current module items. 
     * Again this method requires that the items()
     * function has already been attached
     */
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

    /**
     * Calculates the total weights assinged to the
     * current module. This can be helpful when telling the 
     * user if they have added too much weight to their items
     *
     * @return     {Object}     The current model with the 
     *                          assinged percentage added.
     */
    assingedPercentage() {
        let assigned = 0
        this.module_items.forEach(item => {
            assigned = assigned + item.weighting
        })
        this.assingedPercentage = assigned
        return this;
    }

    /**
     * A helper method to create an item and automatically 
     * fill in the current models ID to a proper 
     * relationship is formed.
     *
     * @param      {Object}  attributes  Item attributes
     * @return     {ModuleItem}  The newly creates item
     */
    createItem(attributes) {
        attributes.module_id = this.id
        return ModuleItem.create(attributes)
    }
}

module.exports = Module