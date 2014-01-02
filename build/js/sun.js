(function() {
  var Sun;

  FW.Sun = Sun = (function() {
    function Sun() {
      FW.sunsetSpeed = 0.2;
      FW.sunStartingHeight = 1200;
      FW.sunFinalHeight = -FW.sunStartingHeight;
      this.initialScale = 240;
      this.startingIntensity = 20;
      this.endIntensity = 5;
      this.maxScale = 700;
      this.sunColor = new THREE.Color();
      this.scaleFactor = 0.001;
      FW.endMapNum = FW.sunFinalHeight / 2;
      FW.sunLight = new THREE.SpotLight(0xff0000, this.startingIntensity, FW.width * 10);
      FW.sunLight.position = new THREE.Vector3(FW.width * 0.7, FW.sunStartingHeight, -FW.width * 0.1);
      FW.scene.add(FW.sunLight);
      this.sunGeo = new THREE.SphereGeometry(1, 100, 100);
      this.material = new THREE.MeshBasicMaterial();
      this.sunMesh = new THREE.Mesh(this.sunGeo, this.material);
      this.sunMesh.position = FW.sunLight.position;
      this.sunMesh.scale.set(this.initialScale, this.initialScale, this.initialScale);
      FW.scene.add(this.sunMesh);
    }

    Sun.prototype.update = function() {
      var hue, light, scale, sunPosY;
      FW.sunLight.position.y -= FW.sunsetSpeed;
      sunPosY = FW.sunLight.position.y;
      FW.sunLight.intensity = map(sunPosY, FW.sunStartingHeight, FW.endMapNum, this.startingIntensity, this.endIntensity);
      hue = map(sunPosY, FW.sunStartingHeight, FW.endMapNum * 0.01, 0.08, .001);
      light = map(sunPosY, FW.sunStartingHeight, FW.endMapNum, 0.6, 0.3);
      this.sunColor.setHSL(hue, 0.86, light);
      this.sunMesh.material.color = this.sunColor;
      FW.sunLight.color = this.sunColor;
      if (FW.sunLight.position.y > 0) {
        FW.sunLight.position.z += FW.sunsetSpeed * 0.12;
      }
      if (this.sunMesh.scale.y < this.maxScale) {
        scale = this.sunMesh.scale.multiplyScalar(1 + FW.sunsetSpeed * this.scaleFactor);
        return this.sunMesh.scale = scale;
      }
    };

    return Sun;

  })();

}).call(this);
