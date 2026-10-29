---
last_mapped_commit: eec932bb13d1cbbb22d2664276cceb82b383a8ed
last_mapped_at: 2026-10-29
---
# Project Structure

**Analysis Date:** 2026-10-29

## Directory Layout

```text
portfolio/
├── .agents/                                # Agent custom skills & reference assets
│   └── skills/
│       └── mercury-style/                  # Mercury Design System specifications
│           ├── examples/                   # Code templates (hero, feature grid)
│           ├── references/                 # Tokens, components, dos-and-donts
│           ├── resources/                  # Standalone CSS & Tailwind presets
│           └── SKILL.md                    # Primary skill instruction contract
├── .planning/                              # GSD planning directory
│   └── codebase/                           # Codebase intelligence and maps
│       ├── ARCHITECTURE.md
│       ├── CONCERNS.md
│       ├── CONVENTIONS.md
│       ├── INTEGRATIONS.md
│       ├── STACK.md
│       ├── STRUCTURE.md
│       └── TESTING.md
├── public/                                 # Public static assets served at root
├── src/                                    # Application source code
│   ├── assets/                             # Bundled graphic assets (logos, images)
│   ├── components/                         # React UI presentation components
│   │   ├── About/                          # Biography and dynamic counters
│   │   │   ├── AboutSection.tsx
│   │   │   └── StatCounter.tsx
│   │   ├── Contact/                        # Communication terminal interface
│   │   │   └── ContactSection.tsx
│   │   ├── Cursor/                         # Custom cursor mechanics
│   │   │   └── GlobeCursor.tsx
│   │   ├── Experiments/                    # Interactive WebGL experiment showcase
│   │   │   ├── ExperimentModal.tsx
│   │   │   └── ExperimentsSection.tsx
│   │   ├── Footer/                         # Alpine system footer
│   │   │   └── Footer.tsx
│   │   ├── Hero/                           # Above-the-fold atmospheric hero
│   │   │   └── HeroSection.tsx
│   │   ├── Navigation/                     # Primary top nav & responsive drawer
│   │   │   ├── MobileMenu.tsx
│   │   │   └── Navbar.tsx
│   │   ├── OpenSource/                     # Live GitHub profile & repositories
│   │   │   └── OpenSourceSection.tsx
│   │   ├── Projects/                       # Flagship case studies & visualizers
│   │   │   ├── MusicPlayerVisual.tsx
│   │   │   ├── NeuralVisual.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectCaseStudy.tsx
│   │   │   ├── ProjectDetailModal.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── RobotCommandVisual.tsx
│   │   │   ├── TelemetryVisual.tsx
│   │   │   └── VtuStudyVisual.tsx
│   │   ├── TechStack/                      # Categorized technology grid
│   │   │   └── TechStackSection.tsx
│   │   └── UI/                             # Design system primitives & controls
│   │       ├── Badge.tsx
│   │       ├── Icons.tsx
│   │       ├── LoadingScreen.tsx
│   │       ├── MagneticButton.tsx
│   │       ├── SectionHeading.tsx
│   │       ├── SectionLabel.tsx
│   │       └── SpatialHud.tsx
│   ├── data/                               # Domain content single source of truth
│   │   ├── experiments.ts                  # Lab experiment records & metadata
│   │   ├── graphData.ts                    # Node/edge relationship datasets
│   │   ├── projects.ts                     # Flagship projects & deep case studies
│   │   ├── social.ts                       # Contact and profile links
│   │   └── technologies.ts                 # Categorized technical competencies
│   ├── hooks/                              # Custom React sensory and state hooks
│   │   ├── useActiveSection.ts             # Intersection observer for nav sync
│   │   ├── useLenis.ts                     # Kinetic momentum scroll controller
│   │   ├── useMediaQuery.ts                # Viewport breakpoint matcher
│   │   ├── useMousePosition.ts             # Cursor vector calculations
│   │   ├── useQualityLevel.ts              # Hardware/GPU capability classifier
│   │   ├── useReducedMotion.ts             # Accessibility reduced-motion query
│   │   └── useScrollProgress.ts            # Normalized 0-100% document scroll
│   ├── lib/                                # Utilities and external services
│   │   ├── audio.ts                        # Web Audio spatial synth engine
│   │   ├── github.ts                       # GitHub REST API client with cache
│   │   └── utils.ts                        # Classname merging and string helpers
│   ├── styles/                             # Global styling tokens
│   │   └── theme.css                       # Mercury CSS custom properties
│   ├── three/                              # WebGL / Three.js 3D subsystem
│   │   ├── Canvas/                         # Canvas mounting containers
│   │   │   └── ExperienceCanvas.tsx
│   │   ├── controllers/                    # Camera and scene interaction logic
│   │   │   └── CameraController.tsx
│   │   ├── lighting/                       # Photorealistic lighting setups
│   │   │   └── StudioLights.tsx
│   │   ├── materials/                      # Shader materials & PBR parameters
│   │   │   └── materials.ts
│   │   ├── objects/                        # Procedural 3D meshes & particles
│   │   │   ├── ContactSculpture.tsx
│   │   │   ├── FloatingGeometry.tsx
│   │   │   ├── Globe.tsx
│   │   │   ├── MusicDisc.tsx
│   │   │   ├── ParticleField.tsx
│   │   │   └── RobotModel.tsx
│   │   └── scenes/                         # Per-section WebGL environments
│   │       ├── ContactScene.tsx
│   │       ├── HeroScene.tsx
│   │       ├── MusicScene.tsx
│   │       ├── ProjectScene.tsx
│   │       ├── RobotScene.tsx
│   │       └── SceneFallback.tsx
│   ├── types/                              # TypeScript interfaces and types
│   │   └── github.ts
│   ├── App.css                             # Application-level structural CSS
│   ├── App.tsx                             # Master layout and lifecycle root
│   ├── index.css                           # Tailwind root & global typography
│   └── main.tsx                            # React DOM entry point
├── index.html                              # HTML5 shell & fonts
├── package.json                            # Package dependencies and npm scripts
├── tsconfig.app.json                       # App TypeScript compiler configuration
├── tsconfig.json                           # TypeScript composite root
├── tsconfig.node.json                      # Node/tooling TypeScript compiler config
└── vite.config.ts                          # Vite build & bundler configuration
```

## Key Locations

| Purpose | File / Directory |
|---------|------------------|
| Application Entry | `src/main.tsx` |
| Primary Layout | `src/App.tsx` |
| Style Tokens | `src/styles/theme.css`, `src/index.css` |
| 3D World Materials | `src/three/materials/materials.ts` |
| 3D Studio Lighting | `src/three/lighting/StudioLights.tsx` |
| Navigation Header | `src/components/Navigation/Navbar.tsx` |
| Reusable UI Primitives | `src/components/UI/` |
| Content Data | `src/data/` |
| External GitHub API | `src/lib/github.ts` |
| Spatial Audio Synth | `src/lib/audio.ts` |

## Naming Conventions

- **React Components:** PascalCase with `.tsx` extension (e.g., `HeroSection.tsx`, `MagneticButton.tsx`)
- **Custom Hooks:** camelCase prefixed with `use` with `.ts` extension (e.g., `useActiveSection.ts`, `useLenis.ts`)
- **Utility & Data Files:** camelCase with `.ts` extension (e.g., `github.ts`, `projects.ts`, `audio.ts`)
- **CSS / Styling Files:** lowercase with `.css` extension (e.g., `theme.css`, `index.css`)
- **Three.js Object Meshes:** PascalCase with `.tsx` extension (e.g., `Globe.tsx`, `RobotModel.tsx`)

---

*Structure analysis: 2026-10-29*
*Update when directories change*
