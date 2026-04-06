---
description: Premium B2B SaaS interface design system with craft principles, token architecture, and validation. For dashboards, apps, tools — not marketing sites.
effort: high
---
# Design Excellence — Interface Design System

Build interfaces with **craft, memory, and consistency**. This skill governs all UI output for TP_GIBAL.

**Scope:** Dashboards, admin panels, SaaS apps, tools, settings pages, data interfaces, comparison UIs.

---

## The Problem

AI generates generic output. Training has seen thousands of dashboards — the patterns are strong. You can follow every process below and still produce a template. The gap between intent and code generation is where defaults win. Catch yourself.

---

## Where Defaults Hide

Defaults disguise themselves as infrastructure — parts that feel like they just need to work, not be designed.

**Typography feels like a container.** But typography IS your design. Weight, personality, texture shape how the product feels before anyone reads. A B2B review platform and a trading terminal both need "clean, readable type" — but the type that signals trust and authority is not the type that's cold and dense.

**Navigation feels like scaffolding.** But navigation IS your product. Where you are, where you can go, what matters most. A page floating in space is a component demo, not software.

**Data feels like presentation.** But a number on screen is not design. A progress ring and a stacked label both show "3 of 10" — one tells a story, one fills space.

**Token names feel like implementation.** But `--ink` and `--parchment` evoke a world. `--gray-700` and `--surface-2` evoke a template. Someone reading only your tokens should guess what product this is.

---

## Intent First (Mandatory)

Before touching code, answer these explicitly:

**Who is this human?** Not "users." The actual person. A procurement manager comparing CRM tools? A startup CTO reading reviews at midnight? A vendor checking their product dashboard between meetings?

**What must they accomplish?** The verb. Compare three products side-by-side. Write a detailed review. Discover the best tool for their team size.

**What should this feel like?** Not "clean and modern." Specific words. Trustworthy like a financial report? Dense like a research tool? Approachable like a recommendation from a colleague?

**Every choice must be explainable.** If your answer is "it's common" or "it works" — you've defaulted, not chosen.

**The test:** If another AI given a similar prompt would produce the same output, you have failed.

---

## Product Domain Exploration (Required Before Proposing)

Before suggesting direction, produce ALL FOUR:

1. **Domain** — 5+ concepts, metaphors, vocabulary from this product's actual world (not features)
2. **Color world** — 5+ colors that exist naturally in this domain. If physical space, what would you see?
3. **Signature** — ONE element (visual, structural, or interaction) unique to THIS product
4. **Defaults** — 3 obvious choices you're rejecting and what replaces them

**The test:** Read your proposal. Remove the product name. Could someone identify what it's for? If not, explore deeper.

---

## Before Writing Each Component (Checkpoint)

Every time you write UI code — even small additions — state:

```
Intent: [who is this human, what must they do, how should it feel]
Palette: [colors from exploration — and WHY they fit this product's world]
Depth: [borders / shadows / layered — and WHY this fits the intent]
Surfaces: [elevation scale — and WHY this color temperature]
Typography: [typeface — and WHY it fits the intent]
Spacing: [base unit]
```

If you can't explain WHY for each choice, you're defaulting. Stop and think.

---

## The Mandate (Pre-Delivery Checklist)

Before showing work, run these checks:

- **Swap test** — Swap typeface for default or layout for standard template. Would anyone notice? Places where swapping wouldn't matter = places you defaulted.
- **Squint test** — Blur eyes. Still perceive hierarchy? Anything jumping out harshly? Craft whispers.
- **Signature test** — Point to five specific elements where signature appears. Not "overall feel" — actual components.
- **Token test** — Read CSS variables aloud. Do they belong to THIS product's world or any project?

If any check fails, iterate before showing.

---

## Craft Foundations

### Subtle Layering (The Backbone)

Regardless of direction — this principle applies to everything. You should barely notice the system working. When you look at Vercel's dashboard, you don't think "nice borders." You just understand the structure. The craft is invisible.

**Surface Elevation:** Surfaces stack. Build a numbered system — base → level 1 → level 2 → level 3. In dark mode, higher elevation = slightly lighter. Each jump should be only a few percentage points of lightness. Whisper-quiet shifts you feel rather than see.

**Key decisions:**
- **Sidebars:** Same background as canvas + subtle border. Different colors fragment visual space.
- **Dropdowns:** One level above parent surface. Same level = dropdown blends into card.
- **Inputs:** Slightly darker than surroundings (inset signal), not lighter.

**Borders:** Low opacity rgba blends with background — defines edges without demanding attention. Build progression: default → subtle → strong → stronger (focus rings).

### Infinite Expression

Every pattern has infinite expressions. No interface should look the same. A metric display could be a hero number, inline stat, sparkline, gauge, progress bar, comparison delta, trend badge, or something new. Same concepts, infinite variations — Linear's cards don't look like Notion's.

### Color Lives Somewhere

Every product exists in a world. Before reaching for a palette, spend time in the product's world. Your palette should feel like it came FROM somewhere — not applied TO something. One accent color with intention beats five colors without thought.

---

## Token Architecture

### Primitive Foundation

Every color traces back to primitives:
- **Foreground** — text hierarchy (primary, secondary, muted, faint)
- **Background** — surface elevation (base, elevated, overlay)
- **Border** — separation hierarchy (default, subtle, strong, stronger)
- **Brand** — primary accent (1-2 colors maximum)
- **Semantic** — functional (destructive, warning, success)

No random hex values — everything maps to primitives.

### Text Hierarchy (4 Levels)
- **Primary** — default text, highest contrast
- **Secondary** — supporting text, slightly muted
- **Tertiary** — metadata, timestamps
- **Muted** — disabled, placeholder, lowest contrast

### Control Tokens
Form controls need dedicated tokens — control background, control border, control focus. Tune interactive elements independently from layout surfaces.

---

## Spacing System

Pick a base unit (4px or 8px) and use multiples throughout:
- **Micro** — icon gaps, tight element pairs
- **Component** — within buttons, inputs, cards
- **Section** — between related groups
- **Major** — between distinct sections

Padding: symmetrical TLBR unless content requires asymmetry.

---

## Depth & Elevation (Choose ONE, Commit)

- **Borders-only** — Clean, technical, dense. For utility-focused tools. (Linear, Raycast)
- **Subtle shadows** — Soft lift. `0 1px 3px rgba(0,0,0,0.08)`. Approachable products.
- **Layered shadows** — Rich, premium, dimensional. Multiple layers. (Stripe, Mercury)
- **Surface color shifts** — Background tints establish hierarchy without shadows.

Don't mix approaches.

---

## Border Radius

Sharper = technical. Rounder = friendly. Build a scale:
- Small — inputs, buttons
- Medium — cards
- Large — modals, containers

Don't mix sharp and soft randomly.

---

## Typography Hierarchy

- **Headlines** — heavier weight, tighter letter-spacing for presence
- **Body** — comfortable weight for readability
- **Labels/UI** — medium weight, works at smaller sizes
- **Data** — monospace, `tabular-nums` for alignment

Combine size + weight + letter-spacing. Size alone = weak hierarchy.

---

## Nihongo Duel — 프로젝트 고유 기준

- **Aesthetic**: 일본 미학(和) 기반 — 와비사비의 미니멀리즘, 여백의 미(間), 자연스러운 따뜻함. Duolingo의 게이미피케이션 + 무인양품의 정갈함.
- **Typography**: Noto Sans JP (일본어) + Pretendard (한국어) + Inter (영문). 일본어 텍스트는 충분한 line-height (1.8+) 확보.
- **Micro-interactions**: GSAP으로 카드 플립(어휘), 획순 드로잉(한자), 정답/오답 피드백. Fast micro-interactions (~150ms), smooth deceleration easing.
- **학습 카드**: 플립 애니메이션, 스와이프 제스처 (모바일), 후리가나 토글.
- **진행도 시각화**: 원형 프로그레스, 스트릭 캘린더, JLPT 레벨 게이지.
- **Components**: Headless UI primitives (Radix Vue) for accessibility, styled with UnoCSS.
- **Accessibility**: WCAG 2.1 AA. 키보드 네비게이션 + 스크린 리더. 일본어 TTS 지원.
- **Responsive**: 모바일 퍼스트. 학습 카드/퀴즈는 한 손 조작 최적화 (320px~2560px).
- **Dark Mode**: 먹색(墨色) 배경 + 남색 액센트. 일본어 텍스트 가독성 최우선.

---

## States (Every Interactive Element)

Every button, link, clickable region needs: default, hover, active, focus, disabled.
Data needs: loading, empty, error.
Missing states feel broken.

---

## Iconography

Icons clarify, not decorate. If removing loses no meaning, remove it. One icon set throughout. Standalone icons get subtle background containers.

---

## Avoid

- Harsh borders (first thing you see = too strong)
- Dramatic surface jumps (should be whisper-quiet)
- Inconsistent spacing (clearest sign of no system)
- Mixed depth strategies
- Missing interaction states
- Dramatic drop shadows
- Large radius on small elements
- Pure white cards on colored backgrounds
- Thick decorative borders
- Gradients/color for decoration (color = meaning)
- Multiple accent colors (dilutes focus)
- Different hues per surface (same hue, shift lightness only)

---

## Workflow

### Communication
Be invisible. Don't announce modes or narrate process. Jump into work with reasoning.

### If `.interface-design/system.md` Exists
Read it and apply. Decisions are made.

### If No system.md
1. Explore domain — produce all four required outputs
2. Propose — direction must reference all four
3. Confirm — get user buy-in
4. Build — apply principles
5. Evaluate — run mandate checks before showing
6. Offer to save

### After Every Task
Offer to save patterns to `.interface-design/system.md`.

---

## Deep Dives

For more detail:
- `interface-design/references/principles.md` — Code examples, specific values, dark mode
- `interface-design/references/validation.md` — Memory management, when to update system.md
- `interface-design/references/critique.md` — Post-build craft critique protocol
- `interface-design/references/example.md` — Practical examples of subtle layering
