/**
 * GUI Configuration Module
 * Creates and configures the lil-gui control panel for mesh deformation parameters
 */

import GUI from 'lil-gui';

/**
 * Creates a GUI control panel for mesh deformation parameters
 *
 * @param {Object} params - Terrain parameters object to bind to controls
 * @param {Object.<string, Function>} heightFunctions - Map of available height functions
 * @param {Function} onHeightChange - Callback when height function type changes
 * @param {Function} onParamChange - Callback when any parameter value changes
 * @returns {GUI} The configured lil-gui instance
 */
export function createGUI(params, heightFunctions, onHeightChange, onParamChange) {
  const gui = new GUI();

  gui.add(params, 'amplitude', 0, 5, 0.01).onChange(onParamChange);
  gui.add(params, 'freqX', 0, 10, 0.01).onChange(onParamChange);
  gui.add(params, 'freqZ', 0, 10, 0.01).onChange(onParamChange);
  gui.add(params, 'freq', 0, 10, 0.01).onChange(onParamChange);
  gui.add(params, 'scale', 0, 1, 0.01).onChange(onParamChange);
  gui.add(params, 'speed', 0, 5, 0.01);
  gui.add(params, 'heightType', Object.keys(heightFunctions)).onChange(onHeightChange);

  return gui;
}
