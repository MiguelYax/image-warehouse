const query = require('./query');
const uuidv4 = require('uuid/v4');

let user = {
    singup: function(firstName, lastName, email, password, cb) {
        /**
         * @todo password se debe cifrar la contraseña :)
         */
        let sql = `INSERT INTO IW_USER (UUID, FIRSTNAME, LASTNAME, EMAIL, \`PASSWORD\`) VALUES ('${uuidv4().replace(
            /-/g,
            '\\-'
        )}', '${firstName}', '${lastName}', '${email}', '${password}');`;
        query(sql, cb);
    },
    singin: function(email, password, cb) {
        let sql = `SELECT * FROM IW_USER WHERE EMAIL = '${email}' AND PASSWORD = '${password}' `;
        query(sql, cb);
    },
    signout: function(email, cb) {
        cb();
    }
};

module.exports = user;
