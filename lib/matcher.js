module.exports = function Matcher(criteria) {
  this.criteria = criteria;

  this.matches = function(event, filename) {
    if (event != 'rename') {
      return false;
    }

    if (filename.indexOf(this.criteria.startsWith) != 0) {
      return false;
    }

    if (filename.indexOf(this.criteria.endsWith) != (filename.length - this.criteria.endsWith.length)) {
      return false;
    }

    return true;
  };
};
