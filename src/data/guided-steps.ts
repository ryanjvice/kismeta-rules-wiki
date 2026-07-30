/**
 * Guided Play step content (hand-maintained).
 * When setup/components rules change in Kismeta_GameGuide.md, update matching steps here.
 */

export type GameMode = "quickplay" | "standard" | "magnus";

export type GuidedPhase = "setup" | "spring" | "summer" | "autumn" | "winter";

export type GuidedEmbed =
  | "alchemist-tools"
  | "board-anatomy"
  | "crucible-deck"
  | "harvest-order"
  | "round-at-a-glance"
  | "engine-building"
  | "transmutation-process"
  | "summer-flow"
  | "autumn-harvest-guide"
  | "autumn-crucible-flow"
  | "winter-flow";

export type GuidedStep = {
  id: string;
  title: string;
  body: string;
  checklist?: string[];
  learnMorePath?: string;
  learnMoreHash?: string;
  phase?: GuidedPhase;
  phaseStep?: number;
  phaseTotal?: number;
  modeBody?: Partial<Record<GameMode, string>>;
  embed?: GuidedEmbed;
};

const GUIDED_STEPS: GuidedStep[] = [
  {
    id: "components",
    title: "Components in the Box",
    phase: "setup",
    phaseStep: 1,
    phaseTotal: 8,
    body: "<p>Unbox and confirm you have everything before setting the table. Group cards and dice so they are easy to reach during setup.</p>",
    checklist: [
      "Great Year Board (Zodiac Wheel, Mantle Ring, Forge, Furnaces, Bazaar, Codex panels)",
      "134 Kismeta Cards (blue) and 22 Crucible Cards (red)",
      "1 Cosmic Age Die (black) and 4 Zodiac Dice (player colors)",
      "Per player: Philosopher's Stone, Meeple, 4 Astral House tokens, 6 Coal",
      "Reagent tokens (Sulfur, Vitriol, Quicksilver, Aqua Regia)",
      "Essence bank (four Elements)",
      "1 Agekeeper's Key",
    ],
    learnMorePath: "learn/components",
  },
  {
    id: "tools-of-the-alchemist",
    title: "Tools of the Alchemist",
    phase: "setup",
    phaseStep: 2,
    phaseTotal: 8,
    body: "<p>You have seen these pieces in the box. This step defines what each one <strong>does</strong> at the table — the names and tools every Cosmic Age assumes you know.</p>",
    embed: "alchemist-tools",
    learnMorePath: "learn/components",
  },
  {
    id: "setup-i",
    title: "Setup I: Set the Table",
    phase: "setup",
    phaseStep: 3,
    phaseTotal: 8,
    body: "<p>Prepare the shared play area in the center of the table.</p>",
    checklist: [
      "Place the Great Year Board in the center",
      "Sort Kismeta Cards (blue) and Crucible Cards (red) into separate piles",
      "Shuffle the Kismeta Deck face down beside the board",
      "Set the Crucible cards beside the board (you will build the deck in Setup IV)",
      "Set out the Agekeeper's Key, Cosmic Age Die, Reagent tokens, and Essence bank",
    ],
    learnMorePath: "play/setup",
    learnMoreHash: "i-set-the-table",
  },
  {
    id: "setup-ii",
    title: "Setup II: Become an Alchemist",
    phase: "setup",
    phaseStep: 4,
    phaseTotal: 8,
    body: "<p>Each player chooses a color (Red, Green, Blue, or White) and collects their personal gear.</p>",
    checklist: [
      "8 Essence: 2 of each Element (Fire, Water, Air, Earth)",
      "6 Coal (wooden discs in your color)",
      "4 Astral House tokens",
      "1 Meeple",
      "1 Philosopher's Stone on START in your Mantle Ring section",
      "1 Zodiac Die matching your color",
    ],
    learnMorePath: "play/setup",
    learnMoreHash: "ii-become-an-alchemist",
  },
  {
    id: "setup-iii",
    title: "Setup III: Your Game Mode",
    phase: "setup",
    phaseStep: 5,
    phaseTotal: 8,
    body: "<p>You chose a game mode at the start of guided play. Confirm these rules apply to your table.</p>",
    modeBody: {
      quickplay:
        "<p><strong>Quickplay / First Play</strong> — recommended for first playthroughs. Use the <strong>Quickplay</strong> Crucible deck build (heavier Groups A and B, lighter C and D).</p>",
      standard:
        "<p><strong>Standard Game</strong> — balanced Crucible deck build across Groups A–D once you know the flow.</p>",
      magnus:
        "<p><strong>Magnus Alchemist</strong> — mastery mode for returning players. Use the <strong>Magnus</strong> Crucible deck build (heavier Groups C and D).</p>",
    },
    learnMorePath: "play/setup",
    learnMoreHash: "iii-select-a-game-mode",
  },
  {
    id: "setup-iv",
    title: "Setup IV: Build the Crucible Deck",
    phase: "setup",
    phaseStep: 6,
    phaseTotal: 8,
    body: "<p>Sort Crucible Cards into groups A–D (letter in the lower-left corner) and shuffle each group separately. Use the builder below for your game mode and player count.</p>",
    embed: "crucible-deck",
    checklist: [
      "Sort Crucible Cards into groups A, B, C, and D",
      "Shuffle each group separately",
      "Draw the counts shown in the builder (curated or random)",
      "Shuffle drawn cards together to form the Crucible Deck beside the board",
      "Return unused Crucible Cards to the box",
    ],
    learnMorePath: "play/setup",
    learnMoreHash: "iv-build-the-crucible-deck",
  },
  {
    id: "setup-v",
    title: "Setup V: Determine the First Agekeeper",
    phase: "setup",
    phaseStep: 7,
    phaseTotal: 8,
    body: "<p>The Agekeeper sets the Cosmic Age each Spring, deals Kismeta cards, manages the deck, and resets the board at Transit.</p>",
    checklist: [
      "Everyone rolls their Zodiac Die — highest becomes first Agekeeper (reroll ties)",
      "First Agekeeper takes the Agekeeper's Key",
      "Key passes clockwise at the end of each Age",
    ],
    learnMorePath: "play/setup",
    learnMoreHash: "v-determine-the-first-agekeeper",
  },
  {
    id: "setup-vi",
    title: "Setup VI: Deal the Crucible Cards",
    phase: "setup",
    phaseStep: 8,
    phaseTotal: 8,
    body: "<p>The first Agekeeper finishes game prep. When this step is done, the first Cosmic Age begins.</p>",
    checklist: [
      "Shuffle the Crucible Deck; tap twice to cleanse",
      "Deal four Crucible Cards face up to each player along the board edge",
      "Deal one face-up Minor Arcana card from the Kismeta Deck to each player's Spread (redeal if Major Arcana)",
    ],
    learnMorePath: "play/setup",
    learnMoreHash: "vi-deal-the-crucible-cards",
  },
  {
    id: "round-intro",
    title: "Your First Cosmic Age",
    body: "<p>Each round of Kismeta is one <strong>Cosmic Age</strong> of the Great Year.</p><p>Let's walk through your first Cosmic Age step by step.</p>",
    embed: "round-at-a-glance",
    learnMorePath: "rules/round-at-a-glance",
  },
  {
    id: "spring-1",
    title: "Spring: Set the Cosmic Age",
    phase: "spring",
    phaseStep: 1,
    phaseTotal: 5,
    body: "<p>Spring ushers in a new Cosmic Age. The Agekeeper rolls the Cosmic Age Die and announces the Sign, Planet, and Element that govern this Age. Every player takes the Gift of the Age: 1 Essence matching the Cosmic Age's Element.</p>",
    checklist: [
      "Agekeeper rolls the Cosmic Age Die onto the matching Sign",
      "Read the Sign, Planet, and Element aloud",
      "All players take 1 Essence of the Cosmic Age's Element",
      "Resolve any Fateful Wagers from the previous Winter",
    ],
    learnMorePath: "play/round-overview",
    learnMoreHash: "1-set-the-age",
  },
  {
    id: "spring-2",
    title: "Spring: Set Your Zodiac Sign",
    phase: "spring",
    phaseStep: 2,
    phaseTotal: 5,
    body: "<p>Every player rolls their Zodiac Die and places their Meeple on the rolled Sign. Your Sign sets which Furnace you may fuel, where you may build an Astral House, and how you Align at Harvest and in Sieges for the rest of the Age.</p>",
    checklist: [
      "All players roll their Zodiac Die",
      "Place Meeples on rolled Signs on the Zodiac Wheel",
    ],
    learnMorePath: "play/round-overview",
    learnMoreHash: "2-set-your-zodiac-sign",
  },
  {
    id: "spring-3",
    title: "Spring: Deal the Kismeta Cards",
    phase: "spring",
    phaseStep: 3,
    phaseTotal: 5,
    body: "<p>The Agekeeper deals <strong>3 Kismeta cards face-down</strong> to each player. Fate Cards resolve immediately when drawn; Adept Cards may be purchased for <strong>3 Essence, of any type</strong>, or discarded.</p>",
    checklist: [
      "Agekeeper deals 3 cards per player, face-down",
      "Resolve any Fate Cards drawn during the deal",
    ],
    learnMorePath: "play/round-overview",
    learnMoreHash: "3-deal-the-kismeta-cards",
  },
  {
    id: "spring-4",
    title: "Spring: Build Your Tableau",
    phase: "spring",
    phaseStep: 4,
    phaseTotal: 5,
    body: "<p>Arrange this Age's cards across your <strong>Spread</strong>, <strong>Hand</strong>, and <strong>Arcanum</strong> (see Tools of the Alchemist). Consider your goals for the Age.</p>",
    checklist: [
      "Arrange cards across Spread, Hand, and Arcanum",
      "Consider your goals for this Age",
    ],
    learnMorePath: "play/round-overview",
    learnMoreHash: "4-build-your-tableau",
  },
  {
    id: "spring-5",
    title: "Spring: Card Lock",
    phase: "spring",
    phaseStep: 5,
    phaseTotal: 5,
    body: "<p>Once your Tableau is arranged, cards are locked between Hand and Spread until Winter. New Minor Arcana gained in Summer or Autumn go to your Spread automatically.</p><p>📌 <em>Tip: Your Spread is your engine — visible and active. Your Hand is your reserve for Sieges.</em></p>",
    learnMorePath: "play/round-overview",
    learnMoreHash: "5-card-lock",
  },
  {
    id: "summer",
    title: "Summer: Craft, Distill, Trade & Contest",
    phase: "summer",
    phaseStep: 1,
    phaseTotal: 1,
    body: "<p>On your turn, take any Summer actions in any order: craft Houses or Mansions, Distill Reagents, trade with rivals, Duel for cards, Extinguish Coal, or Siege an exposed Stone. Pass when done.</p>",
    embed: "summer-flow",
    learnMorePath: "play/round-overview",
    learnMoreHash: "phase-2-summer",
  },
  {
    id: "autumn-1",
    title: "Autumn: Harvest Elemental Essence",
    phase: "autumn",
    phaseStep: 1,
    phaseTotal: 2,
    body: "<p>Autumn opens with <strong>Harvest</strong>. Each player compares their Harvest Sources — Zodiac Die, Astral Houses, Adept Cards, and Spread Cards — to the Cosmic Age's three Aspects: Sign, Planet, and Element.</p><p>Each matching Aspect scores Essence from the bank in the Cosmic Age's Element: Sign +3 · Planet +2 · Element +1. Stack every tier a source matches; match all three on one source for a <strong>Perfect Match (+6)</strong>.</p>",
    embed: "autumn-harvest-guide",
    learnMorePath: "play/round-overview",
    learnMoreHash: "1️⃣-harvest-elemental-essence",
  },
  {
    id: "autumn-2",
    title: "Autumn: Fuel & Conduct the Great Work",
    phase: "autumn",
    phaseStep: 2,
    phaseTotal: 2,
    body: "<p>After everyone Harvests, take your Crucible turn. If your Stone was Seized, Rekindle it first — then craft Coal to fuel Furnaces, Fire or Temper your Stone, and Distill Reagents if you need them before Firing.</p><p>📌 <em>Tip: When you Fire, commit up to 3 Reagents as Shield Reagents — rivals must match that number as an Ante to Siege you.</em></p>",
    embed: "autumn-crucible-flow",
    learnMorePath: "play/round-overview",
    learnMoreHash: "harvest-fuel-conduct-the-great-work",
  },
  {
    id: "winter",
    title: "Winter: Final Actions & Reset",
    phase: "winter",
    phaseStep: 1,
    phaseTotal: 1,
    body: "<p>Winter closes the Cosmic Age. Unlock cards between Hand and Spread, optionally place a Fateful Wager, enforce limits (Spread 7 · Hand 5 · Arcanum 2 Adepts), then Transit: shuffle the discard pile into the Kismeta Deck and pass the Key clockwise.</p>",
    embed: "winter-flow",
    learnMorePath: "play/round-overview",
    learnMoreHash: "phase-4-winter",
  },
  {
    id: "round-end",
    title: "Transit the Age: End of the Round",
    body: "<p>The Agekeeper passes the Key clockwise. A new Cosmic Age begins with Spring unless someone has completed the Great Work.</p>",
    checklist: [
      "Shuffle the Kismeta discard pile back into the deck",
      "Pass the Agekeeper Key to the next player",
      "Start the next Cosmic Age with Spring, or check for a winner",
    ],
    learnMorePath: "play/winning",
  },
  {
    id: "complete",
    title: "Move swiftly, Dear Alchemist...",
    body: "<p>You have walked through your first Cosmic Age.</p><p>For the next round, repeat <strong>Spring → Summer → Autumn → Winter</strong>.</p><p>Click <strong>Continue Playing</strong> to walk through your next round.</p><p>Click <strong>Open Round at a Glance</strong> to return here.</p><p>Click <strong>Start Over</strong> to start a new game.</p><p>Ready to sharpen your play? See <a href='/games/alchemists-of-the-great-year/reference/quick-tips/'>Quick Tips</a> for practical advice on Alignments, Furnaces, and Sieges.</p>",
    learnMorePath: "rules/round-at-a-glance",
  },
];

export type GuidedNavSection = {
  id: string;
  labelKey: string;
  stepIndex: number;
};

const PHASE_LABEL_KEYS: Record<GuidedPhase, string> = {
  setup: "guided.phase.setup",
  spring: "guided.phase.spring",
  summer: "guided.phase.summer",
  autumn: "guided.phase.autumn",
  winter: "guided.phase.winter",
};

export function getGuidedSteps(_locale?: string): GuidedStep[] {
  return GUIDED_STEPS;
}

/** Steps from `startId` through the completion screen (inclusive). */
export function getGuidedStepsFromId(startId: string): GuidedStep[] {
  const startIndex = GUIDED_STEPS.findIndex((step) => step.id === startId);
  if (startIndex === -1) return [];
  return GUIDED_STEPS.slice(startIndex);
}

/** Phase-level jump targets for Guided Play navigation (excludes completion screen). */
export function getGuidedNavSections(): GuidedNavSection[] {
  const contentSteps = GUIDED_STEPS.slice(0, -1);
  const sections: GuidedNavSection[] = [];
  let lastPhase: GuidedPhase | undefined;

  contentSteps.forEach((step, index) => {
    const stepIndex = index + 1;

    if (step.phase) {
      if (step.phase !== lastPhase) {
        sections.push({
          id: step.phase,
          labelKey: PHASE_LABEL_KEYS[step.phase],
          stepIndex,
        });
        lastPhase = step.phase;
      }
      return;
    }

    const labelKey =
      step.id === "round-intro"
        ? "guided.nav.roundIntro"
        : step.id === "round-end"
          ? "guided.nav.roundEnd"
          : step.id;

    sections.push({ id: step.id, labelKey, stepIndex });
    lastPhase = undefined;
  });

  return sections;
}

/** Steps shown in the stepper (excludes the completion screen). */
export const GUIDED_CONTENT_STEP_COUNT = GUIDED_STEPS.length - 1;

export const GAME_MODE_STORAGE_KEY = "kismeta-game-modes";
export const GUIDED_PROGRESS_KEY = "kismeta-guided-progress";
export const GUIDED_PROGRESS_VERSION = 11;

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
