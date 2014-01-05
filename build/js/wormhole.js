(function() {
  var WormHole;

  FW.WormHole = WormHole = (function() {
    function WormHole() {
      this.tickTime = 0.01;
      this.distanceFromCam = 50;
      this.wormHoleGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/firefly.png'),
        maxAge: 2
      });
      this.generateWormHole();
      this.wormHoleGroup.mesh.renderDepth = -3;
      FW.scene.add(this.wormHoleGroup.mesh);
    }

    WormHole.prototype.generateWormHole = function() {
      this.wormHoleEmitter = new ShaderParticleEmitter({
        particlesPerSecond: 10000,
        position: new THREE.Vector3(0, 10, FW.scene3.startZ),
        positionSpread: new THREE.Vector3(1000, 100, 1000),
        velocity: new THREE.Vector3(0, 0, -200),
        acceleration: new THREE.Vector3(0, 0, 100)
      });
      this.wormHoleGroup.addEmitter(this.wormHoleEmitter);
      return this.wormHoleEmitter.disable();
    };

    WormHole.prototype.activate = function() {
      return this.wormHoleEmitter.enable();
    };

    WormHole.prototype.disperse = function() {
      return this.wormHoleEmitter.disable();
    };

    WormHole.prototype.tick = function() {
      this.wormHoleEmitter.position.z = FW.camera.position.z - this.distanceFromCam;
      return this.wormHoleGroup.tick(this.tickTime);
    };

    return WormHole;

  })();

}).call(this);
