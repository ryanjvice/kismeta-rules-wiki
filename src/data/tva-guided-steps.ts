/**
 * Guided Play step content for Kismeta: The Veiled Ascent (hand-maintained).
 * The three steps mirror the Gameplay Steps section of Kismeta_VeiledAscent_gameplayGuide.md.
 * Update this file if the gameplay guide changes.
 */

export type TvaGuidedStep = {
	id: string;
	title: string;
	subtitle?: string;
	body: string;
	checklist?: string[];
	learnMorePath?: string;
};

const TVA_GUIDED_STEPS: TvaGuidedStep[] = [
	{
		id: 'deal-the-veil',
		title: 'Step 1: Deal the Veil',
		subtitle: 'Dealer / AI',
		body: '<p>The Dealer (or AI) deals <strong>3 cards</strong> to form the Table\'s hand — the opposing side you must beat.</p>',
		checklist: [
			'Deal 1 card face-up',
			'Deal 2 cards face-down',
			'These cards stay hidden until Reveal & Resolve',
		],
		learnMorePath: 'play/gameplay',
	},
	{
		id: 'build-your-spread',
		title: 'Step 2: Build Your Spread',
		subtitle: 'Player',
		body: '<p>Draw <strong>4 cards</strong> from the deck and choose which to keep. Your final Spread is 3 cards total.</p>',
		checklist: [
			'Draw 1 card face-down (your hidden card)',
			'Draw 3 cards face-up',
			'Review your revealed cards',
			'Discard 1 face-up card',
			'Your Spread: 2 face-up + 1 face-down',
		],
		learnMorePath: 'play/gameplay',
	},
	{
		id: 'reveal-and-resolve',
		title: 'Step 3: Reveal & Resolve',
		body: '<p>Say aloud: <em>"The Veil is lifted."</em> Reveal all face-down cards and determine the round winner.</p>',
		checklist: [
			'Reveal all face-down cards (Table\'s and yours)',
			'Check your Spread for a 3-card pattern bonus',
			'Calculate each side\'s total (max 50 — going over is a loss)',
			'Apply pattern effects and determine the outcome',
			'Move tokens and adjust Corruption accordingly',
		],
		learnMorePath: 'reference/round-outcomes',
	},
];

export default TVA_GUIDED_STEPS;
