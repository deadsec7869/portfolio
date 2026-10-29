<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=500&size=14&letterSpacing=0.12em&duration=3000&pause=2000&color=5266EB&center=true&vCenter=true&width=320&height=24&lines=MERCURY+%C2%B7+ALPINE+BANKING+AT+BLUE+HOUR" alt="Mercury" />
</p>

<h1 align="center">
  <br />
  <sub><sup>◉</sup></sub>&ensp;P O R T F O L I O
  <br />
  <br />
</h1>

<p align="center">
  <em>Spatial 3D developer portfolio built on an alpine banking aesthetic —<br />
  near-black canvas, intermediate-weight typography, and a single cobalt accent.</em>
</p>

<br />

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-5266eb?style=flat-square&labelColor=171721" />
  <img src="https://img.shields.io/badge/Three.js-r186-5266eb?style=flat-square&labelColor=171721" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-5266eb?style=flat-square&labelColor=171721" />
  <img src="https://img.shields.io/badge/Tailwind-v4-5266eb?style=flat-square&labelColor=171721" />
  <img src="https://img.shields.io/badge/Vite-8.2-5266eb?style=flat-square&labelColor=171721" />
  <img src="https://img.shields.io/badge/GSAP-3.15-5266eb?style=flat-square&labelColor=171721" />
</p>

<br />

---

<br />

## The Atmosphere

This isn't a typical portfolio template. It's a **cinematic, observatory-like interface** where content surfaces float as subtly lighter graphite cards on a near-black onyx canvas. The design language is borrowed from premium Swiss fintech — overwhelmingly monochromatic, with a single vivid cobalt (`#5266eb`) acting as the only chromatic punctuation across the entire experience.

Typography carries the weight of expression: intermediate weight **480** for headlines (neither bold nor light), paired with body copy at **400** — creating a voice that is confident but never loud. Components are flat and borderless, relying on tonal value shifts and pill-shaped controls to define structure rather than shadows.

<br />

```
╭──────────────────────────────────────────────────────────────╮
│                                                              │
│     ◉  M E R C U R Y                                        │
│                                                              │
│     Canvas ████████████████████████  #171721  Onyx           │
│     Cards  ████████████████████████  #1e1e2a  Graphite       │
│     Btns   ████████████████████████  #272735  Obsidian       │
│     Body   ████████████████████████  #c3c3cc  Ash            │
│     Text   ████████████████████████  #ededf3  Ivory          │
│     Action ████████████████████████  #5266eb  Cobalt         │
│                                                              │
╰──────────────────────────────────────────────────────────────╯
```

<br />

## Features

<table>
  <tr>
    <td width="60"><code>◉</code></td>
    <td><strong>Interactive 3D Globe & Particle Fields</strong><br />Real-time WebGL scenes powered by Three.js and React Three Fiber — wireframe globe, procedural particles, and per-section 3D environments with studio lighting.</td>
  </tr>
  <tr>
    <td width="60"><code>◉</code></td>
    <td><strong>Spatial Audio Engine</strong><br />Web Audio API synthesizer generating ambient spatial drones and micro-interaction tones — activated only on user consent via the floating HUD.</td>
  </tr>
  <tr>
    <td width="60"><code>◉</code></td>
    <td><strong>Kinetic Scroll Orchestration</strong><br />Lenis momentum scrolling synchronized with GSAP tickers, scroll-bound camera shifts, and Framer Motion section transitions.</td>
  </tr>
  <tr>
    <td width="60"><code>◉</code></td>
    <td><strong>Live Operational HUD</strong><br />Floating telemetry overlay displaying cursor coordinates, scroll depth percentage, active section indicators, and audio state — like a cockpit instrument cluster.</td>
  </tr>
  <tr>
    <td width="60"><code>◉</code></td>
    <td><strong>Interactive Experiment Lab</strong><br />Live-running algorithm visualizers — A* pathfinding matrices, Fourier harmonic synthesizers, gravitational N-body vortex simulations, and GenAI prompt pipelines.</td>
  </tr>
  <tr>
    <td width="60"><code>◉</code></td>
    <td><strong>Adaptive Quality Tiering</strong><br />Automatic GPU performance detection scales particle density, shadow resolution, and scene complexity — graceful fallbacks for low-power devices.</td>
  </tr>
  <tr>
    <td width="60"><code>◉</code></td>
    <td><strong>GitHub Live Integration</strong><br />Real-time repository metrics from the GitHub REST API with localStorage caching and verified static fallbacks for zero-downtime rendering.</td>
  </tr>
</table>

<br />

## Architecture

```
                    ┌─────────────────────────────────┐
                    │         index.html               │
                    │     fonts · viewport · meta      │
                    └──────────────┬──────────────────┘
                                   │
                    ┌──────────────▼──────────────────┐
                    │          main.tsx                 │
                    │       React 19 root mount         │
                    └──────────────┬──────────────────┘
                                   │
          ┌────────────────────────▼────────────────────────┐
          │                    App.tsx                       │
          │         Lenis scroll · Loading gate             │
          │         Section assembly · HUD overlay          │
          └──┬──────┬──────┬──────┬──────┬──────┬──────┬───┘
             │      │      │      │      │      │      │
           Hero   About  Projects Tech  OSS   Labs  Contact
             │                │
     ┌───────▼───────┐  ┌────▼────────┐
     │  HeroScene    │  │ ProjectScene │     ← React Three Fiber
     │  Globe.tsx    │  │ RobotScene   │        per-section 3D
     │  Particles    │  │ MusicScene   │        environments
     └───────────────┘  └─────────────┘

     hooks/              lib/                three/
     ├─ useLenis         ├─ audio.ts         ├─ materials/
     ├─ useActiveSection ├─ github.ts        ├─ lighting/
     ├─ useQualityLevel  └─ utils.ts         ├─ objects/
     └─ useMousePosition                     └─ scenes/
```

<br />

## Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **UI Framework** | React | 19.2 | Component model & DOM reconciliation |
| **Language** | TypeScript | 6.0 | Strict type safety across all source |
| **3D Engine** | Three.js | r186 | WebGL rendering, shaders, scene graph |
| **3D Bindings** | @react-three/fiber | 9.7 | Declarative React reconciler for Three.js |
| **3D Helpers** | @react-three/drei | 10.7 | Procedural utilities & controls |
| **Animation** | GSAP | 3.15 | Timeline choreography & scroll triggers |
| **Micro-motion** | Framer Motion | 13.2 | Layout animations & gesture transitions |
| **Scrolling** | Lenis | 1.3 | Momentum inertial smooth scrolling |
| **Styling** | Tailwind CSS | v4 | Atomic utility classes with native engine |
| **Bundler** | Vite | 8.2 | Hot module reload & production bundling |
| **Linter** | oxlint | 1.79 | Rust-based static analysis |

<br />

## Design System — Mercury

> *Alpine banking at blue hour*

The Mercury design system enforces strict aesthetic discipline:

**Color** — Monochromatic dark palette with a single chromatic accent. Cobalt `#5266eb` is reserved exclusively for the primary conversion action. No secondary colors, no gradients on interactive elements, no colored icons.

**Typography** — Intermediate weight `480` for all display headings (arcadiaDisplay), weight `400` for body (arcadia). Tight line-heights `1.1–1.2` on headlines with positive letter-spacing `0.01–0.02em` for a wide-set architectural quality. Substitute stack: Inter / Söhne Breit.

**Components** — Pill-shaped controls (`32px` radius for buttons/inputs, `40px` for nav items), flat `12px` radius cards with `32px` padding, zero box-shadows. Elevation through one-step tonal value contrast only (`#171721` → `#1e1e2a`).

**Spacing** — `72px` vertical rhythm between major sections. Base unit `4px`. Spacious density throughout.

```css
:root {
  --color-onyx-canvas:     #171721;
  --color-graphite-card:   #1e1e2a;
  --color-obsidian-button: #272735;
  --color-slate-border:    #70707d;
  --color-mist-border:     #e2e3ed;
  --color-ash-text:        #c3c3cc;
  --color-ivory-text:      #ededf3;
  --color-cobalt:          #5266eb;
}
```

<br />

## Projects

<table>
  <tr>
    <td align="center" width="64"><strong>01</strong></td>
    <td>
      <strong>AI Robot Command Center</strong><br />
      <sub>Autonomous robotics simulation with A* pathfinding, space-time conflict detection, and real-time AGV fleet telemetry.</sub><br />
      <sub><a href="https://github.com/deadsec7869/AI-Robot-Command-Center">Source</a> · <a href="https://ai-robot-command-center.vercel.app">Live</a></sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="64"><strong>02</strong></td>
    <td>
      <strong>AApesh</strong><br />
      <sub>Desktop spatial music workstation with Three.js 3D backdrop, 10-band graphic EQ, synchronized lyrics, and YouTube Music streaming.</sub><br />
      <sub><a href="https://github.com/deadsec7869/AApesh">Source</a></sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="64"><strong>03</strong></td>
    <td>
      <strong>VTU Study Companion</strong><br />
      <sub>AI-powered academic platform for VTU engineering students — Google GenAI SDK, structured curriculum navigation, and streaming explanations.</sub><br />
      <sub><a href="https://github.com/deadsec7869/vtu-study-app">Source</a> · <a href="https://vtu-study-app-tau.vercel.app">Live</a></sub>
    </td>
  </tr>
</table>

<br />

## Getting Started

```bash
# Clone
git clone https://github.com/deadsec7869/portfolio.git
cd portfolio

# Install
npm install

# Develop
npm run dev          # → http://localhost:5173

# Build
npm run build        # tsc -b && vite build → dist/

# Lint
npm run lint         # oxlint static analysis
```

> **Requirements:** Node.js ≥ 20, npm. WebGL 2.0 capable browser for 3D scenes.

<br />

## Structure

```
src/
├── components/          # React presentation layer
│   ├── Hero/            # Full-bleed atmospheric hero
│   ├── About/           # Biography & dynamic stat counters
│   ├── Projects/        # Case studies & WebGL visualizers
│   ├── TechStack/       # Categorized technology grid
│   ├── OpenSource/      # Live GitHub metrics
│   ├── Experiments/     # Interactive algorithm lab
│   ├── Contact/         # Terminal transmission interface
│   ├── Navigation/      # Top nav & mobile drawer
│   ├── Footer/          # Alpine system footer
│   ├── Cursor/          # Custom cursor mechanics
│   └── UI/              # Mercury design primitives
├── three/               # WebGL subsystem
│   ├── scenes/          # Per-section 3D environments
│   ├── objects/          # Procedural meshes & particles
│   ├── materials/       # PBR & emissive shaders
│   └── lighting/        # Studio three-point setups
├── hooks/               # Custom React sensory hooks
├── data/                # Content single source of truth
├── lib/                 # Audio engine, GitHub API, utils
├── styles/              # Mercury CSS tokens
└── types/               # TypeScript interfaces
```

<br />

---

<p align="center">
  <sub>Built by <strong>Muhammed Tamim Baig</strong></sub><br />
  <sub>Engineering Student · Developer · Builder</sub><br /><br />
  <a href="https://github.com/deadsec7869">
    <img src="https://img.shields.io/badge/GitHub-deadsec7869-5266eb?style=flat-square&labelColor=171721" />
  </a>
</p>

<p align="center">
  <sub><code>◉ MERCURY DESIGN SYSTEM</code> · <code>ALPINE BANKING AT BLUE HOUR</code></sub>
</p>
