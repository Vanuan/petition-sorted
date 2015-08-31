var readlineSync = require('readline-sync');

String.prototype.includes = function(it) {
  return this.indexOf(it) != -1;
};

module.exports = function tag(petitions, tags) {
  console.log("Tagging...");
  petitions.forEach(function (petition) {
    petition.tags = [];
    Object.keys(tags).forEach(function (tagName) {
      var matched = tags[tagName].matchStrings.some(function(matchString) {
        return petition.title.toLowerCase().includes(matchString.toLowerCase());
      });
      if(matched) {
        petition.tags.push(tagName);
      };
    });
  });
  return petitions;
};
