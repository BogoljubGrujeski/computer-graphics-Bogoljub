import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(1, 1, 2);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const simpleShadow = textureLoader.load('/textures/bakedShadow.jpg');

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.3);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.radius = 10;
directionalLight.position.set(2,2,-1);
scene.add(directionalLight);

const directionalLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(directionalLightHelper);
directionalLightHelper.visible = false;

const spotLight = new THREE.SpotLight(0xffffff, 3.6, 10, Math.PI * 0.3);
spotLight.castShadow = true;
spotLight.shadow.mapSize.set (1024,1024);
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 6;
spotLight.position.set(0,2,1);
scene.add(spotLight);
scene.add(spotLight.target);

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
scene.add(spotLightCameraHelper);
spotLightCameraHelper.visible = false;

const pointLight = new THREE.PointLight(0xffffff, 2.7);
pointLight.castShadow = true;
pointLight.shadow.mapSize.set(1024,1024);
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 5;
pointLight.position.set(-1,1.5,0);
scene.add(pointLight);

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
scene.add(pointLightCameraHelper);


const material = new THREE.MeshStandardMaterial({ roughness: 0.7, metalness: 0 });

const cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), material);
cube.castShadow = true;

const torus = new THREE.Mesh(new THREE.TorusGeometry(1,0.3,12,48),material);
torus.position.y = 0.9;
torus.position.x = -1.2;
torus.castShadow = true;

const torusKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.5,0.2,64,8,12,3),material);
torusKnot.castShadow = true;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.receiveShadow = true;
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;

const cubeShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(0.9,0.9),
    new THREE.MeshBasicMaterial({color:0x000000, transparent: true, alphaMap: simpleShadow})
);

// const torusShadow = new THREE.Mesh(
//     new THREE.PlaneGeometry(0.9,0.9),
//     new THREE.MeshBasicMaterial({color:0x000000, transparent: true, alphaMap: bakedShadow})
// );

cubeShadow.rotation.x = -Math.PI * 0.5;
cubeShadow.position.y = plane.position.y + 0.01;

scene.add(cube, plane, cubeShadow, torus, torusKnot);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Resize handling
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});


const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    cube.position.x = Math.cos(elapsedTime) * 1.5;
    cube.position.z = Math.sin(elapsedTime) * 1.5;
    cube.position.y = Math.abs(Math.sin(elapsedTime * 3));
    cube.rotation.y += 0.1;
    cube.rotation.x += 0.1;
    cube.rotation.z += 0.1;

    torus.rotation.z += 0.1;
    torus.rotation.x += 0.1;

    torusKnot.position.x = Math.sin(elapsedTime) * 0.7;
    torusKnot.position.z = Math.cos(elapsedTime) * 0.7;
    torusKnot.position.y = Math.abs(Math.sin(elapsedTime * 5));
    torusKnot.rotation.z += 0.1;
    torusKnot.rotation.y += 0.1;

    cubeShadow.position.x = cube.position.x;
    cubeShadow.position.z = cube.position.z;
    cubeShadow.material.opacity = (1-cube.position.y) * 0.2;

    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}

animate();
