/**
 * Regenerates src/data/playtest-cards.json from Kismeta_CardReference.md.
 * Run: node scripts/sync-playtest-cards.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SOURCE = path.join(ROOT, 'Kismeta_CardReference.md');
const OUT = path.join(ROOT, 'src', 'data', 'playtest-cards.json');

const PLANET_SYMBOL = {
	Sun: '☉',
	Moon: '☽',
	Mercury: '☿',
	Venus: '♀',
	Mars: '♂',
	Jupiter: '♃',
	Saturn: '♄',
};

const FATE_ID = {
	Tower: 'fate-tower',
	Death: 'fate-death',
	'The Sun': 'fate-the-sun',
	Judgement: 'fate-judgement',
	Justice: 'fate-justice',
	'The Moon': 'fate-the-moon',
	'The Fool': 'fate-the-fool',
	'Wheel of Fortune': 'fate-wheel-of-fortune',
	'The Hanged Man': 'fate-the-hanged-man',
	'The Lovers': 'fate-the-lovers',
};

const ADEPT_ID = {
	'The Magician': 'adept-the-magician',
	'The High Priestess': 'adept-the-high-priestess',
	'The Empress': 'adept-the-empress',
	'The Emperor': 'adept-the-emperor',
	'The Hierophant': 'adept-the-hierophant',
	'The Devil': 'adept-the-devil',
	'The Chariot': 'adept-the-chariot',
	Strength: 'adept-strength',
	'The Hermit': 'adept-the-hermit',
	Temperance: 'adept-temperance',
	'The Star': 'adept-the-star',
	'The World': 'adept-the-world',
};

const CRUCIBLE_GROUP_META = {
	A: {
		group: 'Group A',
		wikiHash: 'group-a-beginner-lead-stage-4-cards-arcana-0-3',
	},
	B: {
		group: 'Group B',
		wikiHash: 'group-b-standard-bronze-stage-7-cards-arcana-4-10',
	},
	C: {
		group: 'Group C',
		wikiHash: 'group-c-advanced-silver-stage-7-cards-arcana-11-17',
	},
	D: {
		group: 'Group D',
		wikiHash: 'group-d-mastery-gold-stage-4-cards-arcana-18-21',
	},
};

const RANK_SLUG = {
	Ace: 'ace',
	Princess: 'princess',
	Knight: 'knight',
	Queen: 'queen',
	King: 'king',
};

function escapeHtml(text) {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function blurb(text, max = 100) {
	const clean = text.replace(/\s+/g, ' ').trim();
	if (clean.length <= max) return clean;
	return `${clean.slice(0, max - 1).trim()}…`;
}

function parseTableRow(line) {
	const trimmed = line.replace(/\r$/, '').trim();
	if (!trimmed.startsWith('|')) return null;
	const cells = trimmed
		.split('|')
		.slice(1, -1)
		.map((c) => c.trim().replace(/\*\*/g, ''));
	return cells.length ? cells : null;
}

function parseMarkdownTables(lines, startIdx) {
	const rows = [];
	let i = startIdx;
	while (i < lines.length) {
		const line = lines[i].replace(/\r$/, '');
		if (!line.trim().startsWith('|')) break;
		if (line.includes('---')) {
			i++;
			continue;
		}
		const row = parseTableRow(line);
		if (!row) break;
		rows.push(row);
		i++;
	}
	return { rows, nextIdx: i };
}

function cardEntry(entry) {
	return entry;
}

function parseFates(lines) {
	const start = lines.findIndex((l) => l.includes('| Card Name | Summary |'));
	const { rows } = parseMarkdownTables(lines, start + 1);
	return rows.map(([name, summary]) =>
		cardEntry({
			id: FATE_ID[name] ?? `fate-${name.toLowerCase().replace(/\s+/g, '-')}`,
			label: name,
			blurb: blurb(summary),
			detailHtml: `<p>${escapeHtml(summary)}</p>`,
			deck: 'major',
			group: 'Fate',
			wikiPath: 'rules/major-arcana',
			wikiHash: 'fate-cards',
		})
	);
}

function parseAdepts(lines) {
	const start = lines.findIndex(
		(l) => l.includes('| Card | Sign | Element | Planet | Effect |')
	);
	const { rows } = parseMarkdownTables(lines, start + 1);
	return rows.map(([name, sign, element, planet, effect]) => {
		const detailHtml =
			`<p><strong>Sign:</strong> ${escapeHtml(sign)} · ` +
			`<strong>Element:</strong> ${escapeHtml(element)} · ` +
			`<strong>Planet:</strong> ${escapeHtml(planet)} · ` +
			`<strong>Price:</strong> 3 Essence, of any type</p>` +
			`<p>${escapeHtml(effect)}</p>`;
		return cardEntry({
			id: ADEPT_ID[name] ?? `adept-${name.toLowerCase().replace(/\s+/g, '-')}`,
			label: name,
			blurb: blurb(effect),
			detailHtml,
			deck: 'major',
			group: 'Adept',
			wikiPath: 'rules/major-arcana',
			wikiHash: 'adept-cards',
		});
	});
}

function parseCrucibles(lines) {
	const entries = [];
	const groupHeading = /^### GROUP ([ABCD]) ·/;

	for (let i = 0; i < lines.length; i++) {
		const match = lines[i].match(groupHeading);
		if (!match) continue;
		const groupLetter = match[1];
		const meta = CRUCIBLE_GROUP_META[groupLetter];
		let j = i + 1;
		while (j < lines.length && !lines[j].replace(/\r$/, '').trim().startsWith('|')) j++;
		const { rows } = parseMarkdownTables(lines, j + 1);
		for (const row of rows) {
			const [arcana, attunement, reagents, heat] = row;
			const arcanaNum = arcana.trim();
			const blurbText = `Attunement ${attunement} · Reagents ${reagents} · Heat ${heat}`;
			const detailHtml =
				`<p><strong>Arcana ${escapeHtml(arcanaNum)}</strong> · ${escapeHtml(meta.group)}</p>` +
				`<ul><li><strong>Attunement:</strong> ${escapeHtml(attunement)}</li>` +
				`<li><strong>Reagents:</strong> ${escapeHtml(reagents)}</li>` +
				`<li><strong>Heat:</strong> ${escapeHtml(heat)}</li></ul>`;
			entries.push(
				cardEntry({
					id: `crucible-${groupLetter.toLowerCase()}-${arcanaNum}`,
					label: `Arcana ${arcanaNum}`,
					blurb: blurb(blurbText),
					detailHtml,
					deck: 'crucible',
					group: meta.group,
					wikiPath: 'rules/crucible-cards',
					wikiHash: meta.wikiHash,
				})
			);
		}
	}
	return entries;
}

function minorId(rank, suit) {
	const rankKey = RANK_SLUG[rank] ?? rank.toLowerCase();
	return `minor-${rankKey}-of-${suit.toLowerCase()}`;
}

function minorLabel(rank, suit) {
	if (rank === 'Ace') return `Ace of ${suit}`;
	if (/^\d+$/.test(rank)) return `${rank} of ${suit}`;
	return `${rank} of ${suit}`;
}

function parseMinors(lines) {
	const entries = [];
	const suits = ['Cups', 'Pentacles', 'Swords', 'Wands'];

	for (const suit of suits) {
		const headingIdx = lines.findIndex(
			(l) => l.replace(/\r$/, '').trim() === `### ${suit}`
		);
		if (headingIdx < 0) continue;
		let j = headingIdx + 1;
		while (j < lines.length && !lines[j].replace(/\r$/, '').trim().startsWith('|')) j++;
		const { rows } = parseMarkdownTables(lines, j + 1);
		for (const row of rows) {
			const [rank, cv, planet, type, _copies, effect] = row;
			const symbol = PLANET_SYMBOL[planet] ?? planet;
			const wildNote = planet === 'Sun' ? ' (Wild)' : '';
			const detailHtml =
				`<p><strong>${escapeHtml(minorLabel(rank, suit))}</strong> · CV ${escapeHtml(cv)} · ` +
				`${escapeHtml(symbol)} ${escapeHtml(planet)}${wildNote} · ${escapeHtml(type)}</p>` +
				`<p>${escapeHtml(effect)}</p>`;
			entries.push(
				cardEntry({
					id: minorId(rank, suit),
					label: minorLabel(rank, suit),
					blurb: blurb(effect),
					detailHtml,
					deck: 'minor',
					group: suit,
					wikiPath: 'rules/minor-arcana',
					wikiHash: `${suit.toLowerCase()}`,
				})
			);
		}
	}
	return entries;
}

function referenceEntries(lines) {
	const entries = [];

	entries.push(
		cardEntry({
			id: 'minor-reference-suit-correspondence',
			label: 'Suit Correspondence',
			blurb: 'Wands, Cups, Pentacles, and Swords — Element, Essence, Reagent, and Furnace.',
			detailHtml:
				'<div class="doc-table"><table><thead><tr><th>Color</th><th>Suit</th><th>Element</th><th>Essence</th><th>Reagent</th><th>Furnace</th></tr></thead><tbody>' +
				'<tr><td>■ Red</td><td>Wands</td><td>Fire</td><td>Fire</td><td>Sulfur</td><td>Fire Furnace</td></tr>' +
				'<tr><td>■ Blue</td><td>Cups</td><td>Water</td><td>Water</td><td>Aqua Regia</td><td>Water Furnace</td></tr>' +
				'<tr><td>■ Green</td><td>Pentacles</td><td>Earth</td><td>Earth</td><td>Vitriol</td><td>Earth Furnace</td></tr>' +
				'<tr><td>■ Yellow</td><td>Swords</td><td>Air</td><td>Air</td><td>Quicksilver</td><td>Air Furnace</td></tr>' +
				'</tbody></table></div>',
			deck: 'minor',
			group: 'Reference',
			wikiPath: 'rules/minor-arcana',
			wikiHash: 'suit-correspondence',
		})
	);

	const nines = [
		['9 of Cups', 'In Water Signs: exchange Water Essence 1:1 for Earth Essence.'],
		['9 of Pentacles', 'In Earth Signs: exchange Earth Essence 1:1 for Air Essence.'],
		['9 of Swords', 'While your Sign is Air: exchange Air Essence 1:1 for Fire Essence.'],
		['9 of Wands', 'While your Sign is Fire: exchange Fire Essence 1:1 for Water Essence.'],
	];
	const ninesRows = nines
		.map(([card, exchange]) => `<tr><td>${escapeHtml(card)}</td><td>${escapeHtml(exchange)}</td></tr>`)
		.join('');
	entries.push(
		cardEntry({
			id: 'minor-reference-the-nines',
			label: 'The Nines · Essence Exchange',
			blurb: 'Each Nine exchanges its Element for the next in the cycle.',
			detailHtml:
				`<div class="doc-table"><table><thead><tr><th>Card</th><th>Exchange</th></tr></thead><tbody>${ninesRows}</tbody></table></div>`,
			deck: 'minor',
			group: 'Reference',
			wikiPath: 'rules/minor-arcana',
			wikiHash: 'the-nines-essence-exchange',
		})
	);

	entries.push(
		cardEntry({
			id: 'minor-reference-the-aces',
			label: 'The Aces · Sun & Seed',
			blurb: 'Usable as a Seed when paying Formulas.',
			detailHtml:
				'<p>Aces carry the Sun. Each Ace is a Seed: spend it when paying an Alchemical Formula and it counts as 1 Reagent of its Suit (Ace of Wands counts as 2 Sulfur). There are 8 Aces in the deck, two per Suit.</p>',
			deck: 'minor',
			group: 'Reference',
			wikiPath: 'rules/minor-arcana',
			wikiHash: 'the-aces-sun-wild-charge',
		})
	);

	const verbStart = lines.findIndex((l) => l.includes('| Verb | Meaning |'));
	const { rows: verbRows } = parseMarkdownTables(lines, verbStart + 1);
	const verbList = verbRows
		.map(([verb, meaning]) => `<li><strong>${escapeHtml(verb)}:</strong> ${escapeHtml(meaning)}</li>`)
		.join('');
	entries.push(
		cardEntry({
			id: 'minor-reference-card-effect-verbs',
			label: 'Card Effect Verbs',
			blurb: 'Burn, Extinguish, Neutralize, Reversed, Ward, Sever, Scry, and Distill.',
			detailHtml: `<ul>${verbList}</ul>`,
			deck: 'minor',
			group: 'Reference',
			wikiPath: 'rules/minor-arcana',
			wikiHash: 'card-effect-verbs',
		})
	);

	return entries;
}

function main() {
	if (!fs.existsSync(SOURCE)) {
		console.error(`Source not found: ${SOURCE}`);
		process.exit(1);
	}

	const lines = fs.readFileSync(SOURCE, 'utf8').split('\n');
	const cards = [
		...parseFates(lines),
		...parseAdepts(lines),
		...parseCrucibles(lines),
		...parseMinors(lines),
		...referenceEntries(lines),
	];

	fs.writeFileSync(OUT, `${JSON.stringify(cards, null, 2)}\n`, 'utf8');
	console.log(`Wrote ${cards.length} playtest card entries to src/data/playtest-cards.json`);
}

main();
