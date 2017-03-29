var DB          = require('./db');
var db          = new DB();


// db.createTable('users', {
//     id: 'INT NOT NULL AUTO_INCREMENT PRIMARY KEY',
//     name: 'VARCHAR(64) NOT NULL',
//     email: 'VARCHAR(128) NOT NULL'
// })

db.createTables({
    users: {
        id: 'INT NOT NULL AUTO_INCREMENT PRIMRY KEY',
        name: 'VARCHAR(64) NOT NULL',
        email: 'VARCHAR(128) NOT NULL'
    },
    test: {
        id: 'INT NOT NULL AUTO_INCREMENT PRIMARY KEY',
        name: 'VARCHAR(64) NOT NULL',
        email: 'VARCHAR(128) NOT NULL'
    }
}).then(() => process.exit()).catch(errors => console.error(errors))
