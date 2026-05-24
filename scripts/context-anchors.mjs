/**
 * Collect learnMoreHash values and inject stable {#id} suffixes on markdown headings.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import GithubSlugger from 'github-slugger';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const FLOWS_DIR = path.join(ROOT, 'src', 'data', 'flows');
const GUIDED_STEPS = path.join(ROOT, 'src', 'data', 'guided-steps.ts');

const HEADING_RE = /^(#{1,6})\s+(.+?)(?:\s+\{#([^}]+)\})?\s*$/;

/** Strip emoji / variation selectors so slug can match learnMoreHash. */
function normalizeSlug(text) {
	const slugger = new GithubSlugger();
	let slug = slugger.slug(text.trim());
	slug = slug
		.replace(/[\uFE0F\u20E3]/g, '')
		.replace(/[^\w-]+/g, (ch) => (ch === '-' ? '-' : ''))
		.replace(/--+/g, '-')
		.replace(/^-|-$/g, '');
	return slug;
}

function collectHashesFromFlows() {
	const hashes = new Set();
	for (const file of fs.readdirSync(FLOWS_DIR).filter((f) => f.endsWith('.json'))) {
		const flow = JSON.parse(fs.readFileSync(path.join(FLOWS_DIR, file), 'utf8'));
		const walk = (node) => {
			if (node?.learnMoreHash) hashes.add(node.learnMoreHash);
			for (const child of node?.children ?? []) walk(child);
		};
		if (flow.learnMoreHash) hashes.add(flow.learnMoreHash);
		walk(flow.root);
	}
	return hashes;
}

function collectHashesFromGuidedSteps() {
	const raw = fs.readFileSync(GUIDED_STEPS, 'utf8');
	const hashes = new Set();
	for (const m of raw.matchAll(/learnMoreHash:\s*['"]([^'"]+)['"]/g)) {
		hashes.add(m[1]);
	}
	return hashes;
}

export function getContextAnchorHashes(_locale = 'en') {
	return new Set([...collectHashesFromFlows(), ...collectHashesFromGuidedSteps()]);
}

export function injectContextAnchors(body, anchorHashes) {
	if (!anchorHashes?.size) return body;

	return body
		.split('\n')
		.map((line) => {
			const m = line.match(HEADING_RE);
			if (!m) return line;

			const [, marks, title, existingId] = m;
			if (existingId && anchorHashes.has(existingId)) return line;

			const normalized = normalizeSlug(title);
			const slug = new GithubSlugger().slug(title.trim());

			let targetId = null;
			if (anchorHashes.has(slug)) targetId = slug;
			else if (anchorHashes.has(normalized)) targetId = normalized;
			else {
				for (const hash of anchorHashes) {
					if (normalized === hash || slug.replace(/[^\w-]/g, '') === hash.replace(/[^\w-]/g, '')) {
						targetId = hash;
						break;
					}
				}
			}

			if (!targetId) return line;
			if (existingId === targetId) return line;

			return `${marks} ${title.trim()} {#${targetId}}`;
		})
		.join('\n');
}

export const CONTEXT_SOURCE_PAGES = [
	'learn/components',
	'play/setup',
	'play/round-overview',
	'play/round-at-a-glance',
	'play/winning',
];
