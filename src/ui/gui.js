import GUI from 'lil-gui';

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
