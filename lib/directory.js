var events   = require('events');
var chokidar = require('chokidar');
var path     = require('path');
var File     = require('./file');

var Directory = function(config) {
  this.watchDir = config.watch;
};

Directory.prototype = new events.EventEmitter();

Directory.prototype.watch = function() {
  var log = console.log.bind(console);
  this.watcher = chokidar.watch(this.watchDir, { ignoreInitial: true, atomic: true });
  this.watcher.on('add', this.newFileEvent.bind(this));
};

Directory.prototype.newFileEvent = function(filename) {
  var file = new File(path.basename(filename), this.watchDir);
  this.emit('newFile', file);
};


module.exports = Directory;
