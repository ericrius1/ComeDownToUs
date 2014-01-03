(function() {
  var Fireflies;

  FW.Fireflies = Fireflies = (function() {
    function Fireflies() {
      var i, _i, _ref;
      this.tickTime = .008;
      this.currentBeatNum = 0;
      this.totalBeats = 20;
      this.numEmitters = this.totalBeats;
      this.xSpreadFactor = 100;
      this.distanceFromCam = 200;
      this.timeTillDisabled = 1000;
      this.emitterStats = [];
      this.initEmitterStats();
      this.firefliesGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/firefly.png'),
        maxAge: 1.5
      });
      this.emitters = [];
      this.numActiveEmitters = 0;
      for (i = _i = 0, _ref = this.numEmitters; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.generateFireflies(i);
      }
      this.firefliesGroup.mesh.renderDepth = -3;
      FW.scene.add(this.firefliesGroup.mesh);
    }

    Fireflies.prototype.generateFireflies = function(currentIndex) {
      var color, colorEnd, defaultColor, defaultPps, defaultSize, defaultVelocity, firefliesEmitter, pps, size, velocity, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
      defaultColor = new THREE.Color();
      color = (_ref = (_ref1 = this.emitterStats[currentIndex]) != null ? _ref1.color : void 0) != null ? _ref : defaultColor;
      colorEnd = new THREE.Color();
      colorEnd.setHSL(0.527, 0.80, 0.9);
      defaultPps = 500;
      pps = (_ref2 = (_ref3 = this.emitterStats[currentIndex]) != null ? _ref3.pps : void 0) != null ? _ref2 : defaultPps;
      defaultSize = 10;
      size = (_ref4 = (_ref5 = this.emitterStats[currentIndex]) != null ? _ref5.size : void 0) != null ? _ref4 : defaultSize;
      defaultVelocity = new THREE.Vector3(60, 90, 0);
      velocity = (_ref6 = (_ref7 = this.emitterStats[currentIndex]) != null ? _ref7.velocity : void 0) != null ? _ref6 : defaultVelocity;
      firefliesEmitter = new ShaderParticleEmitter({
        particlesPerSecond: pps,
        size: size,
        sizeEnd: size,
        colorStart: color,
        colorEnd: colorEnd,
        positionSpread: new THREE.Vector3(this.xSpreadFactor * currentIndex, 0, this.xSpreadFactor * currentIndex),
        velocity: velocity,
        velocitySpread: new THREE.Vector3(10, 10, 20),
        acceleration: new THREE.Vector3(50, -90, 0),
        accelerationSpread: new THREE.Vector3(10, 0, 10),
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
        emitter.position.x += this.distanceFromCam;
        emitter.position.y = 0;
      }
      return FW.scene2.fireflyInterval = setTimeout(function() {
        return _this.runScene2();
      }, FW.beatInterval);
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
      _results = [];
      for (i = _i = 0, _ref = this.numActiveEmitters; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        emitter = this.emitters[i];
        _results.push(emitter.enable());
      }
      return _results;
    };

    Fireflies.prototype.disableActiveEmitters = function() {
      var i, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.numActiveEmitters; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        _results.push(this.emitters[i].disable());
      }
      return _results;
    };

    Fireflies.prototype.tick = function() {
      return this.firefliesGroup.tick(this.tickTime);
    };

    Fireflies.prototype.initEmitterStats = function() {
      var color, emitterStat;
      color = new THREE.Color();
      emitterStat = {
        pps: 1,
        size: 40,
        color: new THREE.Color(0xdf1ed8),
        velocity: new THREE.Vector3(60, 120, 0)
      };
      return this.emitterStats.push(emitterStat);
    };

    return Fireflies;

  })();

}).call(this);
