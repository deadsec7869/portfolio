# Mercury Component Specifications

Comprehensive implementation blueprints for core Mercury UI components.

---

## 1. Primary CTA Button (Cobalt)

**Role:** The single chromatic action in the system — reserved exclusively for primary conversions (e.g., "Open account").

### Specifications
- **Background:** `#5266eb` (Cobalt)
- **Text Color:** `#ffffff` (Pure White)
- **Typography:** 16px `arcadia` / Inter, weight 400
- **Border Radius:** `32px` (pill)
- **Border:** None (`0px`)
- **Shadow:** None (`0px`)
- **Padding:**
  - *Inline / Standard:* `12px` or `14px` vertical, `24px` horizontal
  - *Standalone hero CTA:* up to `40px` vertical when emphasized
- **Transition:** `background-color 150ms ease` (hover: `#4355db` or brightness(1.08))

```html
<button class="bg-[#5266eb] hover:bg-[#4355db] text-[#ffffff] text-[16px] font-[400] rounded-[32px] px-6 py-3 border-0 transition-colors inline-flex items-center justify-center">
  Open account
</button>
```

---

## 2. Ghost Outline Button

**Role:** Secondary or tertiary actions on dark backgrounds (e.g., "Log in", "Learn more").

### Specifications
- **Background:** `transparent`
- **Border:** `1px solid #ededf3` (Ivory)
- **Text Color:** `#ededf3` (Ivory)
- **Typography:** 16px `arcadia` / Inter, weight 400
- **Border Radius:** `40px` (pill)
- **Padding:** `10px` vertical, `20px` horizontal (or `0px` vertical / `20px` horizontal for compact nav links)
- **Transition:** `background-color 150ms ease`, `color 150ms ease` (hover: `bg-[#ededf3]/10`)

```html
<button class="bg-transparent hover:bg-[#ededf3]/10 text-[#ededf3] text-[16px] font-[400] border border-[#ededf3] rounded-[40px] px-5 py-2.5 transition-colors inline-flex items-center justify-center">
  Log in
</button>
```

---

## 3. Navigation Pill Link

**Role:** Top-bar navigation items with optional dropdown caret or active state.

### Specifications
- **Background:** `transparent` (active/hover: `rgba(255,255,255,0.06)`)
- **Border:** None
- **Text Color:** `#ededf3` (Ivory)
- **Typography:** 16px `arcadia` / Inter, weight 400
- **Border Radius:** `40px`
- **Padding:** `8px` vertical, `20px` horizontal

```html
<a href="#solutions" class="text-[#ededf3] hover:text-white hover:bg-white/5 rounded-[40px] px-5 py-2 text-[16px] font-[400] transition-colors inline-flex items-center gap-1.5">
  Solutions
  <svg class="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
  </svg>
</a>
```

---

## 4. Graphite Card

**Role:** Content grouping surface for product features, stats, or text blocks.

### Specifications
- **Background:** `#1e1e2a` (Graphite)
- **Border:** None (`0px`)
- **Border Radius:** `12px`
- **Shadow:** None (`0px`)
- **Padding:** `32px` on all sides
- **Heading:** 28px `arcadiaDisplay`, weight 480, line-height 1.2, letter-spacing +0.015em, color `#ededf3`
- **Body:** 16px `arcadia`, weight 400, line-height 1.5, color `#ededf3` (or `#c3c3cc` Ash for secondary notes)

```html
<div class="bg-[#1e1e2a] rounded-[12px] p-8 flex flex-col justify-between">
  <div>
    <h3 class="text-[#ededf3] text-[28px] leading-[1.2] tracking-[0.015em] font-[480] mb-3">
      Treasury & Yield
    </h3>
    <p class="text-[#c3c3cc] text-[16px] leading-[1.5] font-[400]">
      Automate cash management across high-yield government-backed securities without locking liquidity.
    </p>
  </div>
  <div class="mt-8 pt-6 border-t border-[#70707d]/20 text-[14px] text-[#ededf3]">
    Up to 5.02% annualized yield
  </div>
</div>
```

---

## 5. Inline Email Capture Form (Pill Split)

**Role:** Hero conversion element with seamlessly attached submit button.

### Specifications
- **Container:** `flex`, row layout, `gap: 0px`, centered.
- **Input:**
  - Background: `transparent`
  - Border: `1px solid #ededf3` (top, bottom, left)
  - Radius: `32px 0 0 32px`
  - Text: 16px `arcadia`, `#ededf3`
  - Placeholder: `#c3c3cc` (Ash)
  - Padding: `14px` vertical, `20px` horizontal
- **Button:**
  - Background: `#5266eb` (Cobalt)
  - Border: None
  - Radius: `0 32px 32px 0`
  - Text: 16px `arcadia`, `#ffffff`
  - Padding: `14px` vertical, `24px` horizontal

```html
<form class="flex items-center w-full max-w-[480px]">
  <input
    type="email"
    placeholder="Enter your work email"
    class="flex-1 bg-transparent border-t border-b border-l border-[#ededf3] text-[#ededf3] placeholder-[#c3c3cc] text-[16px] font-[400] rounded-l-[32px] px-5 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#5266eb]"
    required
  />
  <button
    type="submit"
    class="bg-[#5266eb] hover:bg-[#4355db] text-[#ffffff] text-[16px] font-[400] rounded-r-[32px] px-6 py-3.5 border-0 transition-colors whitespace-nowrap"
  >
    Open account
  </button>
</form>
```

---

## 6. Full-Bleed Hero Section

**Role:** Above-the-fold brand statement blending atmospheric landscape photography with high-impact intermediate typography.

### Specifications
- **Dimensions:** `100vw` width, `100vh` (or `min-h-screen`) height.
- **Background:** High-res cool-toned photographic landscape (e.g. misty alpine mountain ranges) behind a `#171721` dark overlay (opacity 0.65 to 0.75).
- **Content Container:** Centered vertically and horizontally, max-width `640px`.
- **Headline:** 65px `arcadiaDisplay`, weight 480 or 530, line-height 1.1, text `#ffffff`.
- **Subtext:** 18px `arcadia`, weight 480, line-height 1.35, text `#ededf3`, max-width `520px`.
- **Form:** Centered inline pill email capture.

---

## 7. Transparent Top Navigation Bar

**Role:** Sticky/fixed top bar floating cleanly over the hero.

### Specifications
- **Position:** `fixed` or `sticky`, top 0, left 0, right 0, z-index 50.
- **Height:** ~`72px`
- **Background:** Transparent initially; transitions to `#171721/80` with `backdrop-blur(16px)` on scroll.
- **Layout:**
  - *Left:* Mercury wordmark + concentric circle glyph.
  - *Center:* Nav links (`Products`, `Solutions`, `Resources`, `About`, `Pricing`) in 40px pill shapes.
  - *Right:* Ghost outline "Log in" button and filled Cobalt "Open account" pill button.

---

## 8. Disclaimer Banner

**Role:** Regulatory and banking disclosure strip at the footer.

### Specifications
- **Background:** `#171721` (matches canvas).
- **Border:** Top border `1px solid #70707d/30`.
- **Typography:** 12px `arcadia`, weight 480, line-height 1.5, letter-spacing +0.01em.
- **Text Color:** `#c3c3cc` (Ash) or `#ededf3/70`.
- **Padding:** `40px` vertical.
- **Max Width:** `1200px` centered.

