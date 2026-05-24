/** Maps Starlight locale id to content/data locale key (e.g. for flows, glossary). */
export function resolveContentLocale(currentLocale: string | undefined): string {
	if (!currentLocale || currentLocale === 'root') return 'en';
	return currentLocale;
}
