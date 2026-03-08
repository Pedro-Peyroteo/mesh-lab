/**
 * Scene Setup and Lighting Configuration Module
 *
 * Initializes the Three.js scene container with appropriate lighting.
 */

import * as THREE from "three";

/**
 * Creates and configures the Three.js scene with lighting
 *
 * Lighting setup:
 * - Ambient light: Provides soft, overall illumination (dark gray, intensity 2)
 * - Directional light: Creates depth and highlights (white, intensity 1)
 *
 * @returns {THREE.Scene} Configured scene with lighting
 */
export function createScene() {
  const scene = new THREE.Scene();

  // Ambient light for base illumination without direction
  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);

  // Directional light from above for depth perception
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  return scene;
}
