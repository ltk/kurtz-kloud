var S3Object = function(s3, key, body, contentType) {
  this.body = body;
  this.contentType = contentType;
  this.key  = key;
  this.s3   = s3;

  var scheme = 'https://';
  var domain = 's3.amazonaws.com';
  var bucket = s3.config.params.Bucket;
  this.url  = scheme + bucket + '.' + domain + '/' + key;
};

S3Object.prototype.upload = function(callback) {
  var params = {
    Key: this.key,
    Body: this.body,
    ContentType: this.contentType
  }

  this.s3.putObject(params, callback);
};

module.exports = S3Object;
