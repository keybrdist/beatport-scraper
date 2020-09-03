var client = require('../lib/index');

var url = 'https://www.beatport.com/label/plush-recordings/17057';
client.getLabelProfile(url, function(error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
});
