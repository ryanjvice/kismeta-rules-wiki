import enSections from './context-sections/en.json';
import ptBrSections from './context-sections/pt-br.json';

export type ContextSection = {
	title: string;
	html: string;
};

export type ContextSectionIndex = Record<string, Record<string, ContextSection>>;

const LOCALES: Record<string, ContextSectionIndex> = {
	en: enSections as ContextSectionIndex,
	'pt-br': ptBrSections as ContextSectionIndex,
};

export function getContextSectionIndex(locale: string): ContextSectionIndex {
	return LOCALES[locale === 'pt-br' ? 'pt-br' : 'en'] ?? LOCALES.en;
}

export function getContextSection(
	locale: string,
	pagePath: string,
	hash: string
): ContextSection | undefined {
	if (!pagePath || !hash) return undefined;
	return getContextSectionIndex(locale)[pagePath]?.[hash];
}
