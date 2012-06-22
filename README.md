wikichanges
===========

wikichanges is a node.js library for getting an edit stream from the 37 major language Wikipedias. The Wikipedia MediaWiki installations are configured to log changes in  [specific IRC channels](http://meta.wikimedia.org/wiki/IRC/Channels#Raw_feeds). wikichanges joins all these channels, listens for updates, which it then parses, and sends as JavaScript objects to a callback of your choosing. Each change will look something like:

```javascript
{ 
  channel: '#en.wikipedia',
  wikipedia: 'English Wikipedia',
  page: 'Persuasion (novel)',
  pageUrl: 'http://en.wikipedia.org/wiki/Persuasion_(novel)',
  url: 'http://en.wikipedia.org/w/index.php?diff=498770193&oldid=497895763',
  delta: -13,
  comment: '/* Main characters */',
  wikipediaUrl: 'http://en.wikipedia.org',
  user: '108.49.244.224',
  userUrl: 'http://en.wikipedia.org/wiki/User:108.49.244.224',
  unpatrolled: false,
  newPage: false,
  robot: false,
  anonymous: true,
  namespace: 'Article'
  flag: '',
}
```

Install
-------

    % npm install wikichanges

Usage
-----

Here's a simple example of listening on all Wikipedia channels and printing
out the page that changed along with its URL.

```javascript
var wikichanges = require("wikichanges");

w = new wikichanges.WikiChanges();
w.listen(function(change) {
  console.log(change.page + " " + change.pageUrl)
});
```

To Do
-----

* add more of the Wikimedia properties that log in IRC
* normalize and document the change JSON key names a bit more

License
-------

* CC0
