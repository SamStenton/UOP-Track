var Model        = require('./model.js');

class User extends Model {
    constructor() {
        super('users')
    }
}

module.exports = User