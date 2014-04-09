var fs     = require('fs');
var events = require('events');
var util   = require('util');

var Watcher         = require('./lib/watcher.js');
var Uploader        = require('./lib/uploader.js');
var ClipboardCopier = require('./lib/clipboard_copier.js');
var Notifier        = require('./lib/notifier.js');

var config = require('./config.json');

util.inherits(Watcher, events.EventEmitter);

var uploader        = new Uploader(config.aws);
var clipboardCopier = new ClipboardCopier();
var notifier        = new Notifier();
var watcher         = new Watcher(config);

watcher.on('upload', function (file_object) {
  uploader.upload(file_object, function (err, file_object) {
    if (err) return notifier.notify_upload_failure(file_object);

    clipboardCopier.copy(file_object.url, function (err) {
      if (err) return notifier.notify_upload_success(file_object);

      notifier.notify_upload_and_copy_success(file_object);
    });
  });
});

watcher.start();
console.log('Started watcher. Watching ' + config.watch);
