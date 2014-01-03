(function() {
  var Fireflies;

  FW.Fireflies = Fireflies = (function() {
    function Fireflies() {
      var i, _i, _ref;
      this.distanceFromCam = 50;
      this.tickTime = .008;
      this.currentBeatNum = 0;
      this.totalBeats = 20;
      this.numEmitters = this.totalBeats;
      this.xSpreadFactor = 100;
      this.timeTillDisabled = 50;
      this.emitterStats = [];
      this.ffToggledOn = false;
      this.specialLightIntensityUpChange = 0.0;
      this.specialLightIntensityDownChange = 0.0;
      this.specialLightIntensityStart = 2.0;
      this.specialLightGrowing = false;
      this.specialLightDistance = 2500;
      this.specialLightColor = 0xffffff;
      this.ffHeight = 20;
      this.firefliesGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/firefly.png'),
        maxAge: 5
      });
      this.emitters = [];
      this.numActiveEmitters = 0;
      for (i = _i = 0, _ref = this.numEmitters; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.generateFireflies(i);
      }
      this.specialLight = new THREE.PointLight(this.specialLightColor, 0, this.specialLightDistance);
      FW.scene.add(this.specialLight);
      this.firefliesGroup.mesh.renderDepth = -3;
      FW.scene.add(this.firefliesGroup.mesh);
    }

    Fireflies.prototype.generateFireflies = function(currentIndex) {
      var colorEnd, colorStart, firefliesEmitter, positionSpreadFactor;
      positionSpreadFactor = map(currentIndex, 0, this.numEmitters, 0, 1000);
      colorStart = new THREE.Color();
      colorEnd = new THREE.Color();
      firefliesEmitter = new ShaderParticleEmitter({
        particlesPerSecond: 1000,
        size: 10,
        sizeEnd: 10,
        positionSpread: new THREE.Vector3(100, 20, 10),
        velocity: new THREE.Vector3(0, 0, -100),
        acceleration: new THREE.Vector3(0, 0, -1),
        velocitySpread: new THREE.Vector3(10, 10, 0),
        opacityStart: 0.8,
        opacityEnd: 0.8
      });
      this.firefliesGroup.addEmitter(firefliesEmitter);
      this.emitters.push(firefliesEmitter);
      return firefliesEmitter.disable();
    };

    Fireflies.prototype.runScene2 = function() {
      var emitter, i, _i, _ref,
        _this = this;
      this.specialLight.intensity = this.specialLightIntensityStart;
      this.specialLightGrowing = true;
      this.currentBeatNum++;
      if (this.numActiveEmitters < this.emitters.length) {
        this.numActiveEmitters++;
      }
      if (this.currentBeatNum < this.totalBeats) {
        this.toggleActiveEmitters();
      } else {
        this.enableActiveEmitters();
      }
      for (i = _i = 0, _ref = this.numActiveEmitters; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        emitter = this.emitters[i];
        emitter.position = new THREE.Vector3().copy(FW.camera.position);
        emitter.position.z -= this.distanceFromCam;
        emitter.position.y = this.ffHeight;
      }
      FW.scene2.fireflyInterval = setTimeout(function() {
        return _this.runScene2();
      }, FW.beatInterval);
      return setTimeout(function() {
        return _this.specialLightGrowing = false;
      }, FW.beatInterval / 2);
    };

    Fireflies.prototype.toggleActiveEmitters = function() {
      var _this = this;
      this.enableActiveEmitters();
      return setTimeout(function() {
        return _this.disableActiveEmitters();
      }, this.timeTillDisabled);
    };

    Fireflies.prototype.enableActiveEmitters = function() {
      var emitter, i, _i, _ref, _results;
      this.ffToggledOn = true;
      _results = [];
      for (i = _i = 0, _ref = this.numActiveEmitters; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        emitter = this.emitters[i];
        _results.push(emitter.enable());
      }
      return _results;
    };

    Fireflies.prototype.disableActiveEmitters = function() {
      var i, _i, _ref, _results;
      this.ffToggledOn = false;
      _results = [];
      for (i = _i = 0, _ref = this.numActiveEmitters; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        _results.push(this.emitters[i].disable());
      }
      return _results;
    };

    Fireflies.prototype.tick = function() {
      this.specialLight.position.z -= this.specialLightVelocity;
      this.specialLightVelocity += this.specialLightAccel;
      this.firefliesGroup.tick(this.tickTime);
      if (this.specialLightGrowing) {
        return this.specialLight.intensity += this.specialLightIntensityUpChange;
      } else {
        return this.specialLight.intensity -= this.specialLightIntensityDownChange;
      }
    };

    return Fireflies;

  })();

}).call(this);
