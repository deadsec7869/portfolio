---
last_mapped_commit: eec932bb13d1cbbb22d2664276cceb82b383a8ed
last_mapped_at: 2026-10-29
---
# Coding Conventions

**Analysis Date:** 2026-10-29

## Code Style & Formatting

**Linter & Type Checker:**
- **Linter:** `oxlint` (`npm run lint`) for fast static validation of JavaScript/TypeScript AST
- **Type Checking:** TypeScript compiler (`tsc -b`) in strict mode (`"strict": true`, `"noUnusedLocals": true`, `"noUnusedParameters": true`, `"noFallthroughCasesInSwitch": true`)
- **Formatting:** 2 spaces indentation, single quotes for TypeScript/JavaScript strings, trailing commas where valid in ES2022

## React & Component Conventions

**Functional Architecture:**
- All components are standard React functional components typed with explicit interface contracts
- Avoid `React.FC` in favor of standard parameter typing:
  ```tsx
  interface MagneticButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost';
    onClick?: () => void;
    className?: string;
  }

  export function MagneticButton({ children, variant = 'secondary', onClick, className }: MagneticButtonProps) {
    // ...
  }
  ```

**Utility Class Composition:**
- Dynamic class strings are constructed using `clsx` and `tailwind-merge` via the `cn()` helper in `src/lib/utils.ts`:
  ```tsx
  import { cn } from '../../lib/utils';

  <div className={cn("rounded-[12px] bg-[#1e1e2a] p-8", isActive && "border-[#e2e3ed]/30", className)} />
  ```

**Design System Token Discipline:**
- Mercury design tokens are defined in `src/styles/theme.css` and applied as CSS variables or corresponding hex colors:
  - Canvas: `--color-onyx-canvas` / `#171721`
  - Cards: `--color-graphite-card` / `#1e1e2a`
  - Secondary controls: `--color-obsidian-button` / `#272735`
  - Primary single CTA: `--color-cobalt` / `#5266eb`
  - High-contrast text: `--color-ivory-text` / `#ededf3`
  - Secondary text: `--color-ash-text` / `#c3c3cc`
  - Hairline borders: `--color-mist-border` / `#e2e3ed`
- **Pill Shape Standard:** Interactive controls (buttons, badges, inputs, nav anchors) use `rounded-full` (`32px`–`40px`), while cards use flat `rounded-[12px]`.
- **Zero Box-Shadows:** Elevation is achieved through subtle one-step tonal value shifts (`#171721` to `#1e1e2a`), never through drop shadows.

## Three.js & WebGL Conventions

**Declarative React Three Fiber:**
- Canvases are wrapped in `<Suspense fallback={<SceneFallback />}>`
- Continuous animations use R3F's `useFrame` hook with delta time calculations:
  ```tsx
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });
  ```
- Fog colors and clear backgrounds match the page canvas (`#171721`):
  ```tsx
  <fog attach="fog" args={['#171721', 12, 35]} />
  ```
- Clean disposal: Geometries and materials should leverage R3F's automatic garbage collection when unmounted.

## State Management & Hooks

**Custom Sensory Hooks:**
- Viewport and sensory side-effects are decoupled into dedicated hooks in `src/hooks/`:
  - `useLenis`: Smooth scroll lifecycle
  - `useActiveSection`: High-performance IntersectionObserver observing heading sections
  - `useMousePosition`: Throttled pointer coordinates
- Clean effect teardowns: All `useEffect` hooks that register event listeners or animation frames return explicit cleanup functions.

## Error Handling Patterns

**Resilience Over Exceptions:**
- Client features that depend on browser APIs (Web Audio, LocalStorage, WebGL) must check capability availability before calling methods.
- External API calls in `src/lib/github.ts` catch network errors and return verified static fallbacks without surfacing user-facing exceptions.

---

*Conventions analysis: 2026-10-29*
*Update when conventions change*
