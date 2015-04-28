/**
 * Services
 */

exports.register = function(app) {

  // socket factory
  app.factory('socket', require('./socket'));

  // buffer factory
  app.factory('buffer', require('./buffer'));

};
