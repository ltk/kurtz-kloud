var Watcher       = require('./lib/watcher.js'),
    util          = require('util'),
    events        = require('events'),
    fs            = require('fs'),
    AWS           = require('aws-sdk'),
    Notification  = require('node-notifier'),
    path          = require('path'),
    child_process = require('child_process');

var config = require('./config.json');

AWS.config.region = config.aws.region;
AWS.config.accessKeyId = config.aws.accessKeyId;
AWS.config.secretAccessKey = config.aws.secretAccessKey;
var s3 = new AWS.S3({params: {Bucket: config.aws.s3.bucket}});

util.inherits(Watcher, events.EventEmitter);

var watcher = new Watcher(config);

watcher.on('process', function(file_info) {
  console.log('Uploading ' + file_info.path);

  fs.readFile(file_info.path, function (err, data) {
    if (err) { throw err; }

    s3.putObject({Key: config.aws.s3.keyPrefix + file_info.name, Body: data}, function(err) {
      var notifier = new Notification();

      if (err) {
        return notifier.notify({
          appIcon: path.resolve(__dirname, './assets/icon-red.png'),
          title: "Upload Failed",
          message: file_info.name
        });
      }

      var file_url = 'https://' + escape('s3.amazonaws.com/' + config.aws.s3.bucket + '/' + config.aws.s3.keyPrefix + file_info.name);

      child_process.exec('echo "' + file_url + '" | pbcopy', function (err) {
        var notification_params = {
          title: "Uploaded",
          contentImage: escape(file_info.path),
          message: file_info.name,
          open: file_url,
          appIcon: path.resolve(__dirname, './assets/icon-yellow.png')

        }

        if (!err) {
          notification_params['title'] = 'Uploaded & Copied'
          notification_params['appIcon'] = path.resolve(__dirname, './assets/icon-green.png')
        }

        notifier.notify(notification_params);
      });
    });
  });
});

watcher.start();
console.log('Started watcher. Watching ' + config.watch);
