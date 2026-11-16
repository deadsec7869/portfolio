# Tamim — developer portfolio

React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion, Three.js, React Three Fiber 9, and Drei 10.

## Run

Use Node 22.12+ (or Node 24 LTS). For this existing checkout:

npm ci
npm run dev

Exact runtime dependency command for the verified versions:

npm install react@19.2.8 react-dom@19.2.8 three@0.186.0 @react-three/fiber@9.7.0 @react-three/drei@10.7.8 framer-motion@13.2.0 lucide-react@1.43.0 tailwindcss@4.3.3 @tailwindcss/vite@4.3.3

Development dependencies for a fresh project:

npm install -D typescript@6.0.2 vite@8.2.2 @vitejs/plugin-react@6.1.0 @types/react@19.2.18 @types/react-dom@19.2.4 @types/three@0.185.4 @types/node@24.13.3

npm run build
npm run preview

## Implementation

- Exact profile, five projects, and skills are centralized in src/data/portfolio.ts.
- Scene3D renders an extruded monogram and wireframe tunnel. Four scroll chapters control camera angle and geometry.
- Pointer parallax and scroll-dependent camera/rotation use delta-time damping without React updates per frame.
- DPR is capped at 2. Reduced motion, manual pause, visibility pausing, lazy loading, and a static WebGL fallback are included.
- ProjectModal uses native dialog focus containment, Escape dismissal, scroll locking, backdrop dismissal, and focus restoration.
- Project rows offer illustrated previews on hover and focus. The blueprint comparison accepts touch and keyboard input. Mobile navigation uses a native dialog.
- Architecture diagrams summarize only the supplied capabilities and stacks; they are not repository audits.
- Existing unmounted source components are retained to avoid deleting prior work.

## Vercel and social previews

Select Vite, build with npm run build, and publish dist. The supplied 1200 × 630 public/og-image.png is a real PNG.

vite.config.ts embeds the absolute social image URL, og:url, and canonical URL in the built HTML. It uses VITE_SITE_URL first, then VERCEL_PROJECT_PRODUCTION_URL, then VERCEL_URL. Enable Vercel system environment variables. For a custom domain or another host, set VITE_SITE_URL to the actual HTTPS origin before building. Without a domain, local development uses relative preview-image paths.

No invented deployment URL is embedded. No server secrets are required. Fonts load from Google Fonts with system fallbacks.

## Verification

Browser checks cover all five project dialogs, keyboard dismissal, mobile navigation, the blueprint slider, and page widths from 320px to 1440px. The lazy 3D bundle exceeds the default Vite chunk-size advisory. Cross-device frame rates and hosted previews have not been benchmarked.

## Complete source

PORTFOLIO_SOURCE.md contains the complete requested files plus their supporting files in copy-pasteable code blocks. public/og-image.png is the accompanying social preview asset.

