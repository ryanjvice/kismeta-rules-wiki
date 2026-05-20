/**
 * Creates frontmatter-only pt-br stubs mirroring English docs (fallback body from English).
 * Run: node scripts/scaffold-pt-br.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DOCS = path.join(ROOT, 'src', 'content', 'docs');
const PT = path.join(DOCS, 'pt-br');

/** @type {Record<string, { title: string, description: string }>} */
const PT_META = {
	'learn/lore': {
		title: 'Lore: Alquimistas do Grande Ano',
		description: 'O pano de fundo mítico de Kismeta e a Grande Obra.',
	},
	'learn/game-overview': {
		title: 'Visão Geral do Jogo',
		description: 'Jogadores, tempo de jogo, Grande Ano, Grande Obra e vitória.',
	},
	'learn/components': {
		title: 'Componentes',
		description: 'Tudo o que vem na caixa.',
	},
	'learn/lore-epilogue': {
		title: 'Lore: Epílogo',
		description: 'O Véu se Agita — teaser de Kismeta: The Veiled Ascent.',
	},
	'play/setup': {
		title: 'Preparação',
		description: 'Preparar a mesa, modos de jogo, baralho Crucible e primeiro Guardião da Era.',
	},
	'play/round-at-a-glance': {
		title: 'Rodada em Resumo',
		description: 'Referência rápida por estação para consulta durante o jogo.',
	},
	'play/round-overview': {
		title: 'Visão Geral da Rodada',
		description: 'Primavera, Verão, Outono e Inverno em detalhes.',
	},
	'play/winning': {
		title: 'Vencendo o Jogo',
		description: 'Completar a Grande Obra no Altar de Kismeta.',
	},
	'reference/quick-reference': {
		title: 'Referência Rápida',
		description: 'Elementos, naipes, cores e reagentes em um relance.',
	},
	'reference/quick-tips': {
		title: 'Dicas Rápidas e Estratégia',
		description: 'Conselhos práticos para alquimistas novos e experientes.',
	},
	'reference/compendium/1-0-cosmic-ages': {
		title: 'ERAS CÓSMICAS',
		description: 'Compêndio — 1.0 ERAS CÓSMICAS',
	},
	'reference/compendium/1-1-aspects-alignment': {
		title: 'ASPECTOS E ALINHAMENTO',
		description: 'Compêndio — 1.1 ASPECTOS E ALINHAMENTO',
	},
	'reference/compendium/1-2-harvest': {
		title: 'COLHEITA',
		description: 'Compêndio — 1.2 COLHEITA',
	},
	'reference/compendium/1-3-common-cards': {
		title: 'CARTAS COMUNS',
		description: 'Compêndio — 1.3 CARTAS COMUNS',
	},
	'reference/compendium/1-4-crucible-cards': {
		title: 'CARTAS DO CRUCIBLE',
		description: 'Compêndio — 1.4 CARTAS DO CRUCIBLE',
	},
	'reference/compendium/1-5-cauldrons-molten-coal': {
		title: 'CALDEIRÕES DO CRUCIBLE E CARVÃO FUNDIDO',
		description: 'Compêndio — 1.5 CALDEIRÕES E CARVÃO FUNDIDO',
	},
	'reference/compendium/1-6-reagents': {
		title: 'REAGENTES',
		description: 'Compêndio — 1.6 REAGENTES',
	},
	'reference/compendium/1-7-astral-houses': {
		title: 'CASAS ASTRAIS',
		description: 'Compêndio — 1.7 CASAS ASTRAIS',
	},
	'reference/compendium/1-8-trades': {
		title: 'TROCAS',
		description: 'Compêndio — 1.8 TROCAS',
	},
	'reference/compendium/1-9-duels': {
		title: 'DUELOS',
		description: 'Compêndio — 1.9 DUELOS',
	},
	'reference/compendium/1-10-gambit': {
		title: 'GAMBITO',
		description: 'Compêndio — 1.10 GAMBITO',
	},
	'reference/compendium/1-11-crucible-philosophers-stone': {
		title: 'CRUCIBLE E PEDRA DO FILÓSOFO',
		description: 'Compêndio — 1.11 CRUCIBLE E PEDRA DO FILÓSOFO',
	},
	'reference/compendium/1-12-opposition': {
		title: 'OPOSIÇÃO',
		description: 'Compêndio — 1.12 OPOSIÇÃO',
	},
	'reference/compendium/1-13-offering-to-the-age': {
		title: 'OFERENDA À ERA',
		description: 'Compêndio — 1.13 OFERENDA À ERA',
	},
	'reference/compendium/1-14-fateful-wager': {
		title: 'APOSTA FATÍDICA',
		description: 'Compêndio — 1.14 APOSTA FATÍDICA',
	},
	glossary: {
		title: 'Glossário de Termos',
		description: 'Todos os termos do jogo em letras maiúsculas — definições rápidas com links para as regras completas.',
	},
};

/** @returns {string[]} */
function allSlugs() {
	/** @type {string[]} */
	const slugs = [];
	function walk(dir, base = '') {
		for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
			const rel = base ? `${base}/${ent.name}` : ent.name;
			const full = path.join(dir, ent.name);
			if (ent.isDirectory()) {
				if (ent.name === 'pt-br') continue;
				walk(full, rel);
			} else if (/\.(md|mdx)$/.test(ent.name) && ent.name !== 'index.mdx') {
				slugs.push(rel.replace(/\.(md|mdx)$/, ''));
			}
		}
	}
	walk(DOCS);
	return slugs;
}

function writeStub(slug, ext = 'md') {
	const meta = PT_META[slug];
	if (!meta) {
		console.warn('No PT meta for', slug);
		return;
	}
	const outPath = path.join(PT, `${slug}.${ext}`);
	fs.mkdirSync(path.dirname(outPath), { recursive: true });
	const body = `---\ntitle: ${JSON.stringify(meta.title)}\ndescription: ${JSON.stringify(meta.description)}\n---\n`;
	fs.writeFileSync(outPath, body, 'utf8');
}

function main() {
	for (const slug of allSlugs()) {
		const ext = slug === 'glossary' ? 'mdx' : 'md';
		writeStub(slug, ext);
	}
	console.log('Scaffolded pt-br stubs.');
}

main();
