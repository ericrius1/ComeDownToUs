(function() {
  var WormHole;

  FW.WormHole = WormHole = (function() {
    function WormHole() {
      this.wormHoleGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/firefly.png'),
        maxAge: 5
      });
      this.generateWormHole(new THREE.Color().setRGB(Math.random(), Math.random(), Math.random()));
      this.generateWormHole(this.light.color);
      this.wormHoleGroup.mesh.renderDepth = -3;
      FW.scene.add(this.wormHoleGroup.mesh);
    }

    WormHole.prototype.generateWormHole = function(colorStart) {
      var colorEnd, wormHoleEmitter;
      colorEnd = new THREE.Color(0xcd40c0);
      wormHoleEmitter = new ShaderParticleEmitter({
        particlesPerSecond: 5000,
        position: new THREE.Vector3(0, 10, FW.scene3.startZ)
      });
      return this.wormHoleGroup.addEmitter(wormHoleEmitter);
    };

    WormHole.prototype.tick = function() {
      return this.wormHoleGroup.tick(this.tickTime);
    };

    return WormHole;

  })();

}).call(this);
