export type GameStatus = "available" | "coming-soon";

export type GameTheme = {
	accentColor: string;
	accentHigh: string;
	secondaryAccent: string;
	bgDepth: string;
	bgMid: string;
	bgPage: string;
	hairline: string;
	textMuted: string;
};

export type Game = {
	slug: string;
	title: string;
	subtitle: string;
	summaryKey: "game.agy.summary" | "game.tva.summary";
	marketingPath: string;
	status: GameStatus;
	playersKey?: "game.agy.players" | "game.tva.players";
	playTimeKey?: "game.agy.playTime";
	theme?: GameTheme;
};

export const games: Game[] = [
	{
		slug: "alchemists-of-the-great-year",
		title: "Kismeta: Alchemists of the Great Year",
		subtitle: "Alchemists of the Great Year",
		summaryKey: "game.agy.summary",
		marketingPath: "/games/alchemists-of-the-great-year/",
		status: "available",
		playersKey: "game.agy.players",
		playTimeKey: "game.agy.playTime",
		theme: {
			accentColor: "#c9a227",
			accentHigh: "#ffe86c",
			secondaryAccent: "#d4782a",
			bgDepth: "#1a0820",
			bgMid: "#2a1838",
			bgPage: "#120820",
			hairline: "#4d2a10",
			textMuted: "#c8b87a",
		},
	},
	{
		slug: "the-veiled-ascent",
		title: "Kismeta: The Veiled Ascent",
		subtitle: "The Veiled Ascent",
		summaryKey: "game.tva.summary",
		marketingPath: "/games/the-veiled-ascent/",
		status: "available",
		playersKey: "game.tva.players",
		theme: {
			accentColor: "#9b8ec4",
			accentHigh: "#e2e8f4",
			secondaryAccent: "#c9d1e0",
			bgDepth: "#0f1420",
			bgMid: "#1a2235",
			bgPage: "#0a1020",
			hairline: "#2d3a5c",
			textMuted: "#8899bb",
		},
	},
];

export function getGame(slug: string): Game | undefined {
	return games.find((game) => game.slug === slug);
}
