var readlineSync = require('readline-sync');

module.exports = function retag(taggedPetitions, tags) {
  console.log("Retagging...");
  taggedPetitions.forEach(function (petition) {
    if (petition.tags.length == 0) {
      process.stdout.write("Ця петиція без тегів: ");
      console.log(petition.title);
      var tagName = readlineSync.question('Введить назву тегу: ');
      var matchString = readlineSync.question('Введить підстроку в назві: ');
      if(tags.hasOwnProperty(tagName)) {
        tags[tagName].matchStrings.push(matchString);
      } else {
        tags[tagName] = { matchStrings: [matchString] };
      };
    }
  });
  return tags;
};
