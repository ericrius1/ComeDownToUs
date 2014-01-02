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
      var hue, light;
      hue = map(FW.sunLight.position.y, FW.sunStartingHeight, FW.endMapNum, 0.12, 0);
      light = map(FW.sunLight.position.y, FW.sunStartingHeight, FW.endMapNum * this.skyLagFactor, 0.5, 0.1);
      this.skyColor.setHSL(hue, 0.86, light);
      FW.renderer.setClearColor(this.skyColor);
      if (FW.sunLight.position.y > FW.sunFinalHeight) {
        FW.mySun.update();
      }
      if (FW.camera.position.z > FW.terrainPosition.z) {
        return FW.myCamera.scene1Update();
      }
    };

    Director.prototype.updateScene2 = function() {
      FW.fireflies.tick();
      return FW.myCamera.scene2Update();
    };

    Director.prototype.changeScene = function() {
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
