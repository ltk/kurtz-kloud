var fs = require('fs');
var AWS = require('aws-sdk');

module.exports = function Uploader(aws_config) {
  AWS.config.region = aws_config.region;
  AWS.config.accessKeyId = aws_config.accessKeyId;
  AWS.config.secretAccessKey = aws_config.secretAccessKey;

  this.bucket = aws_config.s3.bucket;
  this.keyPrefix = aws_config.s3.keyPrefix;
  this.s3 = new AWS.S3({params: {Bucket: aws_config.s3.bucket}});

  this.upload = function(file_object, callback) {
    var self = this;

    fs.readFile(file_object.path, function (err, data) {
      if (err) { throw err; }

      var object_params = {
        Key: self.keyPrefix + file_object.name,
        Body: data
      }

      self.s3.putObject(object_params, function (err) {
        if (err) {
          return callback(err);
        }

        file_object['url'] = 'https://' + escape('s3.amazonaws.com/' + self.bucket + '/' + self.keyPrefix + file_object.name);
        callback(null, file_object);
      });
    });
  };
};
