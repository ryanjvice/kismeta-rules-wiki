import { AGY_WIKI_BASE, TVA_WIKI_BASE } from './wiki-base';

export type WikiTabKey = 'tab.play' | 'tab.rules' | 'tab.lore';

export type WikiNavConfig = {
	base: string;
	/** Display label for the game (used in breadcrumb). */
	gameLabel: string;
	tabs: readonly { key: WikiTabKey; path: string }[];
	/**
	 * Relative paths from the wiki base that activate the Rules tab.
	 * Checked first — takes priority over the default play-tab logic.
	 */
	rulesPrefixes: readonly string[];
	/**
	 * Relative paths from the wiki base (outside /play/) that also activate
	 * the Play tab (e.g. reference/ lookups, glossary/).
	 */
	playExtraPrefixes: readonly string[];
};

export const WIKI_NAV: Record<string, WikiNavConfig> = {
	[AGY_WIKI_BASE]: {
		base: AGY_WIKI_BASE,
		gameLabel: 'Alchemists of the Great Year',
		tabs: [
			{ key: 'tab.play', path: 'play/guided' },
			{ key: 'tab.rules', path: 'learn/components' },
			{ key: 'tab.lore', path: 'lore' },
		],
		rulesPrefixes: ['learn/', 'rules/', 'play/setup/', 'play/round-overview/'],
		playExtraPrefixes: ['glossary/', 'reference/'],
	},
	[TVA_WIKI_BASE]: {
		base: TVA_WIKI_BASE,
		gameLabel: 'The Veiled Ascent',
		tabs: [
			{ key: 'tab.play', path: 'play/guided' },
			{ key: 'tab.rules', path: 'rules/overview' },
			{ key: 'tab.lore', path: 'lore' },
		],
		// All /reference/ pages except progression-board are Play (in-game lookups).
		rulesPrefixes: ['rules/', 'reference/progression-board/'],
		playExtraPrefixes: [
			'glossary',
			'reference/card-values/',
			'reference/round-outcomes/',
			'reference/pattern-bonuses/',
		],
	},
};

/** Return the WikiNavConfig for the current pathname, or null if not in a known wiki. */
export function getWikiNav(pathname: string): WikiNavConfig | null {
	for (const config of Object.values(WIKI_NAV)) {
		if (pathname.startsWith(`/${config.base}/`)) return config;
	}
	return null;
}
