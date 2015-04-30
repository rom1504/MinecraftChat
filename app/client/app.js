var angular = angular;

// initialize angular application
var app = angular.module('chat', []);


// register factories
require('./services').register(app);

// register controllers
require('./controllers').register(app);
