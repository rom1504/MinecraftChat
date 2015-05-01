/**
 * Socket Service
 */

module.exports = function() {

  var socket = io(window.location.host);
  return socket;

};
