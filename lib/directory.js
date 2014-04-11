var events = require('events');
var fs     = require('fs');
var File   = require('./file');

var Directory = function(config) {
  this.watchDir = config.watch;
};

Directory.prototype = new events.EventEmitter();

Directory.prototype.watch = function() {
  fs.watch(this.watchDir, this.newFileEvent.bind(this));
};

Directory.prototype.newFileEvent = function(event, filename) {
  if (event == 'rename') {
    var file = new File(filename, this.watchDir);

    this.emit('newFile', file);
  }
};


module.exports = Directory;
