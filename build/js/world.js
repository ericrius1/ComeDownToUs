(function() {
  var World,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  FW.World = World = (function() {
    function World() {
      this.animate = __bind(this.animate, this);
      var _this = this;
      this.camStartPosition;
      FW.clock = new THREE.Clock();
      FW.SCREEN_WIDTH = window.innerWidth;
      FW.SCREEN_HEIGHT = window.innerHeight;
      FW.width = 6000;
      this.rippleFactor = 120;
      FW.myCamera = new FW.Camera();
      FW.scene = new THREE.Scene();
      FW.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      FW.renderer.setSize(FW.SCREEN_WIDTH, FW.SCREEN_HEIGHT);
      document.body.appendChild(FW.renderer.domElement);
      this.terrain = new FW.Terrain();
      FW.mySun = new FW.Sun();
      FW.fireflies = new FW.Fireflies();
      FW.moonLight = new THREE.DirectionalLight(0xffffff, 0.2);
      FW.scene.add(FW.moonLight);
      this.loadWater();
      window.addEventListener("resize", (function() {
        return _this.onWindowResize();
      }), false);
      FW.myDirector = new FW.Director();
    }

    World.prototype.onWindowResize = function(event) {
      FW.SCREEN_WIDTH = window.innerWidth;
      FW.SCREEN_HEIGHT = window.innerHeight;
      FW.renderer.setSize(FW.SCREEN_WIDTH, FW.SCREEN_HEIGHT);
      return FW.myCamera.resize();
    };

    World.prototype.animate = function() {
      var time;
      requestAnimationFrame(this.animate);
      time = Date.now();
      FW.myDirector.update();
      this.water.material.uniforms.time.value += 1.0 / this.rippleFactor;
      return this.render();
    };

    World.prototype.render = function() {
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
      aMeshMirror = new THREE.Mesh(new THREE.PlaneGeometry(FW.width, FW.width, 50, 50), this.water.material);
      aMeshMirror.add(this.water);
      aMeshMirror.rotation.x = -Math.PI * 0.5;
      return FW.scene.add(aMeshMirror);
    };

    return World;

  })();

}).call(this);
