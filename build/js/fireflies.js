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
        maxAge: 5
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
        particlesPerSecond: 1000,
        size: 10,
        sizeEnd: 10,
        positionSpread: new THREE.Vector3(100, 5, 40),
        velocity: new THREE.Vector3(0, 0, -50),
        acceleration: new THREE.Vector3(0, 3, -5),
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
