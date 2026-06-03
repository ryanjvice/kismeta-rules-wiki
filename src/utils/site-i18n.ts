import en from "../content/i18n/en.json";

export type SiteI18nKey = keyof typeof en;

/** Translate site/marketing UI strings outside Starlight routes. */
export function siteT(key: SiteI18nKey): string {
	return en[key] ?? key;
}
