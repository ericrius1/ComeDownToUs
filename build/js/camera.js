(function() {
  var Camera;

  FW.Camera = Camera = (function() {
    function Camera() {
      this.camSpeedupFactor = 1.001;
      this.camFar = 2000000;
      this.camStartingY = 8;
      FW.camera = new THREE.PerspectiveCamera(55.0, FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT, 1, this.camFar);
      FW.camera.position.set(0, this.camStartingY, FW.width / 2);
      this.scene1StartZ = FW.width / 2;
      this.scene1EndZ = 0;
    }

    Camera.prototype.resize = function() {
      FW.camera.aspect = FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT;
      return FW.camera.updateProjectionMatrix();
    };

    Camera.prototype.scene1Update = function() {
      var currentTime;
      currentTime = Date.now();
      return FW.camera.position.z = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, this.scene1StartZ, this.scene1EndZ);
    };

    Camera.prototype.scene2Update = function() {
      FW.camera.translateZ(-FW.scene2.camSpeed);
      return FW.scene2.camSpeed += FW.scene2.camAcceleration;
    };

    Camera.prototype.scene3Update = function() {
      var currentTime;
      currentTime = Date.now();
      FW.camera.translateZ(-FW.scene3.camSpeed);
      FW.scene3.camSpeed += FW.scene3.camAcceleration;
      return FW.camera.rotation.x = map(currentTime, FW.scene3.startTime, FW.scene3.endTime, FW.scene3.camRotStartX, FW.scene3.camRotEndX);
    };

    return Camera;

  })();

}).call(this);
