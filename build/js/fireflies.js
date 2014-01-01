(function() {
  var Fireflies;

  FW.Fireflies = Fireflies = (function() {
    var rnd;

    rnd = FW.rnd;

    function Fireflies() {
      var i, _i, _ref;
      this.tickTime = .008;
      this.numEmitters = 4;
      this.firefliesGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/firefly.png'),
        maxAge: 1
      });
      for (i = _i = 0, _ref = this.numEmitters; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.generateFireflies();
      }
      this.firefliesGroup.mesh.renderDepth = -3;
      FW.scene.add(this.firefliesGroup.mesh);
    }

    Fireflies.prototype.generateFireflies = function() {
      var color;
      color = new THREE.Color();
      this.firefliesEmitter = new ShaderParticleEmitter({
        particlesPerSecond: 1000,
        size: 10,
        sizeEnd: 0,
        colorStart: color,
        colorEnd: color,
        positionSpread: new THREE.Vector3(1000, 50, 1000),
        velocitySpread: new THREE.Vector3(5, 5, 5),
        opacityEnd: 1
      });
      return this.firefliesGroup.addEmitter(this.firefliesEmitter);
    };

    Fireflies.prototype.activate = function() {
      return this.firefliesEmitter.position.set(FW.camera.position.x, 10, FW.camera.position.z);
    };

    Fireflies.prototype.tick = function() {
      return this.firefliesGroup.tick(this.tickTime);
    };

    return Fireflies;

  })();

}).call(this);
