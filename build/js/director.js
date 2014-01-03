(function() {
  var Director;

  FW.Director = Director = (function() {
    function Director() {
      this.scene1TotalTime = 155500;
      FW.sunsetSpeed = 0.22;
      this.setSongPoint = false;
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
      FW.beatInterval = 3540;
    }

    Director.prototype.update = function() {
      var _ref;
      if (!this.frozen) {
        return (_ref = this.currentScene) != null ? _ref.update() : void 0;
      } else {
        return this.controls.update();
      }
    };

    Director.prototype.freeze = function() {
      this.frozen = !this.frozen;
      this.controls.enabled = !this.controls.enabled;
      return this.controls.target.z = FW.camera.position.z - 30;
    };

    Director.prototype.beginShow = function(showStartTime) {
      var scene2TotalTime, scene3TotalTime,
        _this = this;
      FW.scene1 = {
        startTime: showStartTime,
        totalTime: this.scene1TotalTime,
        endTime: showStartTime + this.scene1TotalTime
      };
      scene2TotalTime = 66260;
      FW.scene2 = {
        startTime: FW.scene1.endTime,
        songPoint: 154800,
        endTime: FW.scene1.endTime + scene2TotalTime,
        totalTime: scene2TotalTime,
        camSpeed: 0.0,
        camAcceleration: 0.000005
      };
      scene3TotalTime = 33680;
      FW.scene3 = {
        startTime: FW.scene2.endTime,
        totalTime: scene3TotalTime,
        endTime: FW.scene2.endTime + scene3TotalTime,
        songPoint: 221760,
        camAcceleration: .0001
      };
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
          return _this.initScene2();
        }
      };
      FW.scene2.update = function() {
        var currentTime, light;
        currentTime = Date.now();
        FW.fireflies.tick();
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
      return this.currentScene = FW.scene1;
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
      FW.camera.rotation.order = 'YXZ';
      FW.scene3.camRotStartX = FW.camera.rotation.x;
      FW.scene3.camRotEndX = Math.PI / 10;
      FW.scene3.camSpeed = FW.scene2.camSpeed;
      clearTimeout(FW.scene2.fireflyInterval);
      return this.currentScene = FW.scene3;
    };

    return Director;

  })();

}).call(this);
