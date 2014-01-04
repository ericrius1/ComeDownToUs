(function() {
  var Fireflies;

  FW.Fireflies = Fireflies = (function() {
    function Fireflies() {
      this.distanceFromCam = 130;
      this.timeTillDisabled = 1000;
      this.tickTime = .008;
      this.ffToggledOn = false;
      this.ffHeight = 8;
      this.emitters = [];
      this.firefliesGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/firefly.png'),
        maxAge: 5
      });
      this.generateFireflies(new THREE.Color());
      this.generateFireflies(new THREE.Color(0x25ae1b));
      this.firefliesGroup.mesh.renderDepth = -3;
      FW.scene.add(this.firefliesGroup.mesh);
    }

    Fireflies.prototype.generateFireflies = function(colorStart) {
      var colorEnd;
      colorEnd = new THREE.Color(0xcd40c0);
      this.firefliesEmitter = new ShaderParticleEmitter({
        particlesPerSecond: 10000,
        size: 20,
        sizeSpread: 10,
        sizeEnd: 5,
        colorStart: colorStart,
        colorEnd: colorEnd,
        positionSpread: new THREE.Vector3(750, 10, 100),
        velocitySpread: new THREE.Vector3(50, 50, 50),
        acceleration: new THREE.Vector3(0, 50, -200),
        accelerationSpread: 10
      }, 50, -100, {
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
