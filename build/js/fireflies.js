(function() {
  var Fireflies;

  FW.Fireflies = Fireflies = (function() {
    function Fireflies() {
      this.distanceFromCam = 50;
      this.timeTillDisabled = 300;
      this.tickTime = .008;
      this.ffToggledOn = false;
      this.ffHeight = 8;
      this.firefliesGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/firefly.png'),
        maxAge: 10
      });
      this.generateFireflies();
      this.firefliesGroup.mesh.renderDepth = -3;
      FW.scene.add(this.firefliesGroup.mesh);
    }

    Fireflies.prototype.generateFireflies = function() {
      var colorEnd, colorStart;
      colorStart = new THREE.Color();
      colorEnd = new THREE.Color();
      this.firefliesEmitter = new ShaderParticleEmitter({
        particlesPerSecond: 6000,
        size: 10,
        sizeEnd: 40,
        positionSpread: new THREE.Vector3(200, 5, 40),
        velocity: new THREE.Vector3(0, 0, -50),
        velocitySpread: new THREE.Vector3(10, 7, 10),
        acceleration: new THREE.Vector3(0, 4, -5),
        accelerationSpread: 10
      }, 2, 0, {
        opacityStart: 1.0,
        opacityEnd: 1.0
      });
      this.firefliesGroup.addEmitter(this.firefliesEmitter);
      return this.firefliesEmitter.disable();
    };

    Fireflies.prototype.runScene2 = function() {
      var _this = this;
      this.firefliesEmitter.position = new THREE.Vector3().copy(FW.camera.position);
      this.firefliesEmitter.position.z -= this.distanceFromCam;
      this.firefliesEmitter.position.y = this.ffHeight;
      this.firefliesEmitter.enable();
      setTimeout(function() {
        return _this.firefliesEmitter.disable();
      }, this.timeTillDisabled);
      return FW.scene2.fireflyInterval = setTimeout(function() {
        return _this.runScene2();
      }, FW.beatInterval);
    };

    Fireflies.prototype.tick = function() {
      return this.firefliesGroup.tick(this.tickTime);
    };

    return Fireflies;

  })();

}).call(this);
