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

aws.config.update(config.mainBucket);

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
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            file.uuid = Date.now().toString();
            image.upload(
                file.uuid,
                file.originalname,
                0,
                req.session.uuid,
                path.extname(file.originalname),
                function(err, data) {
                    cb(null, file.uuid + path.extname(file.originalname));
                }
            );
        }
    })
});

module.exports = upload;
