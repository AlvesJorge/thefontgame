// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/eslint",
    "@nuxt/scripts",
  ],
  imports: {
    dirs: ["helpers"],
  },
  colorMode: {
    classSuffix: "",
    preference: "dark"
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui"
  },
  css: ["~/assets/stylesheets/main.css"],
  app: {
    head: {
      title: "The Font Game",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: "og:image", content: "/assets/github_demo.png" },
        { name: "keywords", content: "the font game, font game, web game, guess that font, guess the font name, fonts, typography, web game" }
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true },
        { rel: "author", href: "https://alvesjorge.com" }
      ],
      script: [
        {
          src: "https://gc.zgo.at/count.js",
          async: true,
          "data-goatcounter": "https://thefontgame.goatcounter.com/count"
        }
      ],
    }
  }

});
