var Promise = require('promise');
class DB {
    constructor() {
        this.mysql              = require('mysql');
        this.timeout            = 10000
        this.queryString        = ""
        this.pool = this.mysql.createPool({
          host     : 'localhost',
          user     : 'root',
          password : '',
          database : 'uoptrack'
        });
    }

    /**
     * Create connection
     *
     * @return     {MYSQL Connection} 
     */
    pool() {
        return this.pool;
    }

    /**
     * Run a database query
     *
     * @param   query     The sql query
     * @param   callback  The callback
     */
    query(query, params = null) {
        if (params != null) {
            query = this.mysql.format(query, params)
        }
        return new Promise((fulfill, reject) => {
            this.pool.getConnection((err, connection) =>  {
                connection.query({sql: query, timeout: this.timeout}, function(error, results) {
                    connection.release();
                    if (error) {reject(error)}
                    fulfill(results)
                })
            })
        })
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
        var self = this;
        return new Promise(function(fulfill, reject) {
            self.query(`CREATE TABLE IF NOT EXISTS ${name} (${statement})`).then(results => {
                fulfill(name, results)
            })
        })
    }

    /**
     * Runs multiple table creates
     *
     * @param      {object}  tables
     * @return     {promise}  Returns promise when all tables are created
     */
    createTables(tables) {
        return Promise.all(Object.keys(tables).map(name => {
            return this.createTable(name, tables[name])
        }));
    }

    /**
     * Insert into table
     *
     * @param      {string}  table    The table name
     * @param      {array}  columns  Data to enter
     */
    insert(table, columns) {
        var self = this;
        return new Promise(function(fulfill, reject) {
            self.query(`INSERT INTO ${table} SET ?`, Object.assign({}, columns)).then(results => {
                fulfill(results)
            }).catch(error => {
                console.log(error)
            })
        })
    }

    /**
     * Update query
     *
     * @param      {String}  table       The table to upate
     * @param      {String}  where       The where clause
     * @param      {Array}  attributes   Attributes to change
     */
    update(table, where, attributes) {
        this.query(`UPDATE ${table} SET ? WHERE ${where}`, attributes, function(error, results){
            console.log(results)
        });
    }

    /**
     * Run a WHERE query
     *
     * @param      {String}             table     The table
     * @param      {(Function|string)}  query     The query
     * @param      {Function}           callback  The callback
     */
    where(table, query) {
        var whereString = ""
        for (var clause in query) {
            whereString += clause + " = '" + query[clause] + "',"
        }
        // Remove trailing comma
        whereString = whereString.replace(/,\s*$/, "");

        return this.query(`SELECT * FROM ${table} WHERE ${whereString}`);
    }

    /**
     * Delete an item from the data base
     * 
     * param      {String} Table Table name
     * param      {String} Where clause 
     */
    delete(table, where) {
        this.query(`DELETE FROM ${table} WHERE ${where}`);
    }

     /**
      * Scaffold SELECT part of a query
      *
      * @param      {String}  select  Elements to select
      */
    select(select = '*') {
        this.queryString += `SELECT ${select} `
        return this
    } 

    /**
     * Scaffold FROM part of query
     *
     * @param      {String}  from    Table to select from
     */
    from(from) {
        this.queryString += `FROM ${from} `
        return this
    }

    /**
     * Scaffold WHERE clause in query
     *
     * @param      {String}  first     The first part
     * @param      {<type>}  oporator  The oporator
     * @param      {<type>}  second    The second part
     */
    where(first, oporator, second) {
        this.queryString += `WHERE ${first} ${oporator} ${second} `
        return this
    }

    /**
     * Scaffold JOIN clause on query
     *
     * @param      {String}  join    The join
     * @param      {String}  on      The joining table
     * @param      {String}  equals  The equals
     */
    join(join, on, equals) {
        this.queryString += `JOIN ${join} ON ${on} = ${equals} `
        return this
    }

    /**
     * Sacaffold a groupBy clause on query
     *
     * @param      {String}  by      The GroupBy
     */
    groupBy(by) {
        this.queryString += `GROUP BY ${by} `
        return this
    }

    /**
     * Execute a query build with the scaffold functions
     *
     * @param      {Function}  callback  The callback
     */
    execute() {
        console.log(this.queryString)
        return this.query(this.queryString)
    }
}


module.exports = DB