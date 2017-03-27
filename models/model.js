var DB          = require('../database/db.js');
class Model {
    constructor(table) {
        // The table the model interacts with
        this.table = table
        this.attributes = []
    }

    fill(attributes) {
        for(var attribute in attributes) {
            this.setAttribute(attribute, attributes[attribute])
        }
    }

    setAttribute(key, value) {
        this.attributes[key] = value;
    }

    save() {
        var db = new DB();

        //Check if model exists
        if (!this.attributes['id']) {
            // Does not exist
            db.insert(this.table, this.attributes);
        }
        // Exists
    }

    static create(attributes) {
        var instance = new this;
        instance.fill(attributes)
        instance.save()
    }
}

module.exports = Model