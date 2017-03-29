var Model        = require('./model.js');

class User extends Model {
    constructor() {
        super('courses')
        this.singular = 'course'
    }
}

module.exports = User