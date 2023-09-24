import { defineConfig } from "astro/config"
import svelte from "@astrojs/svelte"
import prefetch from "@astrojs/prefetch"
import tailwind from "@astrojs/tailwind"
import compress from "astro-compress"
import robotsTxt from "astro-robots-txt"
import sitemap from "@astrojs/sitemap"

import partytown from "@astrojs/partytown"

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_BACKEND_URL ?? "http://127.0.0.1:1337",
  integrations: [
    svelte(),
    prefetch(),
    tailwind(),
    compress(),
    sitemap(),
    robotsTxt(),
    partytown({
      // Example: Add dataLayer.push as a forwarding-event.
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
})
