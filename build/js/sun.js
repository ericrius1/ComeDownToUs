(function() {
  var Sun;

  FW.Sun = Sun = (function() {
    function Sun() {
      this.sunColor = new THREE.Color();
      this.startHue = 0.08;
      this.endHue = 0.00;
      this.startLight = 0.6;
      this.endLight = 0.35;
      this.scene1StartIntensity = 4;
      this.scene1EndIntensity = 2;
      this.scene2StartIntensity = this.scene1EndIntensity;
      this.scene2EndIntensity = 0.1;
      this.startScale = 300;
      this.endScale = 700;
      this.startHeight = 1200;
      this.endHeight = -this.endScale - 10;
      this.startX = -500;
      this.endX = 300;
      this.sunLight = new THREE.DirectionalLight(0xffffff, this.startingIntensity, 7000);
      this.sunLight.position = new THREE.Vector3(0, this.startHeight, FW.width);
      FW.scene.add(this.sunLight);
      this.sunGeo = new THREE.SphereGeometry(1, 100, 100);
      this.material = new THREE.MeshBasicMaterial();
      this.sunMesh = new THREE.Mesh(this.sunGeo, this.material);
      this.sunMesh.position = new THREE.Vector3(this.startX, this.startHeight, -FW.width);
      this.sunMesh.scale.set(this.startScale, this.startScale, this.startScale);
      FW.scene.add(this.sunMesh);
      this.sunColor.setHSL(this.startHue, 0.86, this.startLight);
      this.sunMesh.material.color = this.sunColor;
      this.sunLight.color = this.sunColor;
      this.sunLight.intensity = this.scene1StartIntensity;
    }

    Sun.prototype.scene1Update = function() {
      var currentTime, hue, light, scale, yPos;
      currentTime = Date.now();
      yPos = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, this.startHeight, this.endHeight);
      this.sunMesh.position.y = yPos;
      this.sunLight.position.y = yPos;
      this.sunMesh.position.x = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, this.startX, this.endX);
      scale = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, this.startScale, this.endScale);
      this.sunMesh.scale.set(scale, scale, scale);
      this.sunLight.intensity = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, this.scene1StartIntensity, this.scene1EndIntensity);
      hue = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, this.startHue, this.endHue);
      light = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, this.startLight, this.endLight);
      return this.sunColor.setHSL(hue, 0.9, light);
    };

    Sun.prototype.scene2Update = function() {
      var currentTime;
      currentTime = Date.now();
      return this.sunLight.intensity = map(currentTime, FW.scene2.startTime, FW.scene2.endTime, this.scene2StartIntensity, this.scene2EndIntensity);
    };

    return Sun;

  })();

}).call(this);
