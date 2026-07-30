/**
 * Playtest guided session steps — briefing, overview, engine/transmutation primers,
 * then gameplay from Agekeeper onward. Season/setup copy after Agekeeper stays in sync with guided-steps.ts.
 */

import {
  getGuidedStepsFromId,
  type GuidedNavSection,
  type GuidedPhase,
  type GuidedStep,
} from "./guided-steps";

export const PLAYTEST_GUIDED_PROGRESS_KEY = "kismeta-playtest-guided-progress";
export const PLAYTEST_GUIDED_PROGRESS_VERSION = 4;

const BRIEFING_STEP: GuidedStep = {
  id: "briefing",
  title: "Gather Round the Crucible of Kismeta, Dear Alchemists!",
  body: "<p>Today, you and your rival Alchemists will race to be the first to complete the <strong>Great Work</strong>, that arcane ritual of transforming your Philosopher's Stone from Lead into Gold. This race takes place across the many Cosmic Ages of the Great Year.</p><p>Each Age moves through <strong>Spring → Summer → Autumn → Winter</strong>. Your Game Master has set the table; use this guide to click through each beat as play unfolds.</p><p>Before we begin, let's learn the shape of a Cosmic Age and how you will achieve the Great Work.</p>",
  checklist: [
    "Complete the Great Work (Lead → Gold) before your rivals",
    "Harvest Essence, fuel Furnaces, and advance your Stone each Autumn",
    "Build your Spread, Hand, and Arcanum across the Ages",
    "Click Next as each step happens at the table",
  ],
  learnMorePath: "rules/game-overview",
};

const COSMIC_AGE_OVERVIEW_STEP: GuidedStep = {
  id: "round-intro",
  title: "The Shape of a Cosmic Age",
  body: "<p>Every round of Kismeta is one <strong>Cosmic Age</strong> of the Great Year. Each Age follows the same four-season pattern, repeating until someone completes the Great Work.</p><p>Learn the rhythm now; you'll walk through each season step by step once play begins.</p>",
  embed: "round-at-a-glance",
  learnMorePath: "rules/round-at-a-glance",
};

const TOOLS_STEP: GuidedStep = {
  id: "tools-of-the-alchemist",
  title: "Tools of the Alchemist",
  body: "<p>Before you learn how Essence and cards fuel the Great Work, learn the <strong>tools</strong> every Alchemist uses at the table — the names every step ahead will assume you know.</p>",
  embed: "alchemist-tools",
  learnMorePath: "learn/components",
};

const ENGINE_BUILDING_STEP: GuidedStep = {
  id: "engine-building",
  title: "Building Your Engine",
  body: "<p>The Great Work runs on two currencies: <strong>Essence</strong> and <strong>Kismeta cards</strong>. Each Spring you draw cards and grow your Tableau. Each Autumn you Harvest Essence. Spend cards to craft Coal and build Houses; spend Essence to Distill Reagents. All of it feeds the moment you Fire a Crucible Formula.</p>",
  embed: "engine-building",
  learnMorePath: "rules/game-overview",
  learnMoreHash: "building-your-engine",
};

const TRANSMUTATION_STEP: GuidedStep = {
  id: "transmutation-process",
  title: "The Transmutation Process",
  body: "<p>You have four Crucible Cards in front of you now. Each one moves your Philosopher's Stone one stage through the Forge: Lead, then Bronze, then Silver, and finally Gold.</p><p>When you are ready to Fire, complete the Alchemical Formula on the card. Turn in a card set, the required Reagents, and Coal in each Furnace.</p>",
  embed: "transmutation-process",
  learnMorePath: "rules/game-overview",
  learnMoreHash: "transmutation-process",
};

const LAUNCH_STEP: GuidedStep = {
  id: "launch",
  title: "Let the Great Work Begin",
  body: "<p>You have learned the path. Now it is time to play.</p><p>Each Cosmic Age needs an <strong>Agekeeper</strong>. The Agekeeper sets the Cosmic Age each Spring, deals Kismeta cards, manages the deck, and resets the board at Transit.</p><p>Determine who holds the Agekeeper's Key. Then deal the cards and open the first Cosmic Age.</p>",
  checklist: [
    "Determine the first Agekeeper",
    "Deal the opening cards",
    "Begin Spring together",
  ],
  learnMorePath: "play/setup",
  learnMoreHash: "v-determine-the-first-agekeeper",
};

const PLAYTEST_COMPLETE_STEP: GuidedStep = {
  id: "complete",
  title: "Move swiftly, Dear Alchemist...",
  body: "<p>You have walked through your first Cosmic Age.</p><p>For the next round, repeat <strong>Spring → Summer → Autumn → Winter</strong>.</p><p>Use the buttons below to continue your session, open the Round Overview for quick lookup, or share feedback when you're done.</p>",
  learnMorePath: "rules/round-at-a-glance",
};

function buildPlaytestGuidedSteps(): GuidedStep[] {
  const fromAgekeeper = getGuidedStepsFromId("setup-v");
  const gameplaySteps = fromAgekeeper
    .slice(0, -1)
    .filter((step) => step.id !== "round-intro")
    .map((step) => {
      if (step.id === "setup-v") {
        return {
          ...step,
          title: "Determine the First Agekeeper",
          body: "<p>Everyone rolls their Zodiac Die. Highest roll becomes the first Agekeeper. Reroll ties.</p>",
          phaseStep: 1,
          phaseTotal: 2,
        };
      }
      if (step.id === "setup-vi") {
        return {
          ...step,
          title: "Deal the Crucible Cards",
          phaseStep: 2,
          phaseTotal: 2,
        };
      }
      if (step.id === "spring-4") {
        return {
          ...step,
          body: "<p>Arrange this Age's cards across your <strong>Spread</strong>, <strong>Hand</strong>, and <strong>Arcanum</strong> (see Tools of the Alchemist). Consider your goals for the Age.</p>",
        };
      }
      return step;
    });

  return [
    BRIEFING_STEP,
    COSMIC_AGE_OVERVIEW_STEP,
    TOOLS_STEP,
    ENGINE_BUILDING_STEP,
    TRANSMUTATION_STEP,
    LAUNCH_STEP,
    ...gameplaySteps,
    PLAYTEST_COMPLETE_STEP,
  ];
}

const PLAYTEST_GUIDED_STEPS = buildPlaytestGuidedSteps();

export function getPlaytestGuidedSteps(_locale?: string): GuidedStep[] {
  return PLAYTEST_GUIDED_STEPS;
}

const PHASE_LABEL_KEYS: Record<GuidedPhase, string> = {
  setup: "guided.phase.setup",
  spring: "guided.phase.spring",
  summer: "guided.phase.summer",
  autumn: "guided.phase.autumn",
  winter: "guided.phase.winter",
};

const STANDALONE_NAV_LABELS: Record<string, string> = {
  briefing: "playtest.agy.guided.nav.briefing",
  "round-intro": "playtest.agy.guided.nav.overview",
  "tools-of-the-alchemist": "playtest.agy.guided.nav.toolsOfTheAlchemist",
  "engine-building": "playtest.agy.guided.nav.engineBuilding",
  "transmutation-process": "playtest.agy.guided.nav.transmutation",
  launch: "playtest.agy.guided.nav.launch",
  "round-end": "guided.nav.roundEnd",
};

/** Phase-level jump targets for playtest guided navigation (excludes completion screen). */
export function getPlaytestGuidedNavSections(): GuidedNavSection[] {
  const contentSteps = PLAYTEST_GUIDED_STEPS.slice(0, -1);
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

    const labelKey = STANDALONE_NAV_LABELS[step.id];
    if (labelKey) {
      sections.push({ id: step.id, labelKey, stepIndex });
      lastPhase = undefined;
    }
  });

  return sections;
}

/** Steps shown in the playtest stepper (excludes the completion screen). */
export const PLAYTEST_GUIDED_CONTENT_STEP_COUNT =
  PLAYTEST_GUIDED_STEPS.length - 1;
