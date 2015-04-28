/**
 * Controllers
 */

exports.register = function(app) {

  app.controller('connectController', require('./connectController'));
  app.controller('bufferController',  require('./bufferController'));
  app.controller('chatController',    require('./chatController'));
  app.controller('navController',     require('./navController'));

};
