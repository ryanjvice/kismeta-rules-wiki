export type GameStatus = "available" | "coming-soon";

export type Game = {
	slug: string;
	title: string;
	subtitle: string;
	summaryKey: "game.agy.summary" | "game.tva.summary";
	marketingPath: string;
	status: GameStatus;
	playersKey?: "game.agy.players" | "game.tva.players";
	playTimeKey?: "game.agy.playTime";
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
	},
	{
		slug: "the-veiled-ascent",
		title: "Kismeta: The Veiled Ascent",
		subtitle: "The Veiled Ascent",
		summaryKey: "game.tva.summary",
		marketingPath: "/games/the-veiled-ascent/",
		status: "available",
		playersKey: "game.tva.players",
	},
];

export function getGame(slug: string): Game | undefined {
	return games.find((game) => game.slug === slug);
}
