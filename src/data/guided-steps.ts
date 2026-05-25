/**
 * Guided Play step content (hand-maintained).
 * When setup/components rules change in Kismeta_GameGuide.md, update matching steps here.
 */

export type GameMode = "quickplay" | "standard" | "magnus";

export type GuidedPhase = "setup" | "spring" | "summer" | "autumn" | "winter";

export type GuidedEmbed =
  | "crucible-deck"
  | "harvest-order"
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
    learnMoreHash: "i-setting-the-table",
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
      "1 Crucible Codex (dual-sided)",
      "4 Molten Coals",
      "1 Meeple",
      "1 Philosopher's Stone on START in your Mantle Ring section",
      "1 Zodiac Die matching your color",
    ],
    learnMorePath: "play/setup",
    learnMoreHash: "ii-becoming-an-alchemist",
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
        "<p><strong>Quickplay / First Play</strong> — recommended for first playthroughs.</p><ul><li>Use the <strong>Quickplay</strong> Crucible deck build.</li><li>Astral Houses: pay <strong>1</strong> Common Card matching your current Sign's Planet.</li><li>Cauldron thresholds: each Molten Coal in any Cauldron reduces refinement cost for <strong>all</strong> Reagents by 5 RP (base threshold 25 RP).</li></ul>",
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
    learnMoreHash: "v-selecting-the-first-agekeeper",
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
    learnMoreHash: "vi-dealing-crucible-cards",
  },
  {
    id: "round-intro",
    title: "Your First Cosmic Age",
    body: "<p>Each round is one <strong>Cosmic Age</strong> with four seasons in order: Spring → Summer → Autumn → Winter. You will walk through your first age step by step.</p>",
    checklist: [
      "Spring: set the Age, Harvest, Commune, Card Lock",
      "Summer: craft and consort on your turns",
      "Autumn: Forge sequence (Stasis, Opposition, Temper, Fire)",
      "Winter: unlock, optional Offering/Wager, limits, reset",
    ],
    learnMorePath: "play/round-at-a-glance",
  },
  {
    id: "spring-1",
    title: "Spring — Set the Cosmic Age",
    phase: "spring",
    phaseStep: 1,
    phaseTotal: 5,
    body: "<p>The Agekeeper rolls the Cosmic Age Die and announces the Sign, Planet, and Element for this round.</p>",
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
    title: "Spring — Determine Your Sign",
    phase: "spring",
    phaseStep: 2,
    phaseTotal: 5,
    body: "<p>Every player rolls their Zodiac Die and moves their Meeple to the rolled Sign.</p>",
    checklist: [
      "All players roll simultaneously",
      "Move Meeples to rolled Signs on the Zodiac Wheel",
    ],
    learnMorePath: "play/round-overview",
    learnMoreHash: "2-determine-your-sign",
  },
  {
    id: "spring-3",
    title: "Spring — Harvest",
    phase: "spring",
    phaseStep: 3,
    phaseTotal: 5,
    body: "<p>The Agekeeper deals cards in a fixed order. Calculate all Bonus Cards before dealing any.</p>",
    embed: "harvest-order",
    checklist: [
      "Base Harvest: 2 face-down Common Cards per player",
      "Agekeeper's Boon: +2 each if Agekeeper's Sign matches the Cosmic Age",
      "Each player calculates Bonus Cards from Alignment",
      "Deal Bonus Cards one at a time, face-down",
    ],
    learnMorePath: "play/round-overview",
    learnMoreHash: "3-harvest",
  },
  {
    id: "spring-4",
    title: "Spring — Commune",
    phase: "spring",
    phaseStep: 4,
    phaseTotal: 5,
    body: "<p>Assign Harvested cards to your Spread (face-up) or Hand (face-down). Major Arcana from the Harvest go to your Arcanum.</p>",
    checklist: [
      "Build Spread, Hand, and Arcanum zones",
      "Plan Crucible activation and refinement goals",
    ],
    learnMorePath: "play/round-overview",
    learnMoreHash: "4-commune",
  },
  {
    id: "spring-5",
    title: "Spring — Card Lock",
    phase: "spring",
    phaseStep: 5,
    phaseTotal: 5,
    body: "<p>After Commune, cards cannot move between Hand and Spread until Winter.</p>",
    checklist: ["Confirm card zones — they are locked until Winter"],
    learnMorePath: "play/round-overview",
    learnMoreHash: "5-card-lock",
  },
  {
    id: "summer",
    title: "Phase 2: Summer",
    phase: "summer",
    phaseStep: 1,
    phaseTotal: 1,
    body: "<p>Starting with the Agekeeper, each player takes turns. On your turn, take any Craft or Consort actions in any order, as often as you like.</p>",
    embed: "summer-flow",
    learnMorePath: "play/round-overview",
    learnMoreHash: "phase-2-summer",
  },
  {
    id: "autumn",
    title: "Phase 3: Autumn",
    phase: "autumn",
    phaseStep: 1,
    phaseTotal: 1,
    body: "<p>Use the step-by-step guide below for your Autumn turn. Start by selecting where your Stone is — the guide will show only the steps that apply to you and ask whether you want to take each optional action.</p>",
    embed: "autumn-flow",
    learnMorePath: "play/round-overview",
    learnMoreHash: "phase-3-autumn",
  },
  {
    id: "winter",
    title: "Phase 4: Winter",
    phase: "winter",
    phaseStep: 1,
    phaseTotal: 1,
    body: "<p>Step through Winter as a table. The guide walks you through each required step and asks whether you want to take the optional Offering and Fateful Wager before closing the Cosmic Age.</p>",
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
