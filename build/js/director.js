(function() {
  var Director;

  FW.Director = Director = (function() {
    function Director() {
      var startTime,
        _this = this;
      this.colorChangeTime = 50;
      this.skyColor = new THREE.Color();
      this.frozen = false;
      this.controls = new THREE.OrbitControls(FW.camera);
      this.controls.enabled = false;
      this.controls.zoomSpeed = 0.5;
      this.controls.rotateSpeed = 0.5;
      startTime = Date.now();
      FW.scene1 = {
        startTime: startTime,
        totalTime: 155000,
        endTime: startTime + 155000
      };
      FW.scene2 = {
        startTime: FW.scene1.endTime,
        totalTime: 100000,
        endTime: FW.scene1.endTime + 100000,
        camSpeed: 0.2,
        camAcceleration: 0.00012
      };
      this.skyLagFactor = 1.7;
      this.currentScene = 1;
      setTimeout(function() {
        return _this.changeScene();
      }, FW.scene1.totalTime);
    }

    Director.prototype.update = function() {
      this.currentTime = Date.now();
      if (!this.frozen) {
        if (this.currentScene === 1) {
          return this.updateScene1();
        } else {
          return this.updateScene2();
        }
      } else {
        return this.controls.update();
      }
    };

    Director.prototype.updateScene1 = function() {
      this.hue = map(this.currentTime, FW.scene1.startTime, FW.scene1.endTime, 0.12, 0);
      this.light = map(this.currentTime, FW.scene1.startTime, FW.scene1.endTime, 0.5, 0.2);
      this.skyColor.setHSL(this.hue, 0.86, this.light);
      FW.renderer.setClearColor(this.skyColor);
      if (FW.sunLight.position.y > FW.sunFinalHeight) {
        FW.mySun.update();
      }
      return FW.myCamera.scene1Update();
    };

    Director.prototype.updateScene2 = function() {
      var light;
      FW.fireflies.tick();
      FW.myCamera.scene2Update();
      light = map(this.currentTime, FW.scene2.startTime, FW.scene2.endTime, 0.2, 0);
      this.skyColor.setHSL(this.hue, 0.86, light);
      return FW.renderer.setClearColor(this.skyColor);
    };

    Director.prototype.changeScene = function() {
      FW.scene2.startingCamPosX = FW.camera.positionX;
      FW.scene2.endingCamPosX = FW.width / 2;
      this.currentScene++;
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
