(function() {
  var WormHole;

  FW.WormHole = WormHole = (function() {
    function WormHole() {
      this.tickTime = 0.08;
      this.height = 75;
      this.ySpread = 50;
      this.zSpread = FW.height / 2;
      this.zDistanceFromCam = this.zSpread / 2;
      this.wormHoleGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/star.png'),
        maxAge: 10,
        blending: THREE.AdditiveBlending
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
        particlesPerSecond: 10000,
        size: 10,
        sizeSpread: 10,
        sizeEnd: 1,
        colorStart: colorStart,
        colorSpread: new THREE.Vector3(Math.random(), Math.random(), Math.random()),
        colorEnd: colorEnd,
        position: new THREE.Vector3(0, this.height, FW.scene3.startZ + this.zSpread / 2),
        positionSpread: new THREE.Vector3(200, this.ySpread, this.zSpread),
        velocity: new THREE.Vector3(0, 0, -50),
        acceleration: new THREE.Vector3(0, 0, 0),
        opacityEnd: 1
      });
      this.wormHoleGroup.addEmitter(this.wormHoleEmitter);
      return this.wormHoleEmitter.disable();
    };

    WormHole.prototype.activate = function() {
      return this.wormHoleEmitter.enable();
    };

    WormHole.prototype.disperse = function() {
      console.log("DISPERSE");
      return this.wormHoleEmitter.disable();
    };

    WormHole.prototype.tick = function() {
      this.wormHoleEmitter.position.z = FW.camera.position.z - this.zDistanceFromCam;
      return this.wormHoleGroup.tick(this.tickTime);
    };

    return WormHole;

  })();

}).call(this);
