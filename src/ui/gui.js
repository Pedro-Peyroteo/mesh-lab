import GUI from 'lil-gui';

export function createGUI(params, onChange) {
  const gui = new GUI();
  gui.add(params, 'amplitude', 0, 5, 0.01).onChange(onChange);
  gui.add(params, 'freqX', 0, 10, 0.01).onChange(onChange);
  gui.add(params, 'freqZ', 0, 10, 0.01).onChange(onChange);

  return gui;
}
