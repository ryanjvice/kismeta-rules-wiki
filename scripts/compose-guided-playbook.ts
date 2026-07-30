/**
 * Composes Kismeta_AGY_Guided_Playbook.md from guided-step data for external print/layout.
 * Run: npm run compose:playbook
 */

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  getGuidedSteps,
  type GuidedEmbed,
  type GuidedStep,
} from "../src/data/guided-steps.ts";
import {
  getFlow,
  getTable,
  localize,
  type ActionFlow,
  type FlowNode,
  type SeasonCardsTable,
  type StepListTable,
} from "../src/data/content-registry.ts";
import crucibleDeckBuilds from "../src/data/crucible-deck-builds.json";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const OUTPUT_PATH = join(REPO_ROOT, "Kismeta_AGY_Guided_Playbook.md");

const PRINT_BRIEFING: GuidedStep = {
  id: "briefing",
  title: "Gather Round the Crucible of Kismeta, Dear Alchemists!",
  body: "<p>Today, you and your rival Alchemists will race to be the first to complete the <strong>Great Work</strong>, that arcane ritual of transforming your Philosopher's Stone from Lead into Gold. This race takes place across the many Cosmic Ages of the Great Year.</p><p>Each Age moves through <strong>Spring → Summer → Autumn → Winter</strong>. Follow each step in this guide in order as play unfolds at the table.</p><p>Before you begin, learn the shape of a Cosmic Age and how you will achieve the Great Work.</p>",
  checklist: [
    "Complete the Great Work (Lead → Gold) before your rivals",
    "Harvest Essence, fuel Furnaces, and advance your Stone each Autumn",
    "Build your Spread, Hand, and Arcanum across the Ages",
    "Work through each step at the table as the Age unfolds",
  ],
};

const PRINT_COSMIC_AGE: GuidedStep = {
  id: "round-intro",
  title: "The Shape of a Cosmic Age",
  body: "<p>Every round of Kismeta is one <strong>Cosmic Age</strong> of the Great Year. Each Age follows the same four-season pattern, repeating until someone completes the Great Work.</p><p>Learn the rhythm now; you will walk through each season step by step once play begins.</p>",
  embed: "round-at-a-glance",
};

const PRINT_TOOLS: GuidedStep = {
  id: "tools-of-the-alchemist",
  title: "Tools of the Alchemist",
  body: "<p>Before you learn how Essence and cards fuel the Great Work, learn the <strong>tools</strong> every Alchemist uses at the table — the names every step ahead will assume you know.</p>",
  embed: "alchemist-tools",
};

const PRINT_ENGINE: GuidedStep = {
  id: "engine-building",
  title: "Building Your Engine",
  body: "<p>The Great Work runs on two currencies: <strong>Essence</strong> and <strong>Kismeta cards</strong>. Each Spring you draw cards and grow your Tableau. Each Autumn you Harvest Essence. Spend cards to craft Coal and build Houses; spend Essence to Distill Reagents. All of it feeds the moment you Fire a Crucible Formula.</p>",
  embed: "engine-building",
};

const PRINT_TRANSMUTATION: GuidedStep = {
  id: "transmutation-process",
  title: "The Transmutation Process",
  body: "<p>You will have four Crucible Cards in front of you. Each one moves your Philosopher's Stone one stage through the Forge: Lead, then Bronze, then Silver, and finally Gold.</p><p>When you are ready to Fire, complete the Alchemical Formula on the card. Turn in a card set, the required Reagents, and Coal in each Furnace.</p>",
  embed: "transmutation-process",
};

const PRINT_LAUNCH: GuidedStep = {
  id: "launch",
  title: "Let the Great Work Begin",
  body: "<p>You have learned the path. Now it is time to set up the game and play.</p><p>Each Cosmic Age needs an <strong>Agekeeper</strong>. The Agekeeper sets the Cosmic Age each Spring, deals Kismeta cards, manages the deck, and resets the board at Transit.</p>",
};

type PlaybookPart = {
  id: string;
  title: string;
  stepIds: string[];
};

function buildPlaybookSteps(): GuidedStep[] {
  const all = getGuidedSteps();
  const byId = new Map(all.map((step) => [step.id, step]));

  const setupIds = [
    "components",
    "setup-i",
    "setup-ii",
    "setup-iii",
    "setup-iv",
    "setup-v",
    "setup-vi",
  ];
  const gameplayIds = [
    "spring-1",
    "spring-2",
    "spring-3",
    "spring-4",
    "spring-5",
    "summer",
    "autumn",
    "winter",
    "round-end",
  ];

  const setupSteps = setupIds.map((id) => byId.get(id)!);
  const gameplaySteps = gameplayIds.map((id) => byId.get(id)!);

  return [
    PRINT_BRIEFING,
    PRINT_COSMIC_AGE,
    PRINT_TOOLS,
    PRINT_ENGINE,
    PRINT_TRANSMUTATION,
    PRINT_LAUNCH,
    ...setupSteps,
    ...gameplaySteps,
  ];
}

function escapeTableCell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function htmlToMarkdown(html: string): string {
  let text = html;

  text = text.replace(/<br\s*\/?>/gi, "\n");
  text = text.replace(/<\/p>\s*<p>/gi, "\n\n");
  text = text.replace(/<\/?p>/gi, "");
  text = text.replace(/<strong>(.*?)<\/strong>/gi, "**$1**");
  text = text.replace(/<em>(.*?)<\/em>/gi, "*$1*");
  text = text.replace(/<a[^>]*>(.*?)<\/a>/gi, "$1");
  text = text.replace(/<button[^>]*>(.*?)<\/button>/gi, "$1");
  text = text.replace(/<ul>\s*/gi, "\n");
  text = text.replace(/\s*<\/ul>/gi, "\n");
  text = text.replace(/<li>(.*?)<\/li>/gi, "- $1\n");
  text = text.replace(/<\/?[^>]+>/g, "");
  text = text.replace(/&amp;/g, "&");
  text = text.replace(/&lt;/g, "<");
  text = text.replace(/&gt;/g, ">");
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/\n{3,}/g, "\n\n");

  return text.trim();
}

function adaptStepBody(step: GuidedStep): string {
  let body = step.body;

  if (step.id === "setup-iii") {
    body =
      "<p>Choose one game mode for your table. Each mode uses a different Crucible deck build (see Setup IV).</p>";
  }

  if (step.id === "setup-iv") {
    body = body.replace(
      "Use the builder below for your game mode and player count.",
      "Use the tables below for your game mode and player count."
    );
  }

  if (step.id === "spring-4") {
    body =
      "<p>Your <strong>Tableau</strong> is everything you have in play, arranged across three zones.</p><p><strong>Spread</strong> — Minor Arcana played face-up. Effects are active; cards craft Coal, pay Attunements, and score at the Harvest. They can be lost in Duels.</p><p><strong>Hand</strong> — Minor Arcana held privately. Effects are inactive; Hand cards are safe from Duels and may be committed in Sieges.</p><p><strong>Arcanum</strong> — Major Arcana (Fates and Adepts). You may hold up to two Adept Cards.</p>";
  }

  return htmlToMarkdown(body);
}

function renderChecklist(step: GuidedStep): string {
  const items = step.checklist;
  if (!items?.length) return "";
  const adapted = items.map((item) =>
    step.id === "setup-iv" ? item.replace("in the builder", "in the tables") : item
  );
  return `\n${adapted.map((item) => `- [ ] ${item}`).join("\n")}\n`;
}

function renderSeasonGrid(tableId: "round-at-a-glance" | "engine-building" | "transmutation-process"): string {
  const table = getTable(tableId) as SeasonCardsTable;
  const intro = localize(table.intro, "en");
  const headers = table.seasons.map(
    (season) => `${season.icon} ${localize(season.title, "en")}`
  );
  const subtitles = table.seasons.map((season) =>
    escapeTableCell(localize(season.subtitle, "en"))
  );
  const summaries = table.seasons.map((season) =>
    escapeTableCell(localize(season.summary, "en"))
  );

  const lines = [
    intro ? `\n${intro}\n` : "",
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    `| *${subtitles.join("* | *")}* |`,
    `| ${summaries.join(" | ")} |`,
  ];

  return lines.filter(Boolean).join("\n");
}

function renderStepList(tableId: "alchemist-tools"): string {
  const table = getTable(tableId) as StepListTable;
  const intro = localize(table.intro, "en");
  const lines = [intro ? `\n${intro}\n` : ""];

  for (const step of table.steps) {
    lines.push(`- **${localize(step.label, "en")}** — ${localize(step.body, "en")}`);
  }

  return lines.filter(Boolean).join("\n");
}

function optionalSuffix(kind: FlowNode["kind"], label: string): string {
  if (kind !== "optional") return "";
  if (/(\(optional\)|optional)/i.test(label)) return "";
  return " *(optional)*";
}

function renderFlowNode(node: FlowNode, depth = 0): string[] {
  const lines: string[] = [];
  const indent = "  ".repeat(depth);
  const label = localize(node.label, "en");
  const body = localize(node.body, "en");
  const condition = localize(node.condition, "en");

  if (node.kind === "group") {
    if (depth === 0 && body && !label) {
      lines.push(`${indent}${body}`);
    } else if (label) {
      const prefix = depth === 0 ? "" : "- ";
      lines.push(`${indent}${prefix}**${label}**${body ? ` — ${body}` : ""}`);
    }
    for (const child of node.children ?? []) {
      lines.push(...renderFlowNode(child, label && depth === 0 ? 0 : depth + 1));
    }
    return lines;
  }

  const suffix = optionalSuffix(node.kind, label);
  lines.push(`${indent}- **${label}**${suffix}`);

  if (condition) {
    lines.push(`${indent}  - *When:* ${condition}`);
  }
  if (body) {
    lines.push(`${indent}  - ${body}`);
  }

  for (const child of node.children ?? []) {
    lines.push(...renderFlowNode(child, depth + 1));
  }

  return lines;
}

function renderFlow(flowId: "summer-flow" | "autumn-flow" | "winter-flow"): string {
  const flow = getFlow(flowId) as ActionFlow;
  const intro = localize(flow.intro, "en");
  const lines = [`\n${intro}\n`, ...renderFlowNode(flow.root)];

  if (flowId === "summer-flow") {
    return lines.join("\n");
  }

  return lines.join("\n");
}

function renderCrucibleTables(): string {
  const modeLabels: Record<string, string> = {
    quickplay: "Quickplay / First Play",
    standard: "Standard Game",
    magnus: "Magnus Alchemist",
  };

  const sections: string[] = [
    "\n#### Curated Crucible deck builds\n",
    "Sort Crucible Cards into groups A–D, shuffle each group, then draw the counts below for your player count. Shuffle drawn cards together to form the Crucible Deck.\n",
  ];

  for (const [mode, label] of Object.entries(modeLabels)) {
    const builds = crucibleDeckBuilds.curated[mode as keyof typeof crucibleDeckBuilds.curated];
    sections.push(`\n**${label}**\n`);
    sections.push("| Players | Total cards | Group A | Group B | Group C | Group D |");
    sections.push("| --- | --- | --- | --- | --- | --- |");

    for (const [players, build] of Object.entries(builds)) {
      sections.push(
        `| ${players} | ${build.total} | ${build.groups.A} | ${build.groups.B} | ${build.groups.C} | ${build.groups.D} |`
      );
    }
  }

  sections.push(
    "\n**Random build (any mode)** — Shuffle all 22 Crucible Cards together. Each player draws 4 cards. Shuffle the drawn cards to form the Crucible Deck.\n"
  );

  return sections.join("\n");
}

function renderModeBodies(step: GuidedStep): string {
  if (!step.modeBody) return "";
  const order: Array<keyof NonNullable<typeof step.modeBody>> = [
    "quickplay",
    "standard",
    "magnus",
  ];
  return order
    .filter((mode) => step.modeBody?.[mode])
    .map((mode) => htmlToMarkdown(step.modeBody![mode]!))
    .join("\n\n");
}

function renderEmbed(embed: GuidedEmbed): string {
  switch (embed) {
    case "alchemist-tools":
      return renderStepList("alchemist-tools");
    case "round-at-a-glance":
      return renderSeasonGrid("round-at-a-glance");
    case "engine-building":
      return renderSeasonGrid("engine-building");
    case "transmutation-process":
      return renderSeasonGrid("transmutation-process");
    case "summer-flow":
    case "autumn-flow":
    case "winter-flow":
      return renderFlow(embed);
    case "crucible-deck":
      return renderCrucibleTables();
    default:
      return "";
  }
}

const PLAYBOOK_SETUP_PHASE: Partial<Record<string, [number, number]>> = {
  components: [1, 7],
  "setup-i": [2, 7],
  "setup-ii": [3, 7],
  "setup-iii": [4, 7],
  "setup-iv": [5, 7],
  "setup-v": [6, 7],
  "setup-vi": [7, 7],
};

function phaseTag(step: GuidedStep, playbookSetup = false): string {
  if (!step.phase || step.phaseStep == null || step.phaseTotal == null) return "";
  const phaseName = step.phase.charAt(0).toUpperCase() + step.phase.slice(1);
  if (playbookSetup && step.phase === "setup") {
    const remap = PLAYBOOK_SETUP_PHASE[step.id];
    if (remap) {
      return `*${phaseName} · ${remap[0]} of ${remap[1]}*`;
    }
  }
  return `*${phaseName} · ${step.phaseStep} of ${step.phaseTotal}*`;
}

function renderStep(stepNumber: number, step: GuidedStep, stepIndex: number): string {
  const parts: string[] = [`### Step ${stepNumber}: ${step.title}`];

  const playbookSetup = stepIndex >= 6 && stepIndex < 13;
  const tag = phaseTag(step, playbookSetup);
  if (tag) parts.push("", tag);

  parts.push("", adaptStepBody(step));

  if (step.id === "setup-iii") {
    const modes = renderModeBodies(step);
    if (modes) parts.push("", modes);
  }

  if (step.embed) {
    parts.push(renderEmbed(step.embed));
  }

  parts.push(renderChecklist(step));

  return parts.filter((line) => line !== undefined).join("\n").trimEnd();
}

function getPartForStepIndex(index: number): PlaybookPart {
  if (index < 6) {
    return { id: "learn", title: "Part 1 — Learn the Game", stepIds: [] };
  }
  if (index < 13) {
    return { id: "setup", title: "Part 2 — Setup", stepIds: [] };
  }
  return { id: "play", title: "Part 3 — Your First Cosmic Age", stepIds: [] };
}

function composePlaybook(): string {
  const steps = buildPlaybookSteps();
  const lines: string[] = [
    "# Alchemists of the Great Year",
    "",
    "## Guided Playbook",
    "",
    "2–4 players · 60–120 minutes · _A GOODMAGIK GAME_",
    "",
    "> A table companion for learning and running your first Cosmic Ages. Follow each step in order as play unfolds.",
    "",
  ];

  let currentPartId = "";
  let stepNumber = 0;

  for (let i = 0; i < steps.length; i++) {
    const part = getPartForStepIndex(i);
    if (part.id !== currentPartId) {
      if (currentPartId) {
        lines.push("", "<!-- pagebreak -->", "");
      }
      lines.push(`## ${part.title}`, "");
      currentPartId = part.id;
    }

    stepNumber += 1;
    lines.push(renderStep(stepNumber, steps[i]!, i), "");
  }

  lines.push(
    "---",
    "",
    "_Generated by `npm run compose:playbook`. Source: guided-steps, playtest primers, tables, and flows in `src/data/`._"
  );

  return `${lines.join("\n").trimEnd()}\n`;
}

const markdown = composePlaybook();
writeFileSync(OUTPUT_PATH, markdown, "utf8");
console.log(`Wrote ${OUTPUT_PATH} (${markdown.split("\n").length} lines, ${buildPlaybookSteps().length} steps)`);
