var child_process = require('child_process');

module.exports = function ClipboardCopier() {
  this.copy = function(content, callback) {
    child_process.exec('echo "' + content + '" | pbcopy', function (err) {
      if (err) return callback(err);

      callback(null);
    });
  };
};
