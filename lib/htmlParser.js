var cheerio = require('cheerio');
var scrapeIt = require("scrape-it");
var urlHelper = require('url');
var linez = require('linez');
var JSON5 = require('json5');

linez.configure({
  newlines: ['\n', '\r\n', '\r']
});


var assignProps = function (objFrom, objTo, propNames) {
  propNames.forEach(function (propName) {
    objTo[propName] = objFrom[propName];
  });
  return objTo;
};


// parse search
exports.parseSearch = function (html, searchUrl) {
  var $ = cheerio.load(html);
  var data = scrapeIt.scrapeHTML($, {
    list: {
      listItem: '.bucket-item.ec-item.label',
      data: {
        name:  { attr: 'data-ec-name' },
        id: { attr: 'data-ec-id' },
        genres: { attr: 'data-ec-d3' },
        imageUrl: { selector: "img", attr: 'src' },
        url: { 
          selector: "a", 
          attr: 'href',
          convert: function (relhref) {
            if (relhref) {
              return 'https://beatport.com' + relhref;
            }
          } 
        },
      }
    },
  });
  return data.list;
};




// parse profile info
exports.parseLabelProfile = function (html, url) {
  var $ = cheerio.load(html);
  var data = scrapeIt.scrapeHTML($, {
    head: {
      selector: 'head',
      data: {
        name: {
          selector: "meta[name='og:title']", 
          attr: 'content',
          convert: function (data) {
            if (data) {
              return data.replace(' Releases &amp; Artists on Beatport', '');
            }
          } 
        },
        url: { selector: "meta[name='og:url']", attr: 'content' },
        imageUrl: { selector: "meta[name='og:image']", attr: 'content' }
      }
    },
  });
  var object = assignProps(data.head, {}, ['name', 'url', 'imageUrl']);
  return object;
};
