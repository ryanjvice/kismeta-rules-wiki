import {
	definitionHtml,
	slugForTerm,
	wikiGlossaryUrl,
	type GlossaryEntry,
} from '../data/playtest-glossary';
import type { PlaytestDetailPayload } from './playtest-detail';

function normalizeQuery(value: string): string {
	return value.trim().toLowerCase();
}

function entryMatches(entry: GlossaryEntry, query: string): boolean {
	if (!query) return true;
	const haystack = `${entry.term} ${entry.definition}`.toLowerCase();
	return haystack.includes(query);
}

function initPlaytestGlossary(root: HTMLElement) {
	if (root.dataset.bound === 'true') return;
	root.dataset.bound = 'true';

	const form = root.querySelector<HTMLFormElement>('[data-playtest-glossary-form]')!;
	const input = root.querySelector<HTMLInputElement>('[data-playtest-glossary-input]')!;
	const noResults = root.querySelector<HTMLElement>('[data-playtest-glossary-no-results]')!;
	const letterSections = root.querySelectorAll<HTMLElement>('[data-playtest-glossary-letter]');
	const termButtons = root.querySelectorAll<HTMLButtonElement>('[data-playtest-glossary-term]');

	const applyFilter = () => {
		const query = normalizeQuery(input.value);
		let visibleCount = 0;

		termButtons.forEach((button) => {
			const term = button.dataset.term ?? '';
			const definition = button.dataset.definition ?? '';
			const matches = entryMatches({ term, definition }, query);
			button.hidden = !matches;
			button.closest<HTMLElement>('[data-playtest-glossary-term-row]')!.hidden = !matches;
			if (matches) visibleCount += 1;
		});

		letterSections.forEach((section) => {
			const visibleTerms = section.querySelectorAll<HTMLElement>(
				'[data-playtest-glossary-term-row]:not([hidden])'
			);
			section.hidden = visibleTerms.length === 0;
		});

		if (noResults) {
			noResults.hidden = visibleCount > 0;
		}
	};

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		applyFilter();
	});

	termButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const term = button.dataset.term ?? '';
			const definition = button.dataset.definition ?? '';
			const slug = button.dataset.termSlug ?? slugForTerm(term);
			if (!term || !definition) return;

			button.dispatchEvent(
				new CustomEvent<PlaytestDetailPayload>('kismeta:playtest-detail', {
					detail: {
						title: term,
						html: definitionHtml(definition),
						openFullUrl: wikiGlossaryUrl(slug),
					},
					bubbles: true,
				})
			);
		});
	});

	applyFilter();
}

export function initAllPlaytestGlossaries() {
	document
		.querySelectorAll<HTMLElement>('[data-playtest-glossary]')
		.forEach(initPlaytestGlossary);
}

document.addEventListener('astro:page-load', initAllPlaytestGlossaries);
initAllPlaytestGlossaries();
