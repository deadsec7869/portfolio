---
last_mapped_commit: eec932bb13d1cbbb22d2664276cceb82b383a8ed
last_mapped_at: 2026-10-29
---
# Architecture

**Analysis Date:** 2026-10-29

## Pattern Overview

**Overall:** Hybrid React-Three.js Client Application with Decoupled Presentation, Spatial WebGL Layer, and Kinetic Scroll Orchestration

**Key Characteristics:**
- **Single Page Application (SPA):** High-density vertical landing page organized into modular narrative sections
- **Decoupled 3D Canvas Architecture:** Three.js / React Three Fiber canvases run alongside declarative React DOM elements with performance throttling and responsive quality tiering
- **Mercury Alpine Banking Aesthetic:** Strictly monochromatic dark Onyx palette (`#171721`), flat Graphite cards (`#1e1e2a`), intermediate weight typography (`480`/`400`), and a single Cobalt action accent (`#5266eb`)
- **Kinetic Motion Coordination:** Lenis smooth scrolling synchronized with GSAP tickers and Framer Motion micro-interactions
- **Zero-Backend Client Autonomy:** Fully static client that hydrates local content with cached GitHub API queries and client-synthesized audio

## Layers

**Entry & Orchestration Layer:**
- **Purpose:** Application initialization, initial loading screen state, global scroll listener attachment, and high-level layout assembly
- **Key Files:** `src/main.tsx`, `src/App.tsx`
- **Depends on:** UI Components, Hooks, Smooth Scroll (Lenis), CSS theme tokens
- **Used by:** Browser DOM root (`index.html`)

**Presentation & Narrative Sections:**
- **Purpose:** Domain-specific sections representing personal brand, engineering achievements, and technical experiments
- **Contains:**
  - `HeroSection.tsx` — Full-bleed atmospheric hero with real-time HUD and interactive 3D globe
  - `AboutSection.tsx` — Engineering biography, core principles, and dynamic stat counters
  - `ProjectsSection.tsx` — Flagship case studies with interactive modals and custom WebGL simulation visualizers
  - `TechStackSection.tsx` — Categorized interactive technology grid
  - `OpenSourceSection.tsx` — Live GitHub metrics, verified repository cards, and contributor stats
  - `ExperimentsSection.tsx` — Interactive WebGL/Canvas micro-experiments in modal viewers
  - `ContactSection.tsx` — Terminal-style contact transmission interface
  - `Footer.tsx` — Alpine footer with system indicators, status clocks, and direct anchors
- **Depends on:** Data modules, UI primitives, Three.js scenes, Audio engine
- **Used by:** `App.tsx`

**Reusable UI Primitives & Controls:**
- **Purpose:** Mercury design system components ensuring strict design consistency and accessibility
- **Contains:**
  - `MagneticButton.tsx` — Cursor-attracting pill button with Mercury Cobalt and Obsidian variants
  - `SectionLabel.tsx` & `SectionHeading.tsx` — Architectural typography hierarchy
  - `SpatialHud.tsx` — Floating operational HUD displaying coordinate metrics, scroll depth, and audio muting state
  - `LoadingScreen.tsx` — Initial asset and WebGL shader warm-up progress indicator
  - `Badge.tsx` — Pill-shaped categorical tags
  - `GlobeCursor.tsx` — Custom responsive cursor follower
- **Depends on:** `src/styles/theme.css`, Framer Motion, GSAP
- **Used by:** All narrative sections

**3D Graphics & Spatial Visualization Layer:**
- **Purpose:** WebGL experiences, interactive models, and ambient particle fields
- **Structure:**
  - `src/three/Canvas/ExperienceCanvas.tsx` — Global canvas container
  - `src/three/scenes/` — Section-dedicated scenes (`HeroScene.tsx`, `ProjectScene.tsx`, `RobotScene.tsx`, `MusicScene.tsx`, `ContactScene.tsx`)
  - `src/three/objects/` — Procedural 3D meshes (`Globe.tsx`, `RobotModel.tsx`, `MusicDisc.tsx`, `ParticleField.tsx`, `ContactSculpture.tsx`)
  - `src/three/materials/materials.ts` — Mercury-tuned metallic, glass, wireframe, and emissive materials
  - `src/three/lighting/StudioLights.tsx` — Atmospheric three-point studio lighting with subtle blue-hour fills
  - `src/three/scenes/SceneFallback.tsx` — Graceful WebGL / low-power fallback renderers
- **Depends on:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Used by:** Hero, Projects, and Contact sections

**Hooks & Runtime State Controllers:**
- **Purpose:** Decoupled browser state management, viewport tracking, responsive breakpoints, and hardware detection
- **Contains:**
  - `useLenis.ts` — Momentum smooth scroll lifecycle and GSAP sync
  - `useActiveSection.ts` — Intersection observer tracking active section for navbar pills
  - `useScrollProgress.ts` — Normalized global scroll percentage (0–100%)
  - `useMousePosition.ts` — Window and element-relative cursor coordinates
  - `useQualityLevel.ts` — Device GPU performance classification (high, medium, low)
  - `useReducedMotion.ts` — User accessibility preference detection (`prefers-reduced-motion`)
- **Used by:** Sections, Navbar, HUD, and 3D scenes

**Data Domain Layer:**
- **Purpose:** Single source of truth for portfolio content, metrics, case studies, and social links
- **Contains:** `src/data/projects.ts`, `src/data/technologies.ts`, `src/data/experiments.ts`, `src/data/social.ts`
- **Used by:** Presentation sections

## Data Flow

**Page Lifecycle & Render Flow:**
1. Browser loads `index.html` and parses font/CSS bundles.
2. `src/main.tsx` mounts `<App />`.
3. `App.tsx` initializes `useLenis()` for smooth scrolling, binds the global scroll progress, and displays `<LoadingScreen />`.
4. Three.js shaders compile and geometry buffers allocate in the background.
5. Loading screen unmounts; hero scene renders the interactive wireframe globe.
6. User scrolls: `Lenis` updates scroll position, `useActiveSection` highlights active navbar pill links, and `SpatialHud` displays live telemetry.
7. User interaction (e.g. clicking a project or audio button) triggers `MagneticButton`, plays micro-interaction audio via `SpatialAudioEngine`, and opens case study modals (`ProjectCaseStudy.tsx`).

**Remote Data & Caching Flow:**
1. `OpenSourceSection` mounts and invokes `getGitHubProfile()` and `getGitHubRepositories()`.
2. `src/lib/github.ts` inspects `localStorage` for valid unexpired cache (`gh_profile_deadsec7869`, `gh_repos_deadsec7869`).
3. If valid cache exists, data renders instantly without network overhead.
4. If cache expired or missing, it triggers `fetch()` to GitHub v3 API.
5. On network success, response saves to `localStorage` with a 30-minute timestamp envelope.
6. On error or rate limit, fallback static datasets (`FALLBACK_PROFILE`, `FALLBACK_REPOS`) ensure immediate, reliable rendering.

## Error Handling

**Strategy:** Graceful degradation and silent fallbacks ensuring zero blank-screen crashes.
- **WebGL Fallbacks:** All R3F `<Canvas>` wrappers are wrapped in error boundaries and performance tiers; if WebGL fails or context is lost, `SceneFallback.tsx` renders clean geometric Mercury cards.
- **Network Resilience:** GitHub API failures resolve to statically verified fallback data rather than throwing uncaught errors.
- **Audio Context Gating:** Web Audio calls are wrapped in `try/catch` and guarded behind user-gesture checks to avoid autoplay policy rejections.

---

*Architecture analysis: 2026-10-29*
*Update when major patterns change*
