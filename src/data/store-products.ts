import type { ImageMetadata } from "astro";
import type { SiteI18nKey } from "../utils/site-i18n";

import agyBox from "../assets/games/agy/kismeta_AGY_cover.jpg";
import agyHoodie from "../assets/merch/hoodie.jpg";
import agyCard from "../assets/merch/poster.jpg";
import agyTwillCap from "../assets/merch/twillCap.jpg";

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
  /** When true, the card is shown but not linked to the storefront. */
  comingSoon?: boolean;
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
    price: "$60",
    href: "https://kismeta.printful.me/",
    image: agyBox,
    imageAlt: "Kismeta: Alchemists of the Great Year board game box",
    comingSoon: true,
  },
  {
    id: "agy-hoodie",
    titleKey: "shop.product.agy-hoodie.title",
    descriptionKey: "shop.product.agy-hoodie.description",
    price: "$50.00",
    href: "https://kismeta.printful.me/product/kismeta-hoodie",
    image: agyHoodie,
    imageAlt: "Navy Kismeta logo hoodie mockup",
  },
  {
    id: "kismeta-cap",
    titleKey: "shop.product.kismeta-cap.title",
    descriptionKey: "shop.product.kismeta-cap.description",
    price: "$25.00",
    href: "https://kismeta.printful.me/product/kismeta-vintage-cotton-twill-cap",
    image: agyTwillCap,
    imageAlt: "Black vintage twill cap with embroidered Kismeta lettering",
  },
  {
    id: "agy-poster",
    titleKey: "shop.product.agy-poster.title",
    descriptionKey: "shop.product.agy-poster.description",
    price: "$20",
    href: "https://kismeta.printful.me/product/kismeta-board-photo-paper-poster",
    image: agyCard,
    imageAlt: "Great Year board art print",
  },
];
