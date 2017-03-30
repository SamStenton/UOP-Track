var DB          = require('../database/db.js');
class Model {
    constructor(table) {
        // The table the model interacts with
        this.table      = table
        this.singular   = ""
        this.attributes = []
    }

    /**
     * Fill the model with the given attributes
     * @param  {object} attributes 
     */
    fill(attributes) {
        for(var attribute in attributes) {
            this.setAttribute(attribute, attributes[attribute])
            this[attribute] = attributes[attribute]
        }
    }

    /**
     * Set object attributes
     * @param {string} key   
     * @param {anything} value
     */
    setAttribute(key, value) {
        this.attributes[key] = value;
        this[key] = value;
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
            return new Promise((fulfill, reject) => {
                db.insert(this.table, this.attributes).then(result => {
                    this.setAttribute('id', result.insertId)
                    fulfill(this)
                })
            })
        }
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
        return instance.save();
    }

    static where(before, oporator, after) {
        var db = new DB();
        var instance = new this;
        return new Promise((fulfill, reject) => {
            db
            .select('*')
            .from(instance.table)
            .where(before, oporator, after)
            .execute().then(results => {
                if (results.length > 0) {
                    results = results.map(function(row) {
                        return instance.scaffoldInstance(row)
                    })
                    fulfill(results)
                }
            }).catch(reject)
        })

        // db.where(instance.table, query, function(error, results) {
        //     if (results.length > 0) {
        //         results = results.map(function(row) {
        //             return self.scaffoldInstance(row, relation)
        //         })
        //         fulfill(results)
        //     }
        // });
    }

    /**
     * Returns a many to many relationship on the current model
     * Required that 'singular' property is set on each model
     * It assumes that the primary key in each table is 'id'
     * It assumes that the linking table columns are their
     * singular name followed by '_id'      
     *
     * @param      {Model}   relation   The related model
     * @param      {String}  link       The linking table name
     * @return     {Promise}            A promise with results of query
     */
    manyToMany(relation, link) {
        var db = new DB();
        var self = this;
        return new Promise(function(fulfill, reject) {
            db
            .select('*')
            .from(relation.table)
            .join(link, `${relation.table}.id`, `${link}.${relation.singular}_id`)
            .where(`${link}.${self.singular}_id`, '=', `${self.getAttribute('id')}`)
            .execute(function(error, results) {
                if (results.length > 0) {
                    self[relation.table] = results.map(function(row) {
                        return self.scaffoldInstance(row, relation)
                    })
                    fulfill(self)
                }

            })
        });
    }

    /**
     * Returns a oneToMany relationship on the current model
     *
     * @param      {<type>}   relation  The relation
     * @return     {Promise}  { Return the current Model with the attached relation }
     */
    oneToMany(relation) {
        var db = new DB();
        var self = this;
        return new Promise(function(fulfill, reject) {
            db
            .select('*')
            .from(relation.table)
            .join(self.table, `${relation.table}.${self.singular}_id`, `${self.table}.id`)
            .execute().then(results => {
                if (results.length > 0) {
                    self[relation.table] = results.map(function(row) {
                        return self.scaffoldInstance(row, relation)
                    })
                    fulfill(self)
                }
            })
        });
    }

    attach(relations) {
        return relations.map(relation => {
            return this[relation]()
        })
    }

    /**
     * Scaffold an instance of a Model
     *
     * @param      {Array}  attributes  Model  attributes
     * @param      {Model}  type        Model type to scaffold
     */
    scaffoldInstance(attributes, type = this) {
        var instance = new type.constructor(type.table)
        instance.fill(attributes)
        return instance
    }
}

module.exports = Model