module.exports = function stringToCode(string) {

  var dictionary = {
    'black': 0,
    'dark_blue': 1,
    'dark_green': 2,
    'dark_aqua': 3,
    'dark_red': 4,
    'dark_purple': 5,
    'gold': 6,
    'gray': 7,
    'dark_gray': 8,
    'indigo': 9,
    'green': 'a',
    'aqua': 'b',
    'red': 'c',
    'light_purple': 'd',
    'yellow': 'e',
    'white': 'f'
  };

  return dictionary[string] || 'f';

};
