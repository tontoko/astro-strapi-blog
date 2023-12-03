import { defineConfig } from "astro/config"
import svelte from "@astrojs/svelte"
import prefetch from "@astrojs/prefetch"
import tailwind from "@astrojs/tailwind"
import robotsTxt from "astro-robots-txt"
import sitemap from "@astrojs/sitemap"
import cloudflare from "@astrojs/cloudflare"
import partytown from "@astrojs/partytown"

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: cloudflare({
    runtime: { mode: "local" },
  }),
  site: process.env.PUBLIC_BACKEND_URL ?? "http://127.0.0.1:1337",
  image: {
    domains: ["localhost"],
    remotePatterns: [{ protocol: "https" }],
  },
  integrations: [
    svelte(),
    prefetch(),
    tailwind(),
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
