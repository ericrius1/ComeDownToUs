(function() {
  var Sun;

  FW.Sun = Sun = (function() {
    function Sun() {
      this.startHue = 0.08;
      this.startLight = 0.6;
      FW.sunStartingHeight = 1200;
      this.initialScale = 380;
      this.sunColor = new THREE.Color();
      this.startIntensity = 7;
      this.endIntensity = 2;
      this.startHue = 0.08;
      this.endHue = 0.00;
      this.startLight = 0.6;
      this.endLight = 0.35;
      this.startScale = 300;
      this.endScale = 600;
      this.sunLight = new THREE.PointLight(0xffffff, this.startingIntensity, 10000);
      this.sunLight.position = new THREE.Vector3(0, FW.sunStartingHeight, FW.width);
      FW.scene.add(this.sunLight);
      this.sunGeo = new THREE.SphereGeometry(1, 100, 100);
      this.material = new THREE.MeshBasicMaterial();
      this.sunMesh = new THREE.Mesh(this.sunGeo, this.material);
      this.sunMesh.position = new THREE.Vector3(0, FW.sunStartingHeight, -FW.width);
      this.sunMesh.scale.set(this.initialScale, this.initialScale, this.initialScale);
      FW.scene.add(this.sunMesh);
      this.sunColor.setHSL(this.startHue, 0.86, this.startLight);
      this.sunMesh.material.color = this.sunColor;
      this.sunLight.color = this.sunColor;
    }

    Sun.prototype.update = function() {
      var currentTime, scale;
      currentTime = Date.now();
      scale = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, this.startScale, this.endScale);
      return this.sunMesh.scale.set(scale, scale, scale);
    };

    return Sun;

  })();

}).call(this);
