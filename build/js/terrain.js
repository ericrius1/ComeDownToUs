(function() {
  var Terrain;

  FW.Terrain = Terrain = (function() {
    function Terrain() {
      var leftMountain, mountainGeo, mountainParams, portalGeo, portalMat, portalScale, rightMountain, terrainMaterial;
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
      portalGeo = new THREE.IcosahedronGeometry(1, 2);
      portalMat = new THREE.MeshPhongMaterial({
        shading: THREE.FlatShading,
        side: THREE.DoubleSide,
        specular: new THREE.Color(),
        shininess: 4
      });
      FW.portal = new THREE.Mesh(portalGeo, portalMat);
      portalScale = 100;
      FW.portal.scale.set(portalScale, portalScale, portalScale);
      FW.portal.position.set(0, 0, FW.scene2.endZ + portalScale);
      FW.scene.add(FW.portal);
    }

    return Terrain;

  })();

}).call(this);
