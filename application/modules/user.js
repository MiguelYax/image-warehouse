const query = require('./query');
const uuidv4 = require('uuid/v4');
const sha1 = require('sha1');

let user = {
    singup: function(firstName, lastName, email, password, cb) {
        /**
         * @todo password se debe cifrar la contraseña :)
         */
        let hash = sha1(password);
        let sql = `INSERT INTO IW_USER (UUID, FIRSTNAME, LASTNAME, EMAIL, \`PASSWORD\`) VALUES ('${uuidv4().replace(
            /-/g,
            '\\-'
        )}', '${firstName}', '${lastName}', '${email}', '${hash}');`;
        query(sql, cb);
    },
    singin: function(email, password, cb) {
        let hash = sha1(password);
        let sql = `SELECT * FROM IW_USER WHERE EMAIL = '${email}' AND PASSWORD = '${hash}' `;
        query(sql, cb);
    },
    signout: function(email, cb) {
        cb();
    }
};

module.exports = user;
