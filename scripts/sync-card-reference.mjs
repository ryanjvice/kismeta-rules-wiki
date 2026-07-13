/**
 * Splits Kismeta_CardReference.md into Starlight content pages for the AGY wiki.
 * Must run AFTER sync-guide.mjs, which deletes the rules/ directory first.
 * Run: node scripts/sync-card-reference.mjs  (or via npm run sync:gy)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SOURCE = path.join(ROOT, 'Kismeta_CardReference.md');
const OUT = path.join(
  ROOT,
  'src',
  'content',
  'docs',
  'games',
  'alchemists-of-the-great-year',
  'rules',
);

const SECTION_META = {
  'MAJOR ARCANA OVERVIEW': {
    slug: 'major-arcana',
    title: 'Major Arcana',
    description: 'Fate and Adept cards — effects, aspects, and Arcanum rules.',
  },
  'CRUCIBLE CARDS': {
    slug: 'crucible-cards',
    title: 'Crucible Cards',
    description: 'Groups A–D, reagent costs, and alignment requirements.',
  },
  'MINOR ARCANA': {
    slug: 'minor-arcana',
    title: 'Minor Arcana',
    description: 'Planet charge, Stelliums, Wild Charge, Court/Ace Riders, and rank reference.',
  },
};

/**
 * Match a ## heading line against the known top-level section keys.
 * Returns the key if matched, otherwise null.
 * Suit sub-headings (e.g. "## Cups · Water…") are not matched and pass through.
 */
function matchSectionKey(line) {
  if (!line.startsWith('## ')) return null;
  const title = line.slice(3).trim().toUpperCase();
  for (const key of Object.keys(SECTION_META)) {
    if (title.startsWith(key)) return key;
  }
  return null;
}

function writePage(meta, lines) {
  fs.mkdirSync(OUT, { recursive: true });
  const body = lines.join('\n').trimEnd();
  const content =
    `---\ntitle: ${JSON.stringify(meta.title)}\ndescription: ${JSON.stringify(meta.description)}\n---\n\n` +
    body +
    '\n';
  const dest = path.join(OUT, `${meta.slug}.md`);
  fs.writeFileSync(dest, content, 'utf8');
  console.log(`  Wrote rules/${meta.slug}.md`);
}

function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error(`Source not found: ${SOURCE}`);
    process.exit(1);
  }

  const lines = fs.readFileSync(SOURCE, 'utf8').split('\n');

  let currentKey = null;
  let currentLines = [];

  for (const line of lines) {
    const key = matchSectionKey(line);
    if (key) {
      if (currentKey) {
        writePage(SECTION_META[currentKey], currentLines);
      }
      currentKey = key;
      currentLines = [];
      // The ## heading itself becomes the frontmatter title — skip it.
      continue;
    }

    // Drop everything before the first known section (file header, design notes).
    if (!currentKey) continue;

    currentLines.push(line);
  }

  if (currentKey) {
    writePage(SECTION_META[currentKey], currentLines);
  }

  console.log('Card reference sync complete.');
}

main();
