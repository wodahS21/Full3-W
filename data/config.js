const mysql = require('mysql');

//Set database connection credentials
const config = {
    host: '127.0.0.1',
    user: 'yael',
    password: 'qwerty',
    database: 'api1',
};

//Create a MySQL pool
const pool = mysql.createPool(config);

//Export the pool
module.exports = pool;
