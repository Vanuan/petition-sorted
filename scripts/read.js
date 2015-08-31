var fs = require('fs');
module.exports = function read(filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'))
};
