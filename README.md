# Kismeta Rules Wiki

Official rules reference site for **Kismeta: Alchemists of the Great Year** (GOODMAGIK). Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build).

## Features

- **Three tabs** — Play (guided walkthrough), Learn (lore, game overview, glossary), Compendium (quick reference, quick tips, rules 1.0–1.14)
- **Full-text search** — Ctrl+K / ⌘K (Pagefind, works offline after install)
- **PWA** — Install as an app for table-side use without Wi‑Fi
- **Game mode modifiers** — Toggle Quickplay / Magnus ⚙️ callouts in the header
- **Deep links** — Share URLs to specific rules or headings

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Updating rules content

1. Edit [`Kismeta_GameGuide.md`](./Kismeta_GameGuide.md) (canonical source).
2. Regenerate site pages:

   ```bash
   npm run sync
   ```

3. Preview locally:

   ```bash
   npm run dev
   ```

4. Build for production:

   ```bash
   npm run build
   ```

The `sync` script splits the guide into `src/content/docs/` and rebuilds `src/data/glossary.json`. Do not hand-edit generated markdown under `learn/`, `play/`, or `reference/compendium/` unless you are okay with changes being overwritten on the next sync.

### Draft / WIP sections

Add a notice in `scripts/sync-guide.mjs` under `DRAFT_NOTICES` for any page that needs a visible “still being finalized” banner (see Opposition as an example).

### Cross-links

Internal “See Compendium …” references are rewritten during sync. Extend `SEE_LINKS` in `scripts/sync-guide.mjs` when you add new compendium sections.

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

### Cloudflare Pages

1. Connect the repo.
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Node version: 20+

### GitHub Pages

Use a workflow that runs `npm run build` and publishes `dist/` (set `site` in `astro.config.mjs` to your `https://<user>.github.io/<repo>/` URL).

## Project structure

**Where to change what:** see [docs/MAINTENANCE.md](./docs/MAINTENANCE.md) (home page, sidebar, styling, sync workflow, and more).

```
Kismeta_GameGuide.md     # Canonical rules (edit this)
scripts/sync-guide.mjs   # Markdown → Starlight pages
src/content/docs/        # Generated + index + glossary (sync output)
src/data/glossary.json   # Glossary terms (generated)
src/components/          # Tab nav, game mode toggle, glossary list
src/styles/custom.css    # Theme
public/brand/            # Your brand assets
```

## License

Game rules and content © GOODMAGIK. Site tooling is for the Kismeta project.
