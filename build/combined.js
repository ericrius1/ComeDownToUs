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
      this.camStartingY = 11;
      FW.camera = new THREE.PerspectiveCamera(45.0, FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT, 1, this.camFar);
      FW.camera.position.set(0, this.camStartingY, 0);
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
  var Camera;

  FW.Camera = Camera = (function() {
    function Camera() {
      this.camSpeedupFactor = 1.001;
      this.camFar = 2000000;
      this.startCamHeight = 8;
      FW.camera = new THREE.PerspectiveCamera(45.0, FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT, 1, this.camFar);
      FW.camera.position.set(0, this.startCamHeight, FW.scene1.startZ);
      this.scene3Velocity = -1;
      this.scene3Acceleration = -.0015;
      this.scene4Acceleration = -.05;
      this.maxFinalVelocity = -10;
    }

    Camera.prototype.resize = function() {
      FW.camera.aspect = FW.SCREEN_WIDTH / FW.SCREEN_HEIGHT;
      return FW.camera.updateProjectionMatrix();
    };

    Camera.prototype.scene1Update = function() {
      var currentTime;
      currentTime = Date.now();
      return FW.camera.position.z = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, FW.scene1.startZ, FW.scene1.endZ);
    };

    Camera.prototype.scene2Update = function() {
      var currentTime;
      currentTime = Date.now();
      return FW.camera.position.z = map(currentTime, FW.scene2.startTime, FW.scene2.endTime, FW.scene2.startZ, FW.scene2.endZ);
    };

    Camera.prototype.scene3Update = function() {
      var currentTime;
      currentTime = Date.now();
      FW.camera.translateZ(this.scene3Velocity);
      this.scene3Velocity += this.scene3Acceleration;
      return FW.camera.position.y = map(currentTime, FW.scene3.startTime, FW.scene3.endTime, this.startCamHeight, FW.wormHole.height);
    };

    Camera.prototype.scene4Update = function() {
      FW.camera.position.z += FW.scene4.startVelocity;
      return FW.scene4.startVelocity = Math.max(this.maxFinalVelocity, FW.scene4.startVelocity + this.scene4Acceleration);
    };

    Camera.prototype.scene5Update = function() {
      return FW.camera.position.z += FW.scene4.startVelocity;
    };

    return Camera;

  })();

}).call(this);

(function() {
  var Director,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  FW.Director = Director = (function() {
    function Director() {
      this.run = __bind(this.run, this);
      var short;
      this.music = true;
      short = false;
      this.scene1TotalTime = 155550;
      this.scene2TotalTime = 67000;
      this.scene3TotalTime = 33930;
      this.scene4TotalTime = 20000;
      this.scene5TotalTime = 10000;
      this.startRaiseBridgeTime = 127500;
      this.setSongPoint = false;
      if (short) {
        this.setSongPoint = true;
        this.scene1TotalTime = 10000;
        this.scene2TotalTime = 67000;
        this.scene3TotalTime = 3000;
        this.scene4TotalTime = 20000;
        this.scene5TotalTime = 2000;
        this.startRaiseBridgeTime = 2000;
        this.endRaiseBridgeTime = 10000;
      }
      this.skyColor = new THREE.Color();
      this.frozen = false;
      this.startSkyHue = 0.12;
      this.endSkyHue = -0.18;
      this.startSkyLight = 0.5;
      this.endSkyLight = 0.15;
      this.currentScene = FW.scene1;
      this.skyColor.setHSL(this.startSkyHue, 0.86, this.startSkyLight);
      FW.beatInterval = 3530;
    }

    FW.scene1 = {
      startZ: FW.height * 0.4,
      endZ: FW.height * 0,
      totalTime: Director.scene1TotalTime
    };

    FW.scene2 = {
      songPoint: 154550,
      startZ: FW.scene1.endZ,
      endZ: -FW.width / 2 + 1000,
      totalTime: Director.scene2TotalTime
    };

    FW.scene3 = {
      songPoint: 221600,
      startZ: FW.scene2.endZ,
      endZ: -FW.height / 2 + 200,
      totalTime: Director.scene3TotalTime
    };

    FW.scene4 = {
      songPoint: 253930,
      startVolume: 100,
      endVolume: 20,
      totalTime: Director.scene4TotalTime
    };

    FW.scene5 = {
      startVolume: FW.scene4.endVolume,
      endVolume: 0,
      totalTime: Director.scene5TotalTime
    };

    FW.scene6 = {};

    Director.prototype.run = function() {
      var _ref;
      requestAnimationFrame(this.run);
      FW.myWorld.render();
      if (!this.frozen) {
        return (_ref = this.currentScene) != null ? _ref.update() : void 0;
      } else {
        return FW.controls.update();
      }
    };

    Director.prototype.beginShow = function() {
      var startTime,
        _this = this;
      if (!this.music) {
        FW.song.pause();
      }
      startTime = Date.now();
      FW.scene1.startTime = startTime;
      FW.scene1.totalTime = this.scene1TotalTime;
      FW.scene1.endTime = startTime + this.scene1TotalTime;
      FW.scene1.startRaiseBridgeTime = startTime + this.startRaiseBridgeTime;
      FW.scene1.endRaiseBridgeTime = FW.scene1.endTime;
      FW.scene2.startTime = FW.scene1.endTime;
      FW.scene2.endTime = FW.scene1.endTime + this.scene2TotalTime;
      FW.scene2.totalTime = this.scene2TotalTime;
      FW.scene3.startTime = FW.scene2.endTime;
      FW.scene3.totalTime = this.scene3TotalTime;
      FW.scene3.endTime = FW.scene2.endTime + this.scene3TotalTime;
      FW.scene4.startTime = FW.scene3.endTime;
      FW.scene4.totalTime = this.scene4TotalTime;
      FW.scene4.endTime = FW.scene3.endTime + this.scene4TotalTime;
      FW.scene5.startTime = FW.scene4.endTime;
      FW.scene5.endTime = FW.scene4.endTime + FW.scene5.totalTime;
      FW.scene1.update = function() {
        var currentTime, hue, light;
        currentTime = Date.now();
        hue = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, _this.startSkyHue, _this.endSkyHue);
        light = map(currentTime, FW.scene1.startTime, FW.scene1.endTime, _this.startSkyLight, _this.endSkyLight);
        _this.skyColor.setHSL(hue, 0.86, light);
        FW.renderer.setClearColor(_this.skyColor);
        FW.mySun.scene1Update();
        FW.myCamera.scene1Update();
        if (currentTime > FW.scene1.startRaiseBridgeTime) {
          FW.myTerrain.raiseBridge(currentTime);
        }
        if (currentTime > FW.scene1.endTime) {
          return _this.initScene2();
        }
      };
      FW.scene2.update = function() {
        var currentTime, light;
        currentTime = Date.now();
        FW.fireflies.tick();
        FW.mySun.scene2Update();
        FW.myCamera.scene2Update();
        light = map(currentTime, FW.scene2.startTime, FW.scene2.endTime, _this.endSkyLight, 0);
        _this.skyColor.setHSL(_this.endSkyHue, 0.86, light);
        FW.renderer.setClearColor(_this.skyColor);
        if (currentTime > FW.scene2.endTime) {
          return _this.initScene3();
        }
      };
      FW.scene3.update = function() {
        var currentTime;
        currentTime = Date.now();
        FW.myCamera.scene3Update();
        FW.wormHole.tick();
        if (currentTime > FW.scene3.endTime) {
          return _this.initScene4();
        }
      };
      FW.scene4.update = function() {
        var currentTime, volume;
        currentTime = Date.now();
        FW.wormHole.tick();
        FW.myCamera.scene4Update();
        volume = map(currentTime, FW.scene4.startTime, FW.scene4.endTime, 100, 0);
        FW.song.setVolume(volume);
        if (currentTime > FW.scene4.endTime) {
          return _this.initScene5();
        }
      };
      FW.scene5.update = function() {
        var currentTime, volume;
        FW.myCamera.scene5Update();
        currentTime = Date.now();
        volume = map(currentTime, FW.scene5.startTime, FW.scene5.endTime, FW.scene5.startVolume, FW.scene5.endVolume);
        FW.song.setVolume(volume);
        FW.wormHole.tick();
        if (currentTime > FW.scene5.endTime) {
          FW.wormHole.disperse();
          _this.currentScene = FW.scene6;
        }
        return FW.scene6.update = function() {
          return FW.myCamera.scene5Update();
        };
      };
      this.currentScene = FW.scene1;
      return this.run();
    };

    Director.prototype.freeze = function() {
      this.frozen = !this.frozen;
      FW.controls.enabled = !FW.controls.enabled;
      FW.controls.target.z = FW.camera.position.z - 30;
      if (this.frozen) {
        return FW.song.pause();
      } else {
        return FW.song.play();
      }
    };

    Director.prototype.initScene2 = function() {
      if (this.setSongPoint === true) {
        FW.song.setPosition(FW.scene2.songPoint);
      }
      this.currentScene = FW.scene2;
      FW.fireflies.runScene2();
      return FW.scene.remove(FW.mySun.sunMesh);
    };

    Director.prototype.initScene3 = function() {
      if (this.setSongPoint === true) {
        FW.song.setPosition(FW.scene3.songPoint);
      }
      FW.camera.rotation.order = 'YXZ';
      clearTimeout(FW.scene2.fireflyInterval);
      FW.fireflies.erase();
      FW.wormHole.activate();
      return this.currentScene = FW.scene3;
    };

    Director.prototype.initScene4 = function() {
      if (this.setSongPoint === true) {
        FW.song.setPosition(FW.scene4.songPoint);
      }
      FW.scene4.startVelocity = FW.myCamera.scene3Velocity;
      return this.currentScene = FW.scene4;
    };

    Director.prototype.initScene5 = function() {
      return this.currentScene = FW.scene5;
    };

    return Director;

  })();

}).call(this);

(function() {
  var Fireflies;

  FW.Fireflies = Fireflies = (function() {
    function Fireflies() {
      this.ffDistanceFromCam = 160;
      this.lightZOffsetFromFireFlies = 1000;
      this.ffDisableTime = 1000;
      this.slowDownFactor = 0.05;
      this.tickTime = .16 * this.slowDownFactor;
      this.ffToggledOn = false;
      this.ffHeight = 11;
      this.emitters = [];
      this.currentPosition = new THREE.Vector3();
      this.ffVelocityZ = 450;
      this.lightVelocityZ = 0;
      this.ffAccelZ = -2500;
      this.lightDistance = 2000;
      this.light = new THREE.PointLight(0xffffff, 0, this.lightDistance);
      FW.scene.add(this.light);
      this.light.color.setRGB(Math.random(), Math.random(), Math.random());
      this.startLightIntensity = 6;
      this.endLightIntensity = 4;
      this.lightAccelZ = this.ffAccelZ / 10000;
      this.testMesh = new THREE.Mesh(new THREE.SphereGeometry(5), new THREE.MeshBasicMaterial());
      this.firefliesGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/firefly.png'),
        maxAge: 1.5
      });
      this.generateFireflies(new THREE.Color().setRGB(Math.random(), Math.random(), Math.random()));
      this.generateFireflies(this.light.color);
      this.firefliesGroup.mesh.renderDepth = -3;
      FW.scene.add(this.firefliesGroup.mesh);
    }

    Fireflies.prototype.generateFireflies = function(colorStart) {
      var colorEnd, firefliesEmitter;
      colorEnd = new THREE.Color(0xcd40c0);
      firefliesEmitter = new ShaderParticleEmitter({
        particlesPerSecond: 5000,
        size: 30,
        sizeSpread: 30,
        sizeEnd: 30,
        colorStart: colorStart,
        colorEnd: colorEnd,
        positionSpread: new THREE.Vector3(FW.pillarPairDistance, 10, 10),
        velocity: new THREE.Vector3(0, 0, this.ffVelocityZ),
        velocitySpread: new THREE.Vector3(10, 30, 0),
        acceleration: new THREE.Vector3(0, 0, this.ffAccelZ),
        accelerationSpread: new THREE.Vector3(10, 0, 0),
        opacityStart: 1.0,
        opacityEnd: 1.0
      });
      this.firefliesGroup.addEmitter(firefliesEmitter);
      this.emitters.push(firefliesEmitter);
      return firefliesEmitter.disable();
    };

    Fireflies.prototype.runScene2 = function() {
      var _this = this;
      this.currentPosition = new THREE.Vector3().copy(FW.camera.position);
      this.currentPosition.z -= this.ffDistanceFromCam;
      this.currentPosition.y = this.ffHeight;
      this.startBeatTime = Date.now();
      this.lightBurst();
      this.ffPulse();
      return FW.scene2.fireflyInterval = setTimeout(function() {
        return _this.runScene2();
      }, FW.beatInterval);
    };

    Fireflies.prototype.ffPulse = function() {
      var emitter, _i, _len, _ref,
        _this = this;
      _ref = this.emitters;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        emitter = _ref[_i];
        emitter.position = this.currentPosition;
        emitter.enable();
      }
      return setTimeout(function() {
        return _this.disable();
      }, this.ffDisableTime);
    };

    Fireflies.prototype.disable = function() {
      var emitter, _i, _len, _ref, _results;
      _ref = this.emitters;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        emitter = _ref[_i];
        _results.push(emitter.disable());
      }
      return _results;
    };

    Fireflies.prototype.lightBurst = function() {
      this.light.position.z = this.currentPosition.z + this.lightZOffsetFromFireFlies;
      this.lightVelocityZ = 0;
      return this.lightAccelZ *= 0.99;
    };

    Fireflies.prototype.erase = function() {
      this.disable();
      return FW.scene.remove(this.firefliesGroup.mesh);
    };

    Fireflies.prototype.tick = function() {
      var currentTime, intensity;
      currentTime = Date.now();
      this.firefliesGroup.tick(this.tickTime);
      intensity = map(currentTime, this.startBeatTime, this.startBeatTime + FW.beatInterval * 0.8, this.startLightIntensity, this.endLightIntensity);
      this.light.intensity = intensity;
      this.light.position.z -= this.lightVelocityZ;
      this.lightVelocityZ -= this.lightAccelZ;
      return this.testMesh.position = this.light.position;
    };

    return Fireflies;

  })();

}).call(this);

(function() {
  var Main;

  window.FW = {};

  FW.width = 3000;

  FW.height = 12000;

  if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
  }

  FW.globalTick = 0.16;

  window.onload = function() {
    var _this = this;
    FW.song = document.getElementById('song');
    FW.song.play();
    FW.myDirector = new FW.Director();
    FW.main = new FW.Main();
    FW.myWorld = new FW.World();
    return FW.song.addEventListener('canplaythrough', function() {
      var songStartTime;
      console.log('PLAY');
      songStartTime = Date.now();
      return FW.myDirector.beginShow(songStartTime);
    });
  };

  FW.Main = Main = (function() {
    function Main() {}

    Main.prototype.onKeyDown = function(event) {
      if (event.keyCode === 32) {
        return FW.myDirector.freeze();
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
      this.position = new THREE.Vector3(-FW.width / 2, 3000, -FW.width);
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
    function Sun() {
      this.sunColor = new THREE.Color();
      this.startHue = 0.08;
      this.endHue = 0.00;
      this.startLight = 0.6;
      this.endLight = 0.35;
      this.scene1StartIntensity = 4;
      this.scene1EndIntensity = 1;
      this.scene2StartIntensity = this.scene1EndIntensity;
      this.scene2EndIntensity = .5;
      this.startScale = 600;
      this.endScale = 1200;
      this.startHeight = 1200;
      this.endHeight = -this.endScale - 10;
      this.startX = -300;
      this.endX = 0;
      this.sunLight = new THREE.DirectionalLight(0xffffff, this.startingIntensity, FW.height * 2);
      this.sunLight.position = new THREE.Vector3(0, this.startHeight, FW.height / 2);
      FW.scene.add(this.sunLight);
      this.sunGeo = new THREE.SphereGeometry(1, 100, 100);
      this.material = new THREE.MeshBasicMaterial();
      this.sunMesh = new THREE.Mesh(this.sunGeo, this.material);
      this.sunMesh.position = new THREE.Vector3(this.startX, this.startHeight, -FW.height / 2);
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

(function() {
  var Terrain;

  FW.Terrain = Terrain = (function() {
    function Terrain() {
      var leftMountain, mountainGeo, mountainParams, rightMountain, terrainMaterial;
      this.rotation = Math.PI * .45;
      FW.terrainLength = FW.width * 0.2;
      mountainParams = {
        alea: RAND_MT,
        generator: PN_GENERATOR,
        width: FW.terrainLength,
        height: FW.width,
        widthSegments: 150,
        heightSegments: 150,
        depth: 900,
        param: 4,
        filterparam: 1,
        filter: [CIRCLE_FILTER],
        postgen: [MOUNTAINS_COLORS],
        effect: [DESTRUCTURE_EFFECT]
      };
      mountainGeo = TERRAINGEN.Get(mountainParams);
      terrainMaterial = new THREE.MeshPhongMaterial({
        vertexColors: THREE.VertexColors,
        shading: THREE.FlatShading,
        side: THREE.DoubleSide
      });
      leftMountain = new THREE.Mesh(mountainGeo, terrainMaterial);
      leftMountain.position = new THREE.Vector3(-FW.width * 0.5, -100, -FW.width * .25);
      leftMountain.rotation.y -= this.rotation;
      FW.scene.add(leftMountain);
      rightMountain = new THREE.Mesh(mountainGeo, terrainMaterial);
      rightMountain.position = new THREE.Vector3(FW.width * 0.5, -100, -FW.width * 0.25);
      rightMountain.rotation.y += this.rotation;
      FW.scene.add(rightMountain);
      this.createBridge();
    }

    Terrain.prototype.createBridge = function() {
      var endHeightScale, endPairPosZ, heightScale, numPillarPairs, pillar1, pillar2, pillarGeo, pillarHeightOffset, pillarMat, pillarPairIndex, pillarScale, startHeightScale, startPairPosZ, zPillarPos, _i, _results;
      numPillarPairs = 50;
      this.pillars = [];
      startPairPosZ = FW.scene2.startZ - 200;
      endPairPosZ = FW.scene3.startZ - 2000;
      pillarScale = 1;
      startHeightScale = 1;
      endHeightScale = 2000;
      pillarHeightOffset = 20;
      pillarGeo = new THREE.CylinderGeometry(1, 1, 1, 8, 1, true);
      pillarMat = new THREE.MeshPhongMaterial({
        shading: THREE.FlatShading,
        specular: new THREE.Color(),
        shininess: 10
      });
      FW.pillarPairDistance = 400;
      _results = [];
      for (pillarPairIndex = _i = 1; 1 <= numPillarPairs ? _i <= numPillarPairs : _i >= numPillarPairs; pillarPairIndex = 1 <= numPillarPairs ? ++_i : --_i) {
        pillar1 = new THREE.Mesh(pillarGeo, pillarMat);
        if (pillarPairIndex < numPillarPairs / 2) {
          heightScale = map(pillarPairIndex, 1, numPillarPairs, startHeightScale, endHeightScale);
        } else {
          heightScale = map(pillarPairIndex, 1, numPillarPairs, endHeightScale, startHeightScale);
        }
        pillar1.scale.set(pillarScale, heightScale, pillarScale);
        zPillarPos = map(pillarPairIndex, 1, numPillarPairs, startPairPosZ, endPairPosZ);
        pillar1.startY = -heightScale / 2;
        pillar1.finalY = heightScale / 2 - pillarHeightOffset;
        pillar1.position.set(-FW.pillarPairDistance / 2, pillar1.startY, zPillarPos);
        FW.scene.add(pillar1);
        this.pillars.push(pillar1);
        pillar2 = pillar1.clone();
        pillar2.startY = -heightScale / 2;
        pillar2.finalY = heightScale / 2 - pillarHeightOffset;
        pillar2.position.set(FW.pillarPairDistance / 2, pillar2.startY, zPillarPos);
        FW.scene.add(pillar2);
        _results.push(this.pillars.push(pillar2));
      }
      return _results;
    };

    Terrain.prototype.raiseBridge = function(currentTime) {
      var newYPos, pillar, _i, _len, _ref, _results;
      _ref = this.pillars;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pillar = _ref[_i];
        newYPos = map(currentTime, FW.scene1.startRaiseBridgeTime, FW.scene1.endRaiseBridgeTime, pillar.startY, pillar.finalY);
        _results.push(pillar.position.y = newYPos);
      }
      return _results;
    };

    return Terrain;

  })();

}).call(this);

(function() {
  var World;

  FW.World = World = (function() {
    function World() {
      var color,
        _this = this;
      FW.clock = new THREE.Clock();
      FW.SCREEN_WIDTH = window.innerWidth;
      FW.SCREEN_HEIGHT = window.innerHeight;
      this.rippleFactor = 90;
      this.waterDistortion = 20;
      FW.myCamera = new FW.Camera();
      FW.controls = new THREE.OrbitControls(FW.camera);
      FW.controls.enabled = false;
      FW.scene = new THREE.Scene();
      FW.renderer = new THREE.WebGLRenderer();
      FW.renderer.setSize(FW.SCREEN_WIDTH, FW.SCREEN_HEIGHT);
      document.body.appendChild(FW.renderer.domElement);
      color = new THREE.Color().setHSL(.12, .86, .5);
      FW.renderer.setClearColor(color);
      FW.myTerrain = new FW.Terrain();
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
        distortionScale: this.waterDistortion
      });
      aMeshMirror = new THREE.Mesh(new THREE.PlaneGeometry(FW.width, FW.height, 50, 50), this.water.material);
      aMeshMirror.add(this.water);
      aMeshMirror.rotation.x = -Math.PI * 0.5;
      return FW.scene.add(aMeshMirror);
    };

    return World;

  })();

}).call(this);

(function() {
  var WormHole;

  FW.WormHole = WormHole = (function() {
    function WormHole() {
      this.tickTime = 0.08;
      this.height = 75;
      this.ySpread = 50;
      this.zSpread = FW.height / 2;
      this.zDistanceFromCam = this.zSpread / 2;
      this.wormHoleGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('assets/star.png'),
        maxAge: 10,
        blending: THREE.AdditiveBlending
      });
      this.generateWormHole();
      this.wormHoleGroup.mesh.renderDepth = -3;
      FW.scene.add(this.wormHoleGroup.mesh);
    }

    WormHole.prototype.generateWormHole = function() {
      var colorEnd, colorStart;
      colorStart = new THREE.Color().setRGB(Math.random(), Math.random(), Math.random());
      colorEnd = new THREE.Color().setRGB(Math.random(), Math.random(), Math.random());
      this.wormHoleEmitter = new ShaderParticleEmitter({
        particlesPerSecond: 10000,
        size: 10,
        sizeSpread: 10,
        sizeEnd: 1,
        colorStart: colorStart,
        colorSpread: new THREE.Vector3(Math.random(), Math.random(), Math.random()),
        colorEnd: colorEnd,
        position: new THREE.Vector3(0, this.height, FW.scene3.startZ + this.zSpread / 2),
        positionSpread: new THREE.Vector3(200, this.ySpread, this.zSpread),
        velocity: new THREE.Vector3(0, 0, -50),
        acceleration: new THREE.Vector3(0, 0, 0),
        opacityEnd: 1
      });
      this.wormHoleGroup.addEmitter(this.wormHoleEmitter);
      return this.wormHoleEmitter.disable();
    };

    WormHole.prototype.activate = function() {
      return this.wormHoleEmitter.enable();
    };

    WormHole.prototype.disperse = function() {
      console.log("DISPERSE");
      return this.wormHoleEmitter.disable();
    };

    WormHole.prototype.tick = function() {
      this.wormHoleEmitter.position.z = FW.camera.position.z - this.zDistanceFromCam;
      return this.wormHoleGroup.tick(this.tickTime);
    };

    return WormHole;

  })();

}).call(this);
