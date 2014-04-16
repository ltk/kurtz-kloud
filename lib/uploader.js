var fs = require('fs');
var events = require('events');
var AWS = require('aws-sdk');
var S3Object = require('./s3_object');
var mime = require('mime');

var Uploader = function(aws_config) {
  AWS.config.region = aws_config.region;
  AWS.config.accessKeyId = aws_config.accessKeyId;
  AWS.config.secretAccessKey = aws_config.secretAccessKey;

  this.s3 = new AWS.S3({params: {Bucket: aws_config.s3.bucket}});
  this.keyPrefix = aws_config.s3.keyPrefix;
};

Uploader.prototype = new events.EventEmitter();

Uploader.prototype.upload = function(file) {
  var self = this;

  fs.readFile(file.path, function(err, data) {
    self._upload(err, data, file);
  });
};

Uploader.prototype.onSuccess = function(file) {
  this.emit('fileUploadSuccess', file);
};

Uploader.prototype.onFailure = function(file) {
  this.emit('fileUploadFailure', file);
};

Uploader.prototype._upload = function(err, data, file) {
  if (err) return this.onFailure(file);

  var self = this;
  var s3Objectkey = this.keyPrefix + file.formattedName;
  var contentType = mime.lookup(file.path);
  var s3Object = new S3Object(this.s3, s3Objectkey, data, contentType);

  s3Object.upload(function(err) {
    if (err) return self.onFailure(file);

    file.url = s3Object.url;
    self.onSuccess(file);
  });
};

module.exports = Uploader;
