var Model        = require('./model.js');

class Course extends Model {
    constructor() {
        super('courses')
        this.singular = 'course'
    }
}

module.exports = Course