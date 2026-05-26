/**
 * Guided Play step content (hand-maintained).
 * When setup/components rules change in Kismeta_GameGuide.md, update matching steps here.
 */

export type GameMode = "quickplay" | "standard" | "magnus";

export type GuidedPhase = "setup" | "spring" | "summer" | "autumn" | "winter";

export type GuidedEmbed =
  | "crucible-deck"
  | "harvest-order"
  | "round-at-a-glance"
  | "summer-flow"
  | "autumn-flow"
  | "winter-flow";

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

const GUIDED_STEPS: GuidedStep[] = [
  {
    id: "components",
    title: "Components — In the Box",
    phase: "setup",
    phaseStep: 1,
    phaseTotal: 7,
    body: "<p>Unbox and confirm you have everything before setting the table. Group cards and dice so they are easy to reach during setup.</p>",
    checklist: [
      "Great Year Board",
      "134 Common Cards (blue) and 22 Crucible Cards (red)",
      "4 Crucible Codex cards (one per player)",
      "1 Cosmic Age Die (black) and 4 Zodiac Dice (player colors)",
      "Per player: Philosopher's Stone, Meeple, 4 Astral House tokens, Cauldron Catalyst, 4 Molten Coals",
      "96 Reagent tokens (24 per color) and 1 Agekeeper's Key",
    ],
    learnMorePath: "learn/components",
  },
  {
    id: "setup-i",
    title: "Setup I — Setting the Table",
    phase: "setup",
    phaseStep: 2,
    phaseTotal: 7,
    body: "<p>Prepare the shared play area in the center of the table.</p>",
    checklist: [
      "Place the Great Year Board in the center",
      "Sort cards into Common (blue) and Crucible (red) piles",
      "Shuffle the Common Deck face down beside the board",
      "Place the Crucible pile next to the board (you will build the deck in Setup IV)",
      "Set out the Agekeeper's Key, Cosmic Age Die, and Reagents sorted by color",
    ],
    learnMorePath: "play/setup",
    learnMoreHash: "i-set-the-table",
  },
  {
    id: "setup-ii",
    title: "Setup II — Becoming an Alchemist",
    phase: "setup",
    phaseStep: 3,
    phaseTotal: 7,
    body: "<p>Each player chooses a color (Red, Green, Blue, or White) and collects their personal gear.</p>",
    checklist: [
      "4 Astral House tokens (🏰)",
      "1 Cauldron Codex (dual-sided)",
      "4 Molten Coals",
      "1 Meeple",
      "1 Philosopher's Stone on START in your Mantle Ring section",
      "1 Zodiac Die matching your color",
    ],
    learnMorePath: "play/setup",
    learnMoreHash: "ii-become-an-alchemist",
  },
  {
    id: "setup-iii",
    title: "Setup III — Your Game Mode",
    phase: "setup",
    phaseStep: 4,
    phaseTotal: 7,
    body: "<p>You chose a game mode at the start of guided play. Confirm these rules apply to your table.</p>",
    modeBody: {
      quickplay:
        "<p><strong>Quickplay / First Play</strong> — recommended for first playthroughs.</p><ul><li>Use the <strong>Quickplay</strong> Crucible deck build.</li><li>Astral Houses: pay <strong>1</strong> Common Card matching your current Sign's Planet.</li><li>Cauldron thresholds: each Molten Coal in any Cauldron reduces the Crafting cost for <strong>all</strong> Reagents by 5 RP (base threshold 25 RP).</li></ul>",
      standard:
        "<p><strong>Standard Game</strong> — full rules once you know the flow.</p><ul><li>Play as written in the guide; ignore ⚙️ Game Mode Modifiers.</li><li>Use the <strong>Standard</strong> Crucible deck build.</li></ul>",
      magnus:
        "<p><strong>Magnus Alchemist</strong> — mastery mode for returning players.</p><ul><li>All Standard rules apply; use the <strong>Magnus</strong> deck build.</li><li>Player Alignments affect Trades, Duels, Gambits, and Oppositions.</li><li>Misaligned trades are 2:1 in favor of the non-initiating player; Misaligned challengers gain +1 on Duels, Gambits, and Oppositions.</li></ul>",
    },
    learnMorePath: "play/setup",
    learnMoreHash: "iii-select-a-game-mode",
  },
  {
    id: "setup-iv",
    title: "Setup IV — Build the Crucible Deck",
    phase: "setup",
    phaseStep: 5,
    phaseTotal: 7,
    body: "<p>Sort Crucible Cards into groups A–D (letter in the lower-left corner) and shuffle each group separately. Use the builder below for your game mode and player count.</p>",
    embed: "crucible-deck",
    checklist: [
      "Sort Crucible Cards into groups A, B, C, and D",
      "Shuffle each group separately",
      "Draw the counts shown in the builder (curated or random)",
      "Shuffle drawn cards into the Crucible Deck beside the board",
      "Return unused Crucible Cards to the box",
    ],
    learnMorePath: "play/setup",
    learnMoreHash: "iv-build-the-crucible-deck",
  },
  {
    id: "setup-v",
    title: "Setup V — Selecting the First Agekeeper",
    phase: "setup",
    phaseStep: 6,
    phaseTotal: 7,
    body: "<p>The Agekeeper sets the Cosmic Age, deals the Harvest, oversees Oppositions in Autumn, and passes the Key each round.</p>",
    checklist: [
      "Everyone rolls their Zodiac Die — highest becomes first Agekeeper (reroll ties)",
      "First Agekeeper takes the Agekeeper's Key",
      "Key passes clockwise at the end of each round",
    ],
    learnMorePath: "play/setup",
    learnMoreHash: "v-determine-the-first-agekeeper",
  },
  {
    id: "setup-vi",
    title: "Setup VI — Dealing Crucible Cards",
    phase: "setup",
    phaseStep: 7,
    phaseTotal: 7,
    body: "<p>The first Agekeeper finishes game prep. When this step is done, the first Cosmic Age begins.</p>",
    checklist: [
      "Shuffle the Crucible Deck; tap twice to cleanse",
      "Deal four Crucible Cards face down to each player",
      "Each player places four cards in a row along their board edge",
      "Place one Molten Coal on each Crucible Card (cards are Dormant)",
      "Agekeeper deals one face-up Common Card to each Spread (redeal if Major Arcana)",
    ],
    learnMorePath: "play/setup",
    learnMoreHash: "vi-deal-the-crucible-cards",
  },
  {
    id: "round-intro",
    title: "Your First Cosmic Age",
    body: "<p>Each round of Kismeta is one <strong>Cosmic Age</strong> of the Great Year.</p><p>Let's walk through your first Cosmic Age step by step.</p>",
    embed: "round-at-a-glance",
    learnMorePath: "play/round-at-a-glance",
  },
  {
    id: "spring-1",
    title: "Spring: Set the Cosmic Age & Gather Resources",
    phase: "spring",
    phaseStep: 1,
    phaseTotal: 5,
    body: "<p>Spring ushers in a new Cosmic Age. The Agekeeper rolls the Cosmic Age Die and announces the Sign, Planet, and Element for this round.</p>",
    checklist: [
      "Roll the 12-sided Cosmic Age Die",
      "Read the Sign and Aspects aloud",
      "Apply the Cosmic Effect for the entire round",
    ],
    learnMorePath: "play/round-overview",
    learnMoreHash: "1-set-the-cosmic-age",
  },
  {
    id: "spring-2",
    title: "Spring: Determine Your Sign",
    phase: "spring",
    phaseStep: 2,
    phaseTotal: 5,
    body: "<p>Every player rolls their Zodiac Die and moves their Meeple to the rolled Sign. Your Sign is your cosmic identity for this Age — it shapes your Alignments and grants you a personal Cosmic Effect active for the full round.</p>",
    checklist: [
      "All players roll simultaneously",
      "Move Meeples to rolled Signs on the Zodiac Wheel",
      "Note your Sign's personal Cosmic Effect (active in addition to the shared Cosmic Age Effect)",
    ],
    learnMorePath: "play/round-overview",
    learnMoreHash: "2-determine-your-sign",
  },
  {
    id: "spring-3",
    title: "Spring: Harvest Kismeta Cards",
    phase: "spring",
    phaseStep: 3,
    phaseTotal: 5,
    body: '<p>All players begin with 2 Kismeta Cards as a gift from the Age. Earn Bonus Cards by aligning your inventory with the Cosmic Age\'s Aspects. Each player calculates their own total first; the Agekeeper then deals the full Harvest.</p><ol class="game-table__steps"><li class="game-table__step"><span class="game-table__step-label">Base Harvest</span><p class="game-table__step-body">All players begin with 2 Kismeta Cards. This is always granted regardless of Alignment.</p></li><li class="game-table__step"><span class="game-table__step-label">Calculate Bonus Cards</span><p class="game-table__step-body">Each player tallies bonus cards from all Harvest Sources: Zodiac Die, Astral Houses, Specialist Cards, and Spread Element Match. Each source scores its single highest-matching Aspect.</p></li><li class="game-table__step"><span class="game-table__step-label">Agekeeper\'s Boon</span><p class="game-table__step-body">If the Agekeeper\'s rolled Sign exactly matches the Cosmic Age Sign, add +2 cards to every player\'s tally.</p></li><li class="game-table__step"><span class="game-table__step-label">Deal the Harvest</span><p class="game-table__step-body">The Agekeeper deals each player their full Harvest total face-down, one at a time.</p></li></ol><div class="doc-table"><table><thead><tr><th>Bonus Source</th><th>How It Scores</th></tr></thead><tbody><tr><td>Zodiac Die</td><td>Compare your rolled Sign\'s Aspects against the Cosmic Age — score the highest match</td></tr><tr><td>Astral Houses</td><td>Each House is scored independently and stacks with all other sources</td></tr><tr><td>Specialist Cards</td><td>Each active Specialist in your Arcanum is scored independently</td></tr><tr><td>Spread Element Match</td><td>Each Spread card whose suit matches the Cosmic Age Element earns +1</td></tr></tbody></table></div><div class="doc-table"><table><thead><tr><th>Aspect Match</th><th>Bonus Cards</th></tr></thead><tbody><tr><td>Sign</td><td>+3</td></tr><tr><td>Planet</td><td>+2</td></tr><tr><td>Element</td><td>+1</td></tr><tr><td>No Match</td><td>+0</td></tr></tbody></table></div><p><em>Each source scores its single highest-matching Aspect only — do not stack.</em></p>',
    learnMorePath: "play/round-overview",
    learnMoreHash: "3-harvest-kismeta-cards",
  },
  {
    id: "spring-4",
    title: "Spring — Commune with the Kismeta Cards",
    phase: "spring",
    phaseStep: 4,
    phaseTotal: 5,
    body: "<p>Now that you have your Kismeta Cards, assign each to a zone. Cards in your <strong>Spread</strong> (face-up) have active effects and count toward Alignment, Crucible activation, and Crafting — but can be lost in Duels. Cards in your <strong>Hand</strong> (face-down) are hidden and can be used for Crafting and Oppositions but have no active effects. Any Major Arcana go to your <strong>Arcanum</strong>.</p>",
    checklist: [
      "Place each Harvested card face-up in Spread or face-down in Hand",
      "Place any Major Arcana (Adept or Fate) into your Arcanum",
      "Plan Crucible activation and Crafting goals for this round",
    ],
    learnMorePath: "play/round-overview",
    learnMoreHash: "4-commune-with-the-kismeta-cards",
  },
  {
    id: "spring-5",
    title: "Spring: Card Lock",
    phase: "spring",
    phaseStep: 5,
    phaseTotal: 5,
    body: "<p>Once Commune is complete, all cards are locked in their current zones until Phase 4: Winter. Any new cards you gain in Summer or Autumn are automatically added to your Spread.</p>",
    checklist: ["Confirm card zones — they are locked until Winter"],
    learnMorePath: "play/round-overview",
    learnMoreHash: "5-card-lock",
  },
  {
    id: "summer",
    title: "Summer: Trade, Build & Prepare",
    phase: "summer",
    phaseStep: 1,
    phaseTotal: 1,
    body: "<p>The Sun shines brightly as you and your fellow Alchemists focus on your plans. Summer is the perfect time for socializing — bartering over trades, initiating duels, and risking your luck in gambits. While fortune favors the bold, Fate may have other plans in store for you.</p><p>In clockwise order, beginning with the Agekeeper, each player takes their turn and can perform any of the listed actions multiple times and in any sequence.</p>",
    embed: "summer-flow",
    learnMorePath: "play/round-overview",
    learnMoreHash: "phase-2-summer",
  },
  {
    id: "autumn",
    title: "Autumn: Conduct the Great Work",
    phase: "autumn",
    phaseStep: 1,
    phaseTotal: 1,
    body: "<p>As the Cosmic Age shifts into Autumn, you and your fellow Alchemists gather around the Crucible of Kismeta to advance your Philosopher's Stone across the board, weaving between the safety of the Mantle Ring and the fiery Forge. Each successful step brings you closer to the Altar of Kismeta.</p><p>Use the step-by-step guide below for your Autumn turn. Start by selecting where your Stone is — the guide will show only the steps that apply to you.</p>",
    embed: "autumn-flow",
    learnMorePath: "play/round-overview",
    learnMoreHash: "phase-3-autumn",
  },
  {
    id: "winter",
    title: "Winter: Final Actions & Reset",
    phase: "winter",
    phaseStep: 1,
    phaseTotal: 1,
    body: "<p>Winter closes the Cosmic Age. Step through Winter as a table — complete all steps in order before passing the Agekeeper's Key. The guide walks you through each required step and asks whether you want to take the optional Offering and Fateful Wager.</p>",
    embed: "winter-flow",
    learnMorePath: "play/round-overview",
    learnMoreHash: "phase-4-winter",
  },
  {
    id: "round-end",
    title: "End of the Round",
    body: "<p>The Agekeeper passes the Key clockwise. A new Cosmic Age begins with Spring unless someone has completed the Great Work.</p>",
    checklist: [
      "Shuffle the Common Deck (Winter reset)",
      "Pass the Agekeeper Key to the next player",
      "Start the next Cosmic Age with Spring, or check for a winner",
    ],
    learnMorePath: "play/winning",
  },
  {
    id: "complete",
    title: "Move swiftly, Dear Alchemist...",
    body: "<p>You have walked through your first Cosmic Age. </p><p>For the next round, repeat <strong>Spring → Summer → Autumn → Winter</strong>.</p><p>Click <strong>Continue Playing</strong> to walk through your next round.</p><p>Click <strong>Open Round at a Glance</strong> to return here.</p><p>Click <strong>Start Over</strong> to start a new game.</p>",
    learnMorePath: "play/round-at-a-glance",
  },
];

export function getGuidedSteps(_locale?: string): GuidedStep[] {
  return GUIDED_STEPS;
}

/** Steps shown in the stepper (excludes the completion screen). */
export const GUIDED_CONTENT_STEP_COUNT = GUIDED_STEPS.length - 1;

export const GAME_MODE_STORAGE_KEY = "kismeta-game-modes";
export const GUIDED_PROGRESS_KEY = "kismeta-guided-progress";
export const GUIDED_PROGRESS_VERSION = 2;

export function gameModeToStorage(mode: GameMode): {
  quickplay: boolean;
  magnus: boolean;
} {
  switch (mode) {
    case "quickplay":
      return { quickplay: true, magnus: false };
    case "magnus":
      return { quickplay: false, magnus: true };
    default:
      return { quickplay: false, magnus: false };
  }
}
