var scrape = require('./scrape');
var tag = require('./tag');
var retag = require('./retag');
var write = require('./write');
var read = require('./read');

var url = 'https://petition.president.gov.ua/?status=active';
var petitionsDestination = 'data/petitions.json';

scrape(url).then(function(petitions) {
  write(petitions, petitionsDestination);
  return petitions;
}).then(function(petitions) {
  return tag(petitions, read('data/tags.json'));
}).then(function (taggedPetitions) {
  write(taggedPetitions, 'data/taggedPetitions.json');
  return taggedPetitions;
}).then(function(taggedPetitions) {
  return retag(taggedPetitions, read('data/tags.json'));
}).then(function(tags) {
  write(tags, 'data/tags.json');
}).catch(function (err) {
  console.error(err);
});
