(function() {
  var Camera;

  FW.Camera = Camera = (function() {
    function Camera() {
      this.camSpeedupFactor = 1.001;
      this.camFar = 2000000;
      this.startCamHeight = 8;
      FW.camera = new THREE.PerspectiveCamera(45.0, FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT, 1, this.camFar);
      FW.camera.position.set(0, this.startCamHeight, FW.height);
      this.scene3Velocity = -1;
      this.scene3Acceleration = -.0001;
      this.scene4Velocity = -2.2;
      this.scene4Acceleration = -.005;
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
      currentTime = Date.now();
      FW.camera.translateZ(this.scene3Velocity);
      return this.scene3Velocity += this.scene3Acceleration;
    };

    Camera.prototype.scene4Update = function() {
      FW.camera.position.z += this.scene4Velocity;
      return this.scene4Velocity += this.scene4Acceleration;
    };

    Camera.prototype.scene5Update = function() {
      return FW.camera.position.z += this.scene4Velocity;
    };

    return Camera;

  })();

}).call(this);
