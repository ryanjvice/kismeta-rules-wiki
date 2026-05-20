import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { z } from 'astro/zod';

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	i18n: defineCollection({
		loader: i18nLoader(),
		schema: i18nSchema({
			extend: z.object({
				'tab.learn': z.string(),
				'tab.play': z.string(),
				'tab.reference': z.string(),
				'tab.glossary': z.string(),
				'gameMode.modifiers': z.string(),
				'gameMode.quickplay': z.string(),
				'gameMode.magnus': z.string(),
				'home.tagline': z.string(),
				'home.action.learn': z.string(),
				'home.action.round': z.string(),
				'home.sectionTitle': z.string(),
				'home.card.search.title': z.string(),
				'home.card.search.body': z.string(),
				'home.card.tabs.title': z.string(),
				'home.card.tabs.body': z.string(),
				'home.card.share.title': z.string(),
				'home.card.share.body': z.string(),
				'home.card.offline.title': z.string(),
				'home.card.offline.body': z.string(),
				'home.card.modes.title': z.string(),
				'home.card.modes.body': z.string(),
				'home.card.newPlayers.title': z.string(),
				'home.card.newPlayers.body': z.string(),
				'home.footer': z.string(),
				'glossary.intro': z.string(),
			}),
		}),
	}),
};
