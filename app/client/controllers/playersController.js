module.exports = function($scope, socket) {

  $scope.players = [];
  $scope.food=0;
  $scope.health=0;

  // request player list every 5000ms
  setInterval(function() {
    socket.emit('players');
  }, 5000);


  // when the player list is received
  socket.on('bot:players', function(data) {
    var players = [];

    for (var player in data) {
      players.push(player);
    }

    $scope.$apply(function() {
      $scope.players = players;
    });

  });

  // clear player list if socket is disconnected
  socket.on('disconnect', function() {
    $scope.$apply(function() {
      $scope.players = [];
      $scope.posx = 'no';
      $scope.posy = 'no';
      $scope.posz = 'no';
      $scope.food=0;
      $scope.health=0;
    });
  });

  // clear player list when bot disconnects
  socket.on('bot:disconnect', function() {
    $scope.$apply(function() {
      $scope.players = [];
      $scope.posx = 'no';
      $scope.posy = 'no';
      $scope.posz = 'no';
      $scope.food=0;
      $scope.health=0;
    });
  });

  socket.on('bot:move', function(data) {
    $scope.$apply(function() {
      $scope.posx=data.x;
      $scope.posy=data.y;
      $scope.posz=data.z;  
    });
  });

  socket.on('bot:forcedMove', function(data) {
    $scope.$apply(function() {
      $scope.posx=data.x;
      $scope.posy=data.y;
      $scope.posz=data.z;  
    });
  });

  socket.on('bot:health',function(data){
    $scope.$apply(function() {
      $scope.health=data.health;
      $scope.food=data.food;
    });
  })
};
