/*!
 * @author Miguel Yax <mig_dj@hotmail.com>
 * date 03/09/2019
 * image loader
 */

const config = require('config');
const image = require('./image');
const multer = require('multer');
const path = require('path');

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: config.storage,
    filename: function(req, file, cb) {
        file.uuid = image.uuid();
        image.upload(
            file.uuid,
            file.originalname,
            0,
            req.session.uuid,
            path.extname(file.originalname),
            function(err, data) {
                // console.log('insert');
                cb(null, file.uuid + path.extname(file.originalname));
            }
        );
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb, req.session.uuid);
    }
}).single('myImage');

// Check File Type
function checkFileType(file, cb, uuidUser) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

module.exports = upload;
