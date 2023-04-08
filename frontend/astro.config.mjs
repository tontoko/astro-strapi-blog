import { defineConfig } from "astro/config"
import svelte from "@astrojs/svelte"
import prefetch from "@astrojs/prefetch"

import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), prefetch(), tailwind()],
})
