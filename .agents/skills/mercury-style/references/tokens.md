# Mercury Design Tokens

Detailed token reference for the Mercury ("Alpine banking at blue hour") design system.

---

## 1. Color Palette & Roles

| Token Name | CSS Variable | Hex | Role & Description |
|------------|--------------|-----|-------------------|
| **Onyx Canvas** | `--color-onyx-canvas` | `#171721` | Base page background, hero dark overlay base, footer, and section canvases. |
| **Graphite Card** | `--color-graphite-card` | `#1e1e2a` | Elevated card and container surfaces — one step lighter than canvas to provide quiet separation. |
| **Obsidian Button** | `--color-obsidian-button` | `#272735` | Secondary button fills, inline form backgrounds, subtle interactive elements. |
| **Slate Border** | `--color-slate-border` | `#70707d` | Medium-weight dividers, grid separations, and structural borders. |
| **Mist Border** | `--color-mist-border` | `#e2e3ed` | Light hairline borders, ghost-button outlines, input edges (light-on-dark contrast). |
| **Ash Text** | `--color-ash-text` | `#c3c3cc` | Secondary copy, helper text, muted labels, input placeholders. |
| **Ivory Text** | `--color-ivory-text` | `#ededf3` | Primary text, navigation links, ghost-button strokes and labels, icons. |
| **Cobalt** | `--color-cobalt` | `#5266eb` | Violet action color for filled primary buttons and focused conversion moments. |
| **Pure White** | `--color-pure-white` | `#ffffff` | Text and icons on cobalt primary buttons and highest-contrast hero headlines. |

---

## 2. Surfaces & Elevation Hierarchy

Mercury communicates all elevation through **flat value contrast** rather than drop shadows or blur glows.

```text
Level 2: Obsidian (#272735)  ─── Interactive fills, secondary buttons
Level 1: Graphite (#1e1e2a)  ─── Elevated cards & content groupings (+1 step lift)
Level 0: Onyx     (#171721)  ─── Deep canvas base (dominant plane)
```

- **Level 0 (Onyx Canvas - `#171721`)**: Base background. Sets the atmospheric, observatory-like mood.
- **Level 1 (Graphite Card - `#1e1e2a`)**: 12px border radius, 32px padding, 0px border, 0px shadow. Sits flat on the onyx canvas.
- **Level 2 (Obsidian Button - `#272735`)**: Secondary interactive surfaces and attached controls.

---

## 3. Typography Matrix

Mercury uses calibrated intermediate weights (360, 400, 420, 480, 530) instead of conventional bold/light binaries.

### Typefaces
- **Body & UI**: `arcadia` (Fallback: `Inter`, system-ui, sans-serif)
- **Headlines & Display**: `arcadiaDisplay` (Fallback: `Söhne Breit`, `Cabinet Grotesk`, `Syne`, sans-serif)

### Type Scale Specification

| Role | Font Size | Line Height | Letter Spacing | Font Weight | Default Font Family |
|------|-----------|-------------|----------------|-------------|---------------------|
| `caption` | 12px | 1.0 (12px) | +0.01em (0.12px) | 480 | `arcadia` |
| `body-sm` | 14px | 1.0 (14px) | +0.005em (0.07px) | 400 | `arcadia` |
| `body` | 16px | 1.5 (24px) | 0 | 400 | `arcadia` |
| `body-lg` | 18px | 1.35 (24.3px) | 0 | 480 | `arcadia` |
| `subheading` | 21px | 1.35 (28.35px) | 0 | 480 | `arcadia` |
| `heading-sm` | 28px | 1.2 (33.6px) | +0.015em (0.42px) | 480 | `arcadiaDisplay` |
| `heading` | 32px | 1.15 (36.8px) | +0.015em (0.48px) | 480 | `arcadiaDisplay` |
| `heading-lg` | 42px | 1.15 (48.3px) | +0.01em (0.42px) | 480 | `arcadiaDisplay` |
| `display` | 65px | 1.1 (71.5px) | 0 | 480 or 530 | `arcadiaDisplay` |

---

## 4. Spacing Scale

Base unit: **4px**

| Step | Value | CSS Token | Common Use |
|------|-------|-----------|------------|
| 1 | 4px | `--spacing-4` | Micro-gaps, hairline offsets |
| 2 | 8px | `--spacing-8` | Icon-to-text gaps |
| 3 | 12px | `--spacing-12` | Element gap, card internal micro-spacing |
| 4 | 16px | `--spacing-16` | Standard inline gap, compact paddings |
| 5 | 20px | `--spacing-20` | Button horizontal padding |
| 6 | 24px | `--spacing-24` | Primary CTA horizontal padding |
| 8 | 32px | `--spacing-32` | Card internal padding (all sides) |
| 10 | 40px | `--spacing-40` | Standalone CTA vertical padding |
| 14 | 56px | `--spacing-56` | Medium section offsets |
| 18 | 72px | `--spacing-72` | Standard section vertical gap & padding |
| 28 | 112px | `--spacing-112` | Hero vertical margins |
| 32 | 128px | `--spacing-128` | Major transition breaks |

---

## 5. Border Radii

| Category | Radius | Elements |
|----------|--------|----------|
| **Pill (Wide)** | `40px` | Ghost outline buttons, Top nav items, Tag pills |
| **Pill (Standard)** | `32px` | Primary Cobalt CTA, Form inputs, Inline buttons |
| **Card** | `12px` | Feature cards, Product blocks, Floating panels |
| **Structural** | `4px` | Media containers, subtle dividers, internal anchors |

