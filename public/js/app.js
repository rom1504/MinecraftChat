// initialize angular application
var app = angular.module('chat', []);

// socket service
app.factory('socket', function() {
  var socket = io(window.location.host);
  return socket;
});

// connect controller
app.controller('connectController', function($scope, socket) {

  // connect handler
  $scope.connect = function() {
    $('#connectModal').modal('hide')

    if (socket.connected) {

      socket.emit('server:connect', {
        username: $scope.username,
        password: $scope.password,
        hostname: $scope.ip,
        port: $scope.port || 25565
      }, function(response) {

      });

    } else {
      alert('Server unreachable, please try again later...');
    }
  }

});

// buffer controller
app.controller('bufferController', function($scope, socket) {

  // initial console buffer
  $('#buffer').append('<br>');
  $('#buffer').append('Welcome to AlexKvazos\'s Minecraft Chat App');
  $('#buffer').append('<br>');
  $('#buffer').append('&gt; Press connect to connect to a Minecraft server and start chatting!');
  $('#buffer').append('<br><br>');
  $('#buffer').append('<i>Note: This application only works with 1.8 Minecraft servers.</i>');
  $('#buffer').append('<br>-<br><br>');

  socket.on('bot:error', function(error) {
    console.log(error);
    $('#buffer').append('<span style="color:#D62D18;">' + error.errorMessage + '</span><br>');
  });

});