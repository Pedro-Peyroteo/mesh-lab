# 🌊 Mesh Lab

> A playful little experiment in making grids dance with math ✨

## What's This?

Ever wondered what happens when you throw some sine waves at a flat grid? Me too! This is my little sandbox where I make meshes wiggle, ripple, and bend using nothing but math and Three.js.

## ✨ Features

- **Wavy meshes** that actually wave 🌊
- **Radial patterns** spreading from the center like ripples in water 💧
- **Saddle shapes** for when you want to go full hyperbolic paraboloid 🐴
- **Live controls** - tweak everything in real-time with a GUI
- **Wireframe rendering** because it looks cool and we can see what's happening

## 🚀 Getting Started

```bash
# Install the things
npm install

# Fire it up!
npm run dev
```

Then open your browser and start playing with the controls!

## 🎮 Controls

Use the GUI panel to mess around with:

- **Amplitude** - How tall/deep the waves go
- **Frequencies** - How wiggly things get
- **Speed** - Animation speed (0 = frozen in time)
- **Height Type** - Switch between wave, radial, and saddle patterns

Orbit around with your mouse to see it from all angles!

## 🧮 The Math

Each point on the grid gets its height calculated by a function:

- **Wave**: `y = sin(x·fx + t·s) · cos(z·fz + t·s) · a`
- **Radial**: `y = sin(√(x² + z²)·f + t·s) · a`
- **Saddle**: `y = (x² - z²) · scale`

Where `x` and `z` are positions, `t` is time, and the rest are your control knobs!

## 🛠️ Tech Stack

- **Three.js** - For all the 3D magic
- **Vite** - Because fast refresh is life
- **lil-gui** - For the tweaky controls

## 📝 TODO

- [ ] Mouse-based deformation (drag to sculpt!)
- [ ] Procedural textures
- [ ] Math logger for the nerds (like me)

## 🎨 Made With

Curiosity, caffeine, and a questionable amount of trial and error.

---

_Feel free to fork, experiment, and make your own weird meshes!_
