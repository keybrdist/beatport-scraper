var req         = require("tinyreq"),
    urlHelper   = require('url'),
    htmlParser  = require('./htmlParser.js');


exports.getLabelProfile = function (url, cb) {
  req(url, function (error, html) {
    if (error) {
      cb(error, null);
    } else {
      var info = htmlParser.parseLabelProfile(html, url);
      cb(null, info);
    }
  });
};

exports.search = function (url, cb) {
  req(url, function (error, html) {
    if (error) {
      cb(error, null);
    } else {
      var info = htmlParser.parseSearch(html, url);
      cb(null, info);
    }
  });
};

