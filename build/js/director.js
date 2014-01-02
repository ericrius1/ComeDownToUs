(function() {
  var Director;

  FW.Director = Director = (function() {
    function Director() {
      var startTime, totalTime,
        _this = this;
      this.colorChangeTime = 50;
      this.skyColor = new THREE.Color();
      this.frozen = false;
      this.controls = new THREE.OrbitControls(FW.camera);
      this.controls.enabled = false;
      this.controls.zoomSpeed = 0.5;
      this.controls.rotateSpeed = 0.5;
      startTime = Date.now();
      totalTime = 1000;
      FW.scene1 = {
        startTime: startTime,
        totalTime: totalTime,
        endTime: startTime + totalTime
      };
      FW.scene2 = {
        startTime: FW.scene1.endTime,
        endTime: FW.scene1.endTime + 101000,
        totalTime: 101000,
        camSpeed: 0.2,
        camAcceleration: 0.00012,
        beatInterval: 3558
      };
      this.currentScene = FW.scene1;
      this.skyLagFactor = 1.7;
      FW.scene1.update = function() {
        _this.hue = map(_this.currentTime, FW.scene1.startTime, FW.scene1.endTime, 0.12, 0);
        _this.light = map(_this.currentTime, FW.scene1.startTime, FW.scene1.endTime, 0.5, 0.2);
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

    Director.prototype.update = function() {
      this.currentTime = Date.now();
      if (!this.frozen) {
        return this.currentScene.update();
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

    return Director;

  })();

}).call(this);
