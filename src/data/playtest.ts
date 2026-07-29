import { AGY_WIKI_PATH } from "./wiki-base";

/** Client-side playtest gate — casual access control, not cryptographic security. */
export const agyPlaytestConfig = {
  path: `${AGY_WIKI_PATH}playtest/`,
  storageKey: "kismeta-agy-playtest-unlocked",
  password: "thegreatyear",
};

/** External community links surfaced on the playtest feedback page. */
export const agyPlaytestCommunity = {
  /** Paste Google Form URL when ready. */
  feedbackFormUrl: "",
  discordUrl: "https://discord.gg/qEe2UYSnt",
};

export type PlaytestModuleStatus = "active" | "stub";

export type PlaytestModule = {
  id: string;
  titleKey: string;
  summaryKey: string;
  path: string;
  status: PlaytestModuleStatus;
};

/** Hub cards and module routes under `/playtest/`. */
export const agyPlaytestModules: PlaytestModule[] = [
  {
    id: "guided",
    titleKey: "playtest.agy.modules.guided.title",
    summaryKey: "playtest.agy.modules.guided.summary",
    path: `${agyPlaytestConfig.path}guided/`,
    status: "active",
  },
  {
    id: "round-overview",
    titleKey: "playtest.agy.modules.roundOverview.title",
    summaryKey: "playtest.agy.modules.roundOverview.summary",
    path: `${agyPlaytestConfig.path}round-overview/`,
    status: "active",
  },
  {
    id: "glossary",
    titleKey: "playtest.agy.modules.glossary.title",
    summaryKey: "playtest.agy.modules.glossary.summary",
    path: `${agyPlaytestConfig.path}glossary/`,
    status: "active",
  },
  {
    id: "cards",
    titleKey: "playtest.agy.modules.cards.title",
    summaryKey: "playtest.agy.modules.cards.summary",
    path: `${agyPlaytestConfig.path}cards/`,
    status: "active",
  },
  {
    id: "feedback",
    titleKey: "playtest.agy.modules.feedback.title",
    summaryKey: "playtest.agy.modules.feedback.summary",
    path: `${agyPlaytestConfig.path}feedback/`,
    status: "active",
  },
];

export function getPlaytestModule(id: string): PlaytestModule | undefined {
  return agyPlaytestModules.find((module) => module.id === id);
}
