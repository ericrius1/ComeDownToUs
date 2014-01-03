
FW.World = class World
  constructor : ->
    FW.clock = new THREE.Clock()
    FW.SCREEN_WIDTH = window.innerWidth
    FW.SCREEN_HEIGHT = window.innerHeight
    FW.width = 3000
    @rippleFactor = 120

    # CAMERA
    FW.myCamera = new FW.Camera()

    # SCENE 
    FW.scene = new THREE.Scene()

    # RENDERER
    FW.renderer = new THREE.WebGLRenderer(antialias: true)
    FW.renderer.setSize FW.SCREEN_WIDTH, FW.SCREEN_HEIGHT
    document.body.appendChild FW.renderer.domElement
    

    #TERRAIN
    @terrain = new FW.Terrain()
    
    #SUN
    FW.mySun = new FW.Sun()

    #FIREFLIES
    FW.fireflies = new FW.Fireflies()

    #LIGHT
    FW.moonLight = new THREE.DirectionalLight 0xffffff, 0.2
    FW.scene.add FW.moonLight

    #WATER
    @loadWater()

    # EVENTS
    window.addEventListener "resize", (=>
      @onWindowResize()
    ), false
  
  onWindowResize : (event) ->
    FW.SCREEN_WIDTH = window.innerWidth
    FW.SCREEN_HEIGHT = window.innerHeight
    FW.renderer.setSize FW.SCREEN_WIDTH, FW.SCREEN_HEIGHT
    FW.myCamera.resize()

  animate : =>
    requestAnimationFrame @animate
    time = Date.now()
    FW.myDirector.update()
    @water.material.uniforms.time.value += 1.0 / @rippleFactor
    @render()

  render : ->
    @water.render()
    FW.renderer.render( FW.scene, FW.camera );

  loadWater:   ->
    waterNormals = new THREE.ImageUtils.loadTexture 'assets/waternormals.jpg'
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
    @water = new THREE.Water FW.renderer, FW.camera, FW.scene,
      textureWidth: 512
      textureHeight: 512
      waterNormals: waterNormals
      alpha: 1.0
      distortionScale: 20

    aMeshMirror = new THREE.Mesh(
      new THREE.PlaneGeometry FW.width, FW.width, 50, 50
      @water.material
    )
    aMeshMirror.add @water
    aMeshMirror.rotation.x = -Math.PI * 0.5
    FW.scene.add aMeshMirror    
