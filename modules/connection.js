const mysql = require('mysql');
const config = require('config');

let pool = mysql.createPool(config.mysql);

let query = function(sql, cb) {
    // try {
    pool.query(sql, (error, result) => {
        if (error) {
            cb(error, null);
        }
        cb(error, result);
    });
};

module.exports = query;
