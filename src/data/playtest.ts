import { AGY_WIKI_PATH } from './wiki-base';

/** Client-side playtest gate — casual access control, not cryptographic security. */
export const agyPlaytestConfig = {
	path: `${AGY_WIKI_PATH}playtest/`,
	storageKey: 'kismeta-agy-playtest-unlocked',
	password: 'thegreatyear',
};

export type PlaytestModuleStatus = 'active' | 'stub';

export type PlaytestModule = {
	id: string;
	titleKey: string;
	summaryKey: string;
	path: string;
	status: PlaytestModuleStatus;
};

/** Hub cards and module routes under `/playtest/`. */
export const agyPlaytestModules: PlaytestModule[] = [
	{
		id: 'round-overview',
		titleKey: 'playtest.agy.modules.roundOverview.title',
		summaryKey: 'playtest.agy.modules.roundOverview.summary',
		path: `${agyPlaytestConfig.path}round-overview/`,
		status: 'active',
	},
	{
		id: 'glossary',
		titleKey: 'playtest.agy.modules.glossary.title',
		summaryKey: 'playtest.agy.modules.glossary.summary',
		path: `${agyPlaytestConfig.path}glossary/`,
		status: 'active',
	},
	{
		id: 'cards',
		titleKey: 'playtest.agy.modules.cards.title',
		summaryKey: 'playtest.agy.modules.cards.summary',
		path: `${agyPlaytestConfig.path}cards/`,
		status: 'active',
	},
	{
		id: 'options',
		titleKey: 'playtest.agy.modules.options.title',
		summaryKey: 'playtest.agy.modules.options.summary',
		path: `${agyPlaytestConfig.path}options/`,
		status: 'stub',
	},
];

export function getPlaytestModule(id: string): PlaytestModule | undefined {
	return agyPlaytestModules.find((module) => module.id === id);
}
