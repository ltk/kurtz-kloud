var S3Object = function(s3, key, body) {
  this.body = body;
  this.key  = key;
  this.s3   = s3;
  this.url  = 'https://s3.amazonaws.com/' + this.s3.config.params.Bucket + '/' + this.key;
};

S3Object.prototype.upload = function(callback) {
  var params = {
    Key: this.key,
    Body: this.body
  }

  this.s3.putObject(params, callback);
};

module.exports = S3Object;
