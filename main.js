import './style.css' // imports styles
//Author: Maggie Leavitt
//Date: 12/13/22
//Project: My 3JS Portfolio
 
import * as THREE from 'three'; //gets access to the dependencies needed from 3JS 
import { AmbientLight, Camera, Color } from 'three';//other nessesary imports
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';//imports our orbit controls! Scroll bar can be setup now

const scene = new THREE.Scene();//creates scene

const camera =  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // aspect ratio set to the device and screen size

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new  THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

const ambiantLight = new THREE.AmbientLight(0xffffff)

const pointLight = new THREE.PointLight(0xffffff)  
const gridHelper = new THREE.GridHelper(200,50);

const lightHelper = new THREE.PointLightHelper(pointLight)//all these helpers sure are helpful, This one shows us our camera
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);//our orbit controls instantiated


//now lets add some starts:
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } )
  const star = new THREE.Mesh( geometry, material );
//add them in randomly like this
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('wp3837839.jpg');
scene.background = spaceTexture;//background loads in

//avatar box :)
const maggzTexture = new THREE.TextureLoader().load('maggz.jpg');

const maggz = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: maggzTexture})
);

scene.add(maggz);


pointLight.position.set(20,20,20)

scene.add(pointLight, ambiantLight)

function animate() {
  requestAnimationFrame( animate);
  torus.rotation.x += 0.003;
  torus.rotation.y += 0.015;
  torus.rotation.z += 0.013;
  controls.update();
  renderer.render(scene, camera);
}

animate()