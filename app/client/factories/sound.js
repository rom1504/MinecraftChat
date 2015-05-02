module.exports = function() {

  var connected = 'connected';

  createjs.Sound.registerSound('/sounds/connected.mp3', connected);

  return {
    connected: function() {
      createjs.Sound.play(connected);
    }
  };

};
