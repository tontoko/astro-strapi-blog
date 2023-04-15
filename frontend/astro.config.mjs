import { defineConfig } from "astro/config"
import svelte from "@astrojs/svelte"
import prefetch from "@astrojs/prefetch"
import tailwind from "@astrojs/tailwind"
import image from "@astrojs/image"
import compress from "astro-compress"
import robotsTxt from "astro-robots-txt"

import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_BACKEND_URL ?? "http://127.0.0.1:1337",
  integrations: [
    svelte(),
    prefetch(),
    tailwind(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    compress(),
    sitemap(),
    robotsTxt(),
  ],
})
