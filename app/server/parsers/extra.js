var stringToCode = require('../utils').stringToCode;

module.exports = function(extra) {

  var string = '';

  // for each piece of text
  extra.forEach(function(data) {

    // get the text out of the element
    var text;
    if (typeof data === 'string') {
      text = data;
    } else if (typeof data === 'object') {
      text = data.text;
    }

    // if text is available
    if (text) {
      text = text.replace(/§k/ig, '');                  // remove crazy format
      text = text.replace(/§l/ig, '');                  // remove bold format
      string += '§' + stringToCode(data.color) + text;  // add the color code to the string
    }

  });

  return string;

};
