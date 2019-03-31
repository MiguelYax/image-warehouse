const query = require('./query');
const uuidv4 = require('uuid/v4');

let image = {
    upload: function(uuid, name, isPubic, uuidUser, ext, cb) {
        let sql = `INSERT INTO IW_IMAGE (UUID, NAME, PUBLIC, UUIDUSER, EXTENSION) VALUES ('${uuid.replace(
            /-/g,
            '\\-'
        )}', '${name}', '${isPubic}', '${uuidUser}', '${ext}');`;
        query(sql, cb);
    },
    read: function(uuidUser, cb) {
        let sql = `SELECT * FROM IW_IMAGE WHERE UUIDUSER = '${uuidUser}' ORDER BY CREATED DESC`;
        query(sql, cb);
    },
    update: function(uudImage, cb) {
        // cb();
    }, 
    uuid: uuidv4
};

module.exports = image;
