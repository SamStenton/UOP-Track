var DB          = require('../database/db.js');
class Model {
    constructor(table) {
        // The table the model interacts with
        this.table = table
        this.attributes = []
    }

    /**
     * Fill the model with the given attributes
     * @param  {object} attributes 
     */
    fill(attributes) {
        for(var attribute in attributes) {
            this.setAttribute(attribute, attributes[attribute])
        }
    }

    /**
     * Set object attributes
     * @param {string} key   
     * @param {anything} value
     */
    setAttribute(key, value) {
        this.attributes[key] = value;
    }

    /**
     * Gets object attributes
     * @param  {string} key
     * @return {attribute} attribute
     */
    getAttribute(key) {
        return this.attributes[key];
    }

    /**
     * Checks if attribute exists
     * @param  {string}  key
     * @return {Boolean}  
     */
    hasAttribute(key) {
        return (this.attributes[key] !== undefined);
    }

    /**
     * Saves current model to database
     */
    save() {
        var db = new DB();

        //Check if model exists
        if (!this.attributes['id']) {
            // Does not exist
            db.insert(this.table, this.attributes);
        }
        // Exists
    }
    update(attributes) {
        var db = new DB();
        db.update(this.table, `id = '${this.getAttribute('id')}'`, attributes)
    }

    remove() {
        var db = new DB();
        db.delete(this.table, `id = '${this.getAttribute('id')}'`);
    }

    static create(attributes) {
        var instance = new this;
        instance.fill(attributes)
        instance.save()
    }

    static where(query, callback) {
        var db = new DB();
        var instance = new this;
        db.where(instance.table, query, function(error, results) {
            var users = [];
            for (var res in results) {
                var user = new instance.constructor(instance.table)
                user.fill(results[res])
                users.push(user)
            }

            callback(users)
        });
    }
}

module.exports = Model