var events = require('events');

var Matcher = function(matchCriteria) {
  this.criteria = matchCriteria;
};

Matcher.prototype = new events.EventEmitter();

Matcher.prototype.matchesCriteria = function(file) {
  if (file.name.indexOf(this.criteria.startsWith) != 0) {
    return false;
  }

  if (file.name.indexOf(this.criteria.endsWith) != (file.name.length - this.criteria.endsWith.length)) {
    return false;
  }

  return true;
};

Matcher.prototype.test = function(file) {
  if (this.matchesCriteria(file)) {
    this.emit('newMatch', file);
  }
};

module.exports = Matcher;
