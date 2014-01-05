(function() {
  var WormHole;

  FW.WormHole = WormHole = (function() {
    function WormHole() {
      this.tickTime = 0.001;
      this.wormHoleGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/firefly.png'),
        maxAge: 1
      });
      this.generateWormHole();
      this.wormHoleGroup.mesh.renderDepth = -3;
      FW.scene.add(this.wormHoleGroup.mesh);
    }

    WormHole.prototype.generateWormHole = function() {
      var wormHoleEmitter;
      wormHoleEmitter = new ShaderParticleEmitter({
        particlesPerSecond: 5000,
        size: 20,
        position: new THREE.Vector3(0, 10, FW.scene3.startZ),
        positionSpread: new THREE.Vector3(1000, 10, 1000)
      });
      return this.wormHoleGroup.addEmitter(wormHoleEmitter);
    };

    WormHole.prototype.tick = function() {
      return this.wormHoleGroup.tick(this.tickTime);
    };

    return WormHole;

  })();

}).call(this);
