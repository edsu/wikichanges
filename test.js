var wikichanges = require("./wikichanges");

function x(y) {
  console.log(y.namespace + ": " + y.pageUrl);
}

w = new wikichanges.WikiChanges();
w.listen(x);

