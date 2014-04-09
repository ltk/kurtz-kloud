var fs      = require('fs');
var Matcher = require('./matcher.js');

module.exports = function Watcher(options) {
  this.watchDir = options.watch;
  this.matcher = new Matcher(options.matchCriteria);

  this.start = function (watchDir) {
    var watcher = this;

    fs.watch(this.watchDir, function (event, filename) {
      if (watcher.matcher.matches(event, filename)) {
        var file_object = {
          name: filename,
          path: watcher.watchDir + '/' + filename
        };

        watcher.emit('upload', file_object);
      }
    });
  };
};
