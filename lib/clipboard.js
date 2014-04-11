var child_process = require('child_process');
var events        = require('events');

var Clipboard = function() {};

Clipboard.prototype = new events.EventEmitter();

Clipboard.prototype.copy = function(file) {
  var self = this;

  child_process.exec('echo "' + file.url + '" | pbcopy', function(err) {
    if (err) return self.emit('copyFailure', file);

    self.emit('copySuccess', file);
  });
};

module.exports = Clipboard;
