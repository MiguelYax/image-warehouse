const query = require('./query');
const uuidv4 = require('uuid/v4');
const config = require('config');
const aws = require('aws-sdk');
const log = require('./log');

aws.config.update(config.mainBucket);
var s3 = new aws.S3();

s3 = new aws.S3();

var readOnlyAnonUserPolicy = {
    Version: '2012-10-17',
    Statement: [
        {
            Resource: `arn:aws:s3:::${config.mainBucket.name}/*`,
            Action: 's3:GetObject',
            Principal: '*',
            Effect: 'Allow',
            Sid: 'AddPerm'
        }
    ]
};

var bucketPolicyParams = {
    Bucket: config.mainBucket.name,
    Policy: JSON.stringify(readOnlyAnonUserPolicy)
};

s3.putBucketPolicy(bucketPolicyParams, function(err, data) {
    log(
        err
            ? 'Error: update police bucket: ' +
                  config.mainBucket.name +
                  '\n' +
                  err
            : log('Success: update police bucket: ' + config.mainBucket.name)
    );
});

let image = {
    upload: function(uuid, name, isPubic, uuidUser, ext, cb) {
        let sql = `INSERT INTO IW_IMAGE (UUID, NAME, PUBLIC, UUIDUSER, EXTENSION) VALUES ('${uuid}', '${name}', '${isPubic}', '${uuidUser}', '${ext}');`;
        query(sql, cb);
    },
    remove: function(uuid, cb) {
        let sql = `DELETE FROM IW_IMAGE WHERE UUID = '${uuid}';`;
        query(sql, function(err, data) {
            var params = { Bucket: config.mainBucket.name, Key: uuid };
            s3.deleteObjects(params, cb);
        });
    },
    get: function(uuid, cb) {
        s3.getObject();
    },
    read: function(uuidUser, cb) {
        let sql = `SELECT * FROM IW_IMAGE WHERE UUIDUSER = '${uuidUser}' ORDER BY CREATED DESC`;
        query(sql, function(err, data = []) {
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                item.URL = `https://s3.${
                    config.mainBucket.region
                }.amazonaws.com/${config.mainBucket.name}/${item.UUID}${
                    item.EXTENSION
                }`;
            }
            cb(err, data);
        });
    },
    update: function(uudImage, cb) {
        // cb();
    },
    uuid: uuidv4
};

module.exports = image;
