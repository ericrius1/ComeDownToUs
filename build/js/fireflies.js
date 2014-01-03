(function() {
  var Fireflies;

  FW.Fireflies = Fireflies = (function() {
    var rnd;

    rnd = FW.rnd;

    function Fireflies() {
      var i, _i, _ref;
      this.tickTime = .008;
      this.currentBeatNum = 0;
      this.totalBeats = 20;
      this.xSpread = FW.width / 2;
      this.distanceFromCam = this.xSpread * .2;
      this.numEmitters = this.totalBeats;
      this.timeTillDisabled = 1000;
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
      var color, colorSpread, firefliesEmitter, pps;
      color = new THREE.Color();
      pps = 10000;
      colorSpread = new THREE.Vector3(0, 0, 0);
      firefliesEmitter = new ShaderParticleEmitter({
        particlesPerSecond: pps,
        size: 10,
        sizeEnd: 10,
        colorStart: color,
        colorSpread: colorSpread,
        positionSpread: new THREE.Vector3(this.xSpread, 0, this.xSpread),
        velocity: new THREE.Vector3(30, 80, 0),
        velocitySpread: new THREE.Vector3(2, 20, 4),
        acceleration: new THREE.Vector3(5, -70, 0),
        opacityStart: 0.8,
        opacityEnd: 0.8
      });
      this.firefliesGroup.addEmitter(firefliesEmitter);
      this.emitters.push(firefliesEmitter);
      return firefliesEmitter.disable();
    };

    Fireflies.prototype.run = function() {
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
      return setTimeout(function() {
        return _this.run();
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

    return Fireflies;

  })();

}).call(this);
