(function() {
  var Camera;

  FW.Camera = Camera = (function() {
    function Camera() {
      this.camFar = 2000000;
      this.camStartingY = 8;
      this.startingRotation = -Math.PI / 8;
      this.endingRotation = -Math.PI / 2.2;
      FW.camera = new THREE.PerspectiveCamera(55.0, FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT, 1, this.camFar);
      FW.camera.position.set(0, this.camStartingY, FW.width / 2);
      FW.camera.rotation.y = -Math.PI / 8;
    }

    Camera.prototype.resize = function() {
      FW.camera.aspect = FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT;
      return FW.camera.updateProjectionMatrix();
    };

    Camera.prototype.scene1Update = function() {
      this.camSpeed = FW.sunsetSpeed;
      FW.camera.position.z -= this.camSpeed;
      return FW.camera.rotation.y = map(FW.sunLight.position.y, FW.sunStartingHeight, FW.endMapNum, this.startingRotation, this.endingRotation);
    };

    Camera.prototype.scene2Update = function() {
      FW.camera.translateZ(-FW.scene2.camSpeed);
      return FW.scene2.camSpeed += FW.scene2.camAcceleration;
    };

    return Camera;

  })();

}).call(this);
