export type ShopLink = {
	id: string;
	labelKey: "shop.link.official";
	href: string;
	descriptionKey: "shop.link.officialDesc";
};

/** Replace href when the external shop URL is available. */
export const shopLinks: ShopLink[] = [
	{
		id: "official",
		labelKey: "shop.link.official",
		href: "https://kismeta.printful.me/",
		descriptionKey: "shop.link.officialDesc",
	},
];
