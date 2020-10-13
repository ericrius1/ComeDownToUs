(function() {
  var Main;

  window.FW = {};

  FW.width = 3000;

  FW.height = 12000;

  if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
  }

  FW.globalTick = 0.16;

  window.onload = function() {
    var _this = this;
    FW.song = document.getElementById('song');
    FW.song.play();
    FW.myDirector = new FW.Director();
    FW.main = new FW.Main();
    FW.myWorld = new FW.World();
    return FW.song.addEventListener('canplaythrough', function() {
      var songStartTime;
      console.log('PLAY');
      songStartTime = Date.now();
      return FW.myDirector.beginShow(songStartTime);
    });
  };

  FW.Main = Main = (function() {
    function Main() {}

    Main.prototype.onKeyDown = function(event) {
      if (event.keyCode === 32) {
        return FW.myDirector.freeze();
      }
    };

    return Main;

  })();

}).call(this);
