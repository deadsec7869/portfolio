---
last_mapped_commit: eec932bb13d1cbbb22d2664276cceb82b383a8ed
last_mapped_at: 2026-10-29
---
# Technical Concerns & Architectural Debt

**Analysis Date:** 2026-10-29

## Technical Debt & Performance Considerations

**1. Multi-Canvas GPU Memory Footprint:**
- **Issue:** The portfolio features multiple discrete Three.js `<Canvas>` instances across various sections (`HeroScene.tsx`, `ProjectScene.tsx`, `RobotScene.tsx`, `MusicScene.tsx`, `ContactScene.tsx`).
- **Risk:** Having several WebGL contexts simultaneously allocated can consume significant GPU VRAM on mobile devices and integrated GPUs, potentially leading to WebGL context loss errors or battery drain.
- **Remediation Recommendation:** Implement an IntersectionObserver-driven viewport gate that sets `frameloop="demand"` or completely unmounts scenes when scrolled out of view, or unify scenes into a single background canvas with multi-viewports (`drei/View`).

**2. Absence of Automated Test Suite:**
- **Issue:** The codebase currently relies strictly on TypeScript type checking (`tsc -b`) and `oxlint`. There are no automated unit, integration, or visual regression tests.
- **Risk:** Refactoring data shapes, utility helpers (`src/lib/github.ts`), or styling tokens can introduce silent functional regressions that are only spotted during manual testing.
- **Remediation Recommendation:** Introduce `vitest` and `@testing-library/react` for core utility functions and UI component interaction tests.

**3. Web Audio Autoplay Policy & AudioContext Suspension:**
- **Issue:** Mobile browsers (especially iOS Safari) strictly restrict Web Audio initialization until a direct user pointer gesture is registered.
- **Current State:** `src/lib/audio.ts` initializes on user toggle, but rapid toggling or context recreation on background tabs can encounter suspended audio states.
- **Remediation Recommendation:** Ensure `ctx.resume()` is always awaited and handle audio interruption events (e.g. phone call or backgrounding).

**4. GitHub API Public Rate Limiting:**
- **Issue:** GitHub REST API v3 limits unauthenticated requests to 60 calls per hour per IP address.
- **Current State:** Caching in `localStorage` for 30 minutes and static fallback datasets (`FALLBACK_PROFILE`, `FALLBACK_REPOS`) prevent broken UI.
- **Remediation Recommendation:** Keep static fallback data updated periodically, or integrate build-time static generation for GitHub statistics if repo count grows.

**5. Tailwind v4 Theme Alignment:**
- **Issue:** The project uses `@tailwindcss/vite` v4. CSS variables are defined in `src/styles/theme.css` and imported in `src/index.css`.
- **Note:** Ensure future developers do not introduce deprecated `tailwind.config.js` configurations that conflict with Tailwind v4's native `@theme` CSS directive system.

---

*Concerns analysis: 2026-10-29*
*Update as issues are resolved or discovered*
