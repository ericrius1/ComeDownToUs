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
      this.distanceFromCam = 100;
      this.timeTillDisabled = 100;
      this.emitterStats = [];
      this.initEmitterStats();
      this.firefliesGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/firefly.png'),
        maxAge: 2.0
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
      var acceleration, colorEnd, colorStart, defaultAcceleration, defaultColorEnd, defaultColorStart, defaultPositionSpread, defaultPps, defaultSizeEnd, defaultSizeStart, defaultType, defaultVelocity, defaultVelocitySpread, firefliesEmitter, positionSpread, pps, sizeEnd, sizeStart, type, velocity, velocitySpread, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref18, _ref19, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
      defaultColorStart = new THREE.Color();
      colorStart = (_ref = (_ref1 = this.emitterStats[currentIndex]) != null ? _ref1.colorStart : void 0) != null ? _ref : defaultColorStart;
      defaultColorEnd = new THREE.Color();
      colorEnd = (_ref2 = (_ref3 = this.emitterStats[currentIndex]) != null ? _ref3.colorEnd : void 0) != null ? _ref2 : defaultColorEnd;
      defaultType = 'cube';
      type = (_ref4 = (_ref5 = this.emitterStats[currentIndex]) != null ? _ref5.type : void 0) != null ? _ref4 : defaultType;
      defaultPps = 500;
      pps = (_ref6 = (_ref7 = this.emitterStats[currentIndex]) != null ? _ref7.pps : void 0) != null ? _ref6 : defaultPps;
      defaultSizeStart = 10;
      sizeStart = (_ref8 = (_ref9 = this.emitterStats[currentIndex]) != null ? _ref9.sizeStart : void 0) != null ? _ref8 : defaultSizeStart;
      defaultSizeEnd = 10;
      sizeEnd = (_ref10 = (_ref11 = this.emitterStats[currentIndex]) != null ? _ref11.sizeEnd : void 0) != null ? _ref10 : defaultSizeEnd;
      defaultVelocity = new THREE.Vector3(30, 60, 0);
      velocity = (_ref12 = (_ref13 = this.emitterStats[currentIndex]) != null ? _ref13.velocity : void 0) != null ? _ref12 : defaultVelocity;
      defaultVelocitySpread = new THREE.Vector3(10, 10, 20);
      velocitySpread = (_ref14 = (_ref15 = this.emitterStats[currentIndex]) != null ? _ref15.velocitySpread : void 0) != null ? _ref14 : defaultVelocitySpread;
      defaultAcceleration = new THREE.Vector3(20, -35, 0);
      acceleration = (_ref16 = (_ref17 = this.emitterStats[currentIndex]) != null ? _ref17.acceleration : void 0) != null ? _ref16 : defaultAcceleration;
      defaultPositionSpread = new THREE.Vector3(this.xSpreadFactor * currentIndex, 0, this.xSpreadFactor * currentIndex);
      positionSpread = (_ref18 = (_ref19 = this.emitterStats[currentIndex]) != null ? _ref19.positionSpread : void 0) != null ? _ref18 : defaultPositionSpread;
      firefliesEmitter = new ShaderParticleEmitter({
        type: type,
        particlesPerSecond: pps,
        size: sizeStart,
        sizeEnd: sizeEnd,
        colorStart: colorStart,
        colorEnd: colorEnd,
        positionSpread: positionSpread,
        velocity: velocity,
        velocitySpread: velocitySpread,
        acceleration: acceleration,
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
        pps: 200,
        sizeStart: 30,
        sizeEnd: 30,
        colorStart: new THREE.Color(0xdf1ed8),
        colorEnd: new THREE.Color(0xdf1ed8),
        velocity: new THREE.Vector3(30, 60, 0),
        velocitySpread: new THREE.Vector3(10, 0, 10),
        acceleration: new THREE.Vector3(20, -35, 0),
        positionSpread: new THREE.Vector3(1, 1, 1)
      };
      return this.emitterStats.push(emitterStat);
    };

    return Fireflies;

  })();

}).call(this);
