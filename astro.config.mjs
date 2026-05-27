// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { VitePWA } from "vite-plugin-pwa";
import rehypeWrapTables from "./src/integrations/rehype-wrap-tables.mjs";

/** @param {string} label @param {string} slug @param {Record<string,string>} [translations] */
function link(label, slug, translations) {
  return translations ? { label, slug, translations } : { label, slug };
}

// https://astro.build/config
export default defineConfig({
  site: "https://kismeta-rules-wiki.vercel.app",
  redirects: {
    "/play/game-overview/": "/rules/game-overview/",
    "/play/round-at-a-glance/": "/rules/round-at-a-glance/",
  },
  markdown: {
    rehypePlugins: [rehypeWrapTables],
  },
  integrations: [
    starlight({
      title: "Game Rules",
      description:
        "Official rules reference for Kismeta: Alchemists of the Great Year — a GOODMAGIK game.",
      logo: {
        src: "./src/assets/logo.svg",
        alt: "Kismeta",
        replacesTitle: false,
      },
      favicon: "/favicon.svg",
      customCss: ["./src/styles/custom.css"],
      components: {
        Header: "./src/components/Header.astro",
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
          label: "Play",
          items: [
            link("Play", "play/guided"),
            link("Winning the Game", "play/winning"),
            link("Quick Reference", "reference/quick-reference"),
            link("Quick Tips", "reference/quick-tips"),
            link("Glossary", "glossary"),
          ],
        },
        {
          label: "Lore",
          items: [
            link("Lore", "lore"),
            link("Lore: Epilogue", "lore/epilogue"),
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
          name: "Kismeta Rules",
          short_name: "Kismeta",
          description:
            "Rules reference for Kismeta: Alchemists of the Great Year",
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
