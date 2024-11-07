// Basic setup
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit Controls
const controls = new OrbitControls(camera, document.body);

// Ground - Grass and Road
const grassMaterial = new THREE.MeshBasicMaterial({ color: 0x00ad30 });
const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
const grass = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), grassMaterial);
const road1 = new THREE.Mesh(new THREE.PlaneGeometry(2, 30), roadMaterial);
const road2 = new THREE.Mesh(new THREE.PlaneGeometry(2, 30), roadMaterial);
const road3 = new THREE.Mesh(new THREE.PlaneGeometry(2, 22), roadMaterial);
const road4 = new THREE.Mesh(new THREE.PlaneGeometry(2, 30), roadMaterial);
grass.rotation.x = -Math.PI / 2;

road1.rotation.x = -Math.PI / 2;
road1.rotation.z = 12 * (Math.PI / 180);
road1.position.x = 4;
road1.position.y = 0.01;

road2.rotation.x = -Math.PI / 2;
road2.rotation.z = 90 * (Math.PI / 180);
road2.position.z = 6;
road2.position.y = 0.01;

road3.rotation.x = -Math.PI / 2;
road3.rotation.z = 170 * (Math.PI / 180);
road3.position.x = -10;
road3.position.y = 0.01;
road3.position.z = -4;

road4.rotation.x = -Math.PI / 2;
road4.rotation.z = 90 * (Math.PI / 180);
road4.position.z = -6;
road4.position.y = 0.01;

scene.add(grass, road1, road2, road3, road4);

// Buildings
const buildingMaterial1 = new THREE.MeshBasicMaterial({ color: 0x818e9c });
const buildingMaterial2 = new THREE.MeshBasicMaterial({ color: 0x008a6f });
const buildingMaterial3 = new THREE.MeshBasicMaterial({ color: 0xeb8c34 });
const buildingMaterial4 = new THREE.MeshBasicMaterial({ color: 0x3368a1 });
const buildingMaterial5 = new THREE.MeshBasicMaterial({ color: 0x242a30 });
const building1 = new THREE.Mesh(new THREE.BoxGeometry(6, 3, 3), buildingMaterial1);
const building2 = new THREE.Mesh(new THREE.BoxGeometry(6, 3, 3), buildingMaterial2);
const building3 = new THREE.Mesh(new THREE.BoxGeometry(6, 3, 3), buildingMaterial3);
const building4 = new THREE.Mesh(new THREE.BoxGeometry(10, 3, 4), buildingMaterial4);
const building5 = new THREE.Mesh(new THREE.BoxGeometry(6, 3, 5), buildingMaterial5);
building1.position.set(5.4, 1.5, -11);
building1.rotation.y = 103 * (Math.PI / 180);

building2.position.set(7.7, 1.5, -0.8);
building2.rotation.y = 103 * (Math.PI / 180);

building3.position.set(10, 1.5, 11);
building3.rotation.y = 100 * (Math.PI / 180);

building4.position.set(-3, 1.5, 10.5);
building4.rotation.y = 1 * (Math.PI / 180);

building5.position.set(-5, 1.5, 0);
building5.rotation.y = 1 * (Math.PI / 180);

scene.add(building1, building2, building3, building4, building5);

// Animated Object
const movingObject = new THREE.Mesh(new THREE.ConeGeometry(0.5, 3, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
movingObject.position.set(-15, 1.5, -6);
scene.add(movingObject);

// GSAP Animation
gsap.to(movingObject.position, {
    x: 15,
    repeat: -1,
    yoyo: true,
    duration: 6,
    ease: "power1.inOut"
});

// Set Camera Position and Render Loop
camera.position.z = 20;
camera.position.y = 20;
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
