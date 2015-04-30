/**
 * Services
 */

exports.register = function(app) {

  // socket factory
  app.factory('socket',  require('./socket'));

  // buffer factory
  app.factory('buffer',  require('./buffer'));

  // sound factory
  app.factory('sound',   require('./sound'));

  // servers factory
  app.factory('servers', require('./servers'));

};
