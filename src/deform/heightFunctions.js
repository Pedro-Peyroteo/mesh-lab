export function waveHeight(x, z, p) {
  return Math.sin(x * p.freqX) * Math.cos(z * p.freqZ) * p.amplitude;
}

export function radialHeight(x, z, p) {
  const r = Math.sqrt(x * x + z * z);
  return Math.sin(r * p.freq) * p.amplitude;
}

export function saddleHeight(x, z, p) {
  return (x * x - z * z) * p.scale;
}
