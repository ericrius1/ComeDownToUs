(function() {
  var World;

  FW.World = World = (function() {
    function World() {
      var color,
        _this = this;
      FW.clock = new THREE.Clock();
      FW.SCREEN_WIDTH = window.innerWidth;
      FW.SCREEN_HEIGHT = window.innerHeight;
      this.rippleFactor = 120;
      FW.myCamera = new FW.Camera();
      FW.controls = new THREE.OrbitControls(FW.camera);
      FW.controls.enabled = false;
      FW.scene = new THREE.Scene();
      FW.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      FW.renderer.setSize(FW.SCREEN_WIDTH, FW.SCREEN_HEIGHT);
      document.body.appendChild(FW.renderer.domElement);
      color = new THREE.Color().setHSL(.12, .86, .5);
      FW.renderer.setClearColor(color);
      this.terrain = new FW.Terrain();
      FW.mySun = new FW.Sun();
      FW.fireflies = new FW.Fireflies();
      FW.wormHole = new FW.WormHole();
      FW.moonLight = new THREE.DirectionalLight(0xffffff, 0.2);
      FW.scene.add(FW.moonLight);
      this.loadWater();
      window.addEventListener("resize", (function() {
        return _this.onWindowResize();
      }), false);
    }

    World.prototype.onWindowResize = function(event) {
      FW.SCREEN_WIDTH = window.innerWidth;
      FW.SCREEN_HEIGHT = window.innerHeight;
      FW.renderer.setSize(FW.SCREEN_WIDTH, FW.SCREEN_HEIGHT);
      return FW.myCamera.resize();
    };

    World.prototype.render = function() {
      var time;
      time = Date.now();
      this.water.material.uniforms.time.value += 1.0 / this.rippleFactor;
      this.water.render();
      return FW.renderer.render(FW.scene, FW.camera);
    };

    World.prototype.loadWater = function() {
      var aMeshMirror, waterNormals;
      waterNormals = new THREE.ImageUtils.loadTexture('assets/waternormals.jpg');
      waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
      this.water = new THREE.Water(FW.renderer, FW.camera, FW.scene, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        alpha: 1.0,
        distortionScale: 20
      });
      aMeshMirror = new THREE.Mesh(new THREE.PlaneGeometry(FW.width, FW.height, 50, 50), this.water.material);
      aMeshMirror.add(this.water);
      aMeshMirror.rotation.x = -Math.PI * 0.5;
      return FW.scene.add(aMeshMirror);
    };

    return World;

  })();

}).call(this);
