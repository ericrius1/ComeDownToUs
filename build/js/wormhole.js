(function() {
  var WormHole;

  FW.WormHole = WormHole = (function() {
    function WormHole() {
      this.tickTime = 0.001;
      this.distanceFromCam = 50;
      this.wormHoleGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/firefly.png'),
        maxAge: 1
      });
      this.generateWormHole();
      this.wormHoleGroup.mesh.renderDepth = -3;
      FW.scene.add(this.wormHoleGroup.mesh);
    }

    WormHole.prototype.generateWormHole = function() {
      this.wormHoleEmitter = new ShaderParticleEmitter({
        particlesPerSecond: 5000,
        size: 20,
        position: new THREE.Vector3(0, 10, FW.scene3.startZ),
        positionSpread: new THREE.Vector3(1000, 10, 1000)
      });
      this.wormHoleGroup.addEmitter(this.wormHoleEmitter);
      return this.wormHoleEmitter.disable();
    };

    WormHole.prototype.activate = function() {
      return this.wormHoleEmitter.enable();
    };

    WormHole.prototype.tick = function() {
      this.wormHoleEmitter.position.z = FW.camera.position.z - this.distanceFromCam;
      return this.wormHoleGroup.tick(this.tickTime);
    };

    return WormHole;

  })();

}).call(this);
