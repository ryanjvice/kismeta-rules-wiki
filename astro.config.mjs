// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { VitePWA } from 'vite-plugin-pwa';

/** @param {string} label @param {string} ptBR */
function tr(label, ptBR) {
	return { label, translations: { 'pt-BR': ptBR } };
}

/** @param {string} label @param {string} ptBR @param {string} slug */
function link(label, ptBR, slug) {
	return { ...tr(label, ptBR), slug };
}

// https://astro.build/config
export default defineConfig({
	site: 'https://kismeta.goodmagik.com',
	integrations: [
		starlight({
			title: {
				en: 'Kismeta Rules',
				'pt-br': 'Regras de Kismeta',
			},
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
				'pt-br': {
					label: 'Português (Brasil)',
					lang: 'pt-BR',
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
					...tr('Learn', 'Aprender'),
					items: [
						link('Lore', 'Lore', 'learn/lore'),
						link('Game Overview', 'Visão Geral do Jogo', 'learn/game-overview'),
						link('Components', 'Componentes', 'learn/components'),
						link('Lore: Epilogue', 'Lore: Epílogo', 'learn/lore-epilogue'),
					],
				},
				{
					...tr('Play', 'Jogar'),
					items: [
						link('Setup', 'Preparação', 'play/setup'),
						link('Round at a Glance', 'Rodada em Resumo', 'play/round-at-a-glance'),
						link('Round Overview', 'Visão Geral da Rodada', 'play/round-overview'),
						link('Winning the Game', 'Vencendo o Jogo', 'play/winning'),
					],
				},
				{
					...tr('Reference', 'Referência'),
					items: [
						link('Quick Reference', 'Referência Rápida', 'reference/quick-reference'),
						link('Quick Tips', 'Dicas Rápidas', 'reference/quick-tips'),
						{
							...tr('Compendium', 'Compêndio'),
							collapsed: false,
							items: [
								link('1.0 Cosmic Ages', '1.0 Eras Cósmicas', 'reference/compendium/1-0-cosmic-ages'),
								link(
									'1.1 Aspects & Alignment',
									'1.1 Aspectos e Alinhamento',
									'reference/compendium/1-1-aspects-alignment'
								),
								link('1.2 Harvest', '1.2 Colheita', 'reference/compendium/1-2-harvest'),
								link('1.3 Common Cards', '1.3 Cartas Comuns', 'reference/compendium/1-3-common-cards'),
								link('1.4 Crucible Cards', '1.4 Cartas do Crucible', 'reference/compendium/1-4-crucible-cards'),
								link(
									'1.5 Cauldrons & Molten Coal',
									'1.5 Caldeirões e Carvão Fundido',
									'reference/compendium/1-5-cauldrons-molten-coal'
								),
								link('1.6 Reagents', '1.6 Reagentes', 'reference/compendium/1-6-reagents'),
								link('1.7 Astral Houses', '1.7 Casas Astrais', 'reference/compendium/1-7-astral-houses'),
								link('1.8 Trades', '1.8 Trocas', 'reference/compendium/1-8-trades'),
								link('1.9 Duels', '1.9 Duelos', 'reference/compendium/1-9-duels'),
								link('1.10 Gambit', '1.10 Gambito', 'reference/compendium/1-10-gambit'),
								link(
									'1.11 Crucible & Stone',
									'1.11 Crucible e Pedra',
									'reference/compendium/1-11-crucible-philosophers-stone'
								),
								link('1.12 Opposition', '1.12 Oposição', 'reference/compendium/1-12-opposition'),
								link(
									'1.13 Offering to the Age',
									'1.13 Oferenda à Era',
									'reference/compendium/1-13-offering-to-the-age'
								),
								link('1.14 Fateful Wager', '1.14 Aposta Fatídica', 'reference/compendium/1-14-fateful-wager'),
							],
						},
					],
				},
				{
					...tr('Glossary', 'Glossário'),
					items: [link('All Terms', 'Todos os Termos', 'glossary')],
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
