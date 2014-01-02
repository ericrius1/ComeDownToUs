(function() {
  var Main;

  if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
  }

  window.FW = {};

  if (typeof SC !== "undefined" && SC !== null) {
    SC.initialize({
      client_id: "7da24ca214bf72b66ed2494117d05480"
    });
  }

  FW.sfxVolume = 0.2;

  FW.globalTick = 0.16;

  FW.development = false;

  window.soundOn = !FW.development;

  window.onload = function() {
    FW.main = new FW.Main();
    FW.myWorld = new FW.World();
    FW.myWorld.animate();
    return document.addEventListener('keydown', FW.main.onKeyDown, false);
  };

  FW.Main = Main = (function() {
    function Main() {
      if (soundOn) {
        SC.stream("/tracks/come-down-to-us", function(sound) {
          var _this = this;
          if (soundOn) {
            setTimeout(function() {
              return sound.setPosition(154600);
            }, 2000);
            return sound.play();
          }
        });
      }
    }

    Main.prototype.onKeyDown = function(event) {
      if (event.keyCode === 32) {
        return FW.myDirector.freeze();
      }
    };

    return Main;

  })();

}).call(this);
