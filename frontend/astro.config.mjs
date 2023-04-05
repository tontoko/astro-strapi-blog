import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import cloudflare from "@astrojs/cloudflare";

import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), prefetch()],
  output: "server",
  adapter: cloudflare()
});