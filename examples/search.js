var client = require('../lib/index');

var url = 'https://www.beatport.com/search?q=Plush+Recordings&_pjax=%23pjax-inner-wrapper';
client.search(url, function(error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
});
