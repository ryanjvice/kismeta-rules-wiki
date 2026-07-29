import type { ContextDetail } from './context-panel';

function dispatchPlaytestRule(button: HTMLElement) {
	const path = button.dataset.rulesPath ?? '';
	const hash = button.dataset.rulesHash ?? '';
	const title = button.dataset.rulesTitle;
	const sectionsRaw = button.dataset.rulesSections;
	const pageScope = button.dataset.rulesScope === 'page';

	if (!path) return;
	if (!pageScope && !sectionsRaw && !hash) return;

	const detail: ContextDetail = { path };
	if (title) detail.title = title;
	if (pageScope) {
		detail.pageScope = true;
	} else if (sectionsRaw) {
		detail.sectionIds = sectionsRaw
			.split(',')
			.map((id) => id.trim())
			.filter(Boolean);
		if (detail.sectionIds.length === 0) return;
	} else {
		detail.hash = hash;
	}

	button.dispatchEvent(
		new CustomEvent<ContextDetail>('kismeta:context', {
			detail,
			bubbles: true,
		})
	);
}

function initPlaytestStepLinks(root: HTMLElement) {
	if (root.dataset.bound === 'true') return;
	root.dataset.bound = 'true';

	root.querySelectorAll<HTMLElement>('[data-playtest-rule]').forEach((button) => {
		button.addEventListener('click', () => dispatchPlaytestRule(button));
	});
}

function initPlaytestGuidedRuleDelegation(root: HTMLElement) {
	if (root.dataset.rulesBound === 'true') return;
	root.dataset.rulesBound = 'true';

	root.addEventListener('click', (event) => {
		const button = (event.target as HTMLElement).closest<HTMLElement>('[data-playtest-rule]');
		if (!button || !root.contains(button)) return;
		event.preventDefault();
		dispatchPlaytestRule(button);
	});
}

export function initAllPlaytestStepLinks() {
	document
		.querySelectorAll<HTMLElement>('[data-playtest-round-overview]')
		.forEach(initPlaytestStepLinks);
	document
		.querySelectorAll<HTMLElement>('[data-playtest-guided]')
		.forEach(initPlaytestGuidedRuleDelegation);
}

document.addEventListener('astro:page-load', initAllPlaytestStepLinks);
initAllPlaytestStepLinks();
