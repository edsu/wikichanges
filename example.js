/*
 
This example will log into the irc server with the nickname
wikidatachangestest and monitor only the changes for wikidata. 
For each change it will print out the page title that changed
the user that did the change, and a url for the page. For example:

% node example.js
Q192232 [אבגד] http://Wikidata.org/wiki/Q192232
Q888455 [BeneBot*] http://Wikidata.org/wiki/Q888455
Q6117009 [Sk!dbot] http://Wikidata.org/wiki/Q6117009
Q6117010 [KLBot2] http://Wikidata.org/wiki/Q6117010
Q888455 [BeneBot*] http://Wikidata.org/wiki/Q888455
Q6117012 [KLBot2] http://Wikidata.org/wiki/Q6117012
Q991546 [BeneBot*] http://Wikidata.org/wiki/Q991546
Q6117013 [Sk!dbot] http://Wikidata.org/wiki/Q6117013
Q991546 [BeneBot*] http://Wikidata.org/wiki/Q991546
Q6117014 [KLBot2] http://Wikidata.org/wiki/Q6117014
Q1079021 [BeneBot*] http://Wikidata.org/wiki/Q1079021
Q6117015 [Sk!dbot] http://Wikidata.org/wiki/Q6117015

*/

var wikichanges = require("./wikichanges");

w = new wikichanges.WikiChanges({
  ircNickname: 'wikidatachangestest', 
  wikipedias: ["#wikidata.wikipedia"]
});

w.listen(function(change) {
  console.log(change.page + " [" + change.user + "] " + change.pageUrl)
});
