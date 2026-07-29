export type PlaytestRoundStep = {
	id: string;
	label: string;
	blurb: string;
	rulesPath: string;
	rulesHash: string;
	group?: string;
};

export type PlaytestRoundSeason = {
	id: string;
	icon: string;
	label: string;
	subtitle: string;
	summary: string;
	steps: PlaytestRoundStep[];
};

const RULES_PATH = 'play/round-overview';

/** Brief playtest round overview — aligned with current Full Game Rules. */
export const playtestRoundOverview: {
	intro: string;
	seasons: PlaytestRoundSeason[];
} = {
	intro:
		'Each Cosmic Age moves through four Seasons in order. Tap a step to read the full rules, then close to return here.',
	seasons: [
		{
			id: 'spring',
			icon: '🌸',
			label: 'Spring',
			subtitle: 'Set the Age, Deal the Cards & Build Your Tableau',
			summary:
				'Sets the Age, deals new cards, and fixes your Sign for the Age.',
			steps: [
				{
					id: 'set-the-age',
					label: 'Set the Age',
					blurb:
						'Agekeeper rolls the Cosmic Age Die, reads the Aspects aloud, and all players take the Gift of the Age.',
					rulesPath: RULES_PATH,
					rulesHash: '1️⃣-set-the-age',
				},
				{
					id: 'set-sign',
					label: 'Set Your Zodiac Sign',
					blurb:
						'Each player rolls their Zodiac Die and moves their Meeple to that Sign.',
					rulesPath: RULES_PATH,
					rulesHash: '2️⃣-set-your-zodiac-sign',
				},
				{
					id: 'deal-cards',
					label: 'Deal the Kismeta Cards',
					blurb: 'Agekeeper deals 3 cards face down to each player.',
					rulesPath: RULES_PATH,
					rulesHash: '3️⃣-deal-the-kismeta-cards',
				},
				{
					id: 'build-tableau',
					label: 'Build Your Tableau',
					blurb:
						'Arrange cards across your Spread, Hand, and Arcanum zones.',
					rulesPath: RULES_PATH,
					rulesHash: '4️⃣-build-your-tableau',
				},
				{
					id: 'card-lock',
					label: 'Card Lock',
					blurb:
						'Cards are locked between Hand and Spread until Winter.',
					rulesPath: RULES_PATH,
					rulesHash: '5-card-lock',
				},
			],
		},
		{
			id: 'summer',
			icon: '☀️',
			label: 'Summer',
			subtitle: 'Craft, Distill, Trade & Contest',
			summary:
				'Craft, trade, and act on rivals — take any actions in any order, then pass.',
			steps: [
				{
					id: 'craft-house',
					label: 'Craft Astral House',
					blurb:
						'Spend 3 Spread cards matching your Sign’s ruling Planet to build on your Sign.',
					rulesPath: RULES_PATH,
					rulesHash: '-craft-astral-house',
					group: 'Craft & Distill',
				},
				{
					id: 'upgrade-mansion',
					label: 'Upgrade to Mansion',
					blurb:
						'Spend 2 more Planet-matching Spread cards and place a Reagent marker beneath the House token.',
					rulesPath: RULES_PATH,
					rulesHash: '-upgrade-to-a-mansion',
					group: 'Craft & Distill',
				},
				{
					id: 'distill',
					label: 'Distill a Reagent',
					blurb:
						'Spend 5 Essence of one Element to take the Reagent of that Element.',
					rulesPath: RULES_PATH,
					rulesHash: '️-distill-a-reagent',
					group: 'Craft & Distill',
				},
				{
					id: 'trade',
					label: 'Trade',
					blurb:
						'Exchange Adept Cards, Astral Houses, Essence, Kismeta Cards, and Reagents freely.',
					rulesPath: RULES_PATH,
					rulesHash: '-trade',
					group: 'Contest Your Rivals',
				},
				{
					id: 'duel',
					label: 'Duel',
					blurb:
						'Roll the Zodiac Dice to steal a card from a rival’s Spread.',
					rulesPath: RULES_PATH,
					rulesHash: '-duel',
					group: 'Contest Your Rivals',
				},
				{
					id: 'extinguish-coal',
					label: 'Extinguish Coal',
					blurb:
						'Use a card effect to remove a rival’s Coal and lower their Heat.',
					rulesPath: RULES_PATH,
					rulesHash: '-extinguish-coal',
					group: 'Contest Your Rivals',
				},
				{
					id: 'siege',
					label: 'Siege the Forge',
					blurb:
						'Pay an Ante of Reagents equal to the Shield Reagents guarding a rival’s exposed Stone.',
					rulesPath: RULES_PATH,
					rulesHash: '️-siege-the-forge',
					group: 'Contest Your Rivals',
				},
			],
		},
		{
			id: 'autumn',
			icon: '🍂',
			label: 'Autumn',
			subtitle: 'Harvest, Fuel & Conduct the Great Work',
			summary:
				'Essence is paid out, Furnaces are fueled, and the Great Work moves forward.',
			steps: [
				{
					id: 'harvest',
					label: 'Harvest Elemental Essence',
					blurb:
						'Score Harvest Sources against the Aspects of the Age and take Essence.',
					rulesPath: RULES_PATH,
					rulesHash: '1️⃣-harvest-elemental-essence',
				},
				{
					id: 'fuel',
					label: 'Fuel Your Furnaces',
					blurb:
						'Craft Coal and place it in the Furnace matching your Sign’s Element.',
					rulesPath: RULES_PATH,
					rulesHash: '2️⃣-fuel-your-furnaces',
				},
				{
					id: 'fire',
					label: 'Fire the Stone',
					blurb:
						'Complete an Alchemical Formula and send your Stone into the Forge.',
					rulesPath: RULES_PATH,
					rulesHash: '3️⃣-fire-the-stone-',
					group: 'Conduct the Great Work',
				},
				{
					id: 'temper',
					label: 'Temper the Stone',
					blurb:
						'After a full Age in the Forge, advance your Stone to the next Mantle Ring space.',
					rulesPath: RULES_PATH,
					rulesHash: '4️⃣-temper-the-stone-',
					group: 'Conduct the Great Work',
				},
				{
					id: 'rekindle',
					label: 'Rekindle the Stone',
					blurb:
						'Pay 5 Essence, of any type, to return a Stone from Stasis to its previous Forge position.',
					rulesPath: RULES_PATH,
					rulesHash: '5️⃣-rekindle-the-stone-️',
					group: 'Conduct the Great Work',
				},
			],
		},
		{
			id: 'winter',
			icon: '⛰️',
			label: 'Winter',
			subtitle: 'Final Actions & Reset',
			summary:
				'Closes the book on the Age and resets the table for the next one.',
			steps: [
				{
					id: 'unlock',
					label: 'Card Unlock',
					blurb: 'Move cards freely between your Hand and Spread.',
					rulesPath: RULES_PATH,
					rulesHash: '1-card-unlock',
				},
				{
					id: 'wager',
					label: 'Fateful Wager',
					blurb:
						'Bet Cards and Reagents on the next Cosmic Age; double or lose your wager.',
					rulesPath: RULES_PATH,
					rulesHash: '2️⃣-fateful-wager-',
				},
				{
					id: 'limits',
					label: 'Enforce Card Limits',
					blurb: 'Spread 7 · Hand 5 · Arcanum 2 Adept cards.',
					rulesPath: RULES_PATH,
					rulesHash: '3️⃣-enforce-card-limits',
				},
				{
					id: 'transit',
					label: 'Transit the Age',
					blurb:
						'Clear the board, shuffle the discard pile, and pass the Key clockwise.',
					rulesPath: RULES_PATH,
					rulesHash: '4-transit-the-age',
				},
			],
		},
	],
};
