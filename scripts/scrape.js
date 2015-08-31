var cheerio = require('cheerio');
var request = require('request-then');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function parse(response) {
  console.log("Parsing...")
  var $ = cheerio.load(response.body);
  var json = [];
  var ROW_SELECTOR = "section:not('.fltr') > div.reducer > .list > .list_row";
  var TITLE_SELECTOR = ".list_elem_title a";
  var VOTES_SELECTOR = ".list_elem_vote > span";
  var DAYS_LEFT_SELECTOR = ".list_elem_timer > span";
  $(ROW_SELECTOR).each(function() {
    var title = $(this).find(TITLE_SELECTOR).text();
    var votes = parseInt($(this).find(VOTES_SELECTOR).text());
    var daysLeft = parseInt($(this).find(DAYS_LEFT_SELECTOR).text());
    json.push({title: title, votes: votes, daysLeft: daysLeft});
  });
  return json;
}

function parseError(err) {
  console.log(err);
}

function write(json, destination) {
  console.log("Writing to " + destination + "...");
  fs.writeFileSync(destination, JSON.stringify(json), 'utf8')
  console.log("Written to " + destination);
  return json;
}

function writeError(err) {
  console.log(err);
}

module.exports = function scrape(url) {
  console.log("Fetching...")
  return request(url).then(parse, parseError);
};
