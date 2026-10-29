---
last_mapped_commit: eec932bb13d1cbbb22d2664276cceb82b383a8ed
last_mapped_at: 2026-10-29
---
# External Integrations

**Analysis Date:** 2026-10-29

## External APIs

**GitHub REST API v3:**
- **Endpoints:**
  - `GET https://api.github.com/users/{username}` — Public developer profile stats (repos, followers, avatar)
  - `GET https://api.github.com/users/{username}/repos?sort=updated&per_page=30` — Public project repositories, metadata, and topic tags
- **Location:** `src/lib/github.ts`
- **Consumer:** `src/components/OpenSource/OpenSourceSection.tsx`
- **Authentication:** Unauthenticated public calls (subject to standard GitHub rate limits: 60 requests/hr per IP)
- **Resilience & Caching:**
  - Client-side `localStorage` caching with a 30-minute Time-To-Live (`CACHE_TTL_MS = 1000 * 60 * 30`)
  - Verified static fallback data (`FALLBACK_PROFILE`, `FALLBACK_REPOS`) ensuring the UI never breaks or shows empty state during rate limits or offline use
- **Types:** Defined in `src/types/github.ts` (`GitHubUser`, `GitHubRepo`)

## Web Browser & Hardware APIs

**Web Audio API:**
- **Engine:** `SpatialAudioEngine` in `src/lib/audio.ts`
- **Hardware Integration:** Browser `AudioContext` / `webkitAudioContext`
- **Features:**
  - Low-frequency ambient spatial drone (biquad low-pass filter with A1/A2 oscillators)
  - Procedural micro-interaction tones for button hovers (`playHover`) and clicks (`playClick`)
  - User-driven audio gate: Default state is strictly muted, unlocked only when user engages the Spatial HUD toggle in `src/components/UI/SpatialHud.tsx`

**WebGL 2.0 / Canvas API:**
- **Driver:** Three.js and `@react-three/fiber`
- **Canvas Mounts:**
  - Global background canvas in `src/three/Canvas/ExperienceCanvas.tsx`
  - Specialized scene canvases in `src/three/scenes/HeroScene.tsx`, `ProjectScene.tsx`, `RobotScene.tsx`, `MusicScene.tsx`, `ContactScene.tsx`
- **Hardware Fallback:**
  - `src/three/scenes/SceneFallback.tsx` and `src/hooks/useQualityLevel.ts` detect device performance, memory constraints, and WebGL support to adjust particle density or render static geometric fallbacks

## Authentication & Security

- **Authentication:** None required. The portfolio is an unauthenticated public portfolio.
- **Secrets:** No API keys or secret tokens are embedded in client bundles; all data fetches use public read-only endpoints.

## Content Delivery & External Assets

**Remote Assets:**
- GitHub avatar images hosted on `https://avatars.githubusercontent.com`
- Google Fonts CDN references in `index.html`

**Project Outbound Links:**
- Deployed web applications:
  - AI Robot Command Center: `https://ai-robot-command-center.vercel.app`
  - VTU Study App: `https://vtu-study-app-tau.vercel.app`
- Social profiles linked via `src/data/social.ts` (GitHub, LinkedIn, Email mailto)

---

*Integrations analysis: 2026-10-29*
*Update when external integrations change*
