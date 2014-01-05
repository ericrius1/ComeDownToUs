(function() {
  var WormHole;

  FW.WormHole = WormHole = (function() {
    function WormHole() {
      this.tickTime = 0.005;
      this.heightAboveSurface = 75;
      this.zSpread = 5000;
      this.zDistanceFromCam = this.zSpread / 2;
      this.ySpread = 50;
      this.zAcceleration = -10;
      this.wormHoleGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/firefly.png'),
        maxAge: 5
      });
      this.generateWormHole();
      this.wormHoleGroup.mesh.renderDepth = -3;
      FW.scene.add(this.wormHoleGroup.mesh);
    }

    WormHole.prototype.generateWormHole = function() {
      var colorEnd, colorStart;
      colorStart = new THREE.Color().setRGB(Math.random(), Math.random(), Math.random());
      colorEnd = new THREE.Color().setRGB(Math.random(), Math.random(), Math.random());
      this.wormHoleEmitter = new ShaderParticleEmitter({
        particlesPerSecond: 40000,
        size: 20,
        sizeSpread: 20,
        colorStart: colorStart,
        colorSpread: new THREE.Vector3(Math.random(), Math.random(), Math.random()),
        colorEnd: colorEnd,
        position: new THREE.Vector3(0, this.heightAboveSurface, FW.scene3.startZ + this.zSpread / 2),
        positionSpread: new THREE.Vector3(300, this.ySpread, this.zSpread),
        acceleration: new THREE.Vector3(0, 0, this.zAcceleration)
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
      this.wormHoleEmitter.position.z = FW.camera.position.z - this.zDistanceFromCam;
      return this.wormHoleGroup.tick(this.tickTime);
    };

    return WormHole;

  })();

}).call(this);
