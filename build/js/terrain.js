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
      var endHeightScale, endPairPosZ, heightScale, numPillarPairs, pillar1, pillar2, pillarGeo, pillarMat, pillarPairIndex, pillarScale, startHeightScale, startPairPosZ, zPillarPos, _i, _results;
      numPillarPairs = 50;
      this.pillars = [];
      startPairPosZ = FW.scene2.startZ - 200;
      endPairPosZ = FW.scene3.startZ - 2000;
      pillarScale = 1;
      startHeightScale = 1;
      endHeightScale = 2000;
      pillarGeo = new THREE.CylinderGeometry(1, 1, 1, 8, 1, true);
      pillarMat = new THREE.MeshPhongMaterial({
        shading: THREE.FlatShading,
        specular: new THREE.Color(),
        shininess: 1
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
        pillar1.finalY = heightScale / 2;
        pillar1.position.set(-FW.pillarPairDistance / 2, pillar1.startY, zPillarPos);
        FW.scene.add(pillar1);
        this.pillars.push(pillar1);
        pillar2 = pillar1.clone();
        pillar2.startY = -heightScale / 2;
        pillar2.finalY = heightScale / 2;
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
