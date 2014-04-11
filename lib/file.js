var File = function(name, directory) {
  this.name      = name;
  this.directory = directory;
  this.path      = [directory, name].join('/');
}

module.exports = File;
