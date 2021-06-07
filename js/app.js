//Variables for setup

let container;
let camera;
let renderer;
let scene;
let watch;
// let gui = new dat.GUI();
function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 30, 250);
  // camera.position.set(0, 0, 0);
  // guiEffect(camera)

  // const ambient = new THREE.AmbientLight(0x202020, .5);
  // scene.add(ambient);
  // guiColor(ambient,'#ff0000')
  // guiEffect()

  const light = new THREE.DirectionalLight(0xffffff, 0.5);
  light.position.set(0, 10, 13);
  scene.add(light);

  
  const light2 = new THREE.DirectionalLight(0xffffff, 0.7);
  light2.position.set(2.2, 7, -0.7);
  scene.add(light2);

  
  const light3 = new THREE.DirectionalLight(0xffffff, 2);
  light3.position.set(-1, 0, 0);
  scene.add(light3);

  const light4 = new THREE.DirectionalLight(0xffffff, 0.5);
  light4.position.set(0, -16, 6.3);
  scene.add(light4);

  const light5 = new THREE.DirectionalLight(0xffffff, 0.5);
  light5.position.set(-2.2, -1, -3);
  scene.add(light5);

  
  const light6 = new THREE.DirectionalLight(0xffffff, 0.5);
  light6.position.set(1, 0, 0);
  scene.add(light6);



  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Model
  let loader = new THREE.GLTFLoader();
  loader.load("watch/assets/3DElements/watch.glb", function(gltf) {
    scene.add(gltf.scene);
    watch = gltf.scene.children[0];
    watch.position.set(2,10,116)
    watch.rotation.y = 4.7
    animate();
  });

  // let elements = ['Cell','DiscGear','DualGear','Hand','innerGear','WheelGear','Cell','DiscGear','DualGear','Hand','innerGear','WheelGear','DiscGear','DualGear','Hand','innerGear','WheelGear','Cell','DiscGear','DualGear','Hand']
  let elements = ['Cell','DiscGear','DualGear','Hand','innerGear','WheelGear','Cell','DiscGear','DualGear','Hand','innerGear']

  elements.forEach((e,i) => {
    loader.load('../../assets/3DElements/'+e+'.glb',(gltf)=>{
      scene.add(gltf.scene)
      ele = gltf.scene.children[0]
      // ele.position.set(-80,0,0)
      elementAnimation(ele,i)
      
    })
  })

  // loader.load("../assets/3DElements/cell.glb", function(gltf) {
  //   scene.add(gltf.scene);
  //   element = gltf.scene.children[0]
  //   guiEffect(element)
  //   // watch = gltf.scene.children[0];
  //   // watch.position.set(2,10,116)
  //   // watch.rotation.y = 4.7
  //   // animate();2,8,13,19 
  // });

}

function elementAnimation(element,i){
  if(i=== 0){
    element.position.set(-140,-40,100)
    rotatonAnimationX(element)
    // gsap.fromTo(element.position,{z:80},{z:-800,repeat: -1,duration: 10})
  } else if(i=== 1){
    element.position.set(-120,50,0)
    rotatonAnimationY(element)
    // gsap.fromTo(element.position,{z:80},{z:-800,repeat: 1,duration: 10,delay: 0})
  } else if(i === 2){
    element.scale.set(5,5,5)
    element.position.set(110,20,200)
    rotatonAnimationX(element)

    // gsap.fromTo(element.position,{z:80},{z:-800,repeat: 1,duration: 10,delay: 3})
  } else if(i === 3){
    element.scale.set(5,5,5)
    element.position.set(70,39,500)
    rotatonAnimationZ(element)
    // gsap.fromTo(element.position,{z:400},{z:-800,repeat: 1,duration: 10})
  } else if(i === 4){
    element.position.set(-50,-50,500)
    rotatonAnimationX(element)
    // gsap.fromTo(element.position,{z:80},{z:-800,repeat: 1,duration: 10,delay: 4})
  } else if(i === 5){
    element.position.set(60,-50,760)
    rotatonAnimationY(element)
    // gsap.fromTo(element.position,{z:80},{z:-800,repeat: 1,duration: 10,delay: 1})
  } else if(i === 6){
    element.position.set(-90,3,0)
    rotatonAnimationY(element)
  } else if(i === 7){
    element.position.set(150,80,0)
    rotatonAnimationX(element)
  } else if(i === 8){
    element.position.set(-200,90,0)
    element.scale.set(6,6,6)
    rotatonAnimationY(element)
  }  
}
function nxAxis(direction){
  direction.position.x += 0.5
  direction.position.y -= 0.2
  direction.scale.x -= 0.002
  direction.scale.y -= 0.002
  direction.scale.z -= 0.002
  direction.rotation.y += 0.008;
  requestAnimationFrame(()=>{
    nxAxis(direction)
  })
  if(direction.position.x >= 200){
    direction.position.x = -200
    direction.position.y = 100
    direction.scale.x = 7
    direction.scale.y = 7
    direction.scale.z = 7
  }
}
function xAxis(direction){
  direction.position.x += 0.5
  direction.scale.x -= 0.002
  direction.scale.y -= 0.002
  direction.rotation.y += 0.008;
  requestAnimationFrame(()=>{
    xAxis(direction)
  })
  if(direction.position.x >= 200){
    direction.position.x = -200
    direction.scale.x = 1.5
    direction.scale.y = 1.5
  }
}

function yAxis(direction){
  direction.rotation.x += 0.008;
  direction.position.x -= .85;
  direction.position.y -= 0.3;
  direction.scale.x -= 0.002
  direction.scale.y -= 0.002
  requestAnimationFrame(()=>{
    yAxis(direction)
  })
  if(direction.position.x <= -200){
    direction.position.x = 180
    direction.position.y = 100
    direction.scale.x = 1.5
    direction.scale.y = 1.5  
  }
}
function rotatonAnimationX(direction){
  direction.rotation.x += 0.008;
  direction.position.z -= 1.5;
  requestAnimationFrame(()=>{
    rotatonAnimationX(direction)
  })
  if(direction.position.z <= -700){
    direction.position.z = 300
  }
}
function rotatonAnimationY(direction){
  direction.rotation.y += 0.008;
  direction.position.z -= 1.5;
  requestAnimationFrame(()=>{
    rotatonAnimationY(direction)
  })
  if(direction.position.z <= -900){
    direction.position.z = 600
  }
}
function rotatonAnimationZ(direction){
  direction.rotation.z += 0.008;
  direction.position.z -= 1;
  requestAnimationFrame(()=>{
    rotatonAnimationZ(direction)
  })
  if(direction.position.z <= -700){
    direction.position.z = 500
  }
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function animate() {
  requestAnimationFrame(animate);
  // watch.rotation.y += 0.005;
  cameraUpdate()
  renderer.render(scene, camera);
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}



// Get window dimension
var ww = document.documentElement.clientWidth || document.body.clientWidth;
var wh = window.innerHeight;
// Save half window dimension
var ww2 = ww * 0.5, wh2 = wh * 0.5;
mouse = {
  position: new THREE.Vector2(0, 0),
  target: new THREE.Vector2(0, 0)
}
function mouseMove(e) {
  // Save mouse X & Y position
  this.mouse.target.x = (e.clientX - ww2) / ww2;
  this.mouse.target.y = (wh2 - e.clientY) / wh2;
}
window.addEventListener('mousemove', (e) => {

  mouseMove(e)
})
// const text = document.querySelector('.content-text')
function cameraUpdate() {

  this.mouse.position.x += (this.mouse.target.x - this.mouse.position.x) / 20;
  this.mouse.position.y += (this.mouse.target.y - this.mouse.position.y) / 20;

  watch.rotation.y = (this.mouse.position.x * .5)+4.7;
  watch.rotation.x = -this.mouse.position.y * .5;

  // camera.position.x += -(this.mouse.position.x * .5)+4.7
  // camera.position.y += -this.mouse.position.y * .5
  // skybox.rotation.y = this.mouse.position.x *.2
  // rectLightMesh.rotation.z = this.mouse.position.x *.2
  // console.log(Math.trunc(this.mouse.position.x * 9))
  // shadowMesh.position.x = this.mouse.position.x * 9

  // shadowMesh.rotation. = this.mouse.position.x *.2
  // camera.rotation.y = Math.PI + this.mouse.position.x * .06;
  // camera.position.y += ;

}


// function guiEffect(target) {

//   gui.add(target.position, 'x')
//   gui.add(target.position, 'y')
//   gui.add(target.position, 'z')
//   gui.add(target.rotation, 'x')
//   gui.add(target.rotation, 'y')
//   gui.add(target.rotation, 'z')

// }
// function guiColor(target, color) {
//   const coll = { color: color }
//   gui.addColor(coll, 'color').onChange(() => {
//     target.color = coll.color
//   })
// }

window.addEventListener("resize", onWindowResize);
