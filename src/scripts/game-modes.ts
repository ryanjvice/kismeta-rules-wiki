import { GAME_MODE_STORAGE_KEY } from '../data/guided-steps';

export type GameModeFlags = { quickplay: boolean; magnus: boolean };

export function loadGameModesFromStorage(): GameModeFlags {
	const saved = localStorage.getItem(GAME_MODE_STORAGE_KEY);
	if (!saved) return { quickplay: true, magnus: true };
	try {
		const parsed = JSON.parse(saved);
		return {
			quickplay: parsed.quickplay ?? true,
			magnus: parsed.magnus ?? true,
		};
	} catch {
		return { quickplay: true, magnus: true };
	}
}

export function applyGameModeCallouts(scope: ParentNode = document) {
	const { quickplay, magnus } = loadGameModesFromStorage();
	scope.querySelectorAll<HTMLElement>('.game-mode-callout').forEach((el) => {
		const modes = (el.dataset.modes || '').split(/\s+/).filter(Boolean);
		const show =
			(modes.includes('quickplay') && quickplay) ||
			(modes.includes('magnus') && magnus);
		el.hidden = !show;
	});
}

function initGameModeCallouts() {
	applyGameModeCallouts();
	window.addEventListener('kismeta-game-modes-changed', () => applyGameModeCallouts());
}

document.addEventListener('astro:page-load', initGameModeCallouts);
initGameModeCallouts();
