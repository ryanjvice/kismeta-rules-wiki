import builds from './crucible-deck-builds.json';

export type CrucibleGameMode = 'quickplay' | 'standard' | 'magnus';
export type PlayerCount = 2 | 3 | 4;
export type CardGroup = 'A' | 'B' | 'C' | 'D';
export type BuildType = 'curated' | 'random';
export type CrucibleLocale = 'en' | 'pt-br';

export type GroupCounts = Record<CardGroup, number>;

export type CuratedBuild = {
	total: number;
	groups: GroupCounts;
};

export const CARD_GROUPS: CardGroup[] = ['A', 'B', 'C', 'D'];
export const PLAYER_COUNTS: PlayerCount[] = [2, 3, 4];
export const GAME_MODES: CrucibleGameMode[] = ['quickplay', 'standard', 'magnus'];

export const CURATED_BUILDS = builds.curated as Record<
	CrucibleGameMode,
	Record<string, CuratedBuild>
>;

export const RANDOM_BUILD = builds.random as {
	deckSize: number;
	cardsPerPlayer: number;
};

export function getCuratedBuild(
	mode: CrucibleGameMode,
	playerCount: PlayerCount
): CuratedBuild {
	return CURATED_BUILDS[mode][String(playerCount)] as CuratedBuild;
}

export function getRandomBuildTotal(playerCount: PlayerCount): number {
	return RANDOM_BUILD.cardsPerPlayer * playerCount;
}

/** UI labels for static HTML render and interactive builder (not Starlight i18n). */
export const CRUCIBLE_LABELS: Record<
	CrucibleLocale,
	{
		curatedIntro: string;
		randomTitle: string;
		randomSteps: string[];
		tabs: Record<CrucibleGameMode, string>;
		players: (n: PlayerCount, total: number) => string;
		drawFrom: string;
		group: Record<CardGroup, string>;
		buildCurated: string;
		buildRandom: string;
		resultCurated: (groups: GroupCounts, total: number) => string;
		resultRandom: (total: number, playerCount: PlayerCount) => string;
		modeLabel: string;
		playersLabel: string;
		zeroCards: string;
	}
> = {
	en: {
		curatedIntro: 'Curated builds — select your game mode to see draws per player count.',
		randomTitle: 'Random build — Let the Fates decide',
		randomSteps: [
			'Shuffle all 22 Crucible Cards together.',
			'Blindly draw four cards for each player in the game.',
		],
		tabs: {
			quickplay: 'Quickplay / First Play',
			standard: 'Standard Game',
			magnus: 'Magnus Alchemist',
		},
		players: (n, total) => `${n} players (${total} cards)`,
		drawFrom: 'Draw from each group:',
		group: { A: 'A', B: 'B', C: 'C', D: 'D' },
		buildCurated: 'Curated build',
		buildRandom: 'Random build',
		resultCurated: (groups, total) => {
			const parts = CARD_GROUPS.filter((g) => groups[g] > 0).map(
				(g) => `${groups[g]} from ${g}`
			);
			const zero = CARD_GROUPS.filter((g) => groups[g] === 0);
			const zeroNote = zero.length ? ` (${zero.join(', ')}: 0)` : '';
			return `Draw ${parts.join(', ')} — ${total} cards total${zeroNote}.`;
		},
		resultRandom: (total, playerCount) =>
			`Shuffle all ${RANDOM_BUILD.deckSize} Crucible Cards. Draw ${total} cards (${RANDOM_BUILD.cardsPerPlayer} per player × ${playerCount}).`,
		modeLabel: 'Game mode',
		playersLabel: 'Players',
		zeroCards: '0',
	},
	'pt-br': {
		curatedIntro:
			'Montagens curadas — selecione o modo de jogo para ver as compras por número de jogadores.',
		randomTitle: 'Montagem aleatória — Deixe as Fates decidirem',
		randomSteps: [
			'Embaralhe todas as 22 Cartas do Crucible juntas.',
			'Compre às cegas quatro cartas para cada jogador.',
		],
		tabs: {
			quickplay: 'Quickplay / Primeira Partida',
			standard: 'Jogo Padrão',
			magnus: 'Magnus Alchemist',
		},
		players: (n, total) => `${n} jogadores (${total} cartas)`,
		drawFrom: 'Compre de cada grupo:',
		group: { A: 'A', B: 'B', C: 'C', D: 'D' },
		buildCurated: 'Montagem curada',
		buildRandom: 'Montagem aleatória',
		resultCurated: (groups, total) => {
			const parts = CARD_GROUPS.filter((g) => groups[g] > 0).map(
				(g) => `${groups[g]} do ${g}`
			);
			const zero = CARD_GROUPS.filter((g) => groups[g] === 0);
			const zeroNote = zero.length ? ` (${zero.join(', ')}: 0)` : '';
			return `Compre ${parts.join(', ')} — ${total} cartas no total${zeroNote}.`;
		},
		resultRandom: (total, playerCount) =>
			`Embaralhe todas as ${RANDOM_BUILD.deckSize} Cartas do Crucible. Compre ${total} cartas (${RANDOM_BUILD.cardsPerPlayer} por jogador × ${playerCount}).`,
		modeLabel: 'Modo de jogo',
		playersLabel: 'Jogadores',
		zeroCards: '0',
	},
};

export function getCrucibleLabels(locale: string | undefined) {
	return locale === 'pt-br' ? CRUCIBLE_LABELS['pt-br'] : CRUCIBLE_LABELS.en;
}
