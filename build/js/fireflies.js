(function() {
  var Fireflies;

  FW.Fireflies = Fireflies = (function() {
    function Fireflies() {
      this.distanceFromCam = 111;
      this.ffDisableTime = 1000;
      this.slowDownFactor = 0.05;
      this.tickTime = .16 * this.slowDownFactor;
      this.ffToggledOn = false;
      this.ffHeight = 11;
      this.emitters = [];
      this.currentPosition = new THREE.Vector3();
      this.ffVelocityZ = 450;
      this.lightVelocityZ = 0;
      this.ffAccelZ = -2500;
      this.light = new THREE.PointLight(0xffffff, 2, 2000);
      FW.scene.add(this.light);
      this.light.color.setRGB(Math.random(), Math.random(), Math.random());
      this.startLightIntensity = 5;
      this.endLightIntensity = 5;
      this.lightAccelZ = this.ffAccelZ / 10000;
      this.testMesh = new THREE.Mesh(new THREE.SphereGeometry(5), new THREE.MeshBasicMaterial());
      this.firefliesGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/firefly.png'),
        maxAge: 1.5
      });
      this.generateFireflies(new THREE.Color().setRGB(Math.random(), Math.random(), Math.random()));
      this.generateFireflies(this.light.color);
      this.firefliesGroup.mesh.renderDepth = -3;
      FW.scene.add(this.firefliesGroup.mesh);
    }

    Fireflies.prototype.generateFireflies = function(colorStart) {
      var colorEnd, firefliesEmitter;
      colorEnd = new THREE.Color(0xcd40c0);
      firefliesEmitter = new ShaderParticleEmitter({
        particlesPerSecond: 5000,
        size: 30,
        sizeSpread: 20,
        sizeEnd: 30,
        colorStart: colorStart,
        colorEnd: colorEnd,
        positionSpread: new THREE.Vector3(FW.pillarPairDistance, 10, 10),
        velocity: new THREE.Vector3(0, 0, this.ffVelocityZ),
        velocitySpread: new THREE.Vector3(10, 30, 0),
        acceleration: new THREE.Vector3(0, 0, this.ffAccelZ),
        accelerationSpread: new THREE.Vector3(10, 0, 0),
        opacityStart: 1.0,
        opacityEnd: 1.0
      });
      this.firefliesGroup.addEmitter(firefliesEmitter);
      this.emitters.push(firefliesEmitter);
      return firefliesEmitter.disable();
    };

    Fireflies.prototype.runScene2 = function() {
      var _this = this;
      this.currentPosition = new THREE.Vector3().copy(FW.camera.position);
      this.currentPosition.z -= this.distanceFromCam;
      this.currentPosition.y = this.ffHeight;
      this.startBeatTime = Date.now();
      this.lightBurst();
      this.ffPulse();
      return FW.scene2.fireflyInterval = setTimeout(function() {
        return _this.runScene2();
      }, FW.beatInterval);
    };

    Fireflies.prototype.ffPulse = function() {
      var emitter, _i, _len, _ref,
        _this = this;
      _ref = this.emitters;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        emitter = _ref[_i];
        emitter.position = this.currentPosition;
        emitter.enable();
      }
      return setTimeout(function() {
        return _this.disable();
      }, this.ffDisableTime);
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

    Fireflies.prototype.lightBurst = function() {
      this.light.position.z = this.currentPosition.z;
      this.lightVelocityZ = 0;
      this.light.position = this.currentPosition;
      return this.lightAccelZ *= 0.99;
    };

    Fireflies.prototype.erase = function() {
      this.disable();
      return FW.scene.remove(this.firefliesGroup.mesh);
    };

    Fireflies.prototype.tick = function() {
      var currentTime, intensity;
      currentTime = Date.now();
      this.firefliesGroup.tick(this.tickTime);
      intensity = map(currentTime, this.startBeatTime, this.startBeatTime + FW.beatInterval * 0.8, this.startLightIntensity, this.endLightIntensity);
      this.light.intensity = intensity;
      this.light.position.z -= this.lightVelocityZ;
      this.lightVelocityZ -= this.lightAccelZ;
      return this.testMesh.position = this.light.position;
    };

    return Fireflies;

  })();

}).call(this);
