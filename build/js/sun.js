(function() {
  var Sun;

  FW.Sun = Sun = (function() {
    function Sun() {
      FW.sunsetSpeed = 2;
      this.startHue = 0.08;
      this.startLight = 0.6;
      FW.sunStartingHeight = 1200;
      FW.sunFinalHeight = -FW.sunStartingHeight;
      this.initialScale = 380;
      this.maxScale = 800;
      this.sunColor = new THREE.Color();
      this.scaleFactor = 0.001;
      FW.endMapNum = FW.sunFinalHeight / 2;
      this.startingIntensity = 18;
      this.endIntensity = 9;
      this.startHue = 0.08;
      this.endHue = 0.00;
      this.startLight = 0.6;
      this.endLight = 0.45;
      FW.sunLight = new THREE.SpotLight(0xffffff, this.startingIntensity, FW.width * 10);
      FW.sunLight.position = new THREE.Vector3(FW.width * 0.7, FW.sunStartingHeight, -FW.width * 0.1);
      FW.scene.add(FW.sunLight);
      this.sunGeo = new THREE.SphereGeometry(1, 100, 100);
      this.material = new THREE.MeshBasicMaterial();
      this.sunMesh = new THREE.Mesh(this.sunGeo, this.material);
      this.sunMesh.position = FW.sunLight.position;
      this.sunMesh.scale.set(this.initialScale, this.initialScale, this.initialScale);
      FW.scene.add(this.sunMesh);
      this.sunColor.setHSL(this.startHue, 0.86, this.startLight);
      this.sunMesh.material.color = this.sunColor;
      FW.sunLight.color = this.sunColor;
    }

    Sun.prototype.update = function() {
      var hue, light, scale, sunPosY;
      FW.sunLight.position.y -= FW.sunsetSpeed;
      sunPosY = FW.sunLight.position.y;
      FW.sunLight.intensity = map(sunPosY, FW.sunStartingHeight, FW.endMapNum, this.startingIntensity, this.endIntensity);
      hue = map(sunPosY, FW.sunStartingHeight, FW.endMapNum * 0.01, this.startHue, this.endHue);
      light = map(sunPosY, FW.sunStartingHeight, FW.endMapNum, this.startLight, this.endLight);
      this.sunColor.setHSL(hue, 0.9, light);
      this.sunMesh.material.color = this.sunColor;
      FW.sunLight.color = this.sunColor;
      FW.sunLight.position.z += FW.sunsetSpeed;
      if (this.sunMesh.scale.y < this.maxScale) {
        scale = this.sunMesh.scale.multiplyScalar(1 + FW.sunsetSpeed * this.scaleFactor);
        return this.sunMesh.scale = scale;
      }
    };

    return Sun;

  })();

}).call(this);
