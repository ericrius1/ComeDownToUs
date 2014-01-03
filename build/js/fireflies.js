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
      this.timeTillDisabled = 100;
      this.emitterStats = [];
      this.ffToggledOn = false;
      this.specialLightIntensityUpChange = 0.2;
      this.specialLightIntensityDownChange = 0.4;
      this.specialLightIntensityStart = 0.5;
      this.specialLightGrowing = false;
      this.specialLightDistance = 2500;
      this.specialLightColor = 0xdf1ed8;
      this.initEmitterStats();
      this.firefliesGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/firefly.png'),
        maxAge: 3
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
      var acceleration, accelerationSpread, colorEnd, colorStart, defaultAcceleration, defaultAccelerationSpread, defaultColorEnd, defaultColorStart, defaultPositionSpread, defaultPps, defaultSizeEnd, defaultSizeStart, defaultType, defaultVelocity, defaultVelocitySpread, firefliesEmitter, positionSpread, positionSpreadFactor, pps, sizeEnd, sizeStart, type, velocity, velocitySpread, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref18, _ref19, _ref2, _ref20, _ref21, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
      defaultColorStart = new THREE.Color();
      colorStart = (_ref = (_ref1 = this.emitterStats[currentIndex]) != null ? _ref1.colorStart : void 0) != null ? _ref : defaultColorStart;
      defaultColorEnd = new THREE.Color();
      colorEnd = (_ref2 = (_ref3 = this.emitterStats[currentIndex]) != null ? _ref3.colorEnd : void 0) != null ? _ref2 : defaultColorEnd;
      defaultType = 'cube';
      type = (_ref4 = (_ref5 = this.emitterStats[currentIndex]) != null ? _ref5.type : void 0) != null ? _ref4 : defaultType;
      defaultPps = 1000;
      pps = (_ref6 = (_ref7 = this.emitterStats[currentIndex]) != null ? _ref7.pps : void 0) != null ? _ref6 : defaultPps;
      defaultSizeStart = 10;
      sizeStart = (_ref8 = (_ref9 = this.emitterStats[currentIndex]) != null ? _ref9.sizeStart : void 0) != null ? _ref8 : defaultSizeStart;
      defaultSizeEnd = 10;
      sizeEnd = (_ref10 = (_ref11 = this.emitterStats[currentIndex]) != null ? _ref11.sizeEnd : void 0) != null ? _ref10 : defaultSizeEnd;
      positionSpreadFactor = map(currentIndex, 1, this.numEmitters, 0, 500);
      defaultPositionSpread = new THREE.Vector3(positionSpreadFactor, 0, positionSpreadFactor);
      positionSpread = (_ref12 = (_ref13 = this.emitterStats[currentIndex]) != null ? _ref13.positionSpread : void 0) != null ? _ref12 : defaultPositionSpread;
      defaultVelocity = new THREE.Vector3(10, 0, 0);
      velocity = (_ref14 = (_ref15 = this.emitterStats[currentIndex]) != null ? _ref15.velocity : void 0) != null ? _ref14 : defaultVelocity;
      defaultVelocitySpread = new THREE.Vector3(0, 0, 0);
      velocitySpread = (_ref16 = (_ref17 = this.emitterStats[currentIndex]) != null ? _ref17.velocitySpread : void 0) != null ? _ref16 : defaultVelocitySpread;
      defaultAcceleration = new THREE.Vector3(500, 0, 0);
      acceleration = (_ref18 = (_ref19 = this.emitterStats[currentIndex]) != null ? _ref19.acceleration : void 0) != null ? _ref18 : defaultAcceleration;
      defaultAccelerationSpread = new THREE.Vector3(0, 0, 0);
      accelerationSpread = (_ref20 = (_ref21 = this.emitterStats[currentIndex]) != null ? _ref21.accelerationSpread : void 0) != null ? _ref20 : defaultAccelerationSpread;
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
        accelerationSpread: accelerationSpread,
        opacityStart: 0.8,
        opacityEnd: 0.8
      });
      this.firefliesGroup.addEmitter(firefliesEmitter);
      this.emitters.push(firefliesEmitter);
      firefliesEmitter.disable();
      if (currentIndex === 0) {
        this.specialLight = new THREE.PointLight(this.specialLightColor, 0, this.specialLightDistance);
        this.specialLight.position = firefliesEmitter.position;
        return FW.scene.add(this.specialLight);
      }
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
        emitter.position.x += this.distanceFromCam;
        emitter.position.y = 1;
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
      this.firefliesGroup.tick(this.tickTime);
      if (this.specialLightGrowing) {
        return this.specialLight.intensity += this.specialLightIntensityUpChange;
      } else {
        return this.specialLight.intensity -= this.specialLightIntensityDownChange;
      }
    };

    Fireflies.prototype.initEmitterStats = function() {
      var color, emitterStat;
      color = new THREE.Color();
      emitterStat = {
        pps: 400,
        sizeStart: 10,
        sizeEnd: 10,
        colorStart: new THREE.Color(this.specialLightColor),
        colorEnd: new THREE.Color(this.specialLightColor),
        velocity: new THREE.Vector3(10, 70, 0),
        velocitySpread: new THREE.Vector3(1, 0, 1),
        acceleration: new THREE.Vector3(10, -60, 0),
        accelerationSpread: new THREE.Vector3(0, 0, 0),
        positionSpread: new THREE.Vector3(1, 1, 1)
      };
      return this.emitterStats.push(emitterStat);
    };

    return Fireflies;

  })();

}).call(this);
