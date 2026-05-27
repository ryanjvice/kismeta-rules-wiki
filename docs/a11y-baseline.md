# Accessibility baseline — pre-patch audit

Code-level audit conducted May 2026 before the accessibility patch. Use this as the backlog and comparison point. Run Lighthouse / axe-core (see `npm run a11y:check`) after each fix to verify closure.

**Target:** WCAG 2.2 Level AA

---

## What already works well (preserve these patterns)

| Area | File | Pattern |
|------|------|---------|
| Modal / dialog | `src/components/ContextRulesPanel.astro` + `src/scripts/context-panel.ts` | `role="dialog"`, `aria-modal`, `aria-labelledby`, focus-on-open, focus-restore-on-close, Escape key, Tab trap |
| Guided stepper | `src/components/GuidedPlayStepper.astro` | `role="progressbar"`, `aria-live="polite"`, real `<button>` controls, heading focus on step change |
| Focus styles | `src/styles/custom.css` | `:focus-visible` on crucible tab labels, context panel trigger + close, sidebar toggle |
| Labelled nav | `src/components/HomeLanding.astro`, `src/components/TabNav.astro` | `sr-only` headings, `<nav aria-label="...">` |
| Sidebar toggle | `src/components/Sidebar.astro` + `src/scripts/sidebar-collapse.ts` | `aria-expanded` kept in sync with collapsed state |
| Live regions | `src/components/GuidedPlayStepper.astro`, `src/components/ActionFlowGuide.astro`, `src/components/CrucibleDeckBuilds.astro` | `aria-live="polite"` on result and step containers |

---

## Known issues (ordered by priority)

### P1 — Incorrect ARIA role semantics on crucible deck (static)

**File:** `scripts/render-crucible-deck-html.mjs`

- The tab strip has `role="tablist"` but its children are `<label>` elements, not `role="tab"` elements with `aria-selected` / `aria-controls`. Screen readers may announce a malformed tab interface.
- Panels have `role="tabpanel"` + `aria-labelledby` but are shown/hidden by CSS `:has()` (no JS ARIA state management). This mismatches the ARIA tabs pattern.
- The CSS `:checked + .crucible-deck__tab-label` (visual active-tab highlight) does not work because radio inputs and labels are not adjacent siblings in the DOM — the active tab label has no visual indicator. **This is also a visual bug.**

**Fix:** Interleave inputs and labels inside the tab strip div; use `role="radiogroup"` + `aria-label`; remove `role="tabpanel"` from panels; update panel-show CSS from sibling selectors to `:has()`. *(Done in this patch.)*

**Note (May 2026):** The `<!-- CRUCIBLE_DECK_BUILDS -->` placeholder was removed from `Kismeta_GameGuide.md`; `render-crucible-deck-html.mjs` is currently dormant (setup page uses an inline markdown table). The renderer fixes are pre-emptive for when/if it is re-enabled.

---

### P2 — No `prefers-reduced-motion` support

**File:** `src/styles/custom.css`

Multiple `transition:` declarations exist across ~14 components (hover states, progress fill, sidebar icon) with no `@media (prefers-reduced-motion: reduce)` guard. The `guided-play__progress-fill` transition (0.25s width change) is the most noticeable.

**Fix:** Add a blanket reduced-motion block at the end of `custom.css`. *(Done in this patch.)*

---

### P3 — Active tab link missing `aria-current`

**File:** `src/components/TabNav.astro`

The active tab link gets a CSS class (`tab-nav__link--active`) but no `aria-current="page"`. Screen readers cannot detect which tab is current without it.

**Fix:** Add `aria-current="page"` to the active link. *(Done in this patch.)*

---

### P4 — Interactive crucible segment buttons missing `aria-pressed`

**File:** `src/components/CrucibleDeckBuilds.astro`

The segmented build-type / game-mode / player-count buttons toggle a CSS class (`crucible-deck__segment--active`) but do not set `aria-pressed`. Screen readers cannot determine which option is currently selected.

**Fix:** Add `aria-pressed` and update the `setActive` helper to keep it in sync. *(Done in this patch.)*

---

### P5 — Skip link presence unverified

Starlight's default page layout includes a skip-to-content link. This project overrides `Header`, `Sidebar`, `PageSidebar`, and `Hero` but NOT the main page layout, so Starlight's skip link should still render. **Manual verification required**: tab through the page with keyboard only and confirm the skip link appears before the header.

If absent, add a visible-on-focus `<a href="#_top" class="sl-skip-link">Skip to content</a>` in `src/components/Header.astro`.

---

### P6 — Hero image `alt` fallback could become empty

**File:** `src/components/Hero.astro` line 17

`alt: image?.alt || ''` means any hero image without an explicit `alt` in frontmatter silently becomes decorative. Currently `src/content/docs/index.mdx` sets `alt: Kismeta` which is correct. Any future page using a hero image must include `alt`.

**Status:** No pages currently missing `alt`. Monitoring only — add note in MAINTENANCE.md.

---

### P7 — Light/dark dual hero images share same `alt`

Both `darkImage` and `lightImage` render with identical `alt` text. The hidden variant uses `class="light:sl-hidden"` / `class="dark:sl-hidden"` which Starlight controls via CSS; the hidden one should not be exposed to AT. Verify with a screen reader that only one `<img>` is announced.

---

### P8 — No automated a11y regression gate

`package.json` has no ESLint, axe-core, or Playwright a11y scripts. See `npm run a11y:check` added in this patch.

---

## Manual test checklist

Run these in a keyboard-only browser session before each release, and with NVDA or VoiceOver for the AT pass:

1. Load `/` → first Tab should show a skip link → activate it → confirm focus jumps to main content
2. Tab through header: logo → search → theme toggle → tab nav (Play / Rules / Lore) → sidebar controls
3. `aria-current="page"` announced on active tab (screen reader: "Play, link, current page")
4. Open context rules panel → `Escape` closes it → focus returns to trigger button
5. Complete 3 guided play steps: step title announced, progress bar updated, Back disabled on step 1
6. Guided play mode selection: `fieldset`/`legend` announced, radio group navigates with arrow keys
7. Crucible deck (static on Setup page): radio group announced, active option announced
8. Crucible deck (interactive on Guided Play): segment buttons announce selection via `aria-pressed`
9. Action flow (Summer / Autumn / Winter): branch buttons accessible by keyboard, wizard panels focus correctly
10. Zoom to 200%: no content overflow, interactive controls remain usable; 400% / 320px: horizontal scroll on tables, no loss of functionality
