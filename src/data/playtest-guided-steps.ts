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
export const PLAYTEST_GUIDED_PROGRESS_VERSION = 2;

const BRIEFING_STEP: GuidedStep = {
  id: "briefing",
  title: "Welcome to the Crucible",
  body: "<p>You are rival Alchemists competing to complete the <strong>Great Work</strong> — transforming your Philosopher's Stone from Lead into Gold across the Cosmic Ages of the Great Year.</p><p>Each Age moves through <strong>Spring → Summer → Autumn → Winter</strong>. Your Game Master has set the table; use this guide to click through each beat as play unfolds.</p><p>When you're ready, continue to learn the shape of a Cosmic Age.</p>",
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
  body: "<p>Every round of Kismeta is one <strong>Cosmic Age</strong> of the Great Year — the same four-season pattern repeats until someone completes the Great Work.</p><p>Learn the rhythm now; you'll walk through each season step by step once play begins.</p>",
  embed: "round-at-a-glance",
  learnMorePath: "rules/round-at-a-glance",
};

const ENGINE_BUILDING_STEP: GuidedStep = {
  id: "engine-building",
  title: "Building Your Engine",
  body: "<p>Between Firings, you grow two economies — Essence from the dice, Coal and Houses from your cards — so you can pay each Crucible Formula when the time comes.</p>",
  embed: "engine-building",
  learnMorePath: "rules/game-overview",
  learnMoreHash: "building-your-engine",
};

const TRANSMUTATION_STEP: GuidedStep = {
  id: "transmutation-process",
  title: "The Transmutation Process",
  body: "<p>Your Philosopher's Stone advances through four Crucible Cards — Attune, Fire, defend against Siege, then Temper. Rekindle if a rival Seizes your Stone.</p>",
  embed: "transmutation-process",
  learnMorePath: "rules/game-overview",
  learnMoreHash: "transmutation-process",
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
        return { ...step, phaseStep: 1, phaseTotal: 2 };
      }
      if (step.id === "setup-vi") {
        return { ...step, phaseStep: 2, phaseTotal: 2 };
      }
      return step;
    });

  return [
    BRIEFING_STEP,
    COSMIC_AGE_OVERVIEW_STEP,
    ENGINE_BUILDING_STEP,
    TRANSMUTATION_STEP,
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
  "engine-building": "playtest.agy.guided.nav.engineBuilding",
  "transmutation-process": "playtest.agy.guided.nav.transmutation",
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
export const PLAYTEST_GUIDED_CONTENT_STEP_COUNT = PLAYTEST_GUIDED_STEPS.length - 1;
