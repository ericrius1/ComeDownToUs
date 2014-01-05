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
        depth: 1100,
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
      this.createCoils();
    }

    Terrain.prototype.createCoils = function() {
      var coilNum, endPairPosZ, numCoils, portal1, portal2, portalGeo, portalMat, portalScale, startPairPosZ, zPortalPos, _i, _results;
      numCoils = 3;
      startPairPosZ = FW.scene2.startZ - 500;
      endPairPosZ = FW.scene2.endZ;
      portalGeo = new THREE.IcosahedronGeometry(1, 2);
      portalMat = new THREE.MeshPhongMaterial({
        shading: THREE.FlatShading,
        side: THREE.DoubleSide,
        specular: new THREE.Color(),
        shininess: 20
      });
      portalScale = 30;
      _results = [];
      for (coilNum = _i = 1; 1 <= numCoils ? _i <= numCoils : _i >= numCoils; coilNum = 1 <= numCoils ? ++_i : --_i) {
        portal1 = new THREE.Mesh(portalGeo, portalMat);
        portal1.scale.set(portalScale / 2, portalScale * 4, portalScale);
        zPortalPos = map(coilNum, 1, numCoils, startPairPosZ, endPairPosZ);
        console.log(zPortalPos);
        portal1.position.set(-100, portalScale, zPortalPos);
        FW.scene.add(portal1);
        portal2 = portal1.clone();
        portal2.position.set(100, portalScale, zPortalPos);
        _results.push(FW.scene.add(portal2));
      }
      return _results;
    };

    return Terrain;

  })();

}).call(this);
