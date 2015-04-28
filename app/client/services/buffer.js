/**
 * Buffer Service
 */

module.exports = function() {

  return {
    append: function(string) {
      $('#buffer').append(string + '<br>\n');
    },
    error: function(error) {
      $('#buffer').append('<span style="color:#D62D18;">' + error.errorMessage + '</span><br>')
    }
  }

};
