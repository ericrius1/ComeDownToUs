(function() {
  var Director;

  FW.Director = Director = (function() {
    function Director() {
      var _this = this;
      this.timeTillSceneChange = 2000;
      this.colorChangeTime = 50;
      this.skyColor = new THREE.Color();
      this.frozen = false;
      this.controls = new THREE.OrbitControls(FW.camera);
      this.controls.enabled = false;
      this.controls.zoomSpeed = 0.5;
      this.controls.rotateSpeed = 0.5;
      FW.scene2 = {
        totalTime: 100000
      };
      this.skyLagFactor = 1.7;
      this.currentScene = 1;
      setTimeout(function() {
        return _this.changeScene();
      }, this.timeTillSceneChange);
    }

    Director.prototype.update = function() {
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
      this.hue = map(FW.sunLight.position.y, FW.sunStartingHeight, FW.endMapNum, 0.12, 0);
      this.light = map(FW.sunLight.position.y, FW.sunStartingHeight, FW.endMapNum * this.skyLagFactor, 0.5, 0.2);
      this.skyColor.setHSL(this.hue, 0.86, this.light);
      FW.renderer.setClearColor(this.skyColor);
      if (FW.sunLight.position.y > FW.sunFinalHeight) {
        FW.mySun.update();
      }
      return FW.myCamera.scene1Update();
    };

    Director.prototype.updateScene2 = function() {
      var currentTime, light;
      currentTime = Date.now();
      FW.fireflies.tick();
      FW.myCamera.scene2Update();
      light = map(currentTime, FW.scene2.startTime, FW.scene2.endTime, 0.2, 0);
      this.skyColor.setHSL(this.hue, 0.86, light);
      return FW.renderer.setClearColor(this.skyColor);
    };

    Director.prototype.changeScene = function() {
      FW.scene2.startTime = Date.now();
      FW.scene2.endTime = FW.scene2.startTime + FW.scene2.totalTime;
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
