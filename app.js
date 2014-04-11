var Directory    = require('./lib/directory');
var Controller   = require('./lib/controller');
var startMessage = require('./assets/start_message');

var App = function(config) {
  this.config     = config;
  this.directory  = new Directory(config)
  this.controller = new Controller(config, this.directory);
};

App.prototype.start = function() {
  this.directory.watch();
  console.log(startMessage);
  console.log('Watching ' + this.config.watch);
};

module.exports = App;
