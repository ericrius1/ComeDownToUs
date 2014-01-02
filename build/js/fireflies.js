(function() {
  var Fireflies;

  FW.Fireflies = Fireflies = (function() {
    var rnd;

    rnd = FW.rnd;

    function Fireflies() {
      var i, _i, _ref;
      this.tickTime = .016;
      this.numEmitters = 4;
      this.newGroupSpawnInterval = 500;
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
        positionSpread: new THREE.Vector3(FW.width, 50, FW.width),
        velocitySpread: new THREE.Vector3(5, 5, 5),
        opacityStart: 0.8,
        opacityEnd: 0.5
      });
      this.firefliesGroup.addEmitter(firefliesEmitter);
      this.emitters.push(firefliesEmitter);
      return firefliesEmitter.disable();
    };

    Fireflies.prototype.activate = function() {
      var emitter,
        _this = this;
      emitter = this.emitters[this.currentEmitterIndex++];
      emitter.position = FW.camera.position;
      emitter.enable();
      if (this.currentEmitterIndex < this.emitters.length) {
        return setTimeout(function() {
          _this.activate();
          return console.log("NEW!");
        }, this.newGroupSpawnInterval);
      }
    };

    Fireflies.prototype.tick = function() {
      return this.firefliesGroup.tick(this.tickTime);
    };

    return Fireflies;

  })();

}).call(this);
