---
last_mapped_commit: eec932bb13d1cbbb22d2664276cceb82b383a8ed
last_mapped_at: 2026-10-29
---
# Technology Stack

**Analysis Date:** 2026-10-29

## Languages

**Primary:**
- TypeScript 6.0.2 - All application source code, 3D scenes, hooks, types, data schemas, and UI components (`src/**/*.ts`, `src/**/*.tsx`)

**Secondary:**
- CSS / Modern CSS 3 - Design tokens, theme variables, and global resets (`src/styles/theme.css`, `src/index.css`, `src/App.css`)
- HTML5 - Canvas container, viewport metadata, font links (`index.html`)

## Runtime

**Environment:**
- Browser (Evergreen browsers with WebGL 2.0 and Web Audio API support)
- Node.js >= 20.x for local development and build pipelines

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- React 19.2.8 - Component model, state orchestration, DOM tree management
- React DOM 19.2.8 - Browser rendering target

**3D Graphics & Visualization:**
- Three.js 0.186.0 - WebGL engine, geometry generation, custom shaders, lighting, scene graph
- @react-three/fiber 9.7.0 - Declarative React reconciler for Three.js
- @react-three/drei 10.7.8 - High-performance helpers (OrbitControls, Canvas wrappers, procedural textures)

**Animation & Motion:**
- GSAP 3.15.0 - Timeline choreography, spatial scroll triggers, camera tweens
- Framer Motion 13.2.0 - Declarative micro-interactions, modal transitions, layout animations
- Lenis 1.3.26 - Smooth kinetic momentum scrolling

**Styling & UI:**
- Tailwind CSS 4.3.3 - Atomic styling via modern engine
- @tailwindcss/vite 4.3.3 - Vite native compiler plugin
- Lucide React 1.43.0 - Vector icon suite

## Key Dependencies

**Critical:**
- `@react-three/fiber` & `three` - Core 3D engine driving hero globe, project showcases, audio visualizers, and interactive particle fields
- `lenis` - Decoupled smooth scrolling engine tied with GSAP ticker for scroll-bound animations
- `gsap` - Complex procedural animation timelines for UI elevation, camera shifts, and HUD counters
- `clsx` & `tailwind-merge` - Dynamic class composition and utility conflict resolution

## Configuration

**Build & Tooling:**
- `vite.config.ts` - Vite 8 configuration with React and Tailwind v4 plugins
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` - Strict TypeScript compilation targets (ES2022, bundler module resolution, strict null checks)
- `oxlint` 1.79.0 - High-speed Rust-based linter for static code verification

**Environment:**
- Fully client-driven; no mandatory runtime environment variables required
- Public assets served from `public/` and static imports from `src/assets/`

## Platform Requirements

**Development:**
- Cross-platform: Windows, macOS, Linux with Node.js >= 20.x
- Vite dev server (`npm run dev`)

**Production:**
- Static SPA distribution bundle generated into `dist/` via `npm run build` (`tsc -b && vite build`)
- Deployment targets: Vercel, Netlify, Cloudflare Pages, GitHub Pages

---

*Stack analysis: 2026-10-29*
*Update after major dependency changes*
