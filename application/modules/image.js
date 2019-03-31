const query = require('./query');
const uuidv4 = require('uuid/v4');

let image = {
    upload: function(name, isPubic, uuidUser, cb) {
        let sql = `INSERT INTO IW_IMAGE (UUID, NAME, PUBLIC, UUIDUSER) VALUES ('${uuidv4().replace(
            /-/g,
            '\\-'
        )}', '${name}', '${isPubic}', '${uuidUser}');`;
        query(sql, cb);
    },
    read: function(uuidUser, cb) {
        let sql = `SELECT * FROM IW_IMAGE WHERE UUIDUSER = '${uuidUser}' ORDER BY CREATED' `;
        query(sql, cb);
    },
    update: function(uudImage, cb) {
        // cb();
    }
};

module.exports = image;
