/**
 * Height function generators for mesh deformation
 * Each function takes (x, z) coordinates and returns a Y (height) value
 */

/**
 * Wave pattern height function
 * Creates an animated wave pattern using sine and cosine functions
 *
 * @param {number} x - X coordinate of the vertex
 * @param {number} z - Z coordinate of the vertex
 * @param {number} t - Time parameter for animation
 * @param {Object} p - Parameters object
 * @param {number} p.freqX - Frequency along X axis
 * @param {number} p.freqZ - Frequency along Z axis
 * @param {number} p.speed - Animation speed
 * @param {number} p.amplitude - Wave amplitude (height)
 * @returns {number} Height value at (x, z, t)
 */
export function waveHeight(x, z, t, p) {
  return Math.sin(x * p.freqX + t * p.speed) * Math.cos(z * p.freqZ + t * p.speed) * p.amplitude;
}

/**
 * Radial wave height function
 * Creates concentric circular waves emanating from the origin
 *
 * @param {number} x - X coordinate of the vertex
 * @param {number} z - Z coordinate of the vertex
 * @param {number} t - Time parameter for animation
 * @param {Object} p - Parameters object
 * @param {number} p.freq - Radial frequency
 * @param {number} p.speed - Animation speed
 * @param {number} p.amplitude - Wave amplitude (height)
 * @returns {number} Height value at (x, z, t)
 */
export function radialHeight(x, z, t, p) {
  const r = Math.sqrt(x * x + z * z); // Distance from origin
  return Math.sin(r * p.freq + t * p.speed) * p.amplitude;
}

/**
 * Saddle (hyperbolic paraboloid) height function
 * Creates a static saddle shape: z = x² - y²
 *
 * @param {number} x - X coordinate of the vertex
 * @param {number} z - Z coordinate of the vertex
 * @param {number} t - Time parameter (unused, for consistency)
 * @param {Object} p - Parameters object
 * @param {number} p.scale - Scaling factor for the saddle curvature
 * @returns {number} Height value at (x, z)
 */
export function saddleHeight(x, z, t, p) {
  return (x * x - z * z) * p.scale;
}
