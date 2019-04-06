/*!
 * @author Miguel Yax <mig_dj@hotmail.com>
 * date 03/09/2019
 * image loader
 */

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const image = require('./image');
const path = require('path');
const config = require('config');

aws.config.update({
    secretAccessKey: config.mainBucket.secretAccessKey,
    accessKeyId: config.mainBucket.accessKeyId,
    region: config.mainBucket.region
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
    }
};

const upload = multer({
    fileFilter,
    storage: multerS3({
        s3,
        bucket: config.mainBucket.name,
        key: function(req, file, cb) {
            file.uuid = image.uuid();
            image.upload(
                file.uuid,
                file.originalname,
                0,
                req.session.uuid,
                path.extname(file.originalname),
                function(err, data) {
                    cb(null, file.uuid + path.extname(file.originalname));
                    // cb(null, file.uuid);
                }
            );
        }
    })
});

module.exports = upload;
// const config = require('config');
// const image = require('./image');
// const multer = require('multer');
// const path = require('path');

// // Set The Storage Engine
// const storage = multer.diskStorage({
//     destination: config.storage,
//     filename: function(req, file, cb) {
//         file.uuid = image.uuid();
//         image.upload(
//             file.uuid,
//             file.originalname,
//             0,
//             req.session.uuid,
//             path.extname(file.originalname),
//             function(err, data) {
//                 // console.log('insert');
//                 cb(null, file.uuid + path.extname(file.originalname));
//             }
//         );
//     }
// });

// // Init Upload
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 },
//     fileFilter: function(req, file, cb) {
//         checkFileType(file, cb, req.session.uuid);
//     }
// }).single('myImage');

// // Check File Type
// function checkFileType(file, cb, uuidUser) {
//     // Allowed ext
//     const filetypes = /jpeg|jpg|png|gif/;
//     // Check ext
//     const extname = filetypes.test(
//         path.extname(file.originalname).toLowerCase()
//     );
//     // Check mime
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb('Error: Images Only!');
//     }
// }

// module.exports = upload;
