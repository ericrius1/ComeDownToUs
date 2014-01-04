(function() {
  var Fireflies;

  FW.Fireflies = Fireflies = (function() {
    function Fireflies() {
      this.distanceFromCam = 70;
      this.timeTillDisabled = 1000;
      this.tickTime = .008;
      this.ffToggledOn = false;
      this.ffHeight = 8;
      this.emitters = [];
      this.currentPosition = new THREE.Vector3();
      this.light = new THREE.PointLight(0xffffff, 2, 2000);
      this.light.position = this.currentPosition;
      FW.scene.add(this.light);
      this.firefliesGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/firefly.png'),
        maxAge: 5
      });
      this.generateFireflies(new THREE.Color().setRGB(Math.random(), Math.random(), Math.random()));
      this.generateFireflies(new THREE.Color().setRGB(Math.random(), Math.random(), Math.random()));
      this.firefliesGroup.mesh.renderDepth = -3;
      FW.scene.add(this.firefliesGroup.mesh);
    }

    Fireflies.prototype.generateFireflies = function(colorStart) {
      var colorEnd, firefliesEmitter;
      colorEnd = new THREE.Color(0xcd40c0);
      firefliesEmitter = new ShaderParticleEmitter({
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
      this.firefliesGroup.addEmitter(firefliesEmitter);
      this.emitters.push(firefliesEmitter);
      firefliesEmitter.disable();
      return firefliesEmitter.position = this.currentPosition;
    };

    Fireflies.prototype.runScene2 = function() {
      var _this = this;
      this.currentPosition = new THREE.Vector3().copy(FW.camera.position);
      this.currentPosition.z -= this.distanceFromCam;
      this.currentPosition.y = this.ffHeight;
      this.enable();
      this.createLightBurst();
      setTimeout(function() {
        return _this.disable();
      }, this.timeTillDisabled);
      return FW.scene2.fireflyInterval = setTimeout(function() {
        return _this.runScene2();
      }, FW.beatInterval);
    };

    Fireflies.prototype.enable = function() {
      var emitter, _i, _len, _ref, _results;
      this.position = new THREE.Vector3().copy(FW.camera.position);
      _ref = this.emitters;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        emitter = _ref[_i];
        _results.push(emitter.enable());
      }
      return _results;
    };

    Fireflies.prototype.disable = function() {
      var emitter, _i, _len, _ref, _results;
      _ref = this.emitters;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        emitter = _ref[_i];
        _results.push(emitter.disable());
      }
      return _results;
    };

    Fireflies.prototype.createLightBurst = function() {
      return this.light.intensity = 10;
    };

    Fireflies.prototype.tick = function() {
      return this.firefliesGroup.tick(this.tickTime);
    };

    return Fireflies;

  })();

}).call(this);
