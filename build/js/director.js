(function() {
  var Director;

  FW.Director = Director = (function() {
    function Director() {
      var startTime, totalTime,
        _this = this;
      this.showHasBegun = false;
      this.colorChangeTime = 50;
      this.skyColor = new THREE.Color();
      this.frozen = false;
      this.controls = new THREE.OrbitControls(FW.camera);
      this.controls.enabled = false;
      this.controls.zoomSpeed = 0.5;
      this.controls.rotateSpeed = 0.5;
      startTime = Date.now();
      totalTime = 154700;
      FW.scene1 = {
        startSkyHue: 0.12,
        startSkyLight: 0.5,
        startTime: startTime,
        totalTime: totalTime,
        endTime: startTime + totalTime
      };
      FW.scene2 = {
        startTime: FW.scene1.endTime,
        songPoint: 154700,
        endTime: FW.scene1.endTime + 101000,
        totalTime: 101000,
        camSpeed: 0.0,
        camAcceleration: 0.0002,
        beatInterval: 3540
      };
      this.currentScene = FW.scene1;
      this.skyColor.setHSL(FW.scene1.startSkyHue, 0.86, FW.scene1.startSkyLight);
      FW.renderer.setClearColor(this.skyColor);
      this.skyLagFactor = 1.7;
      FW.scene1.update = function() {
        _this.hue = map(_this.currentTime, FW.scene1.startTime, FW.scene1.endTime, FW.scene1.startSkyHue, 0);
        _this.light = map(_this.currentTime, FW.scene1.startTime, FW.scene1.endTime, FW.scene1.startSkyLight, 0.2);
        _this.skyColor.setHSL(_this.hue, 0.86, _this.light);
        FW.renderer.setClearColor(_this.skyColor);
        if (FW.sunLight.position.y > FW.sunFinalHeight) {
          FW.mySun.update();
        }
        FW.myCamera.scene1Update();
        if (_this.currentTime > FW.scene1.endTime) {
          return _this.triggerScene2();
        }
      };
      FW.scene2.update = function() {
        var light;
        FW.fireflies.tick();
        FW.myCamera.scene2Update();
        light = map(_this.currentTime, FW.scene2.startTime, FW.scene2.endTime, 0.2, 0);
        _this.skyColor.setHSL(_this.hue, 0.86, light);
        return FW.renderer.setClearColor(_this.skyColor);
      };
      this.currentScene = FW.scene1;
    }

    Director.prototype.beginShow = function() {
      return this.showHasBegun = true;
    };

    Director.prototype.update = function() {
      this.currentTime = Date.now();
      if (!this.frozen) {
        if (this.showHasBegun) {
          return this.currentScene.update();
        }
      } else {
        return this.controls.update();
      }
    };

    Director.prototype.triggerScene2 = function() {
      FW.song.setPosition(FW.scene2.songPoint);
      this.currentScene = FW.scene2;
      FW.fireflies.activate();
      return FW.scene.remove(FW.mySun.sunMesh);
    };

    Director.prototype.freeze = function() {
      this.frozen = !this.frozen;
      this.controls.enabled = !this.controls.enabled;
      return this.controls.target.z = FW.camera.position.z - 30;
    };

    return Director;

  })();

}).call(this);
