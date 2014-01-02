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
      this.endSkyHue = -0.18;
      this.startSkyLight = 0.5;
      this.endSkyLight = 0.15;
      this.currentScene = FW.scene1;
      this.skyColor.setHSL(this.startSkyHue, 0.86, this.startSkyLight);
      FW.renderer.setClearColor(this.skyColor);
      this.skyLagFactor = 1.7;
    }

    Director.prototype.update = function() {
      var _ref;
      if (!this.frozen) {
        return (_ref = this.currentScene) != null ? _ref.update() : void 0;
      } else {
        return this.controls.update();
      }
    };

    Director.prototype.triggerScene2 = function() {
      this.currentScene = FW.scene2;
      FW.fireflies.activate();
      return FW.scene.remove(FW.mySun.sunMesh);
    };

    Director.prototype.freeze = function() {
      this.frozen = !this.frozen;
      this.controls.enabled = !this.controls.enabled;
      return this.controls.target.z = FW.camera.position.z - 30;
    };

    Director.prototype.beginShow = function(showStartTime) {
      var scene1TotalTime, scene2TotalTime,
        _this = this;
      scene1TotalTime = 155450;
      FW.scene1 = {
        startTime: showStartTime,
        totalTime: scene1TotalTime,
        endTime: showStartTime + scene1TotalTime
      };
      scene2TotalTime = 101000;
      FW.scene2 = {
        startTime: FW.scene1.endTime,
        songPoint: 155450,
        endTime: FW.scene1.endTime + scene2TotalTime,
        totalTime: scene2TotalTime,
        camSpeed: 0.0,
        camAcceleration: 0.000184,
        beatInterval: 3540
      };
      this.showHasBegun = true;
      FW.scene1.update = function() {
        var currentTime, hue, light;
        currentTime = Date.now();
        hue = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, _this.startSkyHue, _this.endSkyHue);
        light = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, _this.startSkyLight, _this.endSkyLight);
        _this.skyColor.setHSL(hue, 0.86, light);
        FW.renderer.setClearColor(_this.skyColor);
        if (FW.sunLight.position.y > FW.sunFinalHeight) {
          FW.mySun.update();
        }
        FW.myCamera.scene1Update();
        if (currentTime > FW.scene1.endTime) {
          return _this.triggerScene2();
        }
      };
      FW.scene2.update = function() {
        var currentTime, light;
        currentTime = Date.now();
        FW.fireflies.tick();
        FW.myCamera.scene2Update();
        light = map(currentTime, FW.scene2.startTime, FW.scene2.endTime, _this.endSkyLight, 0);
        _this.skyColor.setHSL(_this.endSkyHue, 0.86, light);
        return FW.renderer.setClearColor(_this.skyColor);
      };
      return this.currentScene = FW.scene1;
    };

    return Director;

  })();

}).call(this);
