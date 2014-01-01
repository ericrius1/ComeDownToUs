(function() {
  var Fireflies;

  FW.Fireflies = Fireflies = (function() {
    var rnd;

    rnd = FW.rnd;

    function Fireflies() {
      this.tickTime = .008;
      this.firefliesGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/firefly.png'),
        maxAge: 1
      });
      this.generateFireflies();
      FW.scene.add(this.firefliesGroup.mesh);
    }

    Fireflies.prototype.generateFireflies = function() {
      var color;
      color = new THREE.Color();
      this.firefliesEmitter = new ShaderParticleEmitter({
        particlesPerSecond: 10000,
        size: 5,
        sizeEnd: 1,
        colorStart: color,
        colorEnd: color,
        positionSpread: new THREE.Vector3(1000, 20, 1000),
        velocitySpread: new THREE.Vector3(5, 5, 5),
        opacityEnd: 1
      });
      return this.firefliesGroup.addEmitter(this.firefliesEmitter);
    };

    Fireflies.prototype.activate = function() {
      return this.firefliesEmitter.position.set(FW.camera.position.x, 20, FW.camera.position.z);
    };

    Fireflies.prototype.tick = function() {
      return this.firefliesGroup.tick(this.tickTime);
    };

    return Fireflies;

  })();

}).call(this);
