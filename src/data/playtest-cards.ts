import playtestCardsJson from './playtest-cards.json';
import { wikiSlug } from './wiki-base';

export type PlaytestCardDeck = 'major' | 'crucible' | 'minor';

export type PlaytestCardEntry = {
	id: string;
	label: string;
	blurb: string;
	detailHtml: string;
	deck: PlaytestCardDeck;
	group: string;
	wikiPath: string;
	wikiHash: string;
};

export type PlaytestCardTabId = 'adept' | 'fate' | 'minor-arcana' | 'crucible';

export type PlaytestCardTab = {
	id: PlaytestCardTabId;
	labelKey: string;
};

export type PlaytestCardGroup = {
	label: string;
	labelKey?: string;
	cards: PlaytestCardEntry[];
};

export const playtestCardEntries = playtestCardsJson as PlaytestCardEntry[];

export const playtestCardTabs: PlaytestCardTab[] = [
	{ id: 'adept', labelKey: 'playtest.agy.cards.tabs.adept' },
	{ id: 'fate', labelKey: 'playtest.agy.cards.tabs.fate' },
	{ id: 'minor-arcana', labelKey: 'playtest.agy.cards.tabs.minorArcana' },
	{ id: 'crucible', labelKey: 'playtest.agy.cards.tabs.crucible' },
];

const MINOR_GROUP_ORDER = ['Wands', 'Cups', 'Pentacles', 'Swords', 'Reference'] as const;
const CRUCIBLE_GROUP_ORDER = ['Group A', 'Group B', 'Group C', 'Group D'] as const;

function sortByLabel(cards: PlaytestCardEntry[]): PlaytestCardEntry[] {
	return [...cards].sort((a, b) => a.label.localeCompare(b.label));
}

export function wikiCardUrl(wikiPath: string, wikiHash: string): string {
	const base = `/${wikiSlug(wikiPath)}/`.replace(/\/{2,}/g, '/');
	return wikiHash ? `${base}#${wikiHash}` : base;
}

export function cardsForTab(tabId: PlaytestCardTabId): PlaytestCardEntry[] {
	switch (tabId) {
		case 'adept':
			return sortByLabel(
				playtestCardEntries.filter((card) => card.group === 'Adept')
			);
		case 'fate':
			return sortByLabel(
				playtestCardEntries.filter((card) => card.group === 'Fate')
			);
		case 'minor-arcana':
			return playtestCardEntries.filter((card) => card.deck === 'minor');
		case 'crucible':
			return playtestCardEntries.filter((card) => card.deck === 'crucible');
	}
}

function groupByField(
	cards: PlaytestCardEntry[],
	order: readonly string[]
): PlaytestCardGroup[] {
	const buckets = new Map<string, PlaytestCardEntry[]>();

	for (const card of cards) {
		const group = buckets.get(card.group) ?? [];
		group.push(card);
		buckets.set(card.group, group);
	}

	return order
		.filter((label) => buckets.has(label))
		.map((label) => ({
			label,
			labelKey:
				label === 'Reference' ? 'playtest.agy.cards.groups.reference' : undefined,
			cards: buckets.get(label) ?? [],
		}));
}

export function groupCardsForTab(tabId: PlaytestCardTabId): PlaytestCardGroup[] {
	const cards = cardsForTab(tabId);

	switch (tabId) {
		case 'adept':
		case 'fate':
			return cards.length ? [{ label: '', cards }] : [];
		case 'minor-arcana':
			return groupByField(cards, MINOR_GROUP_ORDER);
		case 'crucible':
			return groupByField(cards, CRUCIBLE_GROUP_ORDER);
	}
}

export function getPlaytestCardTab(id: PlaytestCardTabId): PlaytestCardTab | undefined {
	return playtestCardTabs.find((tab) => tab.id === id);
}
