var fs        = require('fs');
var events    = require('events');
var Matcher   = require('./matcher');
var Uploader  = require('./uploader');
var Notifier  = require('./notifier');
var Clipboard = require('./clipboard');

var Controller = function(config, directory) {
  this.config    = config;
  this.matcher   = new Matcher(this.config.matchCriteria);
  this.uploader  = new Uploader(this.config.aws);
  this.notifier  = new Notifier();
  this.clipboard = new Clipboard();

  directory.on('newFile', this.newFile.bind(this));
  this.matcher.on('newMatch', this.newMatch.bind(this));
  this.uploader.on('fileUploadSuccess', this.fileUploaded.bind(this));
  this.uploader.on('fileUploadFailure', this.fileUploadFailed.bind(this));
  this.clipboard.on('copySuccess', this.clipboardCopySuccess.bind(this));
  this.clipboard.on('copyFailure', this.clipboardCopyFailure.bind(this));
};

Controller.prototype = new events.EventEmitter();

Controller.prototype.newFile = function(file) {
  this.matcher.test(file);
};

Controller.prototype.newMatch = function(file) {
  this.uploader.upload(file);
};

Controller.prototype.fileUploaded = function(file) {
  console.log('\x1b[32m%s\x1b[0m', 'Uploaded:', file.url);  //cyan
  this.clipboard.copy(file);
};

Controller.prototype.fileUploadFailed = function(file) {
  this.notifier.notify_upload_failure(file);
};

Controller.prototype.clipboardCopySuccess = function(file) {
  this.notifier.notify_upload_and_copy_success(file);
};

Controller.prototype.clipboardCopyFailure = function(file) {
  this.notifier.notify_upload_success(file);
};

module.exports = Controller;
