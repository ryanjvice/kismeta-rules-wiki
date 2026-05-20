// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { VitePWA } from 'vite-plugin-pwa';

// https://astro.build/config
export default defineConfig({
	site: 'https://kismeta.goodmagik.com',
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
						{ label: 'Lore', slug: 'learn/lore' },
						{ label: 'Game Overview', slug: 'learn/game-overview' },
						{ label: 'Components', slug: 'learn/components' },
						{ label: 'Lore: Epilogue', slug: 'learn/lore-epilogue' },
					],
				},
				{
					label: 'Play',
					items: [
						{ label: 'Round at a Glance', slug: 'play/round-at-a-glance' },
						{ label: 'Setup', slug: 'play/setup' },
						{ label: 'Round Overview', slug: 'play/round-overview' },
						{ label: 'Winning the Game', slug: 'play/winning' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Quick Reference', slug: 'reference/quick-reference' },
						{ label: 'Quick Tips', slug: 'reference/quick-tips' },
						{
							label: 'Compendium',
							collapsed: false,
							items: [
								{ label: '1.0 Cosmic Ages', slug: 'reference/compendium/1-0-cosmic-ages' },
								{
									label: '1.1 Aspects & Alignment',
									slug: 'reference/compendium/1-1-aspects-alignment',
								},
								{ label: '1.2 Harvest', slug: 'reference/compendium/1-2-harvest' },
								{ label: '1.3 Common Cards', slug: 'reference/compendium/1-3-common-cards' },
								{ label: '1.4 Crucible Cards', slug: 'reference/compendium/1-4-crucible-cards' },
								{
									label: '1.5 Cauldrons & Molten Coal',
									slug: 'reference/compendium/1-5-cauldrons-molten-coal',
								},
								{ label: '1.6 Reagents', slug: 'reference/compendium/1-6-reagents' },
								{ label: '1.7 Astral Houses', slug: 'reference/compendium/1-7-astral-houses' },
								{ label: '1.8 Trades', slug: 'reference/compendium/1-8-trades' },
								{ label: '1.9 Duels', slug: 'reference/compendium/1-9-duels' },
								{ label: '1.10 Gambit', slug: 'reference/compendium/1-10-gambit' },
								{
									label: '1.11 Crucible & Stone',
									slug: 'reference/compendium/1-11-crucible-philosophers-stone',
								},
								{ label: '1.12 Opposition', slug: 'reference/compendium/1-12-opposition' },
								{
									label: '1.13 Offering to the Age',
									slug: 'reference/compendium/1-13-offering-to-the-age',
								},
								{ label: '1.14 Fateful Wager', slug: 'reference/compendium/1-14-fateful-wager' },
							],
						},
					],
				},
				{
					label: 'Glossary',
					items: [{ label: 'All Terms', slug: 'glossary' }],
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
