/**
 * Renders static Crucible deck build UI for injection into synced Setup markdown.
 * Shared data: src/data/crucible-deck-builds.json
 */
import builds from '../src/data/crucible-deck-builds.json' with { type: 'json' };

const CARD_GROUPS = ['A', 'B', 'C', 'D'];
const GAME_MODES = ['quickplay', 'standard', 'magnus'];
const PLAYER_COUNTS = [2, 3, 4];

const LABELS = {
	en: {
		curatedIntro: 'Curated builds — select your game mode to see draws per player count.',
		randomTitle: 'Random build — Let the Fates decide',
		randomSteps: [
			'Shuffle all 22 Crucible Cards together.',
			'Blindly draw four cards for each player in the game.',
		],
		tabs: {
			quickplay: 'Quickplay / First Play',
			standard: 'Standard Game',
			magnus: 'Magnus Alchemist',
		},
		modeLabel: 'Game mode',
		players: (n, total) => `${n} players (${total} cards)`,
		drawFrom: 'Draw from each group:',
	},
};

export const CRUCIBLE_DECK_PLACEHOLDER = '<!-- CRUCIBLE_DECK_BUILDS -->';

function escapeHtml(s) {
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function renderChips(groups) {
	return CARD_GROUPS.map((g) => {
		const count = groups[g];
		const zero = count === 0 ? ' crucible-deck__chip--zero' : '';
		return `<span class="crucible-deck__chip${zero}"><span class="crucible-deck__chip-letter">${g}</span><span class="crucible-deck__chip-count">${count}</span></span>`;
	}).join('');
}

function renderPlayerRow(playerCount, build, labels) {
	return `<li class="crucible-deck__row">
  <span class="crucible-deck__row-label">${escapeHtml(labels.players(playerCount, build.total))}</span>
  <div class="crucible-deck__chips" aria-label="${escapeHtml(labels.drawFrom)}">${renderChips(build.groups)}</div>
</li>`;
}

function renderModePanel(mode, labels, prefix) {
	const modeBuilds = builds.curated[mode];
	const rows = PLAYER_COUNTS.map((n) =>
		renderPlayerRow(n, modeBuilds[String(n)], labels)
	).join('\n');
	// No role="tabpanel" — panels are shown/hidden by CSS :has() on the radio
	// group above; a tabpanel role requires JS-managed ARIA state we don't have.
	return `<div class="crucible-deck__panel" id="${prefix}-panel-${mode}">
  <ul class="crucible-deck__rows">${rows}</ul>
</div>`;
}

/**
 * @param {string} [_locale] reserved for future locales
 * @param {string} [prefix] unique id prefix when multiple on page
 */
export function renderCrucibleDeckHtml(_locale = 'en', prefix = 'crucible') {
	const labels = LABELS.en;

	// Interleave each radio + label as adjacent siblings so that
	// `.crucible-deck__tab-input:checked + .crucible-deck__tab-label` in CSS
	// correctly highlights the active tab.
	const tabItems = GAME_MODES.map((mode, i) => {
		const checked = i === 0 ? ' checked' : '';
		return `<input type="radio" name="${prefix}-mode" id="${prefix}-tab-${mode}" class="crucible-deck__tab-input"${checked} /><label for="${prefix}-tab-${mode}" class="crucible-deck__tab-label">${escapeHtml(labels.tabs[mode])}</label>`;
	}).join('\n');

	const panels = GAME_MODES.map((mode) => renderModePanel(mode, labels, prefix)).join('\n');

	const randomList = labels.randomSteps
		.map((step) => `<li>${escapeHtml(step)}</li>`)
		.join('');

	return `<div class="crucible-deck" data-locale="en">
<p class="crucible-deck__intro">${escapeHtml(labels.curatedIntro)}</p>
<div class="crucible-deck__tab-strip" role="radiogroup" aria-label="${escapeHtml(labels.modeLabel)}">${tabItems}</div>
${panels}
<details class="crucible-deck__random">
<summary>${escapeHtml(labels.randomTitle)}</summary>
<ul class="crucible-deck__random-steps">${randomList}</ul>
</details>
</div>`;
}
