wikichanges
===========

A node.js library for getting an edit stream from 37 major language Wikipedias.  The Wikipedia MediaWiki installations are configured to log changes in  [specific channels](http://meta.wikimedia.org/wiki/IRC/Channels#Raw_feeds) at irc.wikimedia.org. wikichanges connects to all 37 major language channels and looks for updates, which it parses and then presents to a callback you provide as a bit of JSON that looks like:

```javascript
{ 
  channel: '#en.wikipedia',
  page: 'Persuasion (novel)',
  pageUrl: 'http://en.wikipedia.org/wiki/Persuasion_(novel)',
  url: 'http://en.wikipedia.org/w/index.php?diff=498770193&oldid=497895763',
  delta: -13,
  comment: '/* Main characters */',
  wikipedia: '#en.wikipedia',
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

* add more of the WikiMedia properties that log in IRC
* normalize and document the change JSON key names a bit more

License
-------

* CC0
