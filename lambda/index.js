/*!
 * @author myax <mig_dj@hotmail.com>
 * date 04/03/2019
 * adapatacion de ejemplo aws - lambda
 * source: https://docs.aws.amazon.com/es_es/lambda/latest/dg/with-s3-example.html
 */

// dependencies
var AWS = require("aws-sdk");
var asyncModule = require("async");
var gm = require("gm").subClass({ imageMagick: true }); // Enable ImageMagick integration.
var path = require("path");
let mime = require("mime-types");
// constants
var w = 100;
var h = 100;

let config = {
  mainBucket: {
    secretAccessKey: "******",
    accessKeyId: "******",
    region: "us-east-2",
    name: "file-upload-main-bucket"
  },
  thumbnailBucket: {
    secretAccessKey: "*****",
    accessKeyId: "******",
    region: "us-east-2",
    name: "file-upload-thumbnail-bucket"
  }
};

// get reference to S3 client
AWS.config.update(config.mainBucket);
var s3 = new AWS.S3();

let thumbnail = function(event, context, callback) {
  let srcKey = event.srcKey;
  let imageType = path.extname(srcKey).replace(".", "");

  s3.getObject(
    {
      Bucket: config.mainBucket.name,
      Key: srcKey
    },
    function(err, data) {
      if (err) {
        callback(err);
      } else {
        gm(data.Body, srcKey)
          .resize(w, h, "^")
          .gravity("Center")
          .extent(w, h)
          .quality(80)
          .stream(function(err, stdout, stderr) {
            if (err) {
              callback(err);
            } else {
              var buf = new Buffer("");
              stdout.on("data", function(data) {
                buf = Buffer.concat([buf, data]);
              });
              stdout.on("end", function(data) {
                var data = {
                  Bucket: config.thumbnailBucket.name,
                  Key: srcKey,
                  Body: buf,
                  ContentType: mime.lookup(srcKey)
                };
                s3.putObject(data, callback);
              });
            }
          });
      }
    }
  );
};

module.exports = thumbnail;

const http = require("http");

const server = http
  .createServer(function(request, response) {
    if (request.method == "POST") {
      thumbnail(
        {
          srcKey: "1554553832914.jpg"
        },
        {},
        function(err, data) {
          console.log(arguments);
        }
      );
    }
  })
  .listen(3000);
