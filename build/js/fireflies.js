(function() {
  var Fireflies;

  FW.Fireflies = Fireflies = (function() {
    var rnd;

    rnd = FW.rnd;

    function Fireflies() {
      var i, _i, _ref;
      this.tickTime = .016;
      this.numEmitters = 4;
      this.firefliesGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/firefly.png'),
        maxAge: 1.5
      });
      this.emitters = [];
      this.numActiveEmitters = 0;
      for (i = _i = 0, _ref = this.numEmitters; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.generateFireflies(i);
      }
      this.firefliesGroup.mesh.renderDepth = -3;
      FW.scene.add(this.firefliesGroup.mesh);
    }

    Fireflies.prototype.generateFireflies = function(currentIndex) {
      var color, firefliesEmitter;
      color = new THREE.Color();
      firefliesEmitter = new ShaderParticleEmitter({
        particlesPerSecond: 10 * (1 + currentIndex * currentIndex * 10),
        size: 10,
        sizeEnd: 10,
        colorStart: color,
        colorEnd: color,
        positionSpread: new THREE.Vector3(1000, 100, 1000),
        velocity: new THREE.Vector3(3, 0, 0),
        accelerationSpread: new THREE.Vector3(5, 5, 5),
        opacityStart: 0.8,
        opacityEnd: 0.2
      });
      this.firefliesGroup.addEmitter(firefliesEmitter);
      this.emitters.push(firefliesEmitter);
      return firefliesEmitter.disable();
    };

    Fireflies.prototype.awaken = function() {
      var _this = this;
      if (this.numActiveEmitters < this.emitters.length) {
        this.numActiveEmitters++;
      }
      this.toggleActiveEmitters();
      return setTimeout(function() {
        return _this.awaken();
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
        emitter.position = new THREE.Vector3().copy(FW.camera.position);
        emitter.position.x += 10;
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
