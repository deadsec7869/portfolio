---
last_mapped_commit: eec932bb13d1cbbb22d2664276cceb82b383a8ed
last_mapped_at: 2026-10-29
---
# Testing Patterns & Verification

**Analysis Date:** 2026-10-29

## Current Testing Setup

**Static Code Verification:**
- **Type Checking:** `npm run build` runs `tsc -b` which executes strict composite TypeScript compilation across `tsconfig.app.json` and `tsconfig.node.json`.
- **Linting:** `npm run lint` executes `oxlint`, inspecting AST for unused variables, missing dependencies, syntax violations, and React anti-patterns.
- **Bundle Compilation:** Vite bundler verifies module resolution, CSS bundling, asset references, and tree-shaking integrity.

**Automated Unit / Integration Tests:**
- *Current Status:* No unit test runner (such as Vitest or Jest) is currently installed in `package.json`.
- *Component Testing:* Currently verified manually in browser runs and through TypeScript JSX prop validation.

## Manual Verification Protocol

**Visual & Interactive Checks:**
1. **WebGL Canvas Initialization:** Verify that Three.js canvases load without WebGL context loss warnings in developer console.
2. **Scroll Synchronization:** Confirm that `Lenis` smooth scroll correctly coordinates with active section navigation pills and HUD telemetry counters.
3. **Audio Synthesis:** Verify that clicking the Spatial HUD audio toggle correctly initializes `AudioContext`, un-mutes ambient low-frequency drones, and triggers hover/click feedback tones.
4. **Data Fallbacks:** Validate that `OpenSourceSection` displays verified repository metrics even when network access is severed or GitHub rate limits are simulated.
5. **Responsive Breakpoints:** Verify layout adaptations on Mobile (<768px), Tablet (768px–1024px), and Desktop (>1024px) viewports.

## Recommended Testing Strategy

For future milestones and automated CI/CD workflows, the following testing framework setup is recommended:

**1. Unit & Hook Testing (Vitest + @testing-library/react):**
- Target: `src/lib/github.ts` (caching logic, TTL expiration, fallback selection)
- Target: `src/lib/audio.ts` (mute toggle state, oscillator disposal)
- Target: `src/hooks/useActiveSection.ts` and `src/hooks/useScrollProgress.ts`

**2. Component Testing (@testing-library/react):**
- Target: UI primitives (`MagneticButton`, `Badge`, `SectionHeading`) to verify accessibility roles and event handling.

**3. End-to-End Testing (Playwright):**
- Target: Page navigation, modal opening/closing, and visual screenshot comparisons across desktop and mobile viewports.

---

*Testing analysis: 2026-10-29*
*Update when testing infrastructure changes*
