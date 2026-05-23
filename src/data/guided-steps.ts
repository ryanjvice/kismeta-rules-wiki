/**
 * Guided Play step content (hand-maintained).
 * When setup/components rules change in Kismeta_GameGuide.md, update matching steps here.
 */

export type GameMode = 'quickplay' | 'standard' | 'magnus';

export type GuidedPhase = 'setup' | 'spring' | 'summer' | 'autumn' | 'winter';

export type GuidedEmbed =
	| 'crucible-deck'
	| 'harvest-order'
	| 'summer-flow'
	| 'autumn-flow'
	| 'winter-flow';

export type GuidedStep = {
	id: string;
	title: string;
	body: string;
	checklist?: string[];
	learnMorePath?: string;
	learnMoreHash?: string;
	phase?: GuidedPhase;
	/** Step index within phase (for progress label) */
	phaseStep?: number;
	/** Total steps in this phase */
	phaseTotal?: number;
	/** Setup III — body overrides per selected game mode */
	modeBody?: Partial<Record<GameMode, string>>;
	/** Embedded interactive UI on this step */
	embed?: GuidedEmbed;
};

export type GuidedLocale = 'en' | 'pt-br';

const GUIDED_STEPS: Record<GuidedLocale, GuidedStep[]> = {
	en: [
		{
			id: 'components',
			title: 'Components — In the Box',
			phase: 'setup',
			phaseStep: 1,
			phaseTotal: 7,
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
			phase: 'setup',
			phaseStep: 2,
			phaseTotal: 7,
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
			phase: 'setup',
			phaseStep: 3,
			phaseTotal: 7,
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
			phase: 'setup',
			phaseStep: 4,
			phaseTotal: 7,
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
			phase: 'setup',
			phaseStep: 5,
			phaseTotal: 7,
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
			phase: 'setup',
			phaseStep: 6,
			phaseTotal: 7,
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
			phase: 'setup',
			phaseStep: 7,
			phaseTotal: 7,
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
			id: 'round-intro',
			title: 'Your First Cosmic Age',
			body: '<p>Each round is one <strong>Cosmic Age</strong> with four seasons in order: Spring → Summer → Autumn → Winter. You will walk through your first age step by step.</p>',
			checklist: [
				'Spring: set the Age, Harvest, Commune, Card Lock',
				'Summer: craft and consort on your turns',
				'Autumn: Forge sequence (Stasis, Opposition, Temper, Fire)',
				'Winter: unlock, optional Offering/Wager, limits, reset',
			],
			learnMorePath: 'play/round-at-a-glance',
		},
		{
			id: 'spring-1',
			title: 'Spring — Set the Cosmic Age',
			phase: 'spring',
			phaseStep: 1,
			phaseTotal: 5,
			body: '<p>The Agekeeper rolls the Cosmic Age Die and announces the Sign, Planet, and Element for this round.</p>',
			checklist: [
				'Roll the 12-sided Cosmic Age Die',
				'Read the Sign and Aspects aloud',
				'Apply the Cosmic Effect for the entire round',
			],
			learnMorePath: 'play/round-overview',
			learnMoreHash: '1-set-the-cosmic-age',
		},
		{
			id: 'spring-2',
			title: 'Spring — Determine Your Sign',
			phase: 'spring',
			phaseStep: 2,
			phaseTotal: 5,
			body: '<p>Every player rolls their Zodiac Die and moves their Meeple to the rolled Sign.</p>',
			checklist: [
				'All players roll simultaneously',
				'Move Meeples to rolled Signs on the Zodiac Wheel',
			],
			learnMorePath: 'play/round-overview',
			learnMoreHash: '2-determine-your-sign',
		},
		{
			id: 'spring-3',
			title: 'Spring — Harvest',
			phase: 'spring',
			phaseStep: 3,
			phaseTotal: 5,
			body: '<p>The Agekeeper deals cards in a fixed order. Calculate all Bonus Cards before dealing any.</p>',
			embed: 'harvest-order',
			checklist: [
				'Base Harvest: 2 face-down Common Cards per player',
				"Agekeeper's Boon: +2 each if Agekeeper's Sign matches the Cosmic Age",
				'Each player calculates Bonus Cards from Alignment',
				'Deal Bonus Cards one at a time, face-down',
			],
			learnMorePath: 'play/round-overview',
			learnMoreHash: '3-harvest',
		},
		{
			id: 'spring-4',
			title: 'Spring — Commune',
			phase: 'spring',
			phaseStep: 4,
			phaseTotal: 5,
			body: '<p>Assign Harvested cards to your Spread (face-up) or Hand (face-down). Major Arcana from the Harvest go to your Arcanum.</p>',
			checklist: [
				'Build Spread, Hand, and Arcanum zones',
				'Plan Crucible activation and refinement goals',
			],
			learnMorePath: 'play/round-overview',
			learnMoreHash: '4-commune',
		},
		{
			id: 'spring-5',
			title: 'Spring — Card Lock',
			phase: 'spring',
			phaseStep: 5,
			phaseTotal: 5,
			body: '<p>After Commune, cards cannot move between Hand and Spread until Winter.</p>',
			checklist: ['Confirm card zones — they are locked until Winter'],
			learnMorePath: 'play/round-overview',
			learnMoreHash: '5-card-lock',
		},
		{
			id: 'summer',
			title: 'Phase 2: Summer',
			phase: 'summer',
			phaseStep: 1,
			phaseTotal: 1,
			body: '<p>Starting with the Agekeeper, each player takes turns. On your turn, take any Craft or Consort actions in any order, as often as you like.</p>',
			embed: 'summer-flow',
			learnMorePath: 'play/round-overview',
			learnMoreHash: 'phase-2-summer',
		},
		{
			id: 'autumn',
			title: 'Phase 3: Autumn',
			phase: 'autumn',
			phaseStep: 1,
			phaseTotal: 1,
			body: '<p>Autumn follows a fixed sequence. The Agekeeper oversees the Forge while each player acts in turn order.</p>',
			embed: 'autumn-flow',
			learnMorePath: 'play/round-overview',
			learnMoreHash: 'phase-3-autumn',
		},
		{
			id: 'winter',
			title: 'Phase 4: Winter',
			phase: 'winter',
			phaseStep: 1,
			phaseTotal: 1,
			body: '<p>Winter closes the Cosmic Age. Required steps must happen; Offering and Fateful Wager are optional.</p>',
			embed: 'winter-flow',
			learnMorePath: 'play/round-overview',
			learnMoreHash: 'phase-4-winter',
		},
		{
			id: 'round-end',
			title: 'End of the Round',
			body: '<p>The Agekeeper passes the Key clockwise. A new Cosmic Age begins with Spring unless someone has completed the Great Work.</p>',
			checklist: [
				'Shuffle the Common Deck (Winter reset)',
				'Pass the Agekeeper Key to the next player',
				'Start the next Cosmic Age with Spring, or check for a winner',
			],
			learnMorePath: 'play/winning',
		},
		{
			id: 'complete',
			title: "You're Ready to Keep Playing",
			body: '<p>You have walked through your first Cosmic Age. For the next round, repeat <strong>Spring → Summer → Autumn → Winter</strong>.</p><p>Keep <strong>Round at a Glance</strong> open at the table for a quick seasonal reference.</p>',
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
			phase: 'setup',
			phaseStep: 7,
			phaseTotal: 7,
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
			id: 'round-intro',
			title: 'Sua Primeira Era Cósmica',
			body: '<p>Cada rodada é uma <strong>Era Cósmica</strong> com quatro estações em ordem: Primavera → Verão → Outono → Inverno. Você percorrerá a primeira era passo a passo.</p>',
			checklist: [
				'Primavera: definir a Era, Colheita, Comunhão, Bloqueio',
				'Verão: criar e conviver nos seus turnos',
				'Outono: sequência da Forja (Estase, Oposição, Temperar, Forjar)',
				'Inverno: desbloqueio, Oferenda/Aposta opcionais, limites, reinício',
			],
			learnMorePath: 'play/round-at-a-glance',
		},
		{
			id: 'spring-1',
			title: 'Primavera — Definir a Era Cósmica',
			phase: 'spring',
			phaseStep: 1,
			phaseTotal: 5,
			body: '<p>O Guardião da Era rola o Dado da Era Cósmica e anuncia Signo, Planeta e Elemento desta rodada.</p>',
			checklist: [
				'Role o Dado da Era Cósmica de 12 lados',
				'Anuncie o Signo e os Aspectos em voz alta',
				'Aplique o Efeito Cósmico por toda a rodada',
			],
			learnMorePath: 'play/round-overview',
			learnMoreHash: '1-definir-a-era-cósmica',
		},
		{
			id: 'spring-2',
			title: 'Primavera — Determinar seu Signo',
			phase: 'spring',
			phaseStep: 2,
			phaseTotal: 5,
			body: '<p>Cada jogador rola o Dado do Zodíaco e move o Meeple para o Signo rolado.</p>',
			checklist: [
				'Todos rolam ao mesmo tempo',
				'Movam os Meeples para os Signos na Roda do Zodíaco',
			],
			learnMorePath: 'play/round-overview',
			learnMoreHash: '2-determinar-seu-signo',
		},
		{
			id: 'spring-3',
			title: 'Primavera — Colheita',
			phase: 'spring',
			phaseStep: 3,
			phaseTotal: 5,
			body: '<p>O Guardião distribui cartas nesta ordem fixa. Calcule todas as Cartas Bônus antes de distribuir.</p>',
			embed: 'harvest-order',
			checklist: [
				'Colheita Base: 2 Cartas Comuns viradas para baixo por jogador',
				'Bênção do Guardião: +2 se o Signo do Guardião coincidir com a Era',
				'Cada jogador calcula Cartas Bônus por Alinhamento',
				'Distribua Cartas Bônus uma por vez, viradas para baixo',
			],
			learnMorePath: 'play/round-overview',
			learnMoreHash: '3-colheita',
		},
		{
			id: 'spring-4',
			title: 'Primavera — Comunhão',
			phase: 'spring',
			phaseStep: 4,
			phaseTotal: 5,
			body: '<p>Coloque as cartas colhidas na Mão Aberta (viradas para cima) ou na Mão (viradas para baixo). Arcanos Maiores vão ao Arcanum.</p>',
			checklist: [
				'Monte Mão Aberta, Mão e Arcanum',
				'Planeje ativação do Crucible e refinamento',
			],
			learnMorePath: 'play/round-overview',
			learnMoreHash: '4-comunhão',
		},
		{
			id: 'spring-5',
			title: 'Primavera — Bloqueio de Cartas',
			phase: 'spring',
			phaseStep: 5,
			phaseTotal: 5,
			body: '<p>Após a Comunhão, as cartas não podem mover entre Mão e Mão Aberta até o Inverno.</p>',
			checklist: ['Confirme as zonas — bloqueadas até o Inverno'],
			learnMorePath: 'play/round-overview',
			learnMoreHash: '5-bloqueio-de-cartas',
		},
		{
			id: 'summer',
			title: 'Fase 2: Verão',
			phase: 'summer',
			phaseStep: 1,
			phaseTotal: 1,
			body: '<p>A partir do Guardião da Era, cada jogador tem turnos. No seu turno, faça ações de Criar ou Conviver em qualquer ordem, quantas vezes quiser.</p>',
			embed: 'summer-flow',
			learnMorePath: 'play/round-overview',
			learnMoreHash: 'phase-2-verão',
		},
		{
			id: 'autumn',
			title: 'Fase 3: Outono',
			phase: 'autumn',
			phaseStep: 1,
			phaseTotal: 1,
			body: '<p>O Outono segue sequência fixa. O Guardião supervisiona a Forja enquanto cada jogador age na ordem de turno.</p>',
			embed: 'autumn-flow',
			learnMorePath: 'play/round-overview',
			learnMoreHash: 'phase-3-outono',
		},
		{
			id: 'winter',
			title: 'Fase 4: Inverno',
			phase: 'winter',
			phaseStep: 1,
			phaseTotal: 1,
			body: '<p>O Inverno encerra a Era Cósmica. Passos obrigatórios devem ocorrer; Oferenda e Aposta do Destino são opcionais.</p>',
			embed: 'winter-flow',
			learnMorePath: 'play/round-overview',
			learnMoreHash: 'phase-4-inverno',
		},
		{
			id: 'round-end',
			title: 'Fim da Rodada',
			body: '<p>O Guardião passa a Chave no sentido horário. Uma nova Era começa na Primavera, a menos que alguém tenha completado a Grande Obra.</p>',
			checklist: [
				'Embaralhe o Baralho Comum (reinício do Inverno)',
				'Passe a Chave do Guardião da Era',
				'Inicie a próxima Era na Primavera ou verifique vitória',
			],
			learnMorePath: 'play/winning',
		},
		{
			id: 'complete',
			title: 'Pronto para Continuar Jogando',
			body: '<p>Você percorreu sua primeira Era Cósmica. Na próxima rodada, repita <strong>Primavera → Verão → Outono → Inverno</strong>.</p><p>Mantenha <strong>Rodada em Resumo</strong> aberto na mesa como referência rápida.</p>',
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
export const GUIDED_PROGRESS_VERSION = 2;

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
