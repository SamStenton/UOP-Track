var DB          = require('./db');
var db          = new DB();

// Users Table
db.createTable('users', {
    id: 'INT NOT NULL AUTO_INCREMENT PRIMARY KEY',
    name: 'VARCHAR(64) NOT NULL',
    email: 'VARCHAR(128) NOT NULL'
});

// Prevents tables from executing
// process.exit();