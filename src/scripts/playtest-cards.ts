import type { PlaytestCardTabId } from '../data/playtest-cards';
import type { PlaytestDetailPayload } from './playtest-detail';

type CardIndexEntry = {
	label: string;
	detailHtml: string;
	openFullUrl: string;
};

type CardIndex = Record<string, CardIndexEntry>;

function normalizeQuery(value: string): string {
	return value.trim().toLowerCase();
}

function labelMatches(label: string, query: string): boolean {
	if (!query) return true;
	return label.toLowerCase().includes(query);
}

function initPlaytestCards(root: HTMLElement) {
	if (root.dataset.bound === 'true') return;
	root.dataset.bound = 'true';

	const cardIndex = JSON.parse(root.dataset.cardIndex || '{}') as CardIndex;
	const form = root.querySelector<HTMLFormElement>('[data-playtest-cards-form]')!;
	const input = root.querySelector<HTMLInputElement>('[data-playtest-cards-input]')!;
	const tabs = root.querySelectorAll<HTMLButtonElement>('[data-playtest-cards-tab]');
	const panels = root.querySelectorAll<HTMLElement>('[data-playtest-cards-panel]');
	const cardButtons = root.querySelectorAll<HTMLButtonElement>('[data-playtest-card]');

	const tabIds = Array.from(tabs).map((tab) => tab.dataset.tabId as PlaytestCardTabId);

	const applyFilter = () => {
		const query = normalizeQuery(input.value);

		panels.forEach((panel) => {
			let panelVisible = 0;

			panel.querySelectorAll<HTMLElement>('[data-playtest-cards-item]').forEach((item) => {
				const cardId =
					item.querySelector<HTMLButtonElement>('[data-playtest-card]')?.dataset.cardId ?? '';
				const label = cardIndex[cardId]?.label ?? '';
				const matches = labelMatches(label, query);
				item.hidden = !matches;
				if (matches) panelVisible += 1;
			});

			panel.querySelectorAll<HTMLElement>('[data-playtest-cards-group]').forEach((group) => {
				const visibleItems = group.querySelectorAll<HTMLElement>(
					'[data-playtest-cards-item]:not([hidden])'
				);
				group.hidden = visibleItems.length === 0;
			});

			const noResults = panel.querySelector<HTMLElement>('[data-playtest-cards-no-results]');
			if (noResults) {
				noResults.hidden = !query || panelVisible > 0;
			}
		});
	};

	const activateTab = (tabId: PlaytestCardTabId, moveFocus = false) => {
		tabs.forEach((tab) => {
			const isActive = tab.dataset.tabId === tabId;
			tab.classList.toggle('playtest-cards__tab--active', isActive);
			tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
			tab.tabIndex = isActive ? 0 : -1;
		});

		panels.forEach((panel) => {
			panel.hidden = panel.dataset.tabId !== tabId;
		});

		if (moveFocus) {
			const activeTab = root.querySelector<HTMLButtonElement>(
				`[data-playtest-cards-tab][data-tab-id="${tabId}"]`
			);
			activeTab?.focus();
		}

		applyFilter();
	};

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		applyFilter();
	});

	input.addEventListener('input', () => {
		if (normalizeQuery(input.value) === '') {
			applyFilter();
		}
	});

	input.addEventListener('search', () => {
		if (normalizeQuery(input.value) === '') {
			applyFilter();
		}
	});

	tabs.forEach((tab) => {
		tab.addEventListener('click', () => {
			const tabId = tab.dataset.tabId as PlaytestCardTabId;
			if (tabId) activateTab(tabId);
		});

		tab.addEventListener('keydown', (event: KeyboardEvent) => {
			const currentIndex = tabIds.indexOf(tab.dataset.tabId as PlaytestCardTabId);
			if (currentIndex < 0) return;

			let nextIndex = currentIndex;
			if (event.key === 'ArrowRight') {
				nextIndex = (currentIndex + 1) % tabIds.length;
			} else if (event.key === 'ArrowLeft') {
				nextIndex = (currentIndex - 1 + tabIds.length) % tabIds.length;
			} else if (event.key === 'Home') {
				nextIndex = 0;
			} else if (event.key === 'End') {
				nextIndex = tabIds.length - 1;
			} else {
				return;
			}

			event.preventDefault();
			activateTab(tabIds[nextIndex], true);
		});
	});

	cardButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const cardId = button.dataset.cardId ?? '';
			const card = cardIndex[cardId];
			if (!card) return;

			button.dispatchEvent(
				new CustomEvent<PlaytestDetailPayload>('kismeta:playtest-detail', {
					detail: {
						title: card.label,
						html: card.detailHtml,
						openFullUrl: card.openFullUrl,
					},
					bubbles: true,
				})
			);
		});
	});

	applyFilter();
}

export function initAllPlaytestCards() {
	document.querySelectorAll<HTMLElement>('[data-playtest-cards]').forEach(initPlaytestCards);
}

document.addEventListener('astro:page-load', initAllPlaytestCards);
initAllPlaytestCards();
