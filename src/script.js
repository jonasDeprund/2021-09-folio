import './style.css';
import * as THREE from 'three';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const particleTexture1 = textureLoader.load('/textures/images/1.jpg');
const particleTexture2 = textureLoader.load('/textures/images/2.jpg');
const particleTexture3 = textureLoader.load('/textures/images/3.jpg');
// const particleTexture4 = textureLoader.load('/textures/images/4.jpg');
// const particleTexture5 = textureLoader.load('/textures/images/5.jpg');
// const particleTexture6 = textureLoader.load('/textures/images/6.jpg');
// const particleTexture7 = textureLoader.load('/textures/images/7.jpg');
// const particleTexture8 = textureLoader.load('/textures/images/8.jpg');
// const particleTexture9 = textureLoader.load('/textures/images/9.jpg');
// const particleTexture10 = textureLoader.load('/textures/images/10.jpg');
// const particleTexture11 = textureLoader.load('/textures/images/11.jpg');

/**
 * PARTICLES
 */
// Geometry
const particlesGeometry = new THREE.BufferGeometry();
const count = 50;

const positions = new Float32Array(count * 3);
const imagesArray = new Array(
  particleTexture1,
  particleTexture2,
  particleTexture3
);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
  // imagesArray[i] = Math.random();
}

particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
);

// Material
const particlesMaterial = new THREE.PointsMaterial({
  size: 1,
  sizeAttenuation: true,
});

particlesMaterial.map = particleTexture1;

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
);
scene.add(camera);

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update camera
  camera.position.x = cursor.x * 1.5;
  camera.position.y = cursor.y * 1.5;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
