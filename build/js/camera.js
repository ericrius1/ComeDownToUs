(function() {
  var Camera;

  FW.Camera = Camera = (function() {
    function Camera() {
      this.camFar = 2000000;
      this.camSpeedFactor = 0.8;
      this.camStartingY = 8;
      FW.camera = new THREE.PerspectiveCamera(55.0, FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT, 1, this.camFar);
      FW.camera.position.set(0, this.camStartingY, FW.width / 2);
    }

    Camera.prototype.resize = function() {
      FW.camera.aspect = FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT;
      return FW.camera.updateProjectionMatrix();
    };

    Camera.prototype.update = function() {
      this.camSpeed = FW.sunsetSpeed * this.camSpeedFactor;
      FW.camera.position.z -= this.camSpeed;
      this.yRotation = map(FW.sunLight.position.y, FW.sunStartingHeight, -5000, -Math.PI / 8, -Math.PI / 3);
      return FW.camera.rotation.y = this.yRotation;
    };

    return Camera;

  })();

}).call(this);
