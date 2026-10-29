# Mercury Style — Do's and Don'ts

Guidelines and anti-patterns to preserve the integrity of the "Alpine banking at blue hour" aesthetic.

---

## The Core Rule: Strict Restraint

Mercury's distinction lies in its **calibrated restraint**. Most interfaces rely on heavy weights, drop shadows, gradients, and multiple accent colors. Mercury achieves power by subtracting all of them.

---

## 1. Color Usage

### DO:
- **Exclusively use Cobalt `#5266eb` for the single primary action per page.** It must feel like the gravitational center of the screen.
- **Rely on the one-step value lift:** Place `#1e1e2a` (Graphite) cards directly on `#171721` (Onyx) canvas.
- **Use `#ededf3` (Ivory)** for primary headings, body text, nav items, and ghost outlines.
- **Use `#c3c3cc` (Ash)** for supporting captions, secondary metrics, and placeholder text.
- **Use `#ffffff` (Pure White)** only for text inside filled Cobalt buttons and high-contrast hero titles.

### DON'T:
- **Never introduce secondary chromatic colors.** No emerald greens for "positive", amber/reds for warnings in general UI, or purple/cyan gradients. The system is strictly monochromatic + Cobalt.
- **Never use Cobalt decoratively.** Do not use Cobalt for icons, badges, borders, card backgrounds, or secondary buttons.
- **Never cluster Cobalt buttons.** If two primary buttons must exist, separate them by at least 32px or convert one to a ghost outline.
- **Never use pure white (`#ffffff`) for regular body text.** Pure white on a near-black background creates harsh optical vibration; use `#ededf3` Ivory.
- **Never use mid-gray or bright saturated section background bands.** Every section canvas is `#171721`.

---

## 2. Elevation & Depth

### DO:
- **Communicate depth strictly through value contrast.** Card surfaces (`#1e1e2a`) are 1 step lighter than the canvas (`#171721`).
- **Keep surfaces flat.** Elements sit cleanly on the 2D plane.
- **Use `backdrop-blur` for overlays.** Frosted glass (`backdrop-blur-md` or `backdrop-blur-lg`) over photography provides depth without visual weight.

### DON'T:
- **Never apply box-shadows or drop-shadows.** No `shadow-lg`, `shadow-xl`, or neon card glows.
- **Never apply inner glows or beveled highlights.**
- **Never use borders around graphite cards.** Separation is established by surface value alone.

---

## 3. Typography

### DO:
- **Use intermediate weight 480 for headings.** It asserts presence without shouting or appearing heavy.
- **Use weight 400 for body text.** Keep line-height generous at `1.5` to ensure effortless legibility.
- **Apply positive letter-spacing (tracking) on display sizes:**
  - 42px heading: `+0.01em` (0.42px)
  - 32px heading: `+0.015em` (0.48px)
  - 28px heading: `+0.015em` (0.42px)
  - 12px caption: `+0.01em` (0.12px)
- **Use tight line-heights on display headings:** `1.1` to `1.2`.

### DON'T:
- **Never use bold weights (600, 700, 800, 900) for headings.** Weight 480 is the signature; weight 530 is the absolute ceiling for the largest hero display.
- **Never use ultra-thin weights (100, 200, 300).**
- **Never collapse body line-height below 1.4.**

---

## 4. Shapes & Geometry

### DO:
- **Use pill radii (`32px` or `40px`) for all interactive elements:** buttons, inputs, tags, and nav items.
- **Use `12px` radius for cards.**
- **Use `4px` radius for structural media.**
- **Use split-pill geometry for combined input-button forms:** left element `rounded-l-[32px]`, right element `rounded-r-[32px]`.

### DON'T:
- **Never use sharp corners (0px–4px) on buttons or inputs.** The pill shape is non-negotiable.
- **Never make cards pill-shaped.** Cards must stay at `12px` border radius.
- **Never round entire cards to 32px or 40px.**

---

## 5. Imagery & Media

### DO:
- **Use cinematic, atmospheric, cool-toned photography.** Alpine mountain ranges, blue hour skies, misty ridges, minimalist architectural or natural spaces.
- **Apply dark overlays (`#171721` at ~60-75% opacity)** over photos to ensure high-contrast readability.
- **Keep icons minimal, line-based, and rendered in `#ededf3` Ivory.**

### DON'T:
- **Never use 3D clay graphics, cartoon illustrations, or hand-drawn sketches.**
- **Never use warm, oversaturated, sunny, or tropical imagery.**
- **Never use heavy decorative icons or colorful icon badges.**

---

## Quick Audit Checklist

When reviewing a component or page for Mercury compliance:

- [ ] Is the page background `#171721`?
- [ ] Are elevated cards `#1e1e2a` with `12px` radius and no shadows?
- [ ] Is `#5266eb` Cobalt used only once (or very sparingly) for the primary conversion action?
- [ ] Are headings set to intermediate weight `480` (not bold/700)?
- [ ] Are interactive buttons and inputs pill-shaped (`32px` or `40px`)?
- [ ] Is body copy `#ededf3` Ivory (not `#ffffff`) at `16px` with `1.5` line-height?
- [ ] Are section vertical gaps at least `72px`?
- [ ] Are zero drop-shadows present on cards?

