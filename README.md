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

If you aren't on Ubuntu, try to do the equivalent to get your node.js
environment set up, and run a test program:

    % sudo apt-get install nodejs
    % npm install wikichanges

Usage
-----

Here's a simple example of listening on all Wikipedia channels and printing
out the page that changed along with its URL.

```javascript
var wikichanges = require("wikichanges");

var w = new wikichanges.WikiChanges();
w.listen(function(change) {
  console.log(change.page + " " + change.pageUrl)
});
```

If you would like to listen only on a particular channel or channels 
create the wikichanges object like this:

```javascript
var w = new wikichanges.WikiChanges({wikipedias: ["#fr.wikipedia", "#de.wikipedia"]);
```

By default wikichanges picks a IRC nick of `wikichanges-{hostname}` where 
hostname is the hostname for the computer that your program is running.
If you would like to control the IRC nick used by your program use the 
`ircNickname` option:

```javascript
var w = new wikichanges.WikiChanges({ircNickname: 'super-awesome'})
```

License
-------

* CC0
