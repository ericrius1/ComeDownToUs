(function() {
  var Fireflies;

  FW.Fireflies = Fireflies = (function() {
    var rnd;

    rnd = FW.rnd;

    function Fireflies() {
      var i, _i, _ref;
      this.tickTime = .016;
      this.currentBeatNum = 0;
      this.totalBeats = 20;
      this.numEmitters = this.totalBeats;
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
      var color, firefliesEmitter;
      color = new THREE.Color();
      firefliesEmitter = new ShaderParticleEmitter({
        particlesPerSecond: 1000,
        size: 10,
        sizeEnd: 10,
        colorStart: color,
        colorEnd: color,
        positionSpread: new THREE.Vector3(1000, 100, 1000),
        velocity: new THREE.Vector3(20, 0, 0),
        velocitySpread: new THREE.Vector3(2, 2, 2),
        acceleration: new THREE.Vector3(5, 0, 0),
        accelerationSpread: new THREE.Vector3(4, 4, 4),
        opacityStart: 0.8,
        opacityEnd: 0.2
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
        emitter.position.x += 100;
      }
      return setTimeout(function() {
        return _this.run();
      }, FW.scene2.beatInterval);
    };

    Fireflies.prototype.toggleActiveEmitters = function() {
      var _this = this;
      this.enableActiveEmitters();
      return setTimeout(function() {
        return _this.disableActiveEmitters();
      }, FW.scene2.beatInterval / 2);
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
