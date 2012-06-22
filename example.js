var wikichanges = require("./wikichanges");

w = new wikichanges.WikiChanges();
w.listen(function(change) {
  console.log(change.page + " " + change.pageUrl)
});
