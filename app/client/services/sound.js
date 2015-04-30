module.exports = function() {

  var connected = "connected";
  var error     = "error";

  createjs.Sound.registerSound("/sounds/connected.mp3", connected);

  return {
    connected: function() {
      createjs.Sound.play(connected);
    }
  };

};
