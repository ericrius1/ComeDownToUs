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
        maxAge: 1
      });
      this.emitters = [];
      this.currentEmitterIndex = 0;
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
        particlesPerSecond: 100 * (1 + currentIndex * currentIndex * 10),
        size: 10,
        sizeEnd: 0,
        colorStart: color,
        colorEnd: color,
        positionSpread: new THREE.Vector3(1000, 50, 1000),
        velocitySpread: new THREE.Vector3(5, 5, 5),
        opacityStart: 0.8,
        opacityEnd: 0.5
      });
      this.firefliesGroup.addEmitter(firefliesEmitter);
      this.emitters.push(firefliesEmitter);
      return firefliesEmitter.disable();
    };

    Fireflies.prototype.activate = function() {
      var _this = this;
      this.enableEmitters();
      setTimeout(function() {
        return _this.disableEmitters();
      }, 1000);
      return setTimeout(function() {
        return _this.activate();
      }, FW.scene2.beatInterval);
    };

    Fireflies.prototype.enableEmitters = function() {
      var emitter, _i, _len, _ref, _results;
      _ref = this.emitters;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        emitter = _ref[_i];
        emitter.position = FW.camera.position;
        _results.push(emitter.enable());
      }
      return _results;
    };

    Fireflies.prototype.disableEmitters = function() {
      var emitter, _i, _len, _ref, _results;
      _ref = this.emitters;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        emitter = _ref[_i];
        _results.push(emitter.disable());
      }
      return _results;
    };

    Fireflies.prototype.tick = function() {
      return this.firefliesGroup.tick(this.tickTime);
    };

    return Fireflies;

  })();

}).call(this);
