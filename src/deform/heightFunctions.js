export function waveHeight(x, z, t, p) {
  return Math.sin(x * p.freqX + t * p.speed) * Math.cos(z * p.freqZ + t * p.speed) * p.amplitude;
}

export function radialHeight(x, z, t, p) {
  const r = Math.sqrt(x * x + z * z);
  return Math.sin(r * p.freq + t * p.speed) * p.amplitude;
}

export function saddleHeight(x, z, t, p) {
  return (x * x - z * z) * p.scale;
}
