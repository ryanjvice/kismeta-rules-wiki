/**
 * Splits Kismeta_VeiledAscent_gameplayGuide.md into Starlight content pages.
 * Run: npm run sync:tva  (runs automatically as part of npm run sync)
 *
 * Must run AFTER sync-guide.mjs so the AGY epilogue mirror exists.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const GUIDE = path.join(ROOT, 'Kismeta_VeiledAscent_gameplayGuide.md');
const WIKI_SEGMENT = 'games/the-veiled-ascent';
const WIKI_URL_PREFIX = '/games/the-veiled-ascent';
const OUT = path.join(ROOT, 'src', 'content', 'docs', WIKI_SEGMENT);
const AGY_EPILOGUE = path.join(
  ROOT,
  'src',
  'content',
  'docs',
  'games',
  'alchemists-of-the-great-year',
  'lore',
  'epilogue.md',
);
const GLOSSARY_TVA_JSON = path.join(ROOT, 'src', 'data', 'glossary-tva.json');

/** ## section title → Starlight slug + metadata. */
const SECTION_META = {
  Objective: {
    slug: 'rules/overview',
    title: 'Objective',
    description: 'Ascend through seven chakras before the Aethereal Veil claims you.',
  },
  Setup: {
    slug: 'play/setup',
    title: 'Setup',
    description: 'What you need to play Kismeta: The Veiled Ascent.',
  },
  'Gameplay Steps': {
    slug: 'play/gameplay',
    title: 'Gameplay Steps',
    description: 'Deal the Veil, Build Your Spread, Reveal & Resolve — the three steps of every round.',
  },
  'Card Values & Scoring': {
    slug: 'reference/card-values',
    title: 'Card Values & Scoring',
    description: 'Point values for Minor and Major Arcana cards.',
  },
  'Round Outcomes': {
    slug: 'reference/round-outcomes',
    title: 'Round Outcomes',
    description: 'How advancing, tying, and losing affect your ascension.',
  },
  'Veil Progression Board': {
    slug: 'reference/progression-board',
    title: 'Veil Progression Board',
    description: 'Chakras, Ascension Zones, and Corruption Zones explained.',
  },
  'Multiplayer Rules': {
    slug: 'rules/multiplayer',
    title: 'Multiplayer Rules',
    description: 'How The Veiled Ascent plays with multiple players.',
  },
  'Winning the Game': {
    slug: 'play/winning',
    title: 'Winning the Game',
    description: 'Reach the Crown Chakra before 6 Corruption to ascend.',
  },
  'Pattern Bonuses': {
    slug: 'reference/pattern-bonuses',
    title: 'Pattern Bonuses',
    description: 'Flush, Straight, Three of a Kind, Straight Flush, and Royal Flush bonuses.',
  },
  'GLOSSARY OF TERMS': null, // handled separately
};

/** Hand-maintained pages under synced folders — preserved during rebuilds. */
const PRESERVED_DOC_PATHS = ['play/guided.mdx', 'glossary.mdx'];

/** Cross-section internal links rewritten to absolute wiki URLs. */
const SEE_LINKS = [
  [
    /\[Pattern Bonuses\]\(#pattern-bonuses\)/gi,
    `[Pattern Bonuses](${WIKI_URL_PREFIX}/reference/pattern-bonuses/)`,
  ],
];

function applySeeLinks(text) {
  let result = text;
  for (const [pattern, replacement] of SEE_LINKS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

function writePage(slug, title, description, body) {
  const dir = path.join(OUT, path.dirname(slug));
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(OUT, `${slug}.md`);
  const frontmatter = `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\n---\n\n`;
  fs.writeFileSync(file, frontmatter + applySeeLinks(body.trim()) + '\n', 'utf8');
}

/** Parse the TVA guide — split on ## headings (top-level # and blockquotes are skipped). */
function parseSections(md) {
  const sections = [];
  let current = null;
  let pastTitle = false;

  for (const line of md.split('\n')) {
    if (/^# /.test(line)) {
      pastTitle = true;
      continue;
    }
    if (!pastTitle) continue;

    if (/^## /.test(line)) {
      if (current) sections.push(current);
      const title = line.replace(/^##\s+/, '').trim();
      current = { title, lines: [] };
      continue;
    }

    if (current) current.lines.push(line);
  }

  if (current) sections.push(current);
  return sections;
}

function cleanBody(lines) {
  return lines.join('\n').trim();
}

function rmSyncOutput() {
  const preserved = new Map();
  for (const rel of PRESERVED_DOC_PATHS) {
    const fp = path.join(OUT, rel);
    if (fs.existsSync(fp)) preserved.set(rel, fs.readFileSync(fp, 'utf8'));
  }

  for (const sub of ['lore', 'play', 'reference', 'rules']) {
    const p = path.join(OUT, sub);
    if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
  }

  for (const [rel, content] of preserved) {
    const fp = path.join(OUT, rel);
    fs.mkdirSync(path.dirname(fp), { recursive: true });
    fs.writeFileSync(fp, content, 'utf8');
  }
}

/** Copy AGY epilogue body to TVA lore/index.md (read-only mirror). */
function mirrorLore() {
  if (!fs.existsSync(AGY_EPILOGUE)) {
    console.warn('sync-tva: AGY epilogue not found — run npm run sync first');
    return;
  }
  const raw = fs.readFileSync(AGY_EPILOGUE, 'utf8');
  const fmMatch = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  const body = raw.slice(fmMatch ? fmMatch[0].length : 0).trim();

  const loreDir = path.join(OUT, 'lore');
  fs.mkdirSync(loreDir, { recursive: true });
  const frontmatter = `---\ntitle: "Lore: The Veil Stirs"\ndescription: "The vision that connects Kismeta: Alchemists of the Great Year to The Veiled Ascent."\n---\n\n`;
  fs.writeFileSync(path.join(loreDir, 'index.md'), frontmatter + body + '\n', 'utf8');
}

function parseGlossary(body) {
  const terms = [];
  for (const line of body.split('\n')) {
    if (!line.startsWith('|') || line.includes('TERM') || line.match(/^\|\s*:?---/)) continue;
    const cells = line.split('|').map((c) => c.trim()).filter(Boolean);
    if (cells.length < 2) continue;
    const term = cells[0].replace(/\*\*/g, '').trim();
    const definition = cells[1].replace(/\*\*/g, '').trim();
    if (term && definition) terms.push({ term, definition });
  }
  return terms.sort((a, b) => a.term.localeCompare(b.term));
}

function main() {
  if (!fs.existsSync(GUIDE)) {
    console.error(`sync-tva: Guide not found at ${GUIDE}`);
    process.exit(1);
  }

  const md = fs.readFileSync(GUIDE, 'utf8');
  const sections = parseSections(md);
  rmSyncOutput();

  let glossaryTerms = [];
  let written = 0;

  for (const { title, lines } of sections) {
    const body = cleanBody(lines);

    if (title === 'GLOSSARY OF TERMS') {
      glossaryTerms = parseGlossary(body);
      continue;
    }

    const meta = SECTION_META[title];
    if (meta === undefined) {
      console.warn('sync-tva: No meta for section:', JSON.stringify(title));
      continue;
    }
    if (meta === null) continue; // explicitly skipped

    writePage(meta.slug, meta.title, meta.description, body);
    written++;
  }

  mirrorLore();

  fs.mkdirSync(path.dirname(GLOSSARY_TVA_JSON), { recursive: true });
  fs.writeFileSync(GLOSSARY_TVA_JSON, JSON.stringify(glossaryTerms, null, 2), 'utf8');
  console.log(`sync-tva: Wrote ${written} pages, ${glossaryTerms.length} glossary terms, lore mirrored.`);
}

main();
