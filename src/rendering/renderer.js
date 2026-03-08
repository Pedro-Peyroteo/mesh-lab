/**
 * WebGL Renderer Configuration Module
 *
 * Handles setup of the Three.js WebGL renderer with optimal settings.
 */

import * as THREE from "three";

/**
 * Creates and configures the WebGL renderer
 *
 * Renderer features:
 * - Antialiasing enabled for smoother edges
 * - Auto-sized to fill the entire window
 * - Pixel ratio matched to device for crisp rendering on high-DPI displays
 *
 * @returns {THREE.WebGLRenderer} Configured renderer instance
 */
export function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  // Set renderer to fill the entire window
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Match device pixel ratio for sharp rendering on retina displays
  renderer.setPixelRatio(window.devicePixelRatio);

  return renderer;
}
