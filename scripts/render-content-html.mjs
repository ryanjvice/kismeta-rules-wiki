/**
 * Renders game tables and action flows for injection into synced markdown.
 * Data: src/data/tables/*.json, src/data/flows/*.json
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const TABLES_DIR = path.join(ROOT, 'src', 'data', 'tables');
const FLOWS_DIR = path.join(ROOT, 'src', 'data', 'flows');

const TABLE_PLACEHOLDER_RE = /<!--\s*TABLE:([\w-]+)\s*-->/g;
const FLOW_PLACEHOLDER_RE = /<!--\s*FLOW:([\w-]+)\s*-->/g;

const LABELS = {
	en: {
		required: 'Required',
		optional: 'Optional',
		choice: 'Choose one',
		sequence: 'In order',
		appliesWhen: 'Applies when:',
		step: 'Step',
		if: 'If',
		otherwise: 'Otherwise',
	},
	'pt-br': {
		required: 'Obrigatório',
		optional: 'Opcional',
		choice: 'Escolha uma',
		sequence: 'Em ordem',
		appliesWhen: 'Aplica-se quando:',
		step: 'Passo',
		if: 'Se',
		otherwise: 'Caso contrário',
	},
};

function escapeHtml(s) {
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function loc(obj, locale) {
	if (!obj) return '';
	if (typeof obj === 'string') return obj;
	return obj[locale] ?? obj.en ?? '';
}

function loadJson(dir, id) {
	const file = path.join(dir, `${id}.json`);
	if (!fs.existsSync(file)) {
		console.warn(`render-content-html: missing ${file}`);
		return null;
	}
	return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function badge(kind, labels) {
	if (kind === 'group') return '';
	const cls = `action-flow__badge action-flow__badge--${kind}`;
	const text =
		kind === 'required'
			? labels.required
			: kind === 'optional'
				? labels.optional
				: kind === 'choice'
					? labels.choice
					: kind === 'sequence'
						? labels.sequence
						: '';
	if (!text) return '';
	return `<span class="${cls}">${escapeHtml(text)}</span>`;
}

function renderFlowNode(node, locale, labels, depth = 0) {
	const label = loc(node.label, locale);
	const body = node.body ? loc(node.body, locale) : '';
	const condition = node.condition ? loc(node.condition, locale) : '';
	const kind = node.kind ?? 'group';
	const hasChildren = node.children?.length;

	let html = `<li class="action-flow__node action-flow__node--${kind}" data-node-id="${escapeHtml(node.id)}">`;
	html += `<div class="action-flow__node-head">`;
	html += badge(kind, labels);
	html += `<span class="action-flow__node-label">${escapeHtml(label)}</span>`;
	html += `</div>`;

	if (condition) {
		const prefix = kind === 'sequence' ? `${labels.appliesWhen} ` : '';
		html += `<p class="action-flow__condition"><em>${escapeHtml(prefix)}${escapeHtml(condition)}</em></p>`;
	}
	if (body) {
		html += `<p class="action-flow__body">${escapeHtml(body)}</p>`;
	}

	if (hasChildren) {
		const isChoice = node.children.some((c) => c.kind === 'choice' || kind === 'choice');
		const listClass = isChoice ? 'action-flow__branches' : 'action-flow__children';
		const tag = isChoice && depth > 0 ? 'div' : 'ol';
		html += `<${tag} class="${listClass}">`;
		for (const child of node.children) {
			if (isChoice && depth > 0) {
				html += `<div class="action-flow__branch">${renderFlowNode(child, locale, labels, depth + 1)}</div>`;
			} else {
				html += renderFlowNode(child, locale, labels, depth + 1);
			}
		}
		html += `</${tag}>`;
	}

	html += `</li>`;
	return html;
}

function renderDecisionTree(flow, locale = 'en') {
	const labels = LABELS[locale] ?? LABELS.en;
	const intro = flow.intro ? loc(flow.intro, locale) : '';
	const root = flow.root;

	let html = `<div class="action-flow action-flow--static" data-flow-id="${escapeHtml(flow.id)}" data-locale="${locale}">`;
	if (intro) {
		html += `<p class="action-flow__intro">${escapeHtml(intro)}</p>`;
	}
	html += `<ol class="action-flow__tree">`;
	html += renderFlowNode(root, locale, labels);
	html += `</ol></div>`;
	return html;
}

function renderStepList(table, locale = 'en') {
	const labels = LABELS[locale] ?? LABELS.en;
	const intro = table.intro ? loc(table.intro, locale) : '';

	let html = `<div class="game-table game-table--step-list" data-table-id="harvest-order" data-locale="${locale}">`;
	if (intro) {
		html += `<p class="game-table__intro">${escapeHtml(intro)}</p>`;
	}
	html += `<ol class="game-table__steps">`;
	for (const step of table.steps) {
		html += `<li class="game-table__step">
  <span class="game-table__step-label">${escapeHtml(loc(step.label, locale))}</span>
  <p class="game-table__step-body">${escapeHtml(loc(step.body, locale))}</p>
</li>`;
	}
	html += `</ol></div>`;
	return html;
}

function renderSeasonCards(table, locale = 'en') {
	const intro = table.intro ? loc(table.intro, locale) : '';

	let html = `<div class="game-table game-table--season-cards" data-table-id="round-at-a-glance" data-locale="${locale}">`;
	if (intro) {
		html += `<p class="game-table__intro">${escapeHtml(intro)}</p>`;
	}
	html += `<div class="game-table__season-grid">`;
	for (const season of table.seasons) {
		html += `<article class="game-table__season-card" data-season="${escapeHtml(season.id)}">
  <header class="game-table__season-header">
    <span class="game-table__season-icon" aria-hidden="true">${season.icon}</span>
    <h3 class="game-table__season-title">${escapeHtml(loc(season.title, locale))}</h3>
    <p class="game-table__season-subtitle">${escapeHtml(loc(season.subtitle, locale))}</p>
  </header>
  <p class="game-table__season-summary">${escapeHtml(loc(season.summary, locale))}</p>
</article>`;
	}
	html += `</div></div>`;
	return html;
}

/**
 * @param {string} tableId
 * @param {'en' | 'pt-br'} locale
 */
export function renderTableHtml(tableId, locale = 'en') {
	const table = loadJson(TABLES_DIR, tableId);
	if (!table) return `<!-- missing table: ${tableId} -->`;

	switch (tableId) {
		case 'harvest-order':
			return renderStepList(table, locale);
		case 'round-at-a-glance':
			return renderSeasonCards(table, locale);
		default:
			console.warn(`render-content-html: unknown table renderer for ${tableId}`);
			return `<!-- unknown table: ${tableId} -->`;
	}
}

/**
 * @param {string} flowId
 * @param {'en' | 'pt-br'} locale
 */
export function renderFlowHtml(flowId, locale = 'en') {
	const flow = loadJson(FLOWS_DIR, flowId);
	if (!flow) return `<!-- missing flow: ${flowId} -->`;
	return renderDecisionTree(flow, locale);
}

/**
 * Replace <!-- TABLE:id --> and <!-- FLOW:id --> placeholders.
 * @param {string} body
 * @param {'en' | 'pt-br'} locale
 */
export function injectContentBlocks(body, locale = 'en') {
	let out = body;
	out = out.replace(TABLE_PLACEHOLDER_RE, (_, id) => renderTableHtml(id, locale));
	out = out.replace(FLOW_PLACEHOLDER_RE, (_, id) => renderFlowHtml(id, locale));
	return out;
}

export { TABLE_PLACEHOLDER_RE, FLOW_PLACEHOLDER_RE };
