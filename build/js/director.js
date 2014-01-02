(function() {
  var Director;

  FW.Director = Director = (function() {
    function Director() {
      this.showHasBegun = false;
      this.colorChangeTime = 50;
      this.skyColor = new THREE.Color();
      this.frozen = false;
      this.controls = new THREE.OrbitControls(FW.camera);
      this.controls.enabled = false;
      this.controls.zoomSpeed = 0.5;
      this.controls.rotateSpeed = 0.5;
      this.startSkyHue = 0.12;
      this.startSkyLight = 0.5;
      this.currentScene = FW.scene1;
      this.skyColor.setHSL(this.startSkyHue, 0.86, this.startSkyLight);
      FW.renderer.setClearColor(this.skyColor);
      this.skyLagFactor = 1.7;
    }

    Director.prototype.update = function() {
      if (!this.frozen) {
        if (this.showHasBegun) {
          this.currentTime = Date.now();
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

    Director.prototype.beginShow = function() {
      var startTime, totalTime,
        _this = this;
      startTime = Date.now();
      totalTime = 154700;
      FW.scene1 = {
        startTime: startTime,
        totalTime: totalTime,
        endTime: startTime + totalTime
      };
      totalTime = 101000;
      FW.scene2 = {
        startTime: FW.scene1.endTime,
        songPoint: 154700,
        endTime: FW.scene1.endTime + totalTime,
        totalTime: totalTime,
        camSpeed: 0.0,
        camAcceleration: 0.0002,
        beatInterval: 3540
      };
      this.showHasBegun = true;
      FW.scene1.update = function() {
        _this.hue = map(_this.currentTime, FW.scene1.startTime, FW.scene1.endTime, _this.startSkyHue, 0);
        _this.light = map(_this.currentTime, FW.scene1.startTime, FW.scene1.endTime, _this.startSkyLight, 0.2);
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
      return this.currentScene = FW.scene1;
    };

    return Director;

  })();

}).call(this);
