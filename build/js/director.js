(function() {
  var Director,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  FW.Director = Director = (function() {
    function Director() {
      this.run = __bind(this.run, this);
      var short;
      this.music = true;
      short = false;
      this.scene1TotalTime = 155550;
      this.scene2TotalTime = 67000;
      this.scene3TotalTime = 33930;
      this.scene4TotalTime = 20000;
      this.scene5TotalTime = 10000;
      this.startRaiseBridgeTime = 127500;
      this.setSongPoint = false;
      if (short) {
        this.setSongPoint = true;
        this.scene1TotalTime = 3000;
        this.scene2TotalTime = 67000;
        this.scene3TotalTime = 3000;
        this.scene4TotalTime = 20000;
        this.scene5TotalTime = 2000;
        this.startRaiseBridgeTime = 2000;
        this.endRaiseBridgeTime = 10000;
      }
      this.skyColor = new THREE.Color();
      this.frozen = false;
      this.startSkyHue = 0.12;
      this.endSkyHue = -0.18;
      this.startSkyLight = 0.5;
      this.endSkyLight = 0.15;
      this.currentScene = FW.scene1;
      this.skyColor.setHSL(this.startSkyHue, 0.86, this.startSkyLight);
      FW.beatInterval = 3530;
    }

    FW.scene1 = {
      startZ: FW.height * 0.25,
      endZ: FW.height * 0.2,
      totalTime: Director.scene1TotalTime
    };

    FW.scene2 = {
      songPoint: 154550,
      startZ: FW.scene1.endZ,
      endZ: -FW.width / 2 + 1000,
      totalTime: Director.scene2TotalTime
    };

    FW.scene3 = {
      songPoint: 221600,
      startZ: FW.scene2.endZ,
      endZ: -FW.height / 2 + 200,
      totalTime: Director.scene3TotalTime
    };

    FW.scene4 = {
      songPoint: 253930,
      startVolume: 100,
      endVolume: 20,
      totalTime: Director.scene4TotalTime
    };

    FW.scene5 = {
      startVolume: FW.scene4.endVolume,
      endVolume: 0,
      totalTime: Director.scene5TotalTime
    };

    FW.scene6 = {};

    Director.prototype.run = function() {
      var _ref;
      requestAnimationFrame(this.run);
      FW.myWorld.render();
      if (!this.frozen) {
        return (_ref = this.currentScene) != null ? _ref.update() : void 0;
      } else {
        return FW.controls.update();
      }
    };

    Director.prototype.beginShow = function() {
      var startTime,
        _this = this;
      if (!this.music) {
        FW.song.pause();
      }
      startTime = Date.now();
      FW.scene1.startTime = startTime;
      FW.scene1.totalTime = this.scene1TotalTime;
      FW.scene1.endTime = startTime + this.scene1TotalTime;
      FW.scene1.startRaiseBridgeTime = startTime + this.startRaiseBridgeTime;
      FW.scene1.endRaiseBridgeTime = FW.scene1.endTime;
      FW.scene2.startTime = FW.scene1.endTime;
      FW.scene2.endTime = FW.scene1.endTime + this.scene2TotalTime;
      FW.scene2.totalTime = this.scene2TotalTime;
      FW.scene3.startTime = FW.scene2.endTime;
      FW.scene3.totalTime = this.scene3TotalTime;
      FW.scene3.endTime = FW.scene2.endTime + this.scene3TotalTime;
      FW.scene4.startTime = FW.scene3.endTime;
      FW.scene4.totalTime = this.scene4TotalTime;
      FW.scene4.endTime = FW.scene3.endTime + this.scene4TotalTime;
      FW.scene5.startTime = FW.scene4.endTime;
      FW.scene5.endTime = FW.scene4.endTime + FW.scene5.totalTime;
      FW.scene1.update = function() {
        var currentTime, hue, light;
        currentTime = Date.now();
        hue = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, _this.startSkyHue, _this.endSkyHue);
        light = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, _this.startSkyLight, _this.endSkyLight);
        _this.skyColor.setHSL(hue, 0.86, light);
        FW.renderer.setClearColor(_this.skyColor);
        FW.mySun.scene1Update();
        FW.myCamera.scene1Update();
        if (currentTime > FW.scene1.startRaiseBridgeTime) {
          FW.myTerrain.raiseBridge(currentTime);
        }
        if (currentTime > FW.scene1.endTime) {
          return _this.initScene2();
        }
      };
      FW.scene2.update = function() {
        var currentTime, light;
        currentTime = Date.now();
        FW.fireflies.tick();
        FW.mySun.scene2Update();
        FW.myCamera.scene2Update();
        light = map(currentTime, FW.scene2.startTime, FW.scene2.endTime, _this.endSkyLight, 0);
        _this.skyColor.setHSL(_this.endSkyHue, 0.86, light);
        FW.renderer.setClearColor(_this.skyColor);
        if (currentTime > FW.scene2.endTime) {
          return _this.initScene3();
        }
      };
      FW.scene3.update = function() {
        var currentTime;
        currentTime = Date.now();
        FW.myCamera.scene3Update();
        FW.wormHole.tick();
        if (currentTime > FW.scene3.endTime) {
          return _this.initScene4();
        }
      };
      FW.scene4.update = function() {
        var currentTime, volume;
        currentTime = Date.now();
        FW.wormHole.tick();
        FW.myCamera.scene4Update();
        volume = map(currentTime, FW.scene4.startTime, FW.scene4.endTime, 100, 0);
        FW.song.setVolume(volume);
        if (currentTime > FW.scene4.endTime) {
          return _this.initScene5();
        }
      };
      FW.scene5.update = function() {
        var currentTime, volume;
        FW.myCamera.scene5Update();
        currentTime = Date.now();
        volume = map(currentTime, FW.scene5.startTime, FW.scene5.endTime, FW.scene5.startVolume, FW.scene5.endVolume);
        FW.song.setVolume(volume);
        FW.wormHole.tick();
        if (currentTime > FW.scene5.endTime) {
          FW.wormHole.disperse();
          _this.currentScene = FW.scene6;
        }
        return FW.scene6.update = function() {
          return FW.myCamera.scene5Update();
        };
      };
      this.currentScene = FW.scene1;
      return this.run();
    };

    Director.prototype.freeze = function() {
      this.frozen = !this.frozen;
      FW.controls.enabled = !FW.controls.enabled;
      FW.controls.target.z = FW.camera.position.z - 30;
      if (this.frozen) {
        return FW.song.pause();
      } else {
        return FW.song.play();
      }
    };

    Director.prototype.initScene2 = function() {
      if (this.setSongPoint === true) {
        FW.song.setPosition(FW.scene2.songPoint);
      }
      this.currentScene = FW.scene2;
      FW.fireflies.runScene2();
      return FW.scene.remove(FW.mySun.sunMesh);
    };

    Director.prototype.initScene3 = function() {
      if (this.setSongPoint === true) {
        FW.song.setPosition(FW.scene3.songPoint);
      }
      FW.camera.rotation.order = 'YXZ';
      clearTimeout(FW.scene2.fireflyInterval);
      FW.fireflies.erase();
      FW.wormHole.activate();
      return this.currentScene = FW.scene3;
    };

    Director.prototype.initScene4 = function() {
      if (this.setSongPoint === true) {
        FW.song.setPosition(FW.scene4.songPoint);
      }
      FW.scene4.startVelocity = FW.myCamera.scene3Velocity;
      return this.currentScene = FW.scene4;
    };

    Director.prototype.initScene5 = function() {
      return this.currentScene = FW.scene5;
    };

    return Director;

  })();

}).call(this);
