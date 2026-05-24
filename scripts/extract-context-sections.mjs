/**
 * Extracts h2/h3 sections from guided-play source pages into JSON for the context sidebar.
 * Run via sync-guide.mjs after markdown is written.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import GithubSlugger from 'github-slugger';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import { CONTEXT_SOURCE_PAGES } from './context-anchors.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DOCS = path.join(ROOT, 'src', 'content', 'docs');
const OUT_DIR = path.join(ROOT, 'src', 'data', 'context-sections');

const HEADING_LINE_RE = /^(#{2,3})\s+(.+?)(?:\s+\{#([^}]+)\})?\s*$/;

const markdownProcessor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypeRaw)
	.use(rehypeStringify);

function readPageBody(filePath) {
	const raw = fs.readFileSync(filePath, 'utf8');
	const fmMatch = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
	return raw.slice(fmMatch ? fmMatch[0].length : 0).trim();
}

function parseHeading(line) {
	const m = line.match(HEADING_LINE_RE);
	if (!m) return null;
	return {
		level: m[1].length,
		title: m[2].trim(),
		id: m[3] ?? new GithubSlugger().slug(m[2].trim()),
	};
}

function splitSections(body) {
	const lines = body.split('\n');
	const sections = [];
	let current = null;

	for (const line of lines) {
		const heading = parseHeading(line);
		if (heading) {
			if (current) sections.push(current);
			current = { ...heading, lines: [] };
			continue;
		}
		if (current) current.lines.push(line);
	}
	if (current) sections.push(current);
	return sections;
}

async function renderMarkdown(md) {
	const file = await markdownProcessor.process(md);
	return String(file).trim();
}

async function extractPageSections(body) {
	const rawSections = splitSections(body);
	const out = {};

	for (const section of rawSections) {
		const md = `## ${section.title}\n\n${section.lines.join('\n').trim()}`;
		const html = await renderMarkdown(md);
		out[section.id] = {
			title: section.title,
			html,
		};
	}

	return out;
}

async function buildLocale() {
	const index = {};

	for (const page of CONTEXT_SOURCE_PAGES) {
		const rel = `${page}.md`;
		const filePath = path.join(DOCS, rel);
		if (!fs.existsSync(filePath)) {
			console.warn(`extract-context-sections: missing ${rel}`);
			continue;
		}
		const body = readPageBody(filePath);
		index[page] = await extractPageSections(body);
	}

	return index;
}

export async function extractContextSections() {
	fs.mkdirSync(OUT_DIR, { recursive: true });
	const en = await buildLocale();
	fs.writeFileSync(path.join(OUT_DIR, 'en.json'), JSON.stringify(en, null, 2), 'utf8');
	console.log(`Wrote context sections: en (${Object.keys(en).length} pages).`);
}
