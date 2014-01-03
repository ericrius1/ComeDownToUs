(function() {
  var Sun;

  FW.Sun = Sun = (function() {
    function Sun() {
      this.sunColor = new THREE.Color();
      this.startHue = 0.08;
      this.endHue = 0.00;
      this.startLight = 0.6;
      this.endLight = 0.35;
      this.startIntensity = 5;
      this.endIntensity = 2;
      this.startScale = 300;
      this.endScale = 600;
      this.startHeight = 1200;
      this.endHeight = -613;
      this.sunLight = new THREE.PointLight(0xffffff, this.startingIntensity, 10000);
      this.sunLight.position = new THREE.Vector3(0, this.startHeight, FW.width);
      FW.scene.add(this.sunLight);
      this.sunGeo = new THREE.SphereGeometry(1, 100, 100);
      this.material = new THREE.MeshBasicMaterial();
      this.sunMesh = new THREE.Mesh(this.sunGeo, this.material);
      this.sunMesh.position = new THREE.Vector3(0, this.startHeight, -FW.width);
      this.sunMesh.scale.set(this.startScale, this.startScale, this.startScale);
      FW.scene.add(this.sunMesh);
      this.sunColor.setHSL(this.startHue, 0.86, this.startLight);
      this.sunMesh.material.color = this.sunColor;
      this.sunLight.color = this.sunColor;
      this.sunLight.intensity = this.startIntensity;
    }

    Sun.prototype.update = function() {
      var currentTime, hue, light, scale;
      currentTime = Date.now();
      this.sunMesh.position.y = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, this.startHeight, this.endHeight);
      scale = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, this.startScale, this.endScale);
      this.sunMesh.scale.set(scale, scale, scale);
      this.sunLight.intensity = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, this.startIntensity, this.endIntensity);
      hue = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, this.startHue, this.endHue);
      light = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, this.startLight, this.endLight);
      return this.sunColor.setHSL(hue, 0.9, light);
    };

    return Sun;

  })();

}).call(this);
