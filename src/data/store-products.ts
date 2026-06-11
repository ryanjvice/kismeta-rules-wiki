import type { ImageMetadata } from "astro";
import type { SiteI18nKey } from "../utils/site-i18n";

import agyBox from "../assets/games/agy/gameBox_noText.png";
import agyBoard from "../assets/games/agy/Kismeta_gameBoard_final.png";
import tvaCard from "../assets/games/tva/card-thumb.png";

export type StoreProduct = {
	id: string;
	titleKey: SiteI18nKey;
	descriptionKey?: SiteI18nKey;
	/** Display price — informational only, not synced to Printful in real time. */
	price: string;
	/** Full URL to the product page on the external storefront. */
	href: string;
	image: ImageMetadata;
	imageAlt: string;
};

/**
 * Curated subset of products shown on /shop/.
 * Update titles, prices, hrefs, and images here when product details change.
 * Add real product URLs and swap placeholder images for actual mockups.
 */
export const featuredProducts: StoreProduct[] = [
	{
		id: "agy-game",
		titleKey: "shop.product.agy-game.title",
		descriptionKey: "shop.product.agy-game.description",
		price: "$34.99",
		href: "https://kismeta.printful.me/",
		image: agyBox,
		imageAlt: "Kismeta: Alchemists of the Great Year board game box",
	},
	{
		id: "agy-tshirt",
		titleKey: "shop.product.agy-tshirt.title",
		descriptionKey: "shop.product.agy-tshirt.description",
		price: "$29.99",
		href: "https://kismeta.printful.me/",
		image: agyBoard,
		imageAlt: "Kismeta alchemist tee shirt mockup",
	},
	{
		id: "agy-poster",
		titleKey: "shop.product.agy-poster.title",
		descriptionKey: "shop.product.agy-poster.description",
		price: "$19.99",
		href: "https://kismeta.printful.me/",
		image: tvaCard,
		imageAlt: "Great Year board art print",
	},
];
