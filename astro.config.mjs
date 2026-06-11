// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { VitePWA } from "vite-plugin-pwa";
import rehypeWrapTables from "./src/integrations/rehype-wrap-tables.mjs";
import remarkContextHeadingIds from "./src/integrations/remark-context-heading-ids.mjs";

const AGY_WIKI = "games/alchemists-of-the-great-year";
const TVA_WIKI = "games/the-veiled-ascent";

/** @param {string} base @param {string} label @param {string} slug */
function wikiLink(base, label, slug) {
  return { label, slug: `${base}/${slug}` };
}

/** Shorthand for an AGY wiki link. */
function link(label, slug, translations) {
  const prefixed = `${AGY_WIKI}/${slug}`;
  return translations ? { label, slug: prefixed, translations } : { label, slug: prefixed };
}

/** Shorthand for a TVA wiki link. */
function tvaLink(label, slug) {
  return wikiLink(TVA_WIKI, label, slug);
}

// https://astro.build/config
export default defineConfig({
  site: "https://kismeta-rules-wiki.vercel.app",
  redirects: {
    "/play/guided/": `/${AGY_WIKI}/play/guided/`,
    "/play/setup/": `/${AGY_WIKI}/play/setup/`,
    "/play/round-overview/": `/${AGY_WIKI}/play/round-overview/`,
    "/play/winning/": `/${AGY_WIKI}/play/winning/`,
    "/learn/components/": `/${AGY_WIKI}/learn/components/`,
    "/rules/game-overview/": `/${AGY_WIKI}/rules/game-overview/`,
    "/rules/round-at-a-glance/": `/${AGY_WIKI}/rules/round-at-a-glance/`,
    "/lore/": `/${AGY_WIKI}/lore/`,
    "/lore/epilogue/": `/${AGY_WIKI}/lore/epilogue/`,
    "/reference/quick-reference/": `/${AGY_WIKI}/reference/quick-reference/`,
    "/reference/quick-tips/": `/${AGY_WIKI}/reference/quick-tips/`,
    "/glossary/": `/${AGY_WIKI}/glossary/`,
    "/play/game-overview/": `/${AGY_WIKI}/rules/game-overview/`,
    "/play/round-at-a-glance/": `/${AGY_WIKI}/rules/round-at-a-glance/`,
  },
  markdown: {
    remarkPlugins: [remarkContextHeadingIds],
    rehypePlugins: [rehypeWrapTables],
  },
  integrations: [
    starlight({
      title: "Alchemists of the Great Year",
      description:
        "Official rules reference for Kismeta: Alchemists of the Great Year.",
      logo: {
        src: "./src/assets/logo.svg",
        alt: "Kismeta",
        replacesTitle: false,
      },
      favicon: "/favicon.svg",
      customCss: ["./src/styles/custom.css"],
      components: {
        Header: "./src/components/Header.astro",
        SiteTitle: "./src/components/SiteTitle.astro",
        ThemeSelect: "./src/components/AccessibilityMenu.astro",
        PageSidebar: "./src/components/PageSidebar.astro",
        Hero: "./src/components/Hero.astro",
        Sidebar: "./src/components/Sidebar.astro",
      },
      defaultLocale: "root",
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
      },
      head: [
        {
          tag: "link",
          attrs: {
            rel: "preconnect",
            href: "https://fonts.googleapis.com",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossorigin: true,
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Amarante&family=Germania+One&display=swap",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "theme-color",
            content: "#1a0f2e",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "manifest",
            href: "/manifest.webmanifest",
          },
        },
        {
          tag: "script",
          attrs: {
            src: "/registerSW.js",
            type: "module",
          },
        },
      ],
      sidebar: [
        {
          label: "Alchemists of the Great Year",
          collapsed: true,
          items: [
            {
              label: "Play",
              items: [
                link("Guided Play", "play/guided"),
                link("Winning the Game", "play/winning"),
                link("Quick Reference", "reference/quick-reference"),
                link("Quick Tips", "reference/quick-tips"),
                link("Glossary", "glossary"),
              ],
            },
            {
              label: "Lore",
              items: [
                link("Prologue", "lore"),
                link("Epilogue: The Veil Stirs", "lore/epilogue"),
              ],
            },
            {
              label: "Rules",
              items: [
                link("Components", "learn/components"),
                link("Setup", "play/setup"),
                link("Game Overview", "rules/game-overview"),
                link("Round at a Glance", "rules/round-at-a-glance"),
                link("Full Game Rules", "play/round-overview"),
                {
                  label: "Card Reference",
                  items: [
                    link("Crucible Cards", "rules/crucible-cards"),
                    {
                      label: "Major Arcana",
                      items: [
                        link("Overview", "rules/major-arcana"),
                        { label: "Fate Cards", link: `/${AGY_WIKI}/rules/major-arcana/#fate-cards` },
                        { label: "Adept Cards", link: `/${AGY_WIKI}/rules/major-arcana/#adept-cards` },
                      ],
                    },
                    link("Minor Arcana", "rules/minor-arcana"),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "The Veiled Ascent",
          collapsed: true,
          items: [
            {
              label: "Play",
              items: [
                tvaLink("Guided Play", "play/guided"),
                tvaLink("Setup", "play/setup"),
                tvaLink("Gameplay Steps", "play/gameplay"),
                tvaLink("Winning the Game", "play/winning"),
                tvaLink("Glossary", "glossary"),
              ],
            },
            {
              label: "Reference",
              items: [
                tvaLink("Card Values & Scoring", "reference/card-values"),
                tvaLink("Round Outcomes", "reference/round-outcomes"),
                tvaLink("Pattern Bonuses", "reference/pattern-bonuses"),
              ],
            },
            {
              label: "Rules",
              items: [
                tvaLink("Objective", "rules/overview"),
                tvaLink("Multiplayer Rules", "rules/multiplayer"),
                tvaLink("Veil Progression Board", "reference/progression-board"),
              ],
            },
            {
              label: "Lore",
              items: [
                tvaLink("The Veil Stirs", "lore"),
              ],
            },
          ],
        },
      ],
    }),
  ],
  vite: {
    plugins: [
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: false,
        includeAssets: ["favicon.svg", "brand/**/*"],
        manifest: {
          name: "Kismeta",
          short_name: "Kismeta",
          description:
          "Kismeta — games of fate, alchemy, and the Great Year.",
          theme_color: "#1a0f2e",
          background_color: "#0d0818",
          display: "standalone",
          start_url: "/",
          icons: [
            {
              src: "/favicon.svg",
              sizes: "any",
              type: "image/svg+xml",
              purpose: "any maskable",
            },
          ],
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,svg,png,webp,woff2,ttf,json}"],
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        },
        devOptions: {
          enabled: true,
        },
      }),
    ],
  },
});

