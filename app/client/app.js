// initialize angular application
var app = angular.module('chat', []);


// register factories
require('./factories').register(app);

// register controllers
require('./controllers').register(app);
