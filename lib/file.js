var File = function(name, directory) {
  this.name          = name;
  this.directory     = directory;
  this.path          = [directory, name].join('/');
  this.formattedName = name.split(' ').join('_');
}

module.exports = File;
