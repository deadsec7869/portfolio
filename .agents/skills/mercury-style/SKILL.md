---
name: mercury-style
description: >-
  Apply the Mercury design system ("Alpine banking at blue hour") to UI components, web pages, and applications.
  Use this skill when designing, implementing, styling, or auditing interfaces with Mercury's aesthetic: near-black
  onyx canvas (#171721), flat graphite cards (#1e1e2a), single Cobalt accent (#5266eb), intermediate-weight typography
  (arcadia/arcadiaDisplay at weight 480), pill-shaped controls, shadowless elevation, and atmospheric cinematic layouts.
---

# Mercury Style — Alpine Banking at Blue Hour

The Mercury design system embodies a contemplative, observatory-like fintech aesthetic termed **"Alpine banking at blue hour"**. A near-black canvas sets a cinematic atmosphere where content surfaces float as subtly lighter graphite cards. The interface is strictly monochromatic — ivory text on onyx, with a single vivid cobalt (#5266eb) acting as the sole chromatic punctuation reserved exclusively for primary conversion actions.

---

## Core Aesthetic Principles

1. **Monochrome Discipline with Singular Cobalt**: Every surface, border, and text element is strictly grayscale (onyx `#171721`, graphite `#1e1e2a`, obsidian `#272735`, mist `#e2e3ed`, ivory `#ededf3`, ash `#c3c3cc`). The only allowed chromatic color is **Cobalt (`#5266eb`)**, reserved exclusively for the primary CTA ("Open account"). Never introduce secondary accent colors (greens, oranges, reds) into general UI.
2. **Shadowless Flat Value Contrast**: Never use drop shadows or outer glows. Elevation is achieved purely through value contrast — graphite cards (`#1e1e2a`) sit one step lighter than the onyx canvas (`#171721`).
3. **Calibrated Intermediate Typography (Weight 480)**: Mercury rejects standard bold/light binaries (no heavy 600/700+ weights). Headings are set in `arcadiaDisplay` at intermediate weight `480` (or `530` max for huge hero displays) with positive tracking (+0.01em to +0.02em) and tight line-heights (1.1–1.2). Body is set in `arcadia` at `400` with generous 1.5 line height.
4. **Pill-Shaped Interactive Elements**: All interactive controls (buttons, inputs, navigation tags) feature a `32px` or `40px` pill border-radius. Sharp `4px` corners are strictly reserved for structural layout items.
5. **Spacious Density (72px Rhythm)**: Sections breathe with `72px` vertical gaps and `32px` card padding. Max content container is `1200px`.
6. **Cinematic Hero Imagery**: Atmospheric, cool-toned landscape photography (misty alpine ridges, solitary desks in nature) paired with frosted glass (`backdrop-blur`) top bars.

---

## Quick Reference Tokens

### Palette

| Role | Color Name | Hex | Usage |
|------|------------|-----|-------|
| Canvas | Onyx Canvas | `#171721` | Base page background, hero overlay base, footers |
| Card | Graphite Card | `#1e1e2a` | Elevated cards, feature containers (1-step value lift) |
| Secondary | Obsidian Button | `#272735` | Secondary interactive fills, inline attachments |
| Hairline Border | Mist Border | `#e2e3ed` | Ghost-button outlines, inputs, hairline dividers |
| Medium Border | Slate Border | `#70707d` | Structural borders, divider lines |
| Body Text | Ivory Text | `#ededf3` | Primary text, ghost-button strokes/text, glyphs |
| Muted Text | Ash Text | `#c3c3cc` | Secondary body, labels, placeholders |
| Primary Accent | Cobalt | `#5266eb` | Sole chromatic accent: Primary CTA button only |
| Pure Contrast | Pure White | `#ffffff` | Text on cobalt buttons & high-impact hero titles |

### Typography

| Token | Size | Line Height | Tracking | Weight | Role / Element |
|-------|------|-------------|----------|--------|----------------|
| `--text-display` | 65px | 1.1 | 0 | 480 / 530 | Hero headline |
| `--text-heading-lg` | 42px | 1.15 | 0.01em (0.42px) | 480 | Section titles |
| `--text-heading` | 32px | 1.15 | 0.015em (0.48px) | 480 | Major feature headings |
| `--text-heading-sm` | 28px | 1.2 | 0.015em (0.42px) | 480 | Card headings |
| `--text-subheading` | 21px | 1.35 | 0 | 480 | Subtitles |
| `--text-body-lg` | 18px | 1.35 | 0 | 480 | Hero intro subtext |
| `--text-body` | 16px | 1.5 | 0 | 400 | Default body text |
| `--text-body-sm` | 14px | 1.0 | 0.005em (0.07px) | 400 | Compact UI / labels |
| `--text-caption` | 12px | 1.0 | 0.01em (0.12px) | 480 | Disclaimers & badges |

*Font substitutes:*
- **Body & UI (`arcadia`)**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, sans-serif.
- **Display & Headings (`arcadiaDisplay`)**: `Söhne Breit`, `Cabinet Grotesk`, `Syne`, or wide geometric sans.

### Radii & Spacing

- **Interactive Controls (Buttons, Inputs)**: `32px`
- **Navigation Pills & Ghost Buttons**: `40px`
- **Cards**: `12px` (flat, no shadow)
- **Structural / Internal**: `4px`
- **Vertical Rhythm**: `72px` between sections; `32px` card internal padding; `12px` element gap.

---

## Detailed References

For comprehensive specifications, consult the reference guides:

- [Design Tokens & Theme Variables](./references/tokens.md): Complete CSS variables, Tailwind tokens, and typography matrix.
- [Component Specifications](./references/components.md): Blueprints for Buttons, Hero, Cards, Split Inputs, Navbars, and Footers.
- [Do's and Don'ts](./references/dos-and-donts.md): The definitive rulebook for maintaining the Alpine banking aesthetic.

---

## Ready-to-Use Assets & Resources

- [Pure CSS Custom Properties](./resources/mercury.css): Importable CSS stylesheet with standard tokens and utility classes.
- [Tailwind CSS v3 Configuration](./resources/tailwind.config.js): Theme extension for Tailwind v3.
- [Tailwind CSS v4 Theme](./resources/theme.css): `@theme` block ready for Tailwind v4.
- [Hero Section Example](./examples/hero-section.tsx): Complete React implementation with full-bleed hero, navigation bar, and inline pill input.
- [Feature Grid Example](./examples/feature-grid.tsx): 3-column Graphite card grid adhering to Mercury spacing and typography.

---

## Workflow: How to Build in Mercury Style

When asked to generate or modify a page/component using Mercury style:

1. **Verify Canvas & Surfaces**: Set body/canvas to `#171721`. Elevated surfaces must use `#1e1e2a` with `border-radius: 12px`, `padding: 32px`, and zero box-shadow.
2. **Apply Intermediate Weights**: Headings must use weight `480` with letter-spacing `0.01em-0.02em`. Never apply `font-bold` (700) or `font-semibold` (600).
3. **Reserve Cobalt**: Use `#5266eb` ONLY on the single primary conversion button ("Open account" or "Get started"). Use Ivory `#ededf3` on ghost buttons and nav links.
4. **Use Pill Radii**: Ensure buttons have `rounded-[32px]` or `rounded-[40px]`. For inline email forms, use the split pill (`rounded-l-[32px]` on input, `rounded-r-[32px]` on Cobalt button).
5. **Maintain Spacing Rhythm**: Enforce `max-w-[1200px]`, `py-[72px]` on sections, and `gap-3` (12px) between tightly related elements.

