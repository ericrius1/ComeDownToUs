(function() {
  var Main;

  if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
  }

  window.FW = {};

  if (typeof SC !== "undefined" && SC !== null) {
    SC.initialize({
      client_id: "7da24ca214bf72b66ed2494117d05480"
    });
  }

  FW.sfxVolume = 0.2;

  FW.globalTick = 0.16;

  FW.development = true;

  window.soundOn = !FW.development;

  window.onload = function() {
    FW.myWorld = new FW.World();
    FW.myWorld.animate();
    FW.main = new FW.Main();
    return document.addEventListener('keydown', FW.main.onKeyDown, false);
  };

  FW.Main = Main = (function() {
    function Main() {
      if (soundOn) {
        SC.stream("/tracks/come-down-to-us", function(sound) {
          if (soundOn) {
            return sound.play();
          }
        });
      }
    }

    Main.prototype.onKeyDown = function(event) {
      if (event.keyCode === 32) {
        return FW.myWorld.freeze();
      }
    };

    return Main;

  })();

}).call(this);

(function() {
  var Camera;

  FW.Camera = Camera = (function() {
    function Camera() {
      this.camFar = 2000000;
      this.camSpeed = .1;
      this.camStartingY = 5;
      FW.camera = new THREE.PerspectiveCamera(45.0, FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT, 1, this.camFar);
      FW.camera.position.set(0, this.camStartingY, 0);
      FW.camera.rotation.x -= Math.PI / 8;
      FW.camera.rotation.y -= Math.PI / 8;
    }

    Camera.prototype.resize = function() {
      FW.camera.aspect = FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT;
      return FW.camera.updateProjectionMatrix();
    };

    Camera.prototype.update = function() {
      FW.camera.position.z -= this.camSpeed;
      return FW.camera.rotation.y -= .0001;
    };

    return Camera;

  })();

}).call(this);

(function() {
  var Main;

  if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
  }

  window.FW = {};

  if (typeof SC !== "undefined" && SC !== null) {
    SC.initialize({
      client_id: "7da24ca214bf72b66ed2494117d05480"
    });
  }

  FW.sfxVolume = 0.2;

  FW.globalTick = 0.16;

  FW.development = true;

  window.soundOn = !FW.development;

  window.onload = function() {
    FW.myWorld = new FW.World();
    FW.myWorld.animate();
    FW.main = new FW.Main();
    return document.addEventListener('keydown', FW.main.onKeyDown, false);
  };

  FW.Main = Main = (function() {
    function Main() {
      if (soundOn) {
        SC.stream("/tracks/come-down-to-us", function(sound) {
          if (soundOn) {
            return sound.play();
          }
        });
      }
    }

    Main.prototype.onKeyDown = function(event) {
      if (event.keyCode === 32) {
        return FW.myWorld.freeze();
      }
    };

    return Main;

  })();

}).call(this);

(function() {
  var Sky;

  FW.Sky = Sky = (function() {
    var rnd;

    rnd = FW.rnd;

    function Sky() {
      this.currentTick = 1;
      this.finalTick = 0.02;
      this.skyGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png'),
        maxAge: 50
      });
      this.position = new THREE.Vector3(-FW.width / 2, 500, -FW.length / 2);
      this.generateSky(new THREE.Vector3().copy(this.position));
      FW.scene.add(this.skyGroup.mesh);
    }

    Sky.prototype.generateSky = function(position) {
      var colorStart, skyEmitter;
      colorStart = new THREE.Color(0x00ff00);
      skyEmitter = new ShaderParticleEmitter({
        size: 10000,
        sizeEnd: 10000,
        position: position,
        colorStart: colorStart,
        colorEnd: colorStart,
        velocity: new THREE.Vector3(5, 0, 0),
        acceleration: new THREE.Vector3(5, 0, 0),
        opacityEnd: 1,
        particlesPerSecond: 1
      });
      return this.skyGroup.addEmitter(skyEmitter);
    };

    Sky.prototype.tick = function() {
      this.skyGroup.tick(this.currentTick);
      if (this.currentTick > this.finalTick) {
        return this.currentTick -= .01;
      } else {
        return this.currentTick = this.finalTick;
      }
    };

    return Sky;

  })();

}).call(this);

(function() {
  var Sun;

  FW.Sun = Sun = (function() {
    var rnd;

    rnd = FW.rnd;

    function Sun() {
      this.currentTick = .018;
      this.sunGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png'),
        maxAge: 10
      });
      this.colorEnd = new THREE.Color();
      this.position = new THREE.Vector3(FW.width / 4, 500, -FW.length / 2);
      this.generateSun();
      this.sunGroup.mesh.renderDepth = -2;
      FW.scene.add(this.sunGroup.mesh);
    }

    Sun.prototype.generateSun = function() {
      var colorStart;
      colorStart = new THREE.Color(0xff0000);
      this.sunEmitter = new ShaderParticleEmitter({
        size: 30000,
        position: this.position,
        colorStart: colorStart,
        particlesPerSecond: 1
      });
      return this.sunGroup.addEmitter(this.sunEmitter);
    };

    Sun.prototype.tick = function() {
      this.sunGroup.tick(this.currentTick);
      return this.sunEmitter.position.y -= .05;
    };

    return Sun;

  })();

}).call(this);

(function() {
  var World,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  FW.World = World = (function() {
    function World() {
      this.animate = __bind(this.animate, this);
      var aMeshMirror, light, waterNormals,
        _this = this;
      this.camStartPosition;
      FW.clock = new THREE.Clock();
      FW.SCREEN_WIDTH = window.innerWidth;
      FW.SCREEN_HEIGHT = window.innerHeight;
      FW.width = 10000;
      FW.length = 10000;
      this.frozen = false;
      this.skyHue = .5;
      this.skySaturation = 0.9;
      this.skyLight = 0.5;
      this.skyColor = new THREE.Color();
      this.skyColor.setHSL(this.skyHue, 0.5, 0.5);
      FW.myCamera = new FW.Camera();
      this.controls = new THREE.OrbitControls(FW.camera);
      this.controls.enabled = false;
      FW.scene = new THREE.Scene();
      FW.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      FW.renderer.setSize(FW.SCREEN_WIDTH, FW.SCREEN_HEIGHT);
      FW.renderer.setClearColor(this.skyColor);
      document.body.appendChild(FW.renderer.domElement);
      light = new THREE.DirectionalLight(0xffffff, 1);
      FW.scene.add(light);
      this.sun = new FW.Sun();
      this.sky = new FW.Sky();
      this.loadTerrain(new THREE.Vector3(-FW.width / 4, -1, -FW.length / 2));
      waterNormals = new THREE.ImageUtils.loadTexture('assets/waternormals.jpg');
      waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
      this.water = new THREE.Water(FW.renderer, FW.camera, FW.scene, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        alpha: 1.0,
        distortionScale: 20
      });
      aMeshMirror = new THREE.Mesh(new THREE.PlaneGeometry(FW.width, FW.length, 50, 50), this.water.material);
      aMeshMirror.add(this.water);
      aMeshMirror.rotation.x = -Math.PI * 0.5;
      FW.scene.add(aMeshMirror);
      window.addEventListener("resize", (function() {
        return _this.onWindowResize();
      }), false);
      this.runShow();
    }

    World.prototype.onWindowResize = function(event) {
      FW.SCREEN_WIDTH = window.innerWidth;
      FW.SCREEN_HEIGHT = window.innerHeight;
      FW.renderer.setSize(FW.SCREEN_WIDTH, FW.SCREEN_HEIGHT);
      return FW.myCamera.resize();
    };

    World.prototype.animate = function() {
      var delta, time;
      requestAnimationFrame(this.animate);
      delta = FW.clock.getDelta();
      time = Date.now();
      this.sky.tick();
      this.sun.tick();
      this.water.material.uniforms.time.value += 1.0 / 60;
      if (!this.frozen) {
        FW.myCamera.update();
      } else {
        this.controls.update();
      }
      return this.render();
    };

    World.prototype.render = function() {
      this.water.render();
      return FW.renderer.render(FW.scene, FW.camera);
    };

    World.prototype.freeze = function() {
      this.frozen = !this.frozen;
      this.controls.enabled = !this.controls.enabled;
      return this.controls.target.z = FW.camera.position.z - 30;
    };

    World.prototype.runShow = function() {
      var _this = this;
      return setTimeout(function() {
        _this.skyColor.setHSL(_this.skyHue, _this.skySaturation, _this.skyLight);
        _this.skyHue = Math.min(_this.skyHue + .001, 1);
        _this.skySaturation = Math.max(0, _this.skySaturation -= 0.0005);
        _this.skyLight = Math.max(0, _this.skyLight -= 0.0005);
        FW.renderer.setClearColor(_this.skyColor);
        return _this.runShow();
      }, 100);
    };

    World.prototype.loadTerrain = function(position) {
      var parameters, terrain, terrainGeo, terrainMaterial;
      parameters = {
        alea: RAND_MT,
        generator: PN_GENERATOR,
        width: 10000,
        height: 400,
        widthSegments: 200,
        heightSegments: 200,
        depth: 2000,
        param: 4,
        filterparam: 1,
        filter: [CIRCLE_FILTER],
        postgen: [MOUNTAINS_COLORS],
        effect: [DESTRUCTURE_EFFECT]
      };
      terrainGeo = TERRAINGEN.Get(parameters);
      terrainMaterial = new THREE.MeshPhongMaterial({
        vertexColors: THREE.VertexColors,
        shading: THREE.FlatShading,
        side: THREE.DoubleSide
      });
      terrain = new THREE.Mesh(terrainGeo, terrainMaterial);
      terrain.position = position;
      return FW.scene.add(terrain);
    };

    return World;

  })();

}).call(this);
