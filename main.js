import './style.css' // imports styles
//Author: Maggie Leavitt
//Date: 12/13/22
//Project: My 3JS Portfolio
 
import * as THREE from 'three'; //gets access to the dependencies needed from 3JS 

const scene = new THREE.Scene();

const camera =  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

c

const geometry = new THREE.IcosahedronGeometry(5,8)