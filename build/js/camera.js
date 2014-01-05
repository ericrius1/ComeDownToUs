(function() {
  var Camera;

  FW.Camera = Camera = (function() {
    function Camera() {
      this.camSpeedupFactor = 1.001;
      this.camFar = 2000000;
      this.camStartingY = 8;
      FW.camera = new THREE.PerspectiveCamera(45.0, FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT, 1, this.camFar);
      FW.camera.position.set(0, this.camStartingY, FW.height);
    }

    Camera.prototype.resize = function() {
      FW.camera.aspect = FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT;
      return FW.camera.updateProjectionMatrix();
    };

    Camera.prototype.scene1Update = function() {
      var currentTime;
      currentTime = Date.now();
      return FW.camera.position.z = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, FW.scene1.startZ, FW.scene1.endZ);
    };

    Camera.prototype.scene2Update = function() {
      var currentTime;
      currentTime = Date.now();
      return FW.camera.position.z = map(currentTime, FW.scene2.startTime, FW.scene2.endTime, FW.scene2.startZ, FW.scene2.endZ);
    };

    Camera.prototype.scene3Update = function() {
      var currentTime;
      return currentTime = Date.now();
    };

    return Camera;

  })();

}).call(this);
