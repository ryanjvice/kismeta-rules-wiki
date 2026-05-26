/**
 * AI-assisted translation: English docs → another locale folder.
 *
 * Usage:
 *   node scripts/translate-locale.mjs --locale es
 *   node scripts/translate-locale.mjs --locale es --only lore/index,play/setup
 *   node scripts/translate-locale.mjs --locale es --dry-run
 *
 * Add entries to LOCALE_CONFIG and scripts/term-glossary-<locale>.json first.
 * Requires OPENAI_API_KEY in .env (or environment).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DOCS = path.join(ROOT, 'src', 'content', 'docs');

/** Add locale entries when enabling a new language (see docs/i18n.md). */
const LOCALE_CONFIG = {};

function loadEnv() {
	const envPath = path.join(ROOT, '.env');
	if (!fs.existsSync(envPath)) return;
	for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
		const m = line.match(/^([^#=]+)=(.*)$/);
		if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
	}
}

function parseArgs() {
	const args = process.argv.slice(2);
	let locale = '';
	let dryRun = false;
	/** @type {string[] | null} */
	let only = null;

	for (let i = 0; i < args.length; i++) {
		if (args[i] === '--locale' && args[i + 1]) locale = args[++i];
		else if (args[i] === '--dry-run') dryRun = true;
		else if (args[i] === '--only' && args[i + 1]) only = args[++i].split(',').map((s) => s.trim());
	}
	return { locale, dryRun, only };
}

function listEnglishPages() {
	/** @type {{ slug: string, ext: string, src: string }[]} */
	const pages = [];

	function walk(dir, base = '') {
		for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
			const rel = base ? `${base}/${ent.name}` : ent.name;
			const full = path.join(dir, ent.name);
			if (ent.isDirectory()) {
				if (['pt-br', 'es', 'fr', 'de'].includes(ent.name)) continue;
				walk(full, rel);
			} else if (/\.(md|mdx)$/.test(ent.name) && ent.name !== 'index.mdx') {
				const slug = rel.replace(/\.(md|mdx)$/, '');
				const ext = path.extname(ent.name).slice(1);
				pages.push({ slug, ext, src: full });
			}
		}
	}

	walk(DOCS);
	return pages;
}

function parseFrontmatter(raw) {
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
	if (!match) return { fm: {}, body: raw };
	const fm = {};
	for (const line of match[1].split('\n')) {
		const m = line.match(/^(\w+):\s*(.+)$/);
		if (m) {
			try {
				fm[m[1]] = JSON.parse(m[2]);
			} catch {
				fm[m[1]] = m[2].replace(/^["']|["']$/g, '');
			}
		}
	}
	return { fm, body: match[2] };
}

function rewriteLinks(body, prefix) {
	return body
		.replace(/\]\(\/(learn|lore|play|reference|glossary)/g, `](${prefix}/$1`);
}

function buildPrompt(body, config, termGlossary) {
	const preserve = termGlossary.preserve?.join(', ') ?? '';
	const terms = Object.entries(termGlossary.terms ?? {})
		.map(([en, pt]) => `${en} → ${pt}`)
		.join('\n');

	return `Translate the following game rules markdown from English to ${config.lang}.

Rules:
- Output ONLY the translated markdown body (no frontmatter, no code fences).
- Preserve all markdown structure: headings, lists, tables, HTML tags (especially <div class="game-mode-callout">), emoji, and anchor IDs.
- Do NOT translate or modify any HTML inside <div class="crucible-deck"> … </div> — copy that block exactly from the source.
- Keep these proper nouns in English: ${preserve}
- Use these term translations consistently:
${terms}
- Rewrite internal links to use the ${config.prefix} prefix (e.g. ${config.prefix}/play/round-overview/)
- Translate any "See …" cross-references naturally in Portuguese while keeping working markdown links.

---

${body}`;
}

async function translateWithOpenAI(prompt, apiKey) {
	const res = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify({
			model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
			messages: [
				{
					role: 'system',
					content:
						'You are a professional translator for tabletop game rules. Be precise and consistent.',
				},
				{ role: 'user', content: prompt },
			],
			temperature: 0.3,
		}),
	});

	if (!res.ok) {
		const err = await res.text();
		throw new Error(`OpenAI API error ${res.status}: ${err}`);
	}

	const data = await res.json();
	return data.choices[0].message.content.trim();
}

async function translateFrontmatter(fm, config, apiKey, termGlossary) {
	const prompt = `Translate these JSON string values to ${config.lang}. Return valid JSON with keys title and description only.

${JSON.stringify({ title: fm.title, description: fm.description })}

Keep game proper nouns per glossary: ${termGlossary.preserve?.slice(0, 15).join(', ')}`;

	const res = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify({
			model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
			messages: [{ role: 'user', content: prompt }],
			temperature: 0.2,
		}),
	});

	const data = await res.json();
	const text = data.choices[0].message.content.trim();
	const jsonMatch = text.match(/\{[\s\S]*\}/);
	return jsonMatch ? JSON.parse(jsonMatch[0]) : fm;
}

async function main() {
	loadEnv();
	const { locale, dryRun, only } = parseArgs();
	const config = LOCALE_CONFIG[locale];
	if (!locale || !config) {
		console.error(
			'Pass --locale <id> with an entry in LOCALE_CONFIG (see docs/i18n.md).',
			locale ? `Unknown locale: ${locale}` : 'Missing --locale.'
		);
		process.exit(1);
	}

	const apiKey = process.env.OPENAI_API_KEY;
	if (!apiKey && !dryRun) {
		console.error('Set OPENAI_API_KEY in .env to run translations.');
		process.exit(1);
	}

	const termGlossary = JSON.parse(fs.readFileSync(config.termGlossary, 'utf8'));
	const outDir = path.join(DOCS, locale);
	const pages = listEnglishPages().filter((p) => !only || only.includes(p.slug));

	console.log(`Translating ${pages.length} pages → ${locale}${dryRun ? ' (dry-run)' : ''}`);

	for (const { slug, ext, src } of pages) {
		const raw = fs.readFileSync(src, 'utf8');
		const { fm, body } = parseFrontmatter(raw);
		const outPath = path.join(outDir, `${slug}.${ext}`);

		if (dryRun) {
			console.log('Would translate:', slug);
			continue;
		}

		console.log('Translating:', slug);
		const translatedFm = await translateFrontmatter(fm, config, apiKey, termGlossary);
		let translatedBody = await translateWithOpenAI(
			buildPrompt(body, config, termGlossary),
			apiKey
		);
		translatedBody = rewriteLinks(translatedBody, config.prefix);

		const mdxImports = ext === 'mdx' && raw.includes('import ')
			? raw.split('---')[2]?.match(/^import[\s\S]*?(?=\n\n|\n<p|\n<Glossary)/)?.[0] ?? ''
			: '';

		const fmLines = ['---'];
		for (const [k, v] of Object.entries(translatedFm)) {
			fmLines.push(`${k}: ${JSON.stringify(v)}`);
		}
		fmLines.push('---', '');

		let output = fmLines.join('\n');
		if (mdxImports) output += mdxImports + '\n\n';
		output += translatedBody.trim() + '\n';

		fs.mkdirSync(path.dirname(outPath), { recursive: true });
		fs.writeFileSync(outPath, output, 'utf8');

		// Rate limit courtesy pause
		await new Promise((r) => setTimeout(r, 500));
	}

	console.log('Done.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
