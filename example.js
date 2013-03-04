/**
 * this example will log into the irc servers with the nickname
 * wikidatachangestest and will print out the page title that changed
 * the user that did the change, and a url for the page.
 */

var wikichanges = require("./wikichanges");

w = new wikichanges.WikiChanges({
  ircNickname: 'wikidatachangestest', 
  wikipedias: "#wikidata.wikipedia"
});

w.listen(function(change) {
  console.log(change.page + " [" + change.user + "] " + change.pageUrl)
});
