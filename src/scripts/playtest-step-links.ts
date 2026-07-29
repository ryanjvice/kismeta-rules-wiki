import type { ContextDetail } from './context-panel';

function initPlaytestStepLinks(root: HTMLElement) {
	if (root.dataset.bound === 'true') return;
	root.dataset.bound = 'true';

	root.querySelectorAll<HTMLButtonElement>('[data-playtest-rule]').forEach((button) => {
		button.addEventListener('click', () => {
			const path = button.dataset.rulesPath ?? '';
			const hash = button.dataset.rulesHash ?? '';
			if (!path || !hash) return;

			button.dispatchEvent(
				new CustomEvent<ContextDetail>('kismeta:context', {
					detail: { path, hash },
					bubbles: true,
				})
			);
		});
	});
}

export function initAllPlaytestStepLinks() {
	document
		.querySelectorAll<HTMLElement>('[data-playtest-round-overview]')
		.forEach(initPlaytestStepLinks);
}

document.addEventListener('astro:page-load', initAllPlaytestStepLinks);
initAllPlaytestStepLinks();
