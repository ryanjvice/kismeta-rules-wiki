import { AGY_WIKI_PATH } from './wiki-base';

/** Client-side playtest gate — casual access control, not cryptographic security. */
export const agyPlaytestConfig = {
	path: `${AGY_WIKI_PATH}playtest/`,
	storageKey: 'kismeta-agy-playtest-unlocked',
	password: 'dear alchemist',
};
