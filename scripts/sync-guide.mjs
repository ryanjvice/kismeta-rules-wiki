/**
 * Splits Kismeta_GameGuide.md into Starlight content pages.
 * Run: npm run sync
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CRUCIBLE_DECK_PLACEHOLDER,
  renderCrucibleDeckHtml,
} from './render-crucible-deck-html.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const GUIDE = path.join(ROOT, 'Kismeta_GameGuide.md');
const OUT = path.join(ROOT, 'src', 'content', 'docs');
const GLOSSARY_JSON = path.join(ROOT, 'src', 'data', 'glossary.json');

/** Hand-maintained pages under synced folders — preserved when `play/` etc. are rebuilt. */
const PRESERVED_DOC_PATHS = ['play/guided.mdx'];
const DEBUG_LOG = path.join(ROOT, 'debug-cb2112.log');

// #region agent log
function debugLog(payload) {
  const entry = { sessionId: 'cb2112', timestamp: Date.now(), ...payload };
  fs.appendFileSync(DEBUG_LOG, `${JSON.stringify(entry)}\n`);
}

function countHeadingsAfterHtmlClose(body) {
  return (body.match(/<\/div>\n#/g) || []).length;
}

/** Markdown requires a blank line after HTML blocks before block elements (e.g. headings). */
function ensureBlankLineAfterHtmlBlocks(body) {
  return body.replace(/<\/div>\n(?=#)/g, '</div>\n\n');
}
// #endregion

const SKIP = new Set([
  'CONTENTS',
  'Table of Contents',
  'KISMETA:',
  'ALCHEMISTS OF THE GREAT YEAR',
  'A GOODMAGIK Game',
]);

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
  'WINNING THE GAME': {
    slug: 'play/winning',
    title: 'Winning the Game',
    description: 'Completing the Great Work at the Altar of Kismeta.',
  },
  APPENDIX: {
    slug: 'reference/quick-reference',
    title: 'Quick Reference',
    description: 'Cosmic Ages, elements, inventory zones, alignment, reagents, and Crucible at a glance.',
  },
  'QUICK TIPS & STRATEGY': {
    slug: 'reference/quick-tips',
    title: 'Quick Tips & Strategy',
    description: 'Practical advice for new and returning alchemists.',
  },
  'LORE: EPILOGUE - The Veil Stirs…': {
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

function shouldSkip(title) {
  return SKIP.has(title);
}

function isTopLevelHeading(line) {
  return /^# [^#]/.test(line);
}

function mergeKismetaIntro(kismetaBody, overviewBody) {
  if (!kismetaBody?.trim()) return overviewBody;
  if (!overviewBody?.trim()) return kismetaBody;
  return `${kismetaBody.trim()}\n\n${overviewBody.trim()}`;
}

function extractRoundAtAGlance(body) {
  const lines = body.split('\n');
  const glanceStart = lines.findIndex((l) => /^##\s+ROUND AT A GLANCE/i.test(l));
  if (glanceStart === -1) return { overview: body, glance: null };

  const phaseStart = lines.findIndex(
    (l, i) => i > glanceStart && /^##\s+PHASE \d/i.test(l)
  );
  const glanceEnd = phaseStart === -1 ? lines.length : phaseStart;

  const glance = lines.slice(glanceStart, glanceEnd).join('\n').trim();
  const overview = [...lines.slice(0, glanceStart), ...lines.slice(glanceEnd)].join('\n').trim();
  return { overview, glance };
}

function extractAppendixBody(body) {
  const lines = body.split('\n');
  const compendiumStart = lines.findIndex((l) => /^##\s+COMPENDIUM/i.test(l));
  if (compendiumStart === -1) return body;
  return lines.slice(0, compendiumStart).join('\n').trim();
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
      out.push('');
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

function injectCrucibleDeckBuilds(body, locale = 'en') {
  if (!body.includes(CRUCIBLE_DECK_PLACEHOLDER)) return body;
  const html = renderCrucibleDeckHtml(locale, 'setup-crucible');
  return body.replace(CRUCIBLE_DECK_PLACEHOLDER, html);
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
  const withCrucible = injectCrucibleDeckBuilds(body, 'en');
  const wrapped = wrapGameModes(demoteHeadings(withCrucible, 1));
  const beforeFix = countHeadingsAfterHtmlClose(wrapped);
  const processed = applySeeLinks(ensureBlankLineAfterHtmlBlocks(wrapped));
  const afterFix = countHeadingsAfterHtmlClose(processed);
  // #region agent log
  if (beforeFix > 0 || slug === 'play/round-overview') {
    debugLog({
      hypothesisId: 'A',
      location: 'sync-guide.mjs:writePage',
      message: 'headings-after-html-close',
      data: { slug, beforeFix, afterFix },
      runId: afterFix === 0 && beforeFix > 0 ? 'post-fix' : 'pre-fix',
    });
  }
  // #endregion
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
    if (isTopLevelHeading(line)) {
      if (current) sections.push(current);
      const title = line.replace(/^#\s+/, '').trim();
      current = { title, lines: [], level: 1 };
      inCompendium = false;
      continue;
    }

    if (line.startsWith('## ') && /^##\s+COMPENDIUM/i.test(line)) {
      if (current && current.lines.length) sections.push(current);
      current = null;
      inCompendium = true;
      continue;
    }

    if (inCompendium && line.startsWith('### ') && /^###\s+1\.\d+/.test(line)) {
      if (current) sections.push(current);
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
  const preserved = new Map();
  for (const rel of PRESERVED_DOC_PATHS) {
    const fp = path.join(OUT, rel);
    if (fs.existsSync(fp)) preserved.set(rel, fs.readFileSync(fp, 'utf8'));
  }

  for (const sub of ['learn', 'play', 'reference']) {
    const p = path.join(OUT, sub);
    if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
  }
  const glossaryMd = path.join(OUT, 'glossary.md');
  if (fs.existsSync(glossaryMd)) fs.unlinkSync(glossaryMd);

  for (const [rel, content] of preserved) {
    const fp = path.join(OUT, rel);
    fs.mkdirSync(path.dirname(fp), { recursive: true });
    fs.writeFileSync(fp, content, 'utf8');
  }
}

function main() {
  const md = fs.readFileSync(GUIDE, 'utf8');
  const sections = parseSections(md);
  rmSyncOutput();

  let glossaryTerms = [];
  let kismetaBody = null;

  for (const section of sections) {
    const title = section.title;
    if (shouldSkip(title)) continue;

    if (title === 'KISMETA') {
      kismetaBody = cleanBody(section.lines);
      continue;
    }

    if (title === 'GLOSSARY OF TERMS') {
      glossaryTerms = parseGlossary(cleanBody(section.lines));
      continue;
    }

    if (section.compendium && COMPENDIUM_SLUGS[title]) {
      const slug = COMPENDIUM_SLUGS[title];
      const body = cleanBody(section.lines);
      writePage(
        slug,
        title.replace(/^\d+\.\d+\s+/, '') || title,
        `Compendium — ${title}`,
        body
      );
      continue;
    }

    if (title.startsWith('COMPENDIUM')) continue;

    let body = cleanBody(section.lines);

    if (title === 'GAME OVERVIEW') {
      body = mergeKismetaIntro(kismetaBody, body);
      const meta = SECTION_META[title];
      writePage(meta.slug, meta.title, meta.description, body);
      continue;
    }

    if (title === 'ROUND OVERVIEW') {
      const { overview, glance } = extractRoundAtAGlance(body);
      if (glance) {
        const glanceMeta = SECTION_META['ROUND AT A GLANCE'];
        writePage(glanceMeta.slug, glanceMeta.title, glanceMeta.description, glance);
      }
      const roundMeta = SECTION_META['ROUND OVERVIEW'];
      writePage(roundMeta.slug, roundMeta.title, roundMeta.description, overview);
      continue;
    }

    if (title === 'APPENDIX') {
      body = extractAppendixBody(body);
      const meta = SECTION_META.APPENDIX;
      writePage(meta.slug, meta.title, meta.description, body);
      continue;
    }

    const meta = SECTION_META[title];
    if (!meta) {
      console.warn('No meta for section:', title);
      continue;
    }
    writePage(meta.slug, meta.title, meta.description, body);
  }

  fs.mkdirSync(path.dirname(GLOSSARY_JSON), { recursive: true });
  fs.writeFileSync(GLOSSARY_JSON, JSON.stringify(glossaryTerms, null, 2), 'utf8');
  patchPtBrSetupCrucible();
  console.log(`Wrote ${sections.length} sections, ${glossaryTerms.length} glossary terms.`);
}

/** Replace legacy pt-br Setup IV tables with rendered crucible-deck HTML. */
function patchPtBrSetupCrucible() {
  const file = path.join(OUT, 'pt-br', 'play', 'setup.md');
  if (!fs.existsSync(file)) return;

  let raw = fs.readFileSync(file, 'utf8');
  if (raw.includes('class="crucible-deck"')) return;

  const fmMatch = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  const fm = fmMatch ? fmMatch[0] : '';
  let body = raw.slice(fm.length);

  const html = renderCrucibleDeckHtml('pt-br', 'setup-crucible');
  const replaced = body.replace(
    /Siga a tabela abaixo[\s\S]*?(?=\nDepois de comprar|\n# V\.)/,
    `Compre às cegas a quantidade correta de cada grupo conforme abaixo.\n\n${html}\n\n`
  );

  if (replaced === body) {
    console.warn('patchPtBrSetupCrucible: could not find table section to replace');
    return;
  }

  fs.writeFileSync(file, fm + replaced, 'utf8');
  console.log('Patched pt-br/play/setup.md crucible deck section.');
}

main();
