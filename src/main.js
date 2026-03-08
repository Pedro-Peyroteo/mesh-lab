/**
 * Main Application Entry Point
 *
 * Initializes the Three.js scene with a basic wireframe mesh.
 * Sets up the rendering pipeline and animation loop.
 */

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createMeshDeformer } from './deform/createMeshDeformer';
import { waveHeight, radialHeight, saddleHeight } from './deform/heightFunctions';
import { createCamera } from './rendering/camera';
import { createRenderer } from './rendering/renderer';
import { createGUI } from './ui/gui';
import { createScene } from './rendering/scene';
import { createGridMesh } from './geometry/mesh';

/**
 * TODO
 * - Deform mesh based on the intersections of a raycast emitted from the mouse and the mesh
 * - Experiment with procedural texture generation
 * - Add a simple logger (maybe in gui, with char limit) for the math nerds
 */

// ============================================================================
// Scene Initialization
// ============================================================================

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
const terrainParams = {
  amplitude: 1,
  freqX: 2,
  freqZ: 2,
  freq: 3,
  scale: 0.1,
  heightType: 'wave',
  speed: 1,
};
const heightFunctions = {
  wave: waveHeight,
  radial: radialHeight,
  saddle: saddleHeight,
};

// Attach the WebGL canvas to the DOM
document.body.appendChild(renderer.domElement);

// ============================================================================
// Controls Setup
// ============================================================================

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth camera movement
controls.dampingFactor = 0.05; // Damping inertia

// ============================================================================
// Scene Content
// ============================================================================

// Create and add the wireframe mesh to the scene
const mesh = createGridMesh(10, 20);
scene.add(mesh);

const originalPositions = mesh.geometry.attributes.position.array.slice();

let deform = createMeshDeformer(
  heightFunctions[terrainParams.heightType],
  terrainParams,
  originalPositions
);

createGUI(
  terrainParams,
  heightFunctions,

  // When height function changes
  () => {
    deform = createMeshDeformer(
      heightFunctions[terrainParams.heightType],
      terrainParams,
      originalPositions
    );

    deform(mesh);
  },

  // When parameters change
  () => {
    deform(mesh);
  }
);

// ============================================================================
// Window Resize Handler
// ============================================================================

window.addEventListener('resize', () => {
  // Update camera aspect ratio to match new window dimensions
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Resize renderer to fill the window
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================================================================
// Animation Loop
// ============================================================================
let time = 0;

/**
 * Main animation loop - called every frame
 * Handles control updates and rendering
 */
function animate() {
  time += 0.01;
  deform(mesh, time);

  controls.update(); // Update camera controls with damping
  renderer.render(scene, camera); // Render the scene from camera's perspective
  requestAnimationFrame(animate); // Schedule next frame
}

// Start the animation loop
animate();
