module.exports = function($scope, socket) {

  $scope.players = [];

  socket.on('bot:players', function(data) {
    var players = [];

    for (var player in data) {
      players.push(player);
    }

    $scope.$apply(function() {
      $scope.players = players;
    });

  });

  socket.on('disconnect', function() {
    $scope.$apply(function() {
      $scope.players = [];
    });
  });

  socket.on('bot:disconnect', function() {
    $scope.$apply(function() {
      $scope.players = [];
    });
  });

};