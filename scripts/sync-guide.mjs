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
import { injectContentBlocks } from './render-content-html.mjs';
import { getContextAnchorHashes, injectContextAnchors } from './context-anchors.mjs';
import { extractContextSections } from './extract-context-sections.mjs';

const EN_CONTEXT_ANCHORS = getContextAnchorHashes('en');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const GUIDE = path.join(ROOT, 'Kismeta_GameGuide.md');
const OUT = path.join(ROOT, 'src', 'content', 'docs');
const GLOSSARY_JSON = path.join(ROOT, 'src', 'data', 'glossary.json');

/** Hand-maintained pages under synced folders — preserved when `play/` etc. are rebuilt. */
const PRESERVED_DOC_PATHS = ['play/guided.mdx'];

/** Markdown requires a blank line after HTML blocks before block elements (e.g. headings). */
function ensureBlankLineAfterHtmlBlocks(body) {
  return body.replace(/<\/div>\n(?=#)/g, '</div>\n\n');
}

const SKIP = new Set([
  'CONTENTS',
  'Table of Contents',
  'KISMETA:',
  'ALCHEMISTS OF THE GREAT YEAR',
  'A GOODMAGIK Game',
]);

const SECTION_META = {
  'LORE: ALCHEMISTS OF THE GREAT YEAR': {
    slug: 'lore/index',
    title: 'Lore: Alchemists of the Great Year',
    description: 'The mythic backdrop of Kismeta and the Great Work.',
  },
  'GAME OVERVIEW': {
    slug: 'play/game-overview',
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
    title: 'Full Game Rules',
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
    slug: 'lore/epilogue',
    title: 'Lore: Epilogue',
    description: 'The Veil Stirs — teaser for Kismeta: The Veiled Ascent.',
  },
};

const DRAFT_NOTICES = {};

const SEE_LINKS = [
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

function injectCrucibleDeckBuilds(body, locale = 'en') {
  if (!body.includes(CRUCIBLE_DECK_PLACEHOLDER)) return body;
  const html = renderCrucibleDeckHtml(locale, 'setup-crucible');
  return body.replace(CRUCIBLE_DECK_PLACEHOLDER, html);
}

/** TABLE:*, FLOW:*, and crucible placeholder injection. */
function injectAllContent(body, locale = 'en') {
  let out = injectContentBlocks(body, locale);
  out = injectCrucibleDeckBuilds(out, locale);
  return out;
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
  const withContent = injectAllContent(body, 'en');
  const wrapped = wrapGameModes(withContent);
  const processed = applySeeLinks(ensureBlankLineAfterHtmlBlocks(wrapped));
  const withAnchors = injectContextAnchors(processed, EN_CONTEXT_ANCHORS);
  fs.writeFileSync(file, frontmatter + notice + withAnchors.trim() + '\n', 'utf8');
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

  for (const line of md.split('\n')) {
    if (isTopLevelHeading(line)) {
      if (current) sections.push(current);
      const title = line.replace(/^#\s+/, '').trim();
      current = { title, lines: [], level: 1 };
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

  for (const sub of ['learn', 'lore', 'play', 'reference']) {
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

async function main() {
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
  await extractContextSections();
  console.log(`Wrote ${sections.length} sections, ${glossaryTerms.length} glossary terms.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
