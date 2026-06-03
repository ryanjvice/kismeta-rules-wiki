/** Starlight slug prefix for the AGY rules wiki. */
export const AGY_WIKI_BASE = "games/alchemists-of-the-great-year";

/** Build a Starlight doc slug under the AGY wiki. */
export function wikiSlug(slug: string): string {
	return `${AGY_WIKI_BASE}/${slug}`;
}

/** URL pathname prefix (with trailing slash) for AGY wiki routes. */
export const AGY_WIKI_PATH = `/${AGY_WIKI_BASE}/`;

/** Starlight slug prefix for the TVA rules wiki. */
export const TVA_WIKI_BASE = "games/the-veiled-ascent";

/** Build a Starlight doc slug under the TVA wiki. */
export function tvaSlug(slug: string): string {
	return `${TVA_WIKI_BASE}/${slug}`;
}

/** URL pathname prefix (with trailing slash) for TVA wiki routes. */
export const TVA_WIKI_PATH = `/${TVA_WIKI_BASE}/`;
