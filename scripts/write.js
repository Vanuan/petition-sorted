var fs = require('fs');
module.exports = function write(json, destination) {
  console.log("Writing " + destination)
  fs.writeFileSync(destination, JSON.stringify(json), 'utf8')
  return json;
};
