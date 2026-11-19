# Tamim — interactive portfolio

A redesign of the existing React/TypeScript portfolio, inspired by therishithakor.com. Your profile, five projects, skills, contact details, project illustrations and custom TB monogram are retained.

## Run

Requires Node 22.12+.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

## Design and interaction

- Onest typography, warm neutral surfaces and generous hero layout.
- Animated spiral notebook cycles through four roles; pause control and reduced-motion support.
- Existing TB monogram is presented as a floating dimensional sculpture. No personal portrait was supplied.
- Pull or click the hanging cord to toggle light/dark mode. Theme choice persists locally.
- Four arched, ribbed doors open galleries for Web Development, AI & Automation, Robotics and Interactive 3D. Mobile doors use horizontal swipe and position controls.
- All five original project detail dialogs and supplied GitHub links are retained.
- Tilting, flippable ability card uses real skills, without invented ratings.
- Education/story section and expandable skill lists.
- Five-step contact questionnaire prepares an email addressed to the existing profile email. It does not send messages or require a server.
- Native dialogs provide modal focus containment, Escape dismissal, backdrop dismissal, scroll locking and focus return.
- Full-screen mobile navigation and live India clock.

Profile/project content: src/data/portfolio.ts.
Page and interaction: src/App.tsx.
Responsive styles and theme: src/App.css.
Older unused components are retained. PORTFOLIO_SOURCE.md and .planning files describe the previous design, not this revision.

## Verification

Production TypeScript/Vite build passed. Browser checked at widths 320, 390, 768 and 1440 pixels: no horizontal page overflow. Exercised all four rooms, all five project detail dialogs, nested dialog Escape dismissal, mobile menu, carousel controls, ability card flip, theme change, animation pause, and contact steps/back navigation. Browser error log was empty.

The contact flow was checked through the final fields; no real email was sent. Mobile checks use browser viewport emulation, not physical devices. Reduced-motion behavior is implemented in CSS and the animation hook; OS-setting emulation was not exercised.

Vite and source-map-js received compatible lockfile updates; npm audit reported zero vulnerabilities after the update.

## Deployment

Vite builds into dist. Existing Vercel metadata configuration is retained: VITE_SITE_URL or Vercel environment values set the canonical origin. Fonts load from Google Fonts with local system fallbacks. The .openai/hosting.json file identifies the private Sites preview.

The redesign intentionally adapts content categories and uses Tamim's monogram in place of the reference author's portrait. It recreates the main visual language and interactions, rather than copying personal photography, career claims, or the reference's full 3D rendering engine.

