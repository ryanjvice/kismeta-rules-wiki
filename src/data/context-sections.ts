import enSections from './context-sections/en.json';

export type ContextSection = {
	title: string;
	html: string;
};

export type ContextSectionIndex = Record<string, Record<string, ContextSection>>;

const EN_SECTIONS = enSections as ContextSectionIndex;

export function getContextSectionIndex(_locale?: string): ContextSectionIndex {
	return EN_SECTIONS;
}

export function getContextSection(
	locale: string,
	pagePath: string,
	hash: string
): ContextSection | undefined {
	if (!pagePath || !hash) return undefined;
	return getContextSectionIndex(locale)[pagePath]?.[hash];
}
