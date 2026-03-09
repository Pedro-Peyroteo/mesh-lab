/**
 * Main Application Entry Point
 *
 * Initializes a Three.js scene with an animated, deformable wireframe mesh.
 * The mesh can be deformed using various height functions (wave, radial, saddle)
 * with parameters controllable through a GUI interface.
 *
 * Features:
 * - Procedural grid mesh generation
 * - Real-time vertex deformation using mathematical functions
 * - Interactive parameter controls via lil-gui
 * - Orbit camera controls for scene navigation
 */

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createMeshDeformer } from './deform/createMeshDeformer';
import { waveHeight, radialHeight, saddleHeight } from './deform/heightFunctions';
import { applyNoise } from './deform/applyNoise';
import { createCamera } from './rendering/camera';
import { createRenderer } from './rendering/renderer';
import { createGUI } from './ui/gui';
import { createScene } from './rendering/scene';
import { createGridMesh } from './geometry/mesh';

/**
 * TODO:
 * - Add a few noise functions to generate more realistic terrain
 * - Experiment with different color gradient functions and with terrain style colors
 * - Add a simple logger (maybe in gui, with char limit) for the math nerds
 * - Group gui elements in folders
 * - Deform mesh based on the intersections of a raycast emitted from the mouse and the mesh
 * - Experiment with procedural texture generation
 */

// ============================================================================
// Scene Initialization
// ============================================================================

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();

/**
 * Terrain deformation parameters
 * These values control the shape and animation of the mesh deformation
 * @type {Object}
 * @property {number} amplitude - Vertical displacement magnitude (0-5)
 * @property {number} freqX - Frequency of waves along X axis (0-10)
 * @property {number} freqZ - Frequency of waves along Z axis (0-10)
 * @property {number} freq - Frequency for radial patterns (0-10)
 * @property {number} scale - Scaling factor for saddle function (0-1)
 * @property {string} heightType - Type of height function: 'wave', 'radial', or 'saddle'
 * @property {number} speed - Animation speed multiplier (0-5)
 */
const terrainParams = {
  amplitude: 1,
  freqX: 2,
  freqZ: 2,
  freq: 3,
  scale: 0.1,
  heightType: 'wave',
  speed: 1,
  noiseScale: 0.2,
  noiseAmplitude: 2,
  noiseSpeed: 0.2,
};

/**
 * Available height functions for mesh deformation
 * @type {Object.<string, Function>}
 */
const heightFunctions = {
  wave: waveHeight,
  radial: radialHeight,
  saddle: saddleHeight,
};

const heightFunctionOptions = {
  ...heightFunctions,
  noise: null,
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

// Store original vertex positions for resetting deformations
const originalPositions = mesh.geometry.attributes.position.array.slice();

// Initialize the mesh deformer with current height function
let deform = createMeshDeformer(
  heightFunctions[terrainParams.heightType] ?? waveHeight,
  terrainParams,
  originalPositions
);

let noiseDeform = applyNoise(terrainParams);

createGUI(
  terrainParams,
  heightFunctionOptions,

  // When height function changes
  () => {
    if (terrainParams.heightType === 'noise') {
      noiseDeform = applyNoise(terrainParams);
      return;
    }

    deform = createMeshDeformer(
      heightFunctions[terrainParams.heightType],
      terrainParams,
      originalPositions
    );

    deform(mesh);
  },

  // When parameters change
  () => {
    if (terrainParams.heightType === 'noise') {
      noiseDeform = applyNoise(terrainParams);
      noiseDeform(mesh, time);
      return;
    }

    deform(mesh, time);
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

/** @type {number} Global time variable for animation, incremented each frame */
let time = 0;

/**
 * Main animation loop - called every frame
 * Updates mesh deformation, camera controls, and renders the scene
 * @function animate
 */
function animate() {
  time += 0.01; // Increment time for animated deformations

  if (terrainParams.heightType === 'noise') noiseDeform(mesh, time);
  else deform(mesh, time); // Apply deformation to mesh

  controls.update(); // Update camera controls with damping
  renderer.render(scene, camera); // Render the scene from camera's perspective

  requestAnimationFrame(animate); // Schedule next frame
}

// Start the animation loop
animate();
