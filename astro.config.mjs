// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { VitePWA } from 'vite-plugin-pwa';
import rehypeWrapTables from './src/integrations/rehype-wrap-tables.mjs';

/** @param {string} label @param {string} slug @param {Record<string,string>} [translations] */
function link(label, slug, translations) {
	return translations ? { label, slug, translations } : { label, slug };
}

// https://astro.build/config
export default defineConfig({
	site: 'https://kismeta.goodmagik.com',
	markdown: {
		rehypePlugins: [rehypeWrapTables],
	},
	integrations: [
		starlight({
			title: 'Kismeta Rules',
			description:
				'Official rules reference for Kismeta: Alchemists of the Great Year — a GOODMAGIK game.',
			logo: {
				src: './src/assets/logo.svg',
				alt: 'Kismeta',
				replacesTitle: false,
			},
			favicon: '/favicon.svg',
			customCss: ['./src/styles/custom.css'],
			components: {
				Header: './src/components/Header.astro',
				PageSidebar: './src/components/PageSidebar.astro',
				Hero: './src/components/Hero.astro',
			},
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'English',
					lang: 'en',
				},
			},
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://fonts.googleapis.com',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://fonts.gstatic.com',
						crossorigin: true,
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=Amarante&family=Germania+One&display=swap',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'theme-color',
						content: '#1a0f2e',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'manifest',
						href: '/manifest.webmanifest',
					},
				},
				{
					tag: 'script',
					attrs: {
						src: '/registerSW.js',
						type: 'module',
					},
				},
			],
			sidebar: [
				{
					label: 'Learn',
					items: [
						link('Lore', 'learn/lore'),
						link('Game Overview', 'learn/game-overview'),
						link('Components', 'learn/components'),
						link('Lore: Epilogue', 'learn/lore-epilogue'),
					],
				},
				{
					label: 'Play',
					items: [
						link('Guided Play', 'play/guided'),
						link('Setup', 'play/setup'),
						link('Round at a Glance', 'play/round-at-a-glance'),
						link('Round Overview', 'play/round-overview'),
						link('Winning the Game', 'play/winning'),
					],
				},
				{
					label: 'Reference',
					items: [
						link('Quick Reference', 'reference/quick-reference'),
						link('Quick Tips', 'reference/quick-tips'),
						{
							label: 'Compendium',
							collapsed: false,
							items: [
								link('1.0 Cosmic Ages', 'reference/compendium/1-0-cosmic-ages'),
								link('1.1 Aspects & Alignment', 'reference/compendium/1-1-aspects-alignment'),
								link('1.2 Harvest', 'reference/compendium/1-2-harvest'),
								link('1.3 Kismeta Cards', 'reference/compendium/1-3-common-cards'),
								link('1.4 Crucible Cards', 'reference/compendium/1-4-crucible-cards'),
								link('1.5 Cauldrons & Molten Coal', 'reference/compendium/1-5-cauldrons-molten-coal'),
								link('1.6 Reagents', 'reference/compendium/1-6-reagents'),
								link('1.7 Astral Houses', 'reference/compendium/1-7-astral-houses'),
								link('1.8 Trades', 'reference/compendium/1-8-trades'),
								link('1.9 Duels', 'reference/compendium/1-9-duels'),
								link('1.10 Gambit', 'reference/compendium/1-10-gambit'),
								link('1.11 Crucible & Stone', 'reference/compendium/1-11-crucible-philosophers-stone'),
								link('1.12 Opposition', 'reference/compendium/1-12-opposition'),
								link('1.13 Offering to the Age', 'reference/compendium/1-13-offering-to-the-age'),
								link('1.14 Fateful Wager', 'reference/compendium/1-14-fateful-wager'),
							],
						},
					],
				},
				{
					label: 'Glossary',
					items: [link('All Terms', 'glossary')],
				},
			],
		}),
	],
	vite: {
		plugins: [
			VitePWA({
				registerType: 'autoUpdate',
				injectRegister: false,
				includeAssets: ['favicon.svg', 'brand/**/*'],
				manifest: {
					name: 'Kismeta Rules',
					short_name: 'Kismeta',
					description:
						'Rules reference for Kismeta: Alchemists of the Great Year',
					theme_color: '#1a0f2e',
					background_color: '#0d0818',
					display: 'standalone',
					start_url: '/',
					icons: [
						{
							src: '/favicon.svg',
							sizes: 'any',
							type: 'image/svg+xml',
							purpose: 'any maskable',
						},
					],
				},
				workbox: {
					globPatterns: ['**/*.{js,css,html,svg,png,webp,woff2,ttf,json}'],
					maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
				},
				devOptions: {
					enabled: true,
				},
			}),
		],
	},
});
