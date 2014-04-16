var S3Object = function(s3, key, body, contentType) {
  this.body = body;
  this.contentType = contentType;
  this.key  = key;
  this.s3   = s3;
  this.url  = 'https://s3.amazonaws.com/' + this.s3.config.params.Bucket + '/' + this.key;
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
