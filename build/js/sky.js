(function() {
  var Sky;

  FW.Sky = Sky = (function() {
    var rnd;

    rnd = FW.rnd;

    function Sky() {
      this.currentTick = 1;
      this.finalTick = 0.02;
      this.skyGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png'),
        maxAge: 50
      });
      this.position = new THREE.Vector3(-FW.width / 2, 3000, -FW.width);
      this.generateSky(new THREE.Vector3().copy(this.position));
      FW.scene.add(this.skyGroup.mesh);
    }

    Sky.prototype.generateSky = function(position) {
      var colorStart, skyEmitter;
      colorStart = new THREE.Color(0x00ff00);
      skyEmitter = new ShaderParticleEmitter({
        size: 10000,
        sizeEnd: 10000,
        position: position,
        colorStart: colorStart,
        colorEnd: colorStart,
        velocity: new THREE.Vector3(5, 0, 0),
        acceleration: new THREE.Vector3(5, 0, 0),
        opacityEnd: 1,
        particlesPerSecond: 1
      });
      return this.skyGroup.addEmitter(skyEmitter);
    };

    Sky.prototype.tick = function() {
      this.skyGroup.tick(this.currentTick);
      if (this.currentTick > this.finalTick) {
        return this.currentTick -= .01;
      } else {
        return this.currentTick = this.finalTick;
      }
    };

    return Sky;

  })();

}).call(this);
