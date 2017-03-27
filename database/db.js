class DB {
    constructor() {
        this.mysql      = require('mysql');
        this.timeout    = 10000
        this.connection = this.mysql.createConnection({
          host     : 'localhost',
          user     : 'root',
          password : '',
          database : 'uoptrack'
        });
    }

    connection() {
        return this.connection;
    }

    /**
     * Run a database query
     *
     * @param   query     The sql query
     * @param   callback  The callback
     */
    query(query, callback) {
        this.connection.query({sql: query, timeout: this.timeout}, callback)
    }

    /**
     * Creates a table.
     *
     * @param      {string}  name     Table name
     * @param      {object}  columns  Columns
     */  
    createTable(name, columns) {
        // Generate statement
        var statement = "";
        for (var item in columns) {
            statement += item + " " + columns[item] + ","
        }

        // Remove trailing comma
        statement = statement.replace(/,\s*$/, "");

        // Create Table
        this.query(`CREATE TABLE IF NOT EXISTS ${name} (${statement})`, function(error, results) {
            if (error) {throw error}
            console.log(results.message)
        })
    }

    /**
     * Insert into table
     *
     * @param      {string}  table    The table name
     * @param      {array}  columns  Data to enter
     */
    insert(table, columns) {
        // Insert Item
        this.query(`INSERT INTO ${table} SET ?`, Object.assign({}, columns), function(error, results) {
            if (error) {throw error}
            console.log(results.message)
        })
    }

    update(table, where, attributes) {
        this.query(`UPDATE ${table} SET ? WHERE ${where}`, attributes, function(error, results){
            console.log(results)
        });
    }

    delete(table, where) {
        this.query(`DELETE FROM ${table} WHERE ${where}`);
    }

    where(table, query, callback) {
        var whereString = ""
        for (var clause in query) {
            whereString += clause + " = '" + query[clause] + "',"
        }
        // Remove trailing comma
        whereString = whereString.replace(/,\s*$/, "");

        this.query(`SELECT * FROM ${table} WHERE ${whereString}`, callback);
    }
}


module.exports = DB