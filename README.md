wikichanges
===========

A nodejs library for getting an edit stream from Wikipedia. 

Install
-------

    npm install wikichanges

Usage
-----

```javascript
var wikichanges = require("wikichanges");

w = new wikichanges.WikiChanges();
w.listen(function(update) {
  console.log(y.page)
});
```

License
-------

* CC0
