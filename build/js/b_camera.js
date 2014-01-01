(function() {
  var Camera;

  FW.Camera = Camera = (function() {
    function Camera() {
      this.camFar = 2000000;
      this.camSpeed = .1;
      this.camStartingY = 11;
      FW.camera = new THREE.PerspectiveCamera(45.0, FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT, 1, this.camFar);
      FW.camera.position.set(0, this.camStartingY, 0);
    }

    Camera.prototype.resize = function() {
      FW.camera.aspect = FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT;
      return FW.camera.updateProjectionMatrix();
    };

    Camera.prototype.update = function() {
      FW.camera.position.z -= this.camSpeed;
      return FW.camera.rotation.y -= .0001;
    };

    return Camera;

  })();

}).call(this);
