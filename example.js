var wikichanges = require("./wikichanges");

w = new wikichanges.WikiChanges({
  ircNickname: 'wikidatachangestest', 
  wikipedias: "#wikidata.wikipedia"
});

w.listen(function(change) {
  console.log(change.page + " [" + change.user + "] " + change.pageUrl)
});
