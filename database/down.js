var DB          = require('./db');
var db          = new DB();

db.dropTables([
    'users',
    'courses',
    'modules',
    'module_items'
]).then(() => process.exit()).catch(errors => console.error (errors));