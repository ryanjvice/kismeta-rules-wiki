# Kismeta

Official site for the **Kismeta** game line (Goodmagik Games). Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build).

## Site structure

| URL | Purpose |
|-----|---------|
| `/` | Franchise hub — games and merchandise |
| `/shop/` | External shop links |
| `/games/alchemists-of-the-great-year/` | AGY marketing page |
| `/games/the-veiled-ascent/` | The Veiled Ascent marketing page |
| `/games/alchemists-of-the-great-year/play/guided/` etc. | AGY rules wiki (Starlight) |
| `/games/the-veiled-ascent/play/guided/` etc. | TVA rules wiki (Starlight) |

Legacy root URLs (`/play/guided/`, `/lore/`, etc.) redirect to the AGY wiki prefix.

## Features

- **Franchise hub** — Kismeta games and shop entry points
- **AGY rules wiki** — Play / Rules / Lore tabs, 17-step guided walkthrough, full rules reference, glossary
- **TVA rules wiki** — Play / Rules / Lore tabs, 3-step guided walkthrough, rules reference, glossary
- **Full-text search** — Ctrl+K / ⌘K (Pagefind, works offline after install)
- **PWA** — Install as an app for table-side use without Wi-Fi
- **Game mode modifiers** — Quickplay / Standard / Magnus in AGY Guided Play
- **Deep links** — Share URLs to specific rules or headings

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Updating rules content

### AGY (Alchemists of the Great Year)

1. Edit [`Kismeta_GameGuide.md`](./Kismeta_GameGuide.md) (canonical source).
2. Regenerate:

   ```bash
   npm run sync:gy
   ```

The sync writes to `src/content/docs/games/alchemists-of-the-great-year/` and rebuilds `src/data/glossary.json`. Do not hand-edit generated markdown under `learn/`, `play/`, `reference/`, or `rules/` — it is overwritten on the next sync.

### TVA (The Veiled Ascent)

1. Edit [`Kismeta_VeiledAscent_gameplayGuide.md`](./Kismeta_VeiledAscent_gameplayGuide.md) (canonical source). The `## GLOSSARY OF TERMS` section at the end populates the TVA glossary.
2. Regenerate:

   ```bash
   npm run sync:tva
   ```

   The sync writes to `src/content/docs/games/the-veiled-ascent/` and rebuilds `src/data/glossary-tva.json`. Hand-maintained pages (`play/guided.mdx`, `glossary.mdx`) are preserved.

3. To regenerate both wikis at once:

   ```bash
   npm run sync
   ```

4. Preview locally:

   ```bash
   npm run dev
   ```

5. Build for production:

   ```bash
   npm run build
   ```

### Marketing copy

Franchise and game marketing pages use [`src/content/i18n/en.json`](./src/content/i18n/en.json) (`site.*`, `game.agy.*`, `game.tva.*`, `shop.*`) via [`src/utils/site-i18n.ts`](./src/utils/site-i18n.ts).

## Brand assets

Place logos, colors, and fonts in [`public/brand/`](./public/brand/README.md), then update:

- `src/assets/logo.svg` (or point `astro.config.mjs` `logo.src` to your file)
- `src/styles/custom.css` (CSS variables)
- `public/favicon.svg` and PWA icons in `astro.config.mjs` if you add PNG sizes

## Deploy

Static output is in `dist/` after `npm run build`.

### Vercel

1. Import this repo in Vercel.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set your production domain in `astro.config.mjs` → `site`.

## Project structure

**Where to change what:** see [docs/MAINTENANCE.md](./docs/MAINTENANCE.md).

```
Kismeta_GameGuide.md                          # AGY canonical rules
Kismeta_VeiledAscent_gameplayGuide.md         # TVA canonical rules
scripts/sync-guide.mjs                        # AGY markdown → Starlight pages
scripts/sync-tva-guide.mjs                    # TVA markdown → Starlight pages
src/pages/                                    # Franchise hub, shop, game marketing
src/content/docs/games/alchemists-of-the-great-year/  # AGY wiki (sync output)
src/content/docs/games/the-veiled-ascent/     # TVA wiki (sync output + hand pages)
src/data/games.ts                             # Game cards and marketing paths
src/data/shop.ts                              # External shop URLs
src/data/wiki-base.ts                         # AGY + TVA wiki path helpers
src/data/wiki-nav.ts                          # Tab nav config per game
src/data/guided-steps.ts                      # AGY 17-step guided play content
src/data/tva-guided-steps.ts                  # TVA 3-step guided play content
src/components/                               # Tab nav, guided play, marketing UI
src/styles/custom.css                         # Theme
```

## License

Game rules and content © Goodmagik Games. Site tooling is for the Kismeta project.
