/**
 * Guided Play step content (hand-maintained).
 * When setup/components rules change in Kismeta_GameGuide.md, update matching steps here.
 *
 * TODO (post-MVP): Spring 1–5, Summer, Autumn, Winter from round-overview.md
 */

export type GameMode = 'quickplay' | 'standard' | 'magnus';

export type GuidedStep = {
	id: string;
	title: string;
	body: string;
	checklist?: string[];
	learnMorePath?: string;
	learnMoreHash?: string;
	/** Setup III — body overrides per selected game mode */
	modeBody?: Partial<Record<GameMode, string>>;
	/** Embedded interactive UI on this step */
	embed?: 'crucible-deck';
};

export type GuidedLocale = 'en' | 'pt-br';

const GUIDED_STEPS: Record<GuidedLocale, GuidedStep[]> = {
	en: [
		{
			id: 'components',
			title: 'Components — In the Box',
			body: '<p>Unbox and confirm you have everything before setting the table. Group cards and dice so they are easy to reach during setup.</p>',
			checklist: [
				'Great Year Board',
				'134 Common Cards (blue) and 22 Crucible Cards (red)',
				'4 Crucible Codex cards (one per player)',
				'1 Cosmic Age Die (black) and 4 Zodiac Dice (player colors)',
				"Per player: Philosopher's Stone, Meeple, 4 Astral House tokens, Cauldron Catalyst, 4 Molten Coals",
				'96 Reagent tokens (24 per color) and 1 Agekeeper\'s Key',
			],
			learnMorePath: 'learn/components',
		},
		{
			id: 'setup-i',
			title: 'Setup I — Setting the Table',
			body: '<p>Prepare the shared play area in the center of the table.</p>',
			checklist: [
				'Place the Great Year Board in the center',
				'Sort cards into Common (blue) and Crucible (red) piles',
				'Shuffle the Common Deck face down beside the board',
				'Place the Crucible pile next to the board (you will build the deck in Setup IV)',
				"Set out the Agekeeper's Key, Cosmic Age Die, and Reagents sorted by color",
			],
			learnMorePath: 'play/setup',
			learnMoreHash: 'i-setting-the-table',
		},
		{
			id: 'setup-ii',
			title: 'Setup II — Becoming an Alchemist',
			body: '<p>Each player chooses a color (Red, Green, Blue, or White) and collects their personal gear.</p>',
			checklist: [
				'4 Astral House tokens (🏰)',
				'1 Crucible Codex (dual-sided)',
				'4 Molten Coals',
				'1 Meeple',
				"1 Philosopher's Stone on START in your Mantle Ring section",
				'1 Zodiac Die matching your color',
			],
			learnMorePath: 'play/setup',
			learnMoreHash: 'ii-becoming-an-alchemist',
		},
		{
			id: 'setup-iii',
			title: 'Setup III — Your Game Mode',
			body: '<p>You chose a game mode at the start of guided play. Confirm these rules apply to your table.</p>',
			modeBody: {
				quickplay:
					'<p><strong>Quickplay / First Play</strong> — recommended for first playthroughs.</p><ul><li>Use the <strong>Quickplay</strong> Crucible deck build.</li><li>Astral Houses: pay <strong>1</strong> Common Card matching your current Sign\'s Planet.</li><li>Cauldron thresholds: each Molten Coal in any Cauldron reduces refinement cost for <strong>all</strong> Reagents by 5 RP (base threshold 25 RP).</li></ul>',
				standard:
					'<p><strong>Standard Game</strong> — full rules once you know the flow.</p><ul><li>Play as written in the guide; ignore ⚙️ Game Mode Modifiers.</li><li>Use the <strong>Standard</strong> Crucible deck build.</li></ul>',
				magnus:
					'<p><strong>Magnus Alchemist</strong> — mastery mode for returning players.</p><ul><li>All Standard rules apply; use the <strong>Magnus</strong> deck build.</li><li>Player Alignments affect Trades, Duels, Gambits, and Oppositions.</li><li>Misaligned trades are 2:1 in favor of the non-initiating player; Misaligned challengers gain +1 on Duels, Gambits, and Oppositions.</li></ul>',
			},
			learnMorePath: 'play/setup',
			learnMoreHash: 'iii-select-a-game-mode',
		},
		{
			id: 'setup-iv',
			title: 'Setup IV — Build the Crucible Deck',
			body: '<p>Sort Crucible Cards into groups A–D (letter in the lower-left corner) and shuffle each group separately. Use the builder below for your game mode and player count.</p>',
			embed: 'crucible-deck',
			checklist: [
				'Sort Crucible Cards into groups A, B, C, and D',
				'Shuffle each group separately',
				'Draw the counts shown in the builder (curated or random)',
				'Shuffle drawn cards into the Crucible Deck beside the board',
				'Return unused Crucible Cards to the box',
			],
			learnMorePath: 'play/setup',
			learnMoreHash: 'iv-build-the-crucible-deck',
		},
		{
			id: 'setup-v',
			title: 'Setup V — Selecting the First Agekeeper',
			body: '<p>The Agekeeper sets the Cosmic Age, deals the Harvest, oversees Oppositions in Autumn, and passes the Key each round.</p>',
			checklist: [
				'Everyone rolls their Zodiac Die — highest becomes first Agekeeper (reroll ties)',
				'First Agekeeper takes the Agekeeper\'s Key',
				'Key passes clockwise at the end of each round',
			],
			learnMorePath: 'play/setup',
			learnMoreHash: 'v-selecting-the-first-agekeeper',
		},
		{
			id: 'setup-vi',
			title: 'Setup VI — Dealing Crucible Cards',
			body: '<p>The first Agekeeper finishes game prep. When this step is done, the first Cosmic Age begins.</p>',
			checklist: [
				'Shuffle the Crucible Deck; tap twice to cleanse',
				'Deal four Crucible Cards face down to each player',
				'Each player places four cards in a row along their board edge',
				'Place one Molten Coal on each Crucible Card (cards are Dormant)',
				'Agekeeper deals one face-up Common Card to each Spread (redeal if Major Arcana)',
			],
			learnMorePath: 'play/setup',
			learnMoreHash: 'vi-dealing-crucible-cards',
		},
		{
			id: 'complete',
			title: "You're Ready to Play",
			body: '<p>Setup is complete. The first Cosmic Age begins with <strong>Phase 1: Spring</strong>.</p><p>Round-by-round guided steps are coming soon. For now, keep <strong>Round at a Glance</strong> open during play for a quick seasonal reference.</p>',
			learnMorePath: 'play/round-at-a-glance',
		},
	],
	'pt-br': [
		{
			id: 'components',
			title: 'Componentes — Na Caixa',
			body: '<p>Desembale e confira se tem tudo antes de preparar a mesa. Separe cartas e dados para facilitar a preparação.</p>',
			checklist: [
				'Tabuleiro do Grande Ano',
				'134 Cartas Comuns (azul) e 22 Cartas do Crucible (vermelho)',
				'4 Cartas Codex do Crucible (uma por jogador)',
				'1 Dado da Era Cósmica (preto) e 4 Dados do Zodíaco (cores dos jogadores)',
				'Por jogador: Pedra do Filósofo, Meeple, 4 fichas de Casa Astral, Catalisador do Caldeirão, 4 Carvões Fundidos',
				'96 fichas de Reagente (24 por cor) e 1 Chave do Guardião da Era',
			],
			learnMorePath: 'learn/components',
		},
		{
			id: 'setup-i',
			title: 'Preparação I — Preparando a Mesa',
			body: '<p>Prepare a área de jogo compartilhada no centro da mesa.</p>',
			checklist: [
				'Coloque o Tabuleiro do Grande Ano no centro',
				'Separe as cartas em Comuns (azul) e Crucible (vermelho)',
				'Embaralhe o baralho Comum virado para baixo ao lado do tabuleiro',
				'Deixe o monte do Crucible ao lado do tabuleiro (o baralho será montado na Preparação IV)',
				'Deixe à mão a Chave do Guardião da Era, o Dado da Era Cósmica e os Reagentes por cor',
			],
			learnMorePath: 'play/setup',
			learnMoreHash: 'i-preparando-a-mesa',
		},
		{
			id: 'setup-ii',
			title: 'Preparação II — Tornando-se um Alquimista',
			body: '<p>Cada jogador escolhe uma cor (Vermelho, Verde, Azul ou Branco) e pega seu equipamento.</p>',
			checklist: [
				'4 fichas de Casa Astral (🏰)',
				'1 Codex do Crucible (frente e verso)',
				'4 Carvões Fundidos',
				'1 Meeple',
				'1 Pedra do Filósofo no INÍCIO do seu setor do Anel do Manto',
				'1 Dado do Zodíaco da sua cor',
			],
			learnMorePath: 'play/setup',
			learnMoreHash: 'ii-tornando-se-um-alquimista',
		},
		{
			id: 'setup-iii',
			title: 'Preparação III — Seu Modo de Jogo',
			body: '<p>Você escolheu um modo no início do Jogo Guiado. Confirme que estas regras valem para sua mesa.</p>',
			modeBody: {
				quickplay:
					'<p><strong>Quickplay / Primeira Partida</strong> — recomendado para a primeira vez.</p><ul><li>Use o baralho do Crucible <strong>Quickplay</strong>.</li><li>Casas Astrais: pague <strong>1</strong> Carta Comum com Planeta do Signo atual.</li><li>Limiares dos caldeirões: cada Carvão Fundido em qualquer caldeirão reduz o custo de refinamento de <strong>todos</strong> os Reagentes em 5 PR (limiar base 25 PR).</li></ul>',
				standard:
					'<p><strong>Jogo Padrão</strong> — regras completas quando já conhece o fluxo.</p><ul><li>Jogue como no guia; ignore modificadores ⚙️.</li><li>Use o baralho <strong>Padrão</strong> do Crucible.</li></ul>',
				magnus:
					'<p><strong>Magnus Alchemist</strong> — modo de maestria para quem já jogou.</p><ul><li>Regras Padrão + baralho <strong>Magnus</strong>.</li><li>Alinhamentos entre jogadores afetam Trocas, Duelos, Gambitos e Oposições.</li><li>Trocas desalinhadas 2:1 a favor de quem não iniciou; desafiantes desalinhados ganham +1 em Duelos, Gambitos e Oposições.</li></ul>',
			},
			learnMorePath: 'play/setup',
			learnMoreHash: 'iii-selecione-um-modo-de-jogo',
		},
		{
			id: 'setup-iv',
			title: 'Preparação IV — Montar o Baralho do Crucible',
			body: '<p>Separe as Cartas do Crucible nos grupos A–D (letra no canto inferior esquerdo) e embaralhe cada grupo. Use o assistente abaixo para o modo e número de jogadores.</p>',
			embed: 'crucible-deck',
			checklist: [
				'Separe as Cartas do Crucible nos grupos A, B, C e D',
				'Embaralhe cada grupo separadamente',
				'Compre as quantidades indicadas no assistente (curada ou aleatória)',
				'Embaralhe as cartas sorteadas no Baralho do Crucible ao lado do tabuleiro',
				'Devolva ao estojo as Cartas do Crucible não usadas',
			],
			learnMorePath: 'play/setup',
			learnMoreHash: 'iv-montar-o-baralho-do-crucible',
		},
		{
			id: 'setup-v',
			title: 'Preparação V — Escolhendo o Primeiro Guardião da Era',
			body: '<p>O Guardião da Era define a Era Cósmica, distribui a Colheita, conduz Oposições no Outono e passa a Chave a cada rodada.</p>',
			checklist: [
				'Todos rolam o Dado do Zodíaco — o maior vira o primeiro Guardião (re-role empates)',
				'O primeiro Guardião pega a Chave do Guardião da Era',
				'A Chave passa no sentido horário ao fim de cada rodada',
			],
			learnMorePath: 'play/setup',
			learnMoreHash: 'v-escolhendo-o-primeiro-guardião-da-era',
		},
		{
			id: 'setup-vi',
			title: 'Preparação VI — Distribuindo Cartas do Crucible',
			body: '<p>O primeiro Guardião da Era finaliza a preparação. Ao terminar, a primeira Era Cósmica começa.</p>',
			checklist: [
				'Embaralhe o Baralho do Crucible; bata duas vezes para purificar',
				'Distribua quatro Cartas do Crucible viradas para baixo a cada jogador',
				'Cada jogador coloca as quatro cartas em fileira na sua borda do tabuleiro',
				'Coloque um Carvão Fundido em cada Carta do Crucible (cartas Dormentes)',
				'O Guardião distribui uma Carta Comum virada para cima na Mão Aberta de cada um (redistribua se Arcano Maior)',
			],
			learnMorePath: 'play/setup',
			learnMoreHash: 'vi-distribuindo-cartas-do-crucible',
		},
		{
			id: 'complete',
			title: 'Pronto para Jogar',
			body: '<p>A preparação está completa. A primeira Era Cósmica começa com a <strong>Fase 1: Primavera</strong>.</p><p>Passos guiados rodada a rodada em breve. Por enquanto, mantenha <strong>Rodada em Resumo</strong> aberto durante o jogo.</p>',
			learnMorePath: 'play/round-at-a-glance',
		},
	],
};

export function getGuidedSteps(locale: string | undefined): GuidedStep[] {
	const key: GuidedLocale = locale === 'pt-br' ? 'pt-br' : 'en';
	return GUIDED_STEPS[key];
}

/** Steps shown in the stepper (excludes the completion screen). */
export const GUIDED_CONTENT_STEP_COUNT = GUIDED_STEPS.en.length - 1;

export const GAME_MODE_STORAGE_KEY = 'kismeta-game-modes';
export const GUIDED_PROGRESS_KEY = 'kismeta-guided-progress';
export const GUIDED_PROGRESS_VERSION = 1;

export function gameModeToStorage(mode: GameMode): { quickplay: boolean; magnus: boolean } {
	switch (mode) {
		case 'quickplay':
			return { quickplay: true, magnus: false };
		case 'magnus':
			return { quickplay: false, magnus: true };
		default:
			return { quickplay: false, magnus: false };
	}
}
