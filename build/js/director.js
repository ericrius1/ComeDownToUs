(function() {
  var Director,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  FW.Director = Director = (function() {
    var scene3TotalTime;

    function Director() {
      this.run = __bind(this.run, this);
      var short;
      short = true;
      this.scene1TotalTime = 155550;
      this.scene2TotalTime = 64450;
      this.setSongPoint = false;
      if (short) {
        this.scene1TotalTime = 10000;
        this.setSongPoint = true;
        this.scene2TotalTime = 64450;
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
      startZ: FW.height * 0.5,
      endZ: FW.height * 0.2
    };

    FW.scene2 = {
      songPoint: 154600,
      startZ: FW.scene1.endZ,
      endZ: -FW.width / 2 + 1000
    };

    scene3TotalTime = 33930;

    FW.scene3 = {
      songPoint: 220000,
      camAcceleration: .0001
    };

    Director.prototype.beginShow = function() {
      var startTime,
        _this = this;
      startTime = Date.now();
      FW.scene1.startTime = startTime;
      FW.scene1.totalTime = this.scene1TotalTime;
      FW.scene1.endTime = startTime + this.scene1TotalTime;
      FW.scene2.startTime = FW.scene1.endTime;
      FW.scene2.endTime = FW.scene1.endTime + this.scene2TotalTime;
      FW.scene2.totalTime = this.scene2TotalTime;
      FW.scene3.startTime = FW.scene2.endTime;
      FW.scene3.totalTime = scene3TotalTime;
      FW.scene3.endTime = FW.scene2.endTime + scene3TotalTime;
      FW.scene1.update = function() {
        var currentTime, hue, light;
        currentTime = Date.now();
        hue = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, _this.startSkyHue, _this.endSkyHue);
        light = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, _this.startSkyLight, _this.endSkyLight);
        _this.skyColor.setHSL(hue, 0.86, light);
        FW.renderer.setClearColor(_this.skyColor);
        FW.mySun.scene1Update();
        FW.myCamera.scene1Update();
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
        FW.fireflies.tick();
        return FW.myCamera.scene3Update();
      };
      this.currentScene = FW.scene1;
      return this.run();
    };

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

    Director.prototype.freeze = function() {
      this.frozen = !this.frozen;
      FW.controls.enabled = !FW.controls.enabled;
      return FW.controls.target.z = FW.camera.position.z - 30;
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
      return this.currentScene = FW.scene3;
    };

    return Director;

  })();

}).call(this);
