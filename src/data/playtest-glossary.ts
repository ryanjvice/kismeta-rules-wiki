import glossaryEn from './glossary.json';
import { AGY_WIKI_PATH } from './wiki-base';

export type GlossaryEntry = {
	term: string;
	definition: string;
};

export type GlossaryLetterGroup = {
	letter: string;
	entries: GlossaryEntry[];
};

/** Slug for glossary anchors — matches GlossaryList.astro. */
export function slugForTerm(term: string): string {
	return term.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export function letterForTerm(term: string): string {
	const first = term.trim().charAt(0).toUpperCase();
	return first >= 'A' && first <= 'Z' ? first : '#';
}

export function wikiGlossaryUrl(slug: string): string {
	return `${AGY_WIKI_PATH}glossary/#${slug}`;
}

export function definitionHtml(definition: string): string {
	const escaped = definition
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
	return `<p>${escaped}</p>`;
}

export function groupGlossaryByLetter(entries: GlossaryEntry[]): GlossaryLetterGroup[] {
	const buckets = new Map<string, GlossaryEntry[]>();

	for (const entry of entries) {
		const letter = letterForTerm(entry.term);
		const group = buckets.get(letter) ?? [];
		group.push(entry);
		buckets.set(letter, group);
	}

	const letters = [...buckets.keys()].sort((a, b) => {
		if (a === '#') return 1;
		if (b === '#') return -1;
		return a.localeCompare(b);
	});

	return letters.map((letter) => ({
		letter,
		entries: buckets.get(letter) ?? [],
	}));
}

export const agyGlossaryEntries = glossaryEn as GlossaryEntry[];

export const agyGlossaryByLetter = groupGlossaryByLetter(agyGlossaryEntries);
