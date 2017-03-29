var Model        = require('./model.js');
var Course        = require('./course.js');

class User extends Model {
    constructor() {
        super('users')
        this.singular = 'user'
    }

    courses() {
        return this.manyToMany(new Course, 'user_courses');
    }
}

module.exports = User