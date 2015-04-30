/**
 * Socket Service
 */

module.exports = function() {

  var io = io;

  var socket = io(window.location.host);
  return socket;

};
