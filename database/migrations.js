var DB          = require('./db');
var db          = new DB();


// db.createTable('users', {
//     id: 'INT NOT NULL AUTO_INCREMENT PRIMARY KEY',
//     name: 'VARCHAR(64) NOT NULL',
//     email: 'VARCHAR(128) NOT NULL'
// })

db.createTables({
    users: {
        id: 'INT NOT NULL AUTO_INCREMENT PRIMARY KEY',
        name: 'VARCHAR(64) NOT NULL',
        email: 'VARCHAR(128) NOT NULL'
    },
    courses: {
        id: 'INT NOT NULL AUTO_INCREMENT PRIMARY KEY',
        name: 'VARCHAR(64) NOT NULL'
    },
    user_courses: {
        id: 'INT NOT NULL AUTO_INCREMENT PRIMARY KEY',
        user_id: 'INT NOT NULL',
        course_id: 'INT NOT NULL'
    }
}).then(() => process.exit()).catch(errors => console.error (errors))
