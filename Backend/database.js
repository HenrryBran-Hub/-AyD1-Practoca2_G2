const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const mysqlConnection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
});

mysqlConnection.connect( function (err){
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Db is connected');
    }
});

module.exports = mysqlConnection;