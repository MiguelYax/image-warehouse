const mysql = require('mysql');
const config = require('config');
const log = require('./log');

let pool = mysql.createPool(config.mysql);

let query = function(sql, cb) {
    // try {
    pool.query(sql, (error, result) => {
        if (error) {
            log(error);
            cb(error, null);
        }
        cb(error, result);
    });
};

module.exports = query;
