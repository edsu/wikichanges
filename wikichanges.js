var os = require("os"),
    irc = require('irc-js')

function WikiChanges(wikipedias, ircNickname) {
  this.channels = wikipedias || ["#en.wikipedia"];
  this.ircNickname = ircNickname || "wikichanges-" + os.hostname();
}

WikiChanges.prototype = {

  listen: function(callback) {
    this.callback = callback;
    this.client = new irc({
      server: 'irc.wikimedia.org',
      nick: this.ircNickname,
      log: false
    });

    var channels = this.channels;
    var client = this.client;

    client.connect(function () {
      client.join(channels);
      client.on('privmsg', function(msg) { 
        m = parse_msg(msg.params);
        if (m) callback(m);
      });
    });
  }
}

function parse_msg(msg) {
  // i guess this means i have two problems now? :-D
  var m = /\x0314\[\[\x0307(.+?)\x0314\]\]\x034 (.*?)\x0310.*\x0302(.*?)\x03.+\x0303(.+?)\x03.+\x03 (.*) \x0310(.*)\x03?.*/.exec(msg[1]);
  if (! m) { 
      console.log("failed to parse: " + msg);
      return null;
  } 

  // convert change in characters to a (possibly negative) integer
  if (m[5]) {
    var delta = parseInt(/([+-]\d+)/.exec(m[5])[1]);
  } else {
    var delta = null;
  }

  // see if it looks like an anonymous edit
  var user = m[4];
  var anonymous = user.match(/\d+.\d+.\d+.\d+/) ? true : false;

  // unpack the flags
  var flag = m[2];
  var isRobot = flag.match(/B/) ? true : false;
  var isNewPage = flag.match(/N/) ? true : false;
  var isUnpatrolled = flag.match(/!/) ? true : false;

  var page = m[1];
  var wikipedia = msg[0];
  var wikipediaUrl = 'http://' + wikipedia.replace('#', '') + '.org';
  var pageUrl = wikipediaUrl + '/wiki/' + page.replace(/ /g, '_');
  var userUrl = wikipediaUrl + '/wiki/User:' + user;
  var namespace = getNamespace(wikipedia, page);

  return {
    channel: msg[0],
    flag: flag, 
    page: page, 
    pageUrl: pageUrl,
    url: m[3], 
    delta: delta,
    comment: m[6],
    wikipedia: wikipedia,
    wikipediaUrl: wikipediaUrl,
    user: user, 
    userUrl: userUrl,
    unpatrolled: isUnpatrolled,
    newPage: isNewPage,
    robot: isRobot,
    anonymous: anonymous,
    namespace: namespace
  }
}

function getNamespace(wikipedia, page) {
  ns = null;
  var parts = page.split(':');
  if (parts.length > 1 && parts[1][0] != " ") {
    ns = parts[0];
  } else {
    ns = 'Article';
  }
  return ns;
}

exports.WikiChanges = WikiChanges;
