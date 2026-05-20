/**
 * Splits Kismeta_GameGuide.md into Starlight content pages.
 * Run: npm run sync
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const GUIDE = path.join(ROOT, 'Kismeta_GameGuide.md');
const OUT = path.join(ROOT, 'src', 'content', 'docs');
const GLOSSARY_JSON = path.join(ROOT, 'src', 'data', 'glossary.json');

const SKIP = new Set(['CONTENTS', 'KISMETA: ALCHEMISTS OF THE GREAT YEAR']);

const SECTION_META = {
  'LORE: ALCHEMISTS OF THE GREAT YEAR': {
    slug: 'learn/lore',
    title: 'Lore: Alchemists of the Great Year',
    description: 'The mythic backdrop of Kismeta and the Great Work.',
  },
  'GAME OVERVIEW': {
    slug: 'learn/game-overview',
    title: 'Game Overview',
    description: 'Players, play time, Great Year, Great Work, and winning.',
  },
  COMPONENTS: {
    slug: 'learn/components',
    title: 'Components',
    description: 'Everything in the box.',
  },
  SETUP: {
    slug: 'play/setup',
    title: 'Setup',
    description: 'Setting the table, game modes, Crucible deck, and first Agekeeper.',
  },
  'ROUND AT A GLANCE': {
    slug: 'play/round-at-a-glance',
    title: 'Round at a Glance',
    description: 'Quick seasonal reference for in-game lookup.',
  },
  'ROUND OVERVIEW': {
    slug: 'play/round-overview',
    title: 'Round Overview',
    description: 'Spring, Summer, Autumn, and Winter in full detail.',
  },
  'WINNING THE GAME 🏆': {
    slug: 'play/winning',
    title: 'Winning the Game',
    description: 'Completing the Great Work at the Altar of Kismeta.',
  },
  'QUICK REFERENCE': {
    slug: 'reference/quick-reference',
    title: 'Quick Reference',
    description: 'Elements, suits, colors, and reagents at a glance.',
  },
  'QUICK TIPS & STRATEGY': {
    slug: 'reference/quick-tips',
    title: 'Quick Tips & Strategy',
    description: 'Practical advice for new and returning alchemists.',
  },
  'LORE: EPILOGUE ~ The Veil Stirs …': {
    slug: 'learn/lore-epilogue',
    title: 'Lore: Epilogue',
    description: 'The Veil Stirs — teaser for Kismeta: The Veiled Ascent.',
  },
};

const COMPENDIUM_SLUGS = {
  '1.0 COSMIC AGES': 'reference/compendium/1-0-cosmic-ages',
  '1.1 ASPECTS & ALIGNMENT': 'reference/compendium/1-1-aspects-alignment',
  '1.2 HARVEST': 'reference/compendium/1-2-harvest',
  '1.3 COMMON CARDS': 'reference/compendium/1-3-common-cards',
  '1.4 CRUCIBLE CARDS': 'reference/compendium/1-4-crucible-cards',
  '1.5 CRUCIBLE CAULDRONS & MOLTEN COAL': 'reference/compendium/1-5-cauldrons-molten-coal',
  '1.6 REAGENTS': 'reference/compendium/1-6-reagents',
  '1.7 ASTRAL HOUSES': 'reference/compendium/1-7-astral-houses',
  '1.8 TRADES': 'reference/compendium/1-8-trades',
  '1.9 DUELS': 'reference/compendium/1-9-duels',
  '1.10 GAMBIT': 'reference/compendium/1-10-gambit',
  '1.11 CRUCIBLE & PHILOSOPHER’S STONE': 'reference/compendium/1-11-crucible-philosophers-stone',
  '1.12 OPPOSITION': 'reference/compendium/1-12-opposition',
  '1.13 OFFERING TO THE AGE': 'reference/compendium/1-13-offering-to-the-age',
  '1.14 FATEFUL WAGER': 'reference/compendium/1-14-fateful-wager',
};

const DRAFT_NOTICES = {
  'reference/compendium/1-12-opposition': `> **Draft:** Rules for multiple simultaneous Oppositions targeting the same Stone are still being finalized.\n\n`,
};

const SEE_LINKS = [
  [/See Compendium: 1\.2 Harvest/gi, 'See [Harvest](/reference/compendium/1-2-harvest/)'],
  [/See Compendium: 1\.3 Common Cards/gi, 'See [Common Cards](/reference/compendium/1-3-common-cards/)'],
  [/See Compendium: 1\.4 Crucible Cards/gi, 'See [Crucible Cards](/reference/compendium/1-4-crucible-cards/)'],
  [/See Compendium: 1\.6 Reagents/gi, 'See [Reagents](/reference/compendium/1-6-reagents/)'],
  [/See Compendium: 1\.7 Astral Houses/gi, 'See [Astral Houses](/reference/compendium/1-7-astral-houses/)'],
  [/See Compendium: 1\.8 Trades/gi, 'See [Trades](/reference/compendium/1-8-trades/)'],
  [/See Compendium: 1\.9 Duels/gi, 'See [Duels](/reference/compendium/1-9-duels/)'],
  [/See Compendium: 1\.10 Gambit/gi, 'See [Gambit](/reference/compendium/1-10-gambit/)'],
  [/See Compendium: 1\.11 Crucible/gi, 'See [Crucible & Philosopher\'s Stone](/reference/compendium/1-11-crucible-philosophers-stone/)'],
  [/See Compendium: 1\.12 Opposition/gi, 'See [Opposition](/reference/compendium/1-12-opposition/)'],
  [/See Compendium: 1\.13 Offering/gi, 'See [Offering to the Age](/reference/compendium/1-13-offering-to-the-age/)'],
  [/See 1\.1: Alignment Points/gi, 'See [Alignment Points](/reference/compendium/1-1-aspects-alignment/#alignment-points)'],
  [/See 1\.1 Alignment Points/gi, 'See [Alignment Points](/reference/compendium/1-1-aspects-alignment/#alignment-points)'],
  [/See 1\.12 Opposition/gi, 'See [Opposition](/reference/compendium/1-12-opposition/)'],
  [/See 1\.10 Gambit/gi, 'See [Gambit](/reference/compendium/1-10-gambit/)'],
  [/See 1\.11 Returning from Stasis/gi, 'See [Returning from Stasis](/reference/compendium/1-11-crucible-philosophers-stone/#returning-from-stasis)'],
  [/See GAME MODES: Quickplay/gi, 'See [Setup — Quickplay](/play/setup/#️⃣-quickplay--first-play)'],
  [/See GAME MODES: Magnus Alchemist/gi, 'See [Setup — Magnus Alchemist](/play/setup/#️⃣-magnus-alchemist-mastery)'],
  [/pg\. 1/gi, ''],
];

function normalizeHeading(line) {
  return line.replace(/^##\s+/, '').trim();
}

function wrapGameModes(body) {
  const lines = body.split('\n');
  const out = [];
  let inCallout = false;
  let calloutLines = [];
  let calloutModes = 'quickplay magnus';

  const flushCallout = () => {
    if (calloutLines.length) {
      out.push(`<div class="game-mode-callout" data-modes="${calloutModes}">`);
      out.push(...calloutLines);
      out.push('</div>');
      calloutLines = [];
      inCallout = false;
    }
  };

  for (const line of lines) {
    const isModifier =
      line.includes('⚙') ||
      /Game Mode Modifier/i.test(line) ||
      (inCallout && line.trim() && !line.startsWith('#'));

    if (isModifier && !line.startsWith('#')) {
      if (/quickplay/i.test(line)) calloutModes = 'quickplay';
      else if (/magnus/i.test(line)) calloutModes = 'magnus';
      else if (!inCallout) calloutModes = 'quickplay magnus';
      inCallout = true;
      calloutLines.push(line);
      continue;
    }

    if (inCallout && line.trim() === '') {
      calloutLines.push(line);
      continue;
    }

    if (inCallout && !line.startsWith('#') && line.trim()) {
      const nextIsHeading = false;
      if (!nextIsHeading) {
        calloutLines.push(line);
        continue;
      }
    }

    flushCallout();
    out.push(line);
  }
  flushCallout();
  return out.join('\n');
}

function applySeeLinks(text) {
  let result = text;
  for (const [pattern, replacement] of SEE_LINKS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

function demoteHeadings(body, levels = 1) {
  const prefix = '#'.repeat(levels);
  return body
    .split('\n')
    .map((line) => {
      const m = line.match(/^(#{1,6})\s+/);
      if (m && m[1].length > 1) {
        return prefix + line.slice(m[1].length);
      }
      return line;
    })
    .join('\n');
}

function writePage(slug, title, description, body) {
  const dir = path.join(OUT, path.dirname(slug));
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(OUT, `${slug}.md`);
  const frontmatter = `---
title: ${JSON.stringify(title)}
description: ${JSON.stringify(description)}
---

`;
  const notice = DRAFT_NOTICES[slug] || '';
  const processed = applySeeLinks(wrapGameModes(demoteHeadings(body, 1)));
  fs.writeFileSync(file, frontmatter + notice + processed.trim() + '\n', 'utf8');
}

function parseGlossary(sectionBody) {
  const terms = [];
  const lines = sectionBody.split('\n');
  for (const line of lines) {
    if (!line.startsWith('|') || line.includes('TERM') || line.match(/^\|\s*:?---/)) continue;
    const cells = line.split('|').map((c) => c.trim()).filter(Boolean);
    if (cells.length < 2) continue;
    const term = cells[0].replace(/\*\*/g, '').trim();
    const definition = cells[1].replace(/\*\*/g, '').trim();
    if (term && definition) terms.push({ term, definition });
  }
  return terms.sort((a, b) => a.term.localeCompare(b.term));
}

function parseSections(md) {
  const sections = [];
  let current = null;
  let inCompendium = false;

  for (const line of md.split('\n')) {
    if (line.startsWith('## ')) {
      const title = normalizeHeading(line);
      if (current) sections.push(current);
      current = { title, lines: [], level: 2 };
      inCompendium = title.startsWith('COMPENDIUM');
      continue;
    }
    if (inCompendium && line.startsWith('### ') && /^###\s+1\.\d+/.test(line)) {
      if (current && current.lines.length) sections.push(current);
      current = { title: line.replace(/^###\s+/, '').trim(), lines: [], level: 3, compendium: true };
      continue;
    }
    if (current) current.lines.push(line);
  }
  if (current) sections.push(current);
  return sections;
}

function cleanBody(lines) {
  return lines
    .filter((l) => l.trim() !== '---')
    .join('\n')
    .trim();
}

function rmSyncOutput() {
  for (const sub of ['learn', 'play', 'reference']) {
    const p = path.join(OUT, sub);
    if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
  }
  // Remove root-level glossary.md only (not locale trees)
  const glossaryMd = path.join(OUT, 'glossary.md');
  if (fs.existsSync(glossaryMd)) fs.unlinkSync(glossaryMd);
}

function main() {
  const md = fs.readFileSync(GUIDE, 'utf8');
  const sections = parseSections(md);
  rmSyncOutput();

  let glossaryTerms = [];

  for (const section of sections) {
    const title = section.title;
    if (SKIP.has(title) || title === 'CONTENTS') continue;

    if (title === 'GLOSSARY OF TERMS') {
      glossaryTerms = parseGlossary(cleanBody(section.lines));
      continue;
    }

    const body = cleanBody(section.lines);

    if (section.compendium && COMPENDIUM_SLUGS[title]) {
      const slug = COMPENDIUM_SLUGS[title];
      writePage(
        slug,
        title.replace(/^\d+\.\d+\s+/, '') || title,
        `Compendium — ${title}`,
        body
      );
      continue;
    }

    if (title.startsWith('COMPENDIUM')) continue;

    const meta = SECTION_META[title];
    if (!meta) {
      console.warn('No meta for section:', title);
      continue;
    }
    writePage(meta.slug, meta.title, meta.description, body);
  }

  fs.mkdirSync(path.dirname(GLOSSARY_JSON), { recursive: true });
  fs.writeFileSync(GLOSSARY_JSON, JSON.stringify(glossaryTerms, null, 2), 'utf8');
  console.log(`Wrote ${sections.length} sections, ${glossaryTerms.length} glossary terms.`);
}

main();
