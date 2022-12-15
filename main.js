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
renderer.setPixelRatio(window.devicePixelRatio);//device aspect ratio
renderer.setSize( window.innerWidth, window.innerHeight);//same
camera.position.setZ(30);//initial camera position

renderer.render(scene, camera);// renders camera in renderer

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new  THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);// combines mat and geometry into mesh

scene.add(torus)// adds torus

const ambiantLight = new THREE.AmbientLight(0xffffff)// new ambient light source

const pointLight = new THREE.PointLight(0xffffff)  //new point light source
//const gridHelper = new THREE.GridHelper(200,50);//grid helper

//const lightHelper = new THREE.PointLightHelper(pointLight)//all these helpers sure are helpful, This one shows us our camera
//scene.add(lightHelper, gridHelper)//initialized helpers

const controls = new OrbitControls(camera, renderer.domElement);//our orbit controls instantiated


//now lets add some stars:
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } )
  const star = new THREE.Mesh( geometry, material );
//add them in randomly like this
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );//adds rand values to the size 3 array as X,y,z then pass values to array of 200 stars below

  star.position.set(x, y, z);// sets  star position to the x,y,z we randomly generated
  scene.add(star)//actually creates the star
}

Array(200).fill().forEach(addStar)// fills array with stars and xyz values from above function

const spaceTexture = new THREE.TextureLoader().load('wp3837839.jpg');
scene.background = spaceTexture;//background loads in

//avatar box :)
const maggzTexture = new THREE.TextureLoader().load('maggz.jpg');// texture
//my mesh!
const maggz = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: maggzTexture})
);
//adds avatar box inside of torus
scene.add(maggz);

//MARS :)
const marsTexture = new THREE.TextureLoader().load('MARS.jpg');
const marsNormal = new THREE.TextureLoader().load('mars-normal.jpg');

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: marsNormal
  })
)
//adds mars
scene.add(mars);
//sets mars position
mars.position.z = 30;
mars.position.setX(-10);

pointLight.position.set(20,20,20)

scene.add(pointLight, ambiantLight)

//move camera function
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;// checks distance to the top of the page
  //mars rotations
  mars.rotation.x += 0.03;
  mars.rotation.y += 0.085;
  mars.rotation.z += 0.03;
  //maggz Rotations
  maggz.rotation.x += 0.01;
  maggz.rotation.z += 0.01;
  //camera rotations
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera// move camera back and forward on scroll

function animate() {// this makes the rendererrecheck and do these things constantly
  requestAnimationFrame( animate);//helps with the above
  torus.rotation.x += 0.003;//torus constant rotations
  torus.rotation.y += 0.015;
  torus.rotation.z += 0.013;
  controls.update();//update control status
  renderer.render(scene, camera);// renders the scene and the camera
}

animate()// calls animate